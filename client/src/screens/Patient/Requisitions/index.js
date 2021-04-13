import React, { useState, useEffect, useCallback } from "react";

import {
  Button,
  Grid,
  Typography,
  Checkbox,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import Select from "react-select";

import usePatientContext from "../../../hooks/usePatientContext";
import { toggleRequisitionDialog } from "../../../providers/Patient/actions";
import PatientService from "../../../services/patient.service";
import {
  BillSelectionFields,
  LabortoriesSelectionFields,
  FavoritesSelectionFields,
} from "../../../static/requisitionform";
import SelectCustomStyles from "../../../styles/SelectCustomStyles";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    margin: theme.spacing(3, 0),
  },
  section: {
    marginBottom: theme.spacing(2),
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
  border: {
    border: "1px solid grey",
    padding: 10,
  },
  height100: {
    height: "100%",
  },
  actionContainer: {
    marginTop: theme.spacing(2),
  },
  mr2: {
    marginRight: theme.spacing(2),
  },
  ml1: {
    marginLeft: theme.spacing(1),
  },
}));

const Requisitions = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = usePatientContext();
  const { reloadData } = props;
  const [billSelection, setBillSelection] = useState("physician");
  const [tests, setTests] = useState([]);
  const [diagnoses, setDiagnoses] = useState([]);
  const [selectedTest, setSelectedTest] = useState([]);

  const { patientId } = state;

  const fetchTests = useCallback(() => {
    PatientService.getTests(patientId).then((res) => {
      setTests(res.data);
    });
  }, [patientId]);

  const fetchDiagnoses = useCallback(() => {
    PatientService.getDiagnoses(patientId, true).then((res) => {
      setDiagnoses(res.data);
    });
  }, [patientId]);

  useEffect(() => {
    fetchTests();
    fetchDiagnoses();
  }, [fetchTests, fetchDiagnoses]);

  const handleBillSelection = (e) => {
    setBillSelection(e.target.value);
  };

  const onFormSubmit = () => {
    const reqBody = {
      data: {
        cpt_id: selectedTest.cpt_id,
        encounter_id: 1, // TODO hard coded for the time being: discussion required
      },
    };
    PatientService.createRequisition(patientId, reqBody)
      .then((response) => {
        enqueueSnackbar(`${response.data.message}`, { variant: "success" });
        reloadData();
        dispatch(toggleRequisitionDialog());
      })
      .catch((error) => {
        const resMessage = (error.response
          && error.response.data
          && error.response.data.message)
          || error.message
          || error.toString();
        enqueueSnackbar(`${resMessage}`, { variant: "error" });
      });
  };

  return (
    <>
      <Grid className={classes.heading} container justify="space-between">
        <Typography variant="h3" color="textSecondary">
          Select Lab Test
        </Typography>
      </Grid>
      <Grid container spacing={1}>
        <Grid item lg={3}>
          <FormControl component="fieldset" className={classes.section}>
            <FormLabel component="legend">Bill To</FormLabel>
            <RadioGroup
              row
              value={billSelection}
              onChange={handleBillSelection}
              name="position"
              defaultValue="top"
            >
              {BillSelectionFields.map((item) => (
                <FormControlLabel
                  key={`${item.label}_${item.value}`}
                  value={item.value}
                  label={item.label}
                  control={<Radio color="primary" />}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Grid className={classes.section}>
            <Typography gutterBottom variant="h4" color="textSecondary">
              Recommended
            </Typography>
            {diagnoses.map((item) => (
              <Grid
                container
                alignItems="center"
                direction="row"
                key={item.icd_id}
              >
                <Typography variant="body1">
                  {item.name}
                </Typography>
                <Button className={classes.ml1}>[Remove]</Button>
              </Grid>
            ))}
          </Grid>
          <Grid item lg={9} className={classes.border}>
            <Typography
              gutterBottom
              variant="h5"
              color="textPrimary"
            >
              Labortories
            </Typography>
            {LabortoriesSelectionFields.map((item) => (
              <Grid key={`${item.label}_${item.value}`}>
                <FormControlLabel
                  value={item.value}
                  label={item.label}
                  control={<Checkbox color="primary" />}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item lg={3}>
          <Grid item lg={8} className={classes.heading}>
            <Select
              value={selectedTest}
              options={tests.length ? tests : []}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={(value) => setSelectedTest(value)}
              styles={SelectCustomStyles}
              isClearable
              isLoading={!tests.length}
            />
          </Grid>

          <List component="ul">
            {tests.map((medication) => (
              <ListItem
                onClick={() => setSelectedTest(medication)}
                key={medication.cpt_id}
                disableGutters
                button
              >
                <ListItemText primary={medication.name} />
              </ListItem>
            ))}
          </List>

        </Grid>
        <Grid item lg={6}>
          <Grid className={`${classes.border} ${classes.height100}`}>
            <Typography gutterBottom variant="h5" color="textPrimary">
              Favorites
            </Typography>
            <Grid container spacing={1}>
              <Grid item lg={4}>
                {FavoritesSelectionFields.map((item) => (
                  <Grid key={`${item.label}_${item.value}`}>
                    <FormControlLabel
                      value={item.value}
                      label={item.label}
                      control={<Checkbox color="primary" />}
                    />
                  </Grid>
                ))}
              </Grid>
              <Grid item lg={4}>
                {FavoritesSelectionFields.map((item) => (
                  <Grid key={`${item.label}_${item.value}`}>
                    <FormControlLabel
                      value={item.value}
                      label={item.label}
                      control={<Checkbox color="primary" />}
                    />
                  </Grid>
                ))}
              </Grid>
              <Grid item lg={4}>
                {FavoritesSelectionFields.map((item) => (
                  <Grid key={`${item.label}_${item.value}`}>
                    <FormControlLabel
                      value={item.vlaue}
                      label={item.label}
                      control={<Checkbox color="primary" />}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        className={classes.actionContainer}
        container
        justify="space-between"
      >
        <Grid>
          <Button
            variant="outlined"
            className={classes.mr2}
            onClick={() => onFormSubmit()}
          >
            Complete
          </Button>
          <Button variant="outlined" onClick={() => onFormSubmit()}>
            Complete and Fax
          </Button>
        </Grid>
        <Button variant="outlined" onClick={() => dispatch(toggleRequisitionDialog())}>
          Cancel
        </Button>
      </Grid>
    </>
  );
};

Requisitions.propTypes = {
  reloadData: PropTypes.func.isRequired,
};

export default Requisitions;

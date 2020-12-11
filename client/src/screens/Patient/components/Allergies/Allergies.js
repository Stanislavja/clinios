import React, { useState, useEffect } from "react";

import {
  Button,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import Select from "react-select";

import usePatientContext from "../../../../hooks/usePatientContext";
import { toggleAllergyDialog } from "../../../../providers/Patient/actions";
import PatientService from "../../../../services/patient.service";
import SelectCustomStyles from "../../../../styles/SelectCustomStyles";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    margin: theme.spacing(3, 0),
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
}));

const Allergies = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = usePatientContext();
  const { reloadData } = props;
  const [allergies, setAllergies] = useState([]);
  const [selectedAllergy, setSelectedAllergy] = useState(null);
  const { patientId } = state;

  const fetchAllergies = (searchText) => {
    const reqBody = {
      data: {
        text: searchText,
      },
    };
    PatientService.searchAllergies(reqBody).then((res) => {
      setAllergies(res.data);
    });
  };

  useEffect(() => {
    fetchAllergies("");
  }, []);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const reqBody = {
      data: {
        drug_id: selectedAllergy.id,
      },
    };
    PatientService.createAllergy(patientId, reqBody)
      .then((response) => {
        enqueueSnackbar(`${response.data.message}`, { variant: "success" });
        reloadData();
        dispatch(toggleAllergyDialog());
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
        <Typography
          variant="h3"
          color="textSecondary"
        >
          Select Allergy
        </Typography>
        <Button
          variant="outlined"
          onClick={() => dispatch(toggleAllergyDialog())}
        >
          Cancel
        </Button>
      </Grid>
      <Grid item lg={4}>
        <Select
          value={selectedAllergy}
          options={allergies.length ? allergies : []}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          onChange={(value) => setSelectedAllergy(value)}
          styles={SelectCustomStyles}
          isClearable
        />

        <List component="ul">
          {allergies.map((allergy) => (
            <ListItem
              onClick={() => setSelectedAllergy(allergy)}
              key={allergy.id}
              disableGutters
              button
            >
              <ListItemText primary={allergy.name} />
            </ListItem>
          ))}
        </List>
      </Grid>

      <Grid
        className={classes.actionContainer}
        container
        justify="space-between"
      >
        <Button
          variant="outlined"
          onClick={(e) => onFormSubmit(e)}
          type="submit"
        >
          Save
        </Button>
        <Button
          variant="outlined"
          onClick={() => dispatch(toggleAllergyDialog())}
        >
          Cancel
        </Button>
      </Grid>
    </>
  );
};

Allergies.propTypes = {
  reloadData: PropTypes.func.isRequired,
};

export default Allergies;

import React, { useState, useEffect } from "react";

import {
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import useAuth from "../../../hooks/useAuth";
import usePatientContext from "../../../hooks/usePatientContext";
import {
  resetEncounter,
  toggleEncountersDialog,
} from "../../../providers/Patient/actions";
import PatientService from "../../../services/patient.service";
import { EncountersFormFields } from "../../../static/encountersForm";
import { encounterTypeToLetterConversion, encounterLetterToTypeConversion } from "../../../utils/helpers";
import CardsList from "./CardsAccordion";
import ClockTimer from "./ClockTimer";

const useStyles = makeStyles((theme) => ({
  btnsContainer: {
    margin: theme.spacing(1, 0, 2, 0),
  },
  formInput: {
    margin: theme.spacing(2, 0),
  },
  card: {
    border: "1px solid rgba(0, 0, 0, .125)",
    borderRadius: 4,
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  cardsContainer: {
    padding: theme.spacing(0, 2),

    [theme.breakpoints.down("sm")]: {
      padding: 0,
      width: "100%",
    },
  },
  cardOuter: {
    maxHeight: 250,
    overflowY: "scroll",
  },
}));

const Encounters = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = usePatientContext();
  const { reloadData } = props;
  const [formFields, setFormFields] = useState({
    title: "",
    encounter_type: "",
    name: "",
    date: "",
    notes: "",
    treatment: "",
  });

  const { user } = useAuth();
  const { patientId } = state;
  const encounter = state.encounters.selectedEncounter;

  const updateFields = () => {
    formFields.title = encounter.title;
    formFields.encounter_type = encounterTypeToLetterConversion(encounter.encounter_type);
    formFields.name = encounter.name;
    formFields.date = moment(encounter.dt).format("YYYY-MM-DD");
    formFields.notes = encounter.notes;
    formFields.treatment = encounter.treatment;
    setFormFields({ ...formFields });
  };

  useEffect(() => {
    if (encounter) {
      updateFields();
    }
    return () => !!encounter && dispatch(resetEncounter());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encounter]);

  const handleInputChnage = (e) => {
    const { value, name } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (encounter) {
      const encounterId = encounter.id;
      const reqBody = {
        data: {
          dt: formFields.date,
          title: formFields.title,
          encounter_type: encounterLetterToTypeConversion(formFields.encounter_type),
          type_id: formFields.encounter_type,
          name: formFields.name,
          notes: formFields.notes,
          treatment: formFields.treatment,
        },
      };
      PatientService.updateEncounters(patientId, encounterId, reqBody)
        .then((response) => {
          enqueueSnackbar(`${response.data.message}`, { variant: "success" });
          reloadData();
          dispatch(toggleEncountersDialog());
        })
        .catch((error) => {
          const resMessage = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message
            || error.toString();
          enqueueSnackbar(`${resMessage}`, { variant: "error" });
        });
    } else {
      const reqBody = {
        data: {
          dt: formFields.date,
          title: formFields.title,
          type_id: formFields.encounter_type,
          name: formFields.name,
          notes: formFields.notes,
          treatment: formFields.treatment,
        },
      };
      PatientService.createEncounter(patientId, reqBody)
        .then((response) => {
          enqueueSnackbar(`${response.data.message}`, { variant: "success" });
          reloadData();
          dispatch(toggleEncountersDialog());
        })
        .catch((error) => {
          const resMessage = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message
            || error.toString();
          enqueueSnackbar(`${resMessage}`, { variant: "error" });
        });
    }
  };

  return (
    <>
      <Typography variant="h3" color="textSecondary">
        Encounters Form
      </Typography>

      <Grid container>
        <Grid item lg={9} md={8} sm={12}>
          <form id="encounters-form" onSubmit={onFormSubmit}>
            <Grid container spacing={4}>
              {EncountersFormFields.map((item) => (
                <Grid key={item.label} item md={3} xs={12}>
                  <Grid
                    key={item.label}
                    container
                    alignItems="center"
                    className={classes.formInput}
                  >
                    <Grid item lg={2} xs={3}>
                      <label htmlFor={item.name} variant="h4" color="textSecondary">
                        {item.label}
                      </label>
                    </Grid>
                    <Grid item lg={10} xs={9}>
                      {item.baseType === "input" ? (
                        <TextField
                          variant="standard"
                          name={item.name}
                          id={item.id}
                          type={item.type}
                          value={formFields[item.name]}
                          fullWidth
                          onChange={(e) => handleInputChnage(e)}
                          required
                        />
                      ) : (
                        <TextField
                          select
                          placeholder={item.label}
                          id={item.id}
                          name={item.name}
                          value={formFields[item.name]}
                          fullWidth
                          onChange={(e) => handleInputChnage(e)}
                          required
                        >
                          {item.options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              ))}
              <Grid item md={3} xs={12}>
                <Grid
                  container
                  alignItems="center"
                  className={classes.formInput}
                >
                  <Grid item lg={2} xs={3}>
                    Timer
                  </Grid>
                  <Grid item lg={10} xs={9}>
                    <ClockTimer />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid className={classes.formInput}>
              <Grid item lg={6}>
                <Typography gutterBottom variant="h5" color="textPrimary">
                  Internal Notes (Not Visible to Patients)
                </Typography>
              </Grid>
              <Grid item md={12}>
                <TextField
                  variant="outlined"
                  name="notes"
                  id="notes"
                  type="text"
                  fullWidth
                  value={formFields.notes}
                  onChange={(e) => handleInputChnage(e)}
                  multiline
                  rows={15}
                  required
                />
              </Grid>
            </Grid>

            <Grid className={classes.formInput}>
              <Grid item lg={6}>
                <Typography gutterBottom variant="h5" color="textPrimary">
                  Treatment Plan (Not Visible to Patients)
                </Typography>
              </Grid>
              <Grid item md={12}>
                <TextField
                  variant="outlined"
                  name="treatment"
                  id="treatment"
                  type="text"
                  fullWidth
                  value={formFields.treatment}
                  onChange={(e) => handleInputChnage(e)}
                  multiline
                  rows={15}
                  required
                />
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item lg={3} md={4} sm={12} className={classes.cardsContainer}>
          <CardsList />

          <Grid className={classes.card}>
            <Grid className={classes.btnsContainer} container justify="space-between">
              <Grid item xs={5}>
                <Button
                  fullWidth
                  variant="outlined"
                  type="submit"
                  form="encounters-form"
                >
                  Save
                </Button>
              </Grid>
              <Grid item xs={5}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => dispatch(toggleEncountersDialog())}
                >
                  Exit
                </Button>
              </Grid>
            </Grid>
            <Typography gutterBottom>
              Created
              {" "}
              {moment().format("MMM D YYYY hh:mm A")}
            </Typography>
            <Typography gutterBottom>
              Created By
              {" "}
              {!!user && `${user.firstname} ${user.lastname}`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

Encounters.propTypes = {
  reloadData: PropTypes.func.isRequired,
};

export default Encounters;

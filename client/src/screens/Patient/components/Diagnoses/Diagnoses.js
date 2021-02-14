import React, { useState, useEffect, useCallback } from "react";

import {
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import usePatientContext from "../../../../hooks/usePatientContext";
import { toggleDiagnosesDialog } from "../../../../providers/Patient/actions";
import PatientService from "../../../../services/patient.service";
import DiagnosesSelectList from "./DiagnosesSelectList";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    margin: theme.spacing(3, 0),
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
    paddingTop: theme.spacing(2),
  },
}));

const Diagnoses = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { reloadData } = props;
  const [selectedDiagnosis, setSelectedDiagnoses] = useState([]);
  const [recentICDs, setRecentICDs] = useState([]);

  const { state, dispatch } = usePatientContext();
  const { patientId } = state;

  const onFormSubmit = (e) => {
    e.preventDefault();
    const reqBody = {
      data: {
        icd_id: selectedDiagnosis.id,
      },
    };
    PatientService.createDiagnoses(patientId, reqBody)
      .then((response) => {
        enqueueSnackbar(`${response.data.message}`, { variant: "success" });
        reloadData();
        dispatch(toggleDiagnosesDialog());
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

  const getSelectedDiagnosis = (value) => {
    setSelectedDiagnoses(value);
  };

  const fetchRecentICDs = useCallback(() => {
    PatientService.getDiagnosesRecentICDs(patientId).then((response) => {
      setRecentICDs(response.data);
    });
  }, [patientId]);

  useEffect(() => {
    fetchRecentICDs();
  }, [fetchRecentICDs]);

  return (
    <>
      <Grid className={classes.heading} container justify="space-between">
        <Typography variant="h3" color="textSecondary">
          Diagnose
        </Typography>
      </Grid>

      <Grid container spacing={1}>
        <Grid item lg={4}>
          <Grid className={`${classes.border} ${classes.height100}`}>
            <DiagnosesSelectList
              getSelectedDiagnosis={(diagnosis) => getSelectedDiagnosis(diagnosis)}
            />
          </Grid>
        </Grid>
        <Grid item lg={8}>
          <Grid className={classes.border}>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h4" color="textPrimary" gutterBottom>
                  Recent ICDs
                </Typography>
                {recentICDs.length
                  ? recentICDs.map((item) => (
                    <Grid key={item}>
                      <Typography gutterBottom variant="body1">
                        {`${item.name} ${item.id}`}
                      </Typography>
                    </Grid>
                  ))
                  : (
                    <Typography variant="body1">
                      No Recent ICDs Found...
                    </Typography>
                  )}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h4" color="textPrimary" gutterBottom>
                  Recommended ICDs
                </Typography>
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
        <Button
          variant="outlined"
          onClick={(e) => onFormSubmit(e)}
          type="submit"
        >
          Save
        </Button>
        <Button variant="outlined" onClick={() => dispatch(toggleDiagnosesDialog())}>
          Cancel
        </Button>
      </Grid>
    </>
  );
};

Diagnoses.propTypes = {
  reloadData: PropTypes.func.isRequired,
};

export default Diagnoses;

import React, { useState, useEffect, useCallback } from "react";

import {
  Button, makeStyles, Typography, Grid, TextField, MenuItem, Grow,
} from "@material-ui/core";

import useAuth from "../../../hooks/useAuth";
import PatientPortalService from "../../../services/patient_portal/patient-portal.service";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  btnContainer: {
    margin: theme.spacing(1, 0),
  },
  btn: {
    marginRight: 15,
    minWidth: 120,
  },
}));

const Encounters = () => {
  const classes = useStyles();
  const { lastVisitedPatient } = useAuth();
  const [requisitions, setRequisitions] = useState([]);
  const [selectedRequisition, setSelectedRequisition] = useState("");

  const fetchRequisitions = useCallback(() => {
    PatientPortalService.getRequisitions(lastVisitedPatient).then((res) => {
      setRequisitions(res.data);
    });
  }, [lastVisitedPatient]);

  useEffect(() => {
    fetchRequisitions();
  }, [fetchRequisitions]);

  const onFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Requisition
      </Typography>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <form onSubmit={onFormSubmit}>
          <TextField
            select
            required
            variant="outlined"
            label="Lab Requisitions"
            margin="dense"
            fullWidth
            value={selectedRequisition}
            onChange={(e) => setSelectedRequisition(e.target.value)}
          >
            {requisitions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.lab}
              </MenuItem>
            ))}
          </TextField>
        </form>
      </Grid>
      <Grow
        in={Boolean(selectedRequisition)}
        style={{ transformOrigin: "0 0 0" }}
        {...(selectedRequisition ? { timeout: 500 } : {})}
      >
        <Grid
          container
          className={classes.btnContainer}
        >
          <Button
            variant="outlined"
            className={classes.btn}
          >
            Download
          </Button>
          <Button
            variant="outlined"
            className={classes.btn}
          >
            Print
          </Button>
        </Grid>
      </Grow>
    </div>
  );
};

export default Encounters;

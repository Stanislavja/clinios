import React, { useCallback, useState, useEffect } from "react";

import {
  makeStyles, Typography, Grid, Button,
} from "@material-ui/core";
import { useSnackbar } from "notistack";

import Dialog from "../../../components/Dialog";
import useAuth from "../../../hooks/useAuth";
import useDidMountEffect from "../../../hooks/useDidMountEffect";
import PatientPortalService from "../../../services/patient_portal/patient-portal.service";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  tab: {
    paddingBottom: 5,
    margin: "5px 16px 5px 0",
    fontSize: 14,
    cursor: "pointer",
  },
  tabSelected: {
    paddingBottom: 5,
    margin: "5px 16px 5px 0",
    fontSize: 14,
    cursor: "pointer",
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
  w100: {
    minWidth: 100,
  },
}));

const PurchaseLabs = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { lastVisitedPatient, user } = useAuth();

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Purchase Lab Tests
      </Typography>
    </div>
  );
};

export default PurchaseLabs;

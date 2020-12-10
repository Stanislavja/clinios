import React, { useEffect, useState, useCallback } from "react";

import {
  makeStyles, Grid, Divider, Typography,
} from "@material-ui/core";
import moment from "moment";

import useAuth from "../../../hooks/useAuth";
import PatientPortalService from "../../../services/patient_portal/patient-portal.service";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  mainContainer: {
    margin: theme.spacing(1, 0),
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  inputRow: {
    marginBottom: theme.spacing(0.5),
  },
  block: {
    width: 100,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  text12: {
    fontSize: 12,
  },
}));

const Encounters = () => {
  const classes = useStyles();
  const { lastVisitedPatient } = useAuth();
  const [encounters, setEncounters] = useState([]);

  const fetchEncounters = useCallback(() => {
    PatientPortalService.getEncounters(lastVisitedPatient).then((res) => {
      setEncounters(res.data);
    });
  }, [lastVisitedPatient]);

  useEffect(() => {
    fetchEncounters();
  }, [fetchEncounters]);

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Encounters
      </Typography>
      <Typography
        variant="h5"
        color="textPrimary"
        className={classes.title}
      >
        This page is used to view your treatment plans.
      </Typography>
      {
        encounters.length
          ? encounters.map((item, index) => (
            <Grid
              item
              md={4}
              key={moment(item.dt).format("MMM D YYYY")}
              className={classes.mainContainer}
            >
              <Grid className={classes.inputRow} container>
                <Typography
                  component="span"
                  className={`${classes.text12} ${classes.block}`}
                  color="textPrimary"
                >
                  {moment(item.dt).format("MMM D YYYY")}
                </Typography>
                <Typography
                  component="span"
                  className={`${classes.text12} ${classes.block}`}
                  color="textPrimary"
                >
                  {item.encounter_type}
                </Typography>
                <Typography
                  component="span"
                  className={`${classes.text12} ${classes.block}`}
                  color="textPrimary"
                >
                  {item.title}
                </Typography>
                <Typography
                  component="span"
                  className={`${classes.text12} ${classes.block}`}
                  color="textPrimary"
                >
                  {item.name}
                </Typography>
              </Grid>

              <Grid className={classes.inputRow}>
                <Typography className={classes.text12} color="textPrimary">
                  Notes:
                </Typography>
                <Typography className={classes.text12} color="textPrimary">
                  {item.notes ? item.notes : "No notes found..."}
                </Typography>
              </Grid>

              <Grid className={classes.inputRow}>
                <Typography className={classes.text12} color="textPrimary">
                  Treatment Plan:
                </Typography>
                <Typography className={classes.text12} color="textPrimary">
                  {item.treatment
                    ? item.treatment
                    : "No treatment found..."}
                </Typography>
              </Grid>

              {index + 1 !== encounters.length && <Divider className={classes.divider} />}
            </Grid>
          ))
          : <Typography>No Encounters found...</Typography>
      }
    </div>
  );
};

export default Encounters;

import React, { useState, useEffect, useCallback } from "react";

import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import PatientPortalService from "../../../services/patient_portal/patient-portal.service";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
}));

const Handouts = () => {
  const classes = useStyles();
  const [handouts, setHandouts] = useState([]);

  const fetchHandouts = useCallback(() => {
    PatientPortalService.getHandouts().then((res) => {
      setHandouts(res.data);
    });
  }, []);

  useEffect(() => {
    fetchHandouts();
  }, [fetchHandouts]);

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Handouts
      </Typography>
      {
        handouts.length
          ? handouts.map((item) => (
            <Typography
              key={item.id}
              gutterBottom
            >
              {item.id}
            </Typography>
          ))
          : <Typography>No handouts found...</Typography>
      }
    </div>
  );
};

export default Handouts;

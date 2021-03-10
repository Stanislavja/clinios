import React, { useState, useEffect, useCallback } from "react";

import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

import PatientPortalService from "../../../services/patient_portal/patient-portal.service";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  handoutContainer: {
    display: "flex",
  },
  handoutCard: {
    marginTop: "20px",
  },
  handout: {
    display: "flex",
    flexDirection: "column",
    listStyle: "none",
    marginRight: "25px",
  },
  handoutText: {
    fontSize: "13px",
    display: "flex",
    justifyContent: "space-between",
    listStyle: "none",
    padding: "0px 0px",
    cursor: "pointer",
    textDecoration: "none",
    width: "100%",
    color: theme.palette.text.primary,
    "&:hover": {
      background: "#fafafa",
    },
  },
  handoutLabel: {
    fontWeight: 500,
    marginBottom: theme.spacing(1),
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

  const getHandoutColumn = (handoutItem, label, index) => handoutItem && (
    <ul className={classes.handout}>
      {index === 0 && (
        <li className={classes.handoutLabel}>
          {label}
        </li>
      )}
      <li className={classes.handoutText}>
        {label === "Created" ? moment(handoutItem).format("MMM Do YYYY") : handoutItem}
      </li>
    </ul>
  );

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
      <Typography
        variant="h5"
        color="textPrimary"
        className={classes.title}
      >
        This page is used to view your handouts.
      </Typography>
      <Card variant="outlined" className={classes.handoutCard}>
        <CardContent>
          {
            handouts.length
              ? handouts.map((item, index) => (
                <div className={classes.handoutContainer}>
                  {getHandoutColumn(item?.filename, "Filename", index)}
                  {getHandoutColumn(item?.created, "Created", index)}
                  {getHandoutColumn(item?.createdBy, "createdBy", index)}
                </div>
              ))
              : <Typography>No handouts found...</Typography>
          }
        </CardContent>
      </Card>
    </div>
  );
};

export default Handouts;

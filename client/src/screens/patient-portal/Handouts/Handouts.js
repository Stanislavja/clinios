import React, { useState, useEffect, useCallback } from "react";

import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

import PatientPortalService from "../../../services/patient_portal/patient-portal.service";
import HandoutDocumentViewer from "./components/modal/HandoutDocumentViewer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  subTitle: {
    marginBottom: theme.spacing(3.5),
  },
  handoutContainer: {
    display: "flex",
  },
  handoutCard: {
    marginTop: theme.spacing(2.5),
  },
  handout: {
    display: "flex",
    flexDirection: "column",
    listStyle: "none",
    marginRight: theme.spacing(3.2),
  },
  handoutText: {
    fontSize: "13px",
    display: "flex",
    justifyContent: "space-between",
    listStyle: "none",
    padding: theme.spacing(0),
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
  const [isOpen, setIsOpen] = useState(false);
  const [filePath, setFilePath] = useState("");

  const fetchHandouts = useCallback(() => {
    PatientPortalService.getHandouts().then((res) => {
      setHandouts(res.data);
    });
  }, []);

  useEffect(() => {
    fetchHandouts();
  }, [fetchHandouts]);

  const getHandoutColumn = (handoutItem, label, index, fileName) => handoutItem && (
    <ul className={classes.handout}>
      {index === 0 && (
        <li className={classes.handoutLabel}>
          {label}
        </li>
      )}
      <li
        className={classes.handoutText}
      >
        <Typography
          variant="body1"
          color="textPrimary"
          onClick={() => {
            setFilePath(`${process.env.REACT_APP_API_URL}static/patient/${fileName}`);
            setIsOpen(true);
          }}
        >
          {label === "Created" ? moment(handoutItem).format("MMM Do YYYY") : handoutItem}
        </Typography>
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
        className={classes.subTitle}
      >
        This page is used to view handouts from your provider.
      </Typography>
      {
        handouts.length
          ? handouts.map((item, index) => (
            <div className={classes.handoutContainer}>
              {getHandoutColumn(item?.filename, "Filename", index, item?.fileName)}
              {getHandoutColumn(item?.created, "Created", index, item?.fileName)}
            </div>
          ))
          : <Typography>No handouts found...</Typography>
      }

      {filePath && (
        <HandoutDocumentViewer
          filePath={filePath}
          isOpen={isOpen}
          hendleOnClose={() => setIsOpen(false)}
        />
      )}

    </div>
  );
};

export default Handouts;

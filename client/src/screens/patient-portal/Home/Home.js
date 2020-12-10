import React, { useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Alert } from "@material-ui/lab";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";
import HomeService from "../../../services/patient_portal/home.service";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  Logo: {
    backgroundColor: "grey",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "transparent",
    color: theme.palette.text.secondary,
  },
  BoxStyle: {
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.borderColor,
    borderWidth: "1px",
    borderStyle: "solid",
    padding: "7px",
    margin: "10px 0",
  },
  formBox: {
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.borderColor,
    borderWidth: "1px",
    borderStyle: "solid",
    padding: "7px",
    margin: "5px 0 40px 0",
  },
  pageTitle: {
    marginBottom: 0,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  withErrors: {
    opacity: 0.9,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Home = () => {
  const classes = useStyles();
  const [header, setHeader] = useState({});
  const { lastVisitedPatient } = useAuth();
  const [clientForms, setClientForms] = useState({});
  const [upcomingAppointment, setUpcomingAppointment] = useState({});


  useEffect(() => {
    HomeService.getClientHeader(lastVisitedPatient).then(
      (response) => {
        setHeader(response.data[0]);
      },
      (error) => {
        console.error("error", error);
      },
    );
    HomeService.getClientForms(lastVisitedPatient).then(
      (response) => {
        setClientForms(response.data[0]);
      },
      (error) => {
        console.error("error", error);
      },
    );
    HomeService.getUpcomingAppointments(lastVisitedPatient).then(
      (response) => {
        setUpcomingAppointment(response.data[0]);
      },
      (error) => {
        console.error("error", error);
      },
    );
  }, [lastVisitedPatient]);

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Alert icon={false} variant="filled" severity="info">
          {header && ReactHtmlParser(header.header)}
        </Alert>
        {upcomingAppointment && (
          <Box component="div" className={classes.BoxStyle}>
            <p>
              Appointment Scheduled with
              {" "}
              {upcomingAppointment.provider}
              {" "}
              on
              {" "}
              {moment(upcomingAppointment.start_dt).format(
                "MMM Do YYYY, h:mm a",
              )}
              {" "}
              -
              {" "}
              {moment(upcomingAppointment.end_dt).format("h:mm  a")}
            </p>
          </Box>
        )}

        {clientForms && (
          <Box component="div" className={classes.formBox}>
            <p>
              Please fill out the following forms:
              {" "}
              <Link to="/">{clientForms.title}</Link>
            </p>
          </Box>
        )}

        <Typography component="h1" variant="h2" className={classes.pageTitle}>
          Portal Home
        </Typography>
        <Typography component="p" variant="body2">
          Welcome to patient portal
        </Typography>
      </div>
    </Container>
  );
};

export default Home;

import React, { useState } from "react";

import {
  makeStyles, Grid, TextField, Typography, MenuItem, Button,
} from "@material-ui/core";
import moment from "moment";

import { timings, appointments } from "../../../static/patient-portal/appointments";
import Calendar from "./Calendar";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  inputFix: {
    marginBottom: theme.spacing(1),
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  calendarContainer: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: 5,
    boxShadow: "-1px 0px 19px -4px rgba(0,17,1,0.45)",
  },
  timingBox: {
    marginBottom: theme.spacing(2),
    minHeight: 50,

    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(1),
      minHeight: 40,
    },
  },
  currentDate: {
    paddingBottom: theme.spacing(4.75),

    [theme.breakpoints.down("md")]: {
      paddingBottom: theme.spacing(2),
    },
  },
}));

const Appointments = () => {
  const classes = useStyles();
  const [showCalendar, setShowCalendar] = useState(false);
  const [userSelection, setUserSelection] = useState({
    practitioner: "",
    appointmentType: "",
    date: null,
    time: null,
  });

  const onFormSubmit = (e) => {
    e.preventDefault();
    setShowCalendar(true);
  };

  const calendarSelectionHandler = (type, value) => {
    setUserSelection({
      ...userSelection,
      [type]: value,
    });
  };

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Appointments
      </Typography>
      {!showCalendar
        ? (
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <form onSubmit={onFormSubmit}>
              <TextField
                select
                required
                variant="outlined"
                label="Select Practitioner"
                margin="dense"
                fullWidth
                value={userSelection.practitioner}
                className={classes.inputFix}
                onChange={(e) => calendarSelectionHandler("practitioner", e.target.value)}
              >
                {appointments.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                required
                variant="outlined"
                label="Select Appointment Type"
                margin="dense"
                fullWidth
                value={userSelection.appointmentType}
                className={classes.inputFix}
                onChange={(e) => calendarSelectionHandler("appointmentType", e.target.value)}
              >
                {appointments.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Grid
                container
                justify="center"
              >
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  className={classes.submitBtn}
                >
                  Submit
                </Button>
              </Grid>
            </form>
          </Grid>
        )
        : (
          <>
            <Typography
              variant="h5"
              color="textPrimary"
              className={classes.title}
            >
              Please select a date and time
            </Typography>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <Grid
                container
                className={classes.calendarContainer}
                spacing={3}
              >
                <Grid item lg={9} md={9} sm={9} xs={9}>
                  <Calendar
                    events={
                      userSelection.date
                        ? [{ title: "Selected", date: userSelection.date }]
                        : []
                    }
                    onDayClick={(val) => calendarSelectionHandler("date", val)}
                    onEventClick={(val) => calendarSelectionHandler("date", val)}
                  />
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={3}>
                  <Typography
                    variant="h4"
                    component="h1"
                    color="textPrimary"
                    className={classes.currentDate}
                  >
                    {userSelection.date
                      ? moment(userSelection.date).format("dddd, DD")
                      : moment().format("dddd, DD")}
&nbsp;
                    {userSelection.time}
                  </Typography>
                  {
                    timings.map((timing) => (
                      <Button
                        key={timing.label}
                        onClick={() => calendarSelectionHandler("time", timing.value)}
                        className={classes.timingBox}
                        variant={userSelection.time === timing.value ? "contained" : "outlined"}
                        color="primary"
                        fullWidth
                      >
                        {timing.label}
                      </Button>
                    ))
                  }
                </Grid>
              </Grid>
              <Grid
                container
                justify="center"
              >
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  className={classes.submitBtn}
                >
                  Book Appointment
                </Button>
              </Grid>
            </Grid>
          </>
        )}
    </div>
  );
};

export default Appointments;

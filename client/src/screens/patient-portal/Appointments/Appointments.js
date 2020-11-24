import React, { useState, useEffect, useCallback } from "react";

import {
  makeStyles, Grid, TextField, Typography, MenuItem, Button,
} from "@material-ui/core";
import moment from "moment";
import { useSnackbar } from "notistack";

import PatientPortalService from "../../../services/patient_portal/patient-portal.service";
import { timings } from "../../../static/patient-portal/appointments";
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
  const { enqueueSnackbar } = useSnackbar();
  const [practitioners, setPractitioners] = useState([]);
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [userSelection, setUserSelection] = useState({
    practitioner: "",
    appointmentType: "",
    date: null,
    time: null,
  });

  const fetchPractitioners = useCallback(() => {
    PatientPortalService.getPractitioners().then((res) => {
      setPractitioners(res.data);
    });
  }, []);

  useEffect(() => {
    fetchPractitioners();
  }, [fetchPractitioners]);

  const calendarSelectionHandler = (type, value) => {
    setUserSelection({
      ...userSelection,
      [type]: value,
    });
    if (type === "practitioner") {
      const reqBody = {
        data: {
          practitioner_id: value,
        },
      };
      PatientPortalService.getAppointmentTypesByPractitionerId(reqBody).then((res) => {
        setAppointmentTypes(res.data);
      });
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    setShowCalendar(true);
  };

  const bookAppointmentHandler = () => {
    const selectedPractitioner = practitioners.filter((x) => x.user_id === userSelection.practitioner);
    if (!!userSelection.time && userSelection.date) {
      const reqBody = {
        data: {
          provider: {
            ...selectedPractitioner[0],
          },
          ApptStatus: "R",
          start_dt: `${moment(userSelection.date).format("YYYY-MM-DD")} ${userSelection.time.split("am")[0]}`,
          end_dt: `${moment(userSelection.date).format("YYYY-MM-DD")} ${userSelection.time.split("am")[0]}`,
        },
      };
      PatientPortalService.bookAppointment(reqBody).then((res) => {
        setTimeout(() => {
          setShowCalendar(false);
          setUserSelection({
            ...userSelection,
            practitioner: "",
            appointmentType: "",
            date: null,
            time: null,
          });
        }, 2000);
        enqueueSnackbar(res.message, {
          variant: "success",
        });
      });
    } else {
      enqueueSnackbar("Date & Time selection is required", {
        variant: "error",
      });
    }
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
                {practitioners.map((option) => (
                  <MenuItem key={option.user_id} value={option.user_id}>
                    {option.name}
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
                disabled={!appointmentTypes.length}
              >
                {appointmentTypes.map((option) => (
                  <MenuItem key={option.length} value={option.length}>
                    {option.appointment_type}
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
                  onClick={() => bookAppointmentHandler()}
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

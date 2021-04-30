import React, { useState, useEffect, useCallback } from "react";

import {
  makeStyles, Grid, TextField, Typography, MenuItem, Button, Box,
} from "@material-ui/core";
import BackIcon from "@material-ui/icons/ArrowBack";
import WarningIcon from "@material-ui/icons/Warning";
import Alert from "@material-ui/lab/Alert";
import moment from "moment";
import { useSnackbar } from "notistack";
import { useHistory, useLocation } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";
import useDidMountEffect from "../../../hooks/useDidMountEffect";
import PatientPortalService from "../../../services/patient_portal/patient-portal.service";
import { getDatesArray } from "../../../utils/helpers";
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
    width: 400,
  },
  submitBtn: {
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
    paddingBottom: theme.spacing(5),

    [theme.breakpoints.down("md")]: {
      paddingBottom: theme.spacing(2),
    },
  },
  ml1: {
    marginLeft: theme.spacing(1),
  },
  noWrap: {
    [theme.breakpoints.up("md")]: {
      whiteSpace: "nowrap",
    },
  },
  centerContainer: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  errorIcon: {
    position: "relative",
    top: 5,
  },
}));

const currentDate = moment().format("YYYY-MM-DD");
const oneYear = moment().add(365, "days").format("YYYY-MM-DD");
const availableDates = getDatesArray(currentDate, oneYear).map((date) => ({

  title: "Available",
  date,
  backgroundColor: "#008B00",

}));

const Appointments = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const { user } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [practitioners, setPractitioners] = useState([]);
  const [practitionerDateTimes, setPractitionerDateTimes] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [filteredTimeSlots, setFilteredTimeSlots] = useState([]);
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [appointmentLength, setAppointmentLength] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [userSelection, setUserSelection] = useState({
    practitioner: "",
    appointmentType: "",
    date: null,
    time: null,
  });
  const [isRescheduleAppointment, setIsRescheduleAppointment] = useState(false);
  const location = useLocation();

  const fetchPractitioners = useCallback(() => {
    PatientPortalService.getPractitioners().then((res) => {
      setPractitioners(res.data);
    });
  }, []);

  const fetchBookedAppointments = useCallback(() => {
    PatientPortalService.getBookedAppointments().then((res) => {
      const response = res.data;
      if (response.length) {
        const appts = response.map((booking) => ({
          start_time: moment(booking.start_dt).format("hh:mm"),
          end_time: moment(booking.end_dt).format("hh:mm"),
          ...booking,
        }));
        setBookedAppointments(appts);
      }
    });
  }, []);

  const fetchPractitionersAvailableDates = useCallback((practitionerId) => {
    PatientPortalService.getPractitionerDates().then((res) => {
      const resData = res.data;
      const filtered = resData.filter((x) => x.user_id === practitionerId);
      setPractitionerDateTimes([...filtered]);
    });
  }, []);

  useEffect(() => {
    const appointment = location?.state?.appointment;
    if (appointment?.patient_id) {
      const date = moment(appointment.start_dt).format("YYYY-MM-DD");
      const minutesFromStartDate = moment(appointment.start_dt).minutes();
      const time = `${moment(appointment.start_dt).hours()}:${minutesFromStartDate < 10
        ? `0${minutesFromStartDate}`
        : minutesFromStartDate}am`;
      setUserSelection((prevUserSelection) => ({
        ...prevUserSelection,
        ...appointment,
        appointmentType: appointment.appointment_type_id,
        date,
        time,
        practitioner: appointment?.user_id,
      }));
      setIsRescheduleAppointment(true);
      setShowCalendar(true);
    }
  }, [location?.state]);

  useEffect(() => {
    fetchPractitioners();
    fetchBookedAppointments();
  }, [fetchPractitioners, fetchBookedAppointments]);

  const calendarSelectionHandler = (date) => {
    let value;
    if (date?.event) { // event clicked
      value = moment(date.event._instance.range.start).format("YYYY-MM-DD");
    } else { // day clicked
      value = date;
    }

    const type = "date";
    setErrorMessage("");
    const selectedDay = moment(value, "YYYY-MM-DD HH:mm:ss").format("dddd");
    const isAvailable = practitionerDateTimes[0][selectedDay.toLowerCase()];
    if (isAvailable) {
      setUserSelection({
        ...userSelection,
        [type]: value,
      });
      // filter time slots for selected date
      // eslint-disable-next-line max-len
      const selectedDates = bookedAppointments.filter((x) => moment(x.start_dt).format("YYYY-MM-DD") === value);
      const selectedTimes = selectedDates.map((time) => ({
        startTime: time.start_time,
        endTime: time.end_time,
      }));
      const timeSlotMap = timeSlots.map((slot) => ({
        startTime: moment(slot.split("-")[0].trim(), ["HH.mm"]).format("hh:mm"),
        endTime: moment(slot.split("-")[1].trim(), ["HH.mm"]).format("hh:mm"),
      }));
      // eslint-disable-next-line max-len
      const filteredSlots = timeSlotMap.filter((ar) => !selectedTimes.find((rm) => (rm.startTime === ar.startTime || ar.endTime === rm.endTime)));
      // console.log({
      //   selectedDates, selectedTimes, filteredSlots
      // })
      setFilteredTimeSlots([...filteredSlots]);
      if (!filteredSlots.length) {
        setErrorMessage("There are no open times on this day.");
      }
    } else {
      setErrorMessage(`There are no open times on ${selectedDay}.`);
      const time = "time";
      setUserSelection({
        ...userSelection,
        [type]: null,
        [time]: null,
      });
    }
  };

  const userSelectionHandler = (type, value) => {
    setUserSelection({
      ...userSelection,
      [type]: value,
    });
    if (type === "practitioner") {
      const practitionerId = value;
      const reqBody = {
        data: {
          practitioner_id: practitionerId,
        },
      };
      PatientPortalService.getAppointmentTypesByPractitionerId(reqBody).then((res) => {
        setAppointmentTypes(res.data);
      });
      fetchPractitionersAvailableDates(practitionerId);
    }
    if (type === "appointmentType") {
      let apptLength = appointmentTypes.find((item) => item.id === value)?.length;
      apptLength = apptLength === 45 ? 60 : apptLength;
      setAppointmentLength(apptLength);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    setShowCalendar(true);
  };

  const appointmentBookingHandler = () => {
    const selectedPractitioner = practitioners.filter((x) => x.user_id === userSelection.practitioner);
    let selectedAppointemntTypeLength = userSelection?.appointment_type_length || 0;
    if (!selectedAppointemntTypeLength) {
      selectedAppointemntTypeLength = appointmentTypes
        ?.find((item) => item.id === userSelection.appointmentType)?.length;
    }

    if (!!userSelection.time && userSelection.date) {
      const reqBody = {
        data: {
          user_id: selectedPractitioner?.[0]?.user_id,
          // do something with app status because it's going to server each time.
          ...(!isRescheduleAppointment && { status: "R" }),
          start_dt: `${moment(userSelection.date).format("YYYY-MM-DD")} ${userSelection.time.time_start}`,
          end_dt: `${moment(userSelection.date).format("YYYY-MM-DD")} ${userSelection.time.time_end}`,
          patient_id: user?.id,
          reschedule: isRescheduleAppointment,
          appointment_type_id: userSelection.appointmentType,
        },
      };
      PatientPortalService[isRescheduleAppointment
        ? "updateAppointment"
        : "bookAppointment"](reqBody, userSelection?.id).then(() => {
          setTimeout(() => {
            setShowCalendar(false);
            setAppointmentTypes([]);
            setUserSelection({
              ...userSelection,
              practitioner: "",
              appointmentType: "",
              date: null,
              time: null,
            });
            history.push({
              pathname: "/patient/appointments/confirmation",
              state: {
                practitioner: selectedPractitioner?.[0]?.name,
                appointmentLength: selectedAppointemntTypeLength,
                date: userSelection?.date,
                time: userSelection?.time,
                reschedule: isRescheduleAppointment,
              },
            });
          }, 1000);
          enqueueSnackbar(
            `Appointment ${isRescheduleAppointment ? "rescheduled" : "requested"} successfully`, {
            variant: "success",
          },
          );
        });
    } else {
      setErrorMessage("Date & Time selection is required");
    }
  };

  /* eslint-disable */
  const makeTimeIntervals = (startTime, endTime, increment) => {
    startTime = startTime.toString().split(":");
    endTime = endTime.toString().split(":");
    increment = parseInt(increment, 10);

    var pad = (n) => { return (n < 10) ? "0" + n.toString() : n; },
      startHr = parseInt(startTime[0], 10),
      startMin = parseInt(startTime[1], 10),
      endHr = parseInt(endTime[0], 10),
      currentHr = startHr,
      currentMin = startMin,
      previous = pad(currentHr) + ":" + pad(currentMin),
      current = "",
      r = [];

    do {
      currentMin += increment;
      if ((currentMin % 60) === 0 || currentMin > 60) {
        currentMin = (currentMin === 60) ? 0 : currentMin - 60;
        currentHr += 1;
      }
      current = currentHr + ":" + pad(currentMin);
      r.push(previous + " - " + current);
      previous = current;
    } while (currentHr !== endHr);

    return r;
  };
  /* eslint-enable */

  useDidMountEffect(() => {
    if (practitionerDateTimes.length && appointmentLength) {
      let timeIntervalSlots = [];
      practitionerDateTimes.forEach((item) => {
        const slots = makeTimeIntervals(item.time_start, item.time_end, appointmentLength);
        timeIntervalSlots = [...timeIntervalSlots, ...slots];
      });
      setTimeSlots([...timeIntervalSlots]);
    }
  }, [practitionerDateTimes, appointmentLength]);

  const getTimingLabel = (timing) => {
    const start = timing.startTime;
    const end = timing.endTime;
    const startTime = moment(start, ["HH.mm"]).format("hh:mm A");
    const endTime = moment(end, ["HH.mm"]).format("hh:mm A");
    return `${startTime} - ${endTime}`;
  };

  const getCalendarEvents = useCallback(() => {
    const events = [...availableDates];
    const userSelectionDate = userSelection.date
      ? [{ title: "Selected", date: userSelection.date }]
      : [];
    return [...events, ...userSelectionDate];
  }, [userSelection.date]);

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
                onChange={(e) => userSelectionHandler("practitioner", e.target.value)}
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
                onChange={(e) => userSelectionHandler("appointmentType", e.target.value)}
                disabled={!appointmentTypes.length}
              >
                {appointmentTypes.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {`${option.appointment_type} - ${option.length} minutes - $${option.fee}`}
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
          practitionerDateTimes.length
            ? (
              <>
                <Typography
                  variant="h5"
                  color="textPrimary"
                  className={classes.title}
                >
                  Please select a date and time
                </Typography>
                <Grid container spacing={5}>
                  <Grid item lg={8} md={9} sm={12} xs={12}>
                    <Grid
                      container
                      className={classes.calendarContainer}
                      spacing={3}
                    >
                      <Grid item lg={9} md={9} sm={9} xs={9}>
                        <Calendar
                          events={getCalendarEvents()}
                          onDayClick={(val) => calendarSelectionHandler(val)}
                          onEventClick={(val) => calendarSelectionHandler(val)}
                        />
                      </Grid>
                      <Grid item lg={3} md={3} sm={3} xs={3}>
                        <Typography
                          variant="h4"
                          component="h1"
                          color="textPrimary"
                          className={classes.currentDate}
                        >
                          <span className={classes.noWrap}>
                            {userSelection.date
                              ? moment(userSelection.date).format("dddd, MMM DD YYYY")
                              : moment().format("dddd, MMM DD YYYY")}
                          </span>
                        </Typography>
                        {
                          userSelection?.date && filteredTimeSlots.map((timing, index) => (
                            <Button
                              key={`${timing.startTime}-${timing.endTime}`}
                              onClick={() => {
                                const timingObject = {
                                  id: index,
                                  time_start: timing.startTime,
                                  time_end: timing.endTime,
                                };
                                userSelectionHandler("time", timingObject);
                              }}
                              className={classes.timingBox}
                              variant={userSelection.time?.id === index ? "contained" : "outlined"}
                              color="primary"
                              fullWidth
                            >
                              {getTimingLabel(timing)}
                            </Button>
                          ))
                        }
                      </Grid>
                    </Grid>
                  </Grid>
                  {Boolean(errorMessage.length) && (
                    <Grid item lg={4} md={3}>
                      <Alert severity="error" icon={<WarningIcon fontSize="inherit" />}>
                        {errorMessage}
                      </Alert>
                    </Grid>
                  )}
                </Grid>
                <Box mt={3}>
                  <Grid item md={8}>
                    <Grid
                      container
                      justify="space-between"
                      alignItems="center"
                    >
                      <Button
                        type="submit"
                        variant="outlined"
                        onClick={() => setShowCalendar((prevState) => !prevState)}
                        startIcon={<BackIcon />}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        className={classes.submitBtn}
                        onClick={() => appointmentBookingHandler()}
                      >
                        {isRescheduleAppointment ? "Reschedule Appointment" : "Book Appointment"}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </>
            ) : (
              <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
                className={classes.centerContainer}
              >
                <Typography variant="h3" gutterBottom>
                  No time slots available for this practitioner
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => setShowCalendar(false)}
                >
                  Select Practitioner
                </Button>
              </Grid>
            )
        )}
    </div>
  );
};

export default Appointments;

import React, { useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import clsx from "clsx";
import moment from "moment";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import useDebounce from "./../../../../../hooks/useDebounce";
import * as API from "./../../../../../utils/API";
import useAuth from "../../../../../hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.primary.light,
    "& h2": {
      color: "#fff",
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1 / 2),
    top: theme.spacing(1 / 2),
    color: "#ffffff",
  },
  content: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: "18px",
  },
  formControl: {
    width: "100%",
    color: theme.palette.text.secondary,
    "& .MuiSelect-select": {
      minWidth: 220,
    },
  },
  datePickers: {
    display: "flex",
    marginTop: theme.spacing(2),
  },
  startdatePicker: {
    marginRight: theme.spacing(2),
    maxWidth: "165px",
  },
  statuses: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  statusList: {
    flexDirection: "row",
  },
  textArea: {
    height: "100px !important",
    width: "100%",
    padding: "5px",
  },
  patientListCard: {
    position: "absolute",
    width: "100%",
    top: "54px",
  },
  contentWithLoading: {
    opacity: "0.5",
  },
  patientListContent: {
    padding: 0,
    "&:last-child": {
      padding: 0,
    },
  },
  modalAction: {
    borderTop: `1px solid ${theme.palette.background.default}`,
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  patientLink: {
    cursor: "pointer",
    color: theme.palette.text.link,
  },
  appointmentLength: {
    maxWidth: "150px",
    margin: "15px 5px 0",
  },
}));

const NewOrEditEvent = ({
  isOpen,
  onClose,
  selectedDate,
  selectedProvider,
  onEventUpdate,
  onSave,
  isNewEvent,
  isLoading,
  ...props
}) => {
  const { appointments, providers, errors } = props;
  const classes = useStyles();
  const history = useHistory();
  // const { providers, errors } = props;
  // const [provider, setProvider] = React.useState("");
  const [patients, setPatients] = React.useState([]);
  const [selectedPatient, setSelectedPatient] = React.useState("");
  const [patientSearchTerm, setPatientSearchTerm] = useState("");
  const [calEvent, setCalEvent] = useState("");
  const [appointmentLength, setAppointmentLeangth] = useState(" ");
  const [appointmentLengthDays, setAppointmentLengthDays] = useState(" ");
  const [currentDayLength, setCurrentDayLength] = useState(" ");
  const [errorText, setErrorText] = useState({
    title: "",
    patient: "",
    error: "",
  });
  // const user = JSON.parse(localStorage.getItem("user"));
  // const index = providers.findIndex((provider) => provider.id === user.id);
  const [indexP, setIndex] = useState(0);
  const [provider, setProvider] = React.useState(providers[indexP]);
  const { user } = useAuth();

  const calculateLength = async () => {
    const length = await moment(calEvent.end_dt).diff(calEvent.start_dt, "minutes");
    const length2 = await moment(calEvent.end_dt).diff(calEvent.start_dt, "days");
    const lengthFromCuurrentDay = await moment(calEvent.start_dt).diff(moment(), "days");
    setCurrentDayLength(lengthFromCuurrentDay);
    setAppointmentLengthDays(length2);
    setAppointmentLeangth(length);
  };
  useEffect(() => {
    if (isNewEvent) {
      setCalEvent("");
      setProvider("selectedProvider");
      setPatientSearchTerm("");
    } else {
      setCalEvent(props.event);
      setPatientSearchTerm(`${props.event.firstname} ${props.event.firstname}`);
      setProvider(selectedProvider);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.event, isNewEvent]);
  /* eslint-enable */
  const handleOnChange = (event) => {
    setCalEvent({
      ...calEvent,
      [event.target.name]: event.target.value,
    });
  };

  const debouncedSearchTerm = useDebounce(patientSearchTerm, 500);
  useEffect(() => {
    calculateLength(calEvent.end_dt);
    // eslint-disable-next-line
  }, [calEvent]);
  /* eslint-enable */

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        // Fire off our API call
        API.search(debouncedSearchTerm).then(
          (response) => {
            const { data } = response;
            setPatients(data);
          },
          (error) => {
            console.error("search error", error);
          }
        );
      } else {
        setPatients([]);
        setSelectedPatient("");
      }
    },
    // This is the useEffect input array
    // Our useEffect function will only execute if this value changes ...
    // ... and thanks to our hook it will only change if the original ...
    // value (searchTerm) hasn't changed for more than 500ms.
    [debouncedSearchTerm]
  );

  const handlePatientChange = (_, patient) => {
    const sp = patients.filter((p) => p.id === patient.id);
    setSelectedPatient(sp[0]);
    setPatientSearchTerm(`${patient.firstname} ${patient.lastname}`);
  };
  const handleProviderChange = (event) => {
    const pd = providers.filter((p) => p.id === event.target.value);
    setProvider(pd[0]);
  };

  const handleSaveOrUpdate = () => {
    const submitData = () => {
      if (isNewEvent) {
        const payload = {
          data: {
            title: calEvent.title,
            provider: provider === "selectedProvider" ? providers[indexP] : provider,
            patient: selectedPatient,
            ApptStatus: calEvent.status,
            notes: calEvent.notes,
            start_dt: calEvent.start_dt,
            end_dt: calEvent.end_dt,
          },
        };
        onSave(payload);
      } else {
        /* eslint-disable */
        const payload = {
          data: {
            id: props.event.id,
            title: calEvent.title,
            providerName: calEvent.provider_name,
            provider: provider,
            patient: selectedPatient
              ? selectedPatient
              : {
                  id: props.event.patient_id,
                  firstname: props.event.firstname,
                  email: props.event.email,
                },
            ApptStatus: calEvent.status,
            notes: calEvent.notes,
            old_start_dt: moment(props.event.start_dt).format("YYYY-MM-DD HH:mm"),
            old_end_dt: moment(props.event.end_dt).format("YYYY-MM-DD HH:mm"),
            new_start_dt: moment(calEvent.start_dt).format("YYYY-MM-DD HH:mm"),
            new_end_dt: moment(calEvent.end_dt).format("YYYY-MM-DD HH:mm"),
          },
        };
        /* eslint-enable */
        onEventUpdate(payload);
      }
    };
    const existPatientID = appointments
      .map((appointment) => selectedPatient.id === appointment.patient_id)
      .includes(true);
    const startTimeExist = appointments
      // eslint-disable-next-line
      .map((appointment) => calEvent.start_dt == appointment.start_dt)
      .includes(true);
    if (!calEvent.title || selectedPatient.length === 0) {
      if (!calEvent.title && selectedPatient.length === 0) {
        setErrorText({
          ...errorText,
          title: "Enter your title",
          patient: "Please select from here",
        });
      } else {
        if (!calEvent.title) {
          setErrorText({
            ...errorText,
            title: "Enter your title",
            patient: "",
          });
        }
        if (selectedPatient.length === 0) {
          setErrorText({
            ...errorText,
            patient: "Please select from here",
            title: "",
          });
        }
      }
    } else if (existPatientID) {
      if (startTimeExist) {
        setErrorText({ ...errorText, error: "This time is not available" });
      } else {
        submitData();
      }
    } else {
      submitData();
    }
  };

  useEffect(() => {
    const index2 = providers.findIndex((provider) => provider.id === user.id);
    setIndex(index2);
  }, [providers, user]);

  return (
    <Dialog 
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className={classes.title}>
        {isNewEvent ? `New Appointment - ${moment(selectedDate).format("YYYY.MM.DD")}` : "Edit Appointment"}
        {onClose ? (
          <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent className={classes.content}>
        {isLoading && (
          <div
            style={{
              textAlign: "center",
            }}
          >
            <CircularProgress />
          </div>
        )}
        <div
          className={clsx({
            [classes.modalConentBelow]: true, //always apply
            [classes.contentWithLoading]: isLoading, //only when isLoading === true
          })}
        >
          <DialogContentText id="alert-dialog-description">
            This page is used to create a new appointment
          </DialogContentText>
          {errors &&
            errors.map((error, index) => (
              <Alert severity="error" key={index}>
                {error.msg}
              </Alert>
            ))}
          <div className={classes.root}>
            <FormControl component="div" className={classes.formControl}>
              <TextField
                value={calEvent.title}
                variant="outlined"
                margin="normal"
                size="small"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                autoFocus
                onChange={(event) => handleOnChange(event)}
                error={errorText.title.length > 0}
                helperText={errorText.title.length > 0 && errorText.title}
              />
            </FormControl>
            <div className={classes.datePickers}>
              <KeyboardDatePicker
                className={classes.startdatePicker}
                ampm={false}
                clearable
                id="start-date-picker-inline"
                label="Start Date"
                value={calEvent.start_dt}
                variant="inline"
                onChange={(date) => {
                  let property = "start_dt";
                  setCalEvent({
                    ...calEvent,
                    [property]: date,
                  });
                }}
                minDate={new Date()}
                disablePast
                format="EE LLL d y"
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardDatePicker
                clearable
                className={classes.startdatePicker}
                ampm={false}
                variant="outlined"
                id="start-date-picker-inline"
                label="End Date"
                value={calEvent.end_dt}
                onChange={(date) => {
                  let property = "end_dt";
                  setCalEvent({
                    ...calEvent,
                    [property]: date,
                  });
                  calculateLength(date);
                }}
                minD
                ate={new Date()}
                disablePast
                format="EE LLL d y"
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <Button
                style={{
                  whiteSpace: "nowrap",
                  maxHeight: "30px",
                  marginTop: "15px",
                }}
                variant="contained"
                disableElevation
                onClick={async () => {
                  await setCalEvent({
                    ...calEvent,
                    start_dt: moment(calEvent.start_dt).add(1, "days"),
                    end_dt: moment(calEvent.start_dt).add(1, "days"),
                  });
                }}
              >
                Add day
              </Button>
              <Button
                variant="contained"
                style={{
                  whiteSpace: "nowrap",
                  maxHeight: "30px",
                  marginTop: "15px",
                }}
                disableElevation
                onClick={async () => {
                  await setCalEvent({
                    ...calEvent,
                    start_dt: moment(calEvent.start_dt).subtract(1, "days"),
                    end_dt: moment(calEvent.end_dt).subtract(1, "days"),
                  });
                }}
              >
                Subtract Day
              </Button>
            </div>
            <div className={classes.datePickers}>
              <KeyboardTimePicker
                className={classes.startdatePicker}
                ampm={false}
                clearable
                id="start-date-picker-inline"
                label="Start Time"
                value={calEvent.start_dt}
                placeholder="2020/10/10 10:00"
                onChange={(date) => {
                  let property = "start_dt";
                  setCalEvent({
                    ...calEvent,
                    [property]: date,
                  });
                }}
                minDate={new Date()}
                disablePast
                format="HH:mm a"
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardTimePicker
                clearable
                ampm={false}
                variant="outlined"
                id="start-date-picker-inline"
                label="End Time"
                value={calEvent.end_dt}
                placeholder="2020/10/10 11:00"
                onChange={(date) => {
                  let property = "end_dt";
                  setCalEvent({
                    ...calEvent,
                    [property]: date,
                  });
                  calculateLength(date);
                }}
                minD
                ate={new Date()}
                disablePast
                format="HH:mm a"
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <span style={{ whiteSpace: "nowrap", marginLeft: "5px", marginTop: "15px" }}>Set to</span>
              <Button
                style={{
                  whiteSpace: "nowrap",
                  maxHeight: "30px",
                  marginTop: "15px",
                }}
                disableElevation
                onClick={async () => {
                  await setCalEvent({
                    ...calEvent,
                    end_dt: moment(calEvent.start_dt).add(15, "minutes"),
                  });
                }}
              >
                15 min
              </Button>
              <Button
                style={{
                  whiteSpace: "nowrap",
                  maxHeight: "30px",
                  marginTop: "15px",
                }}
                disableElevation
                onClick={async () => {
                  await setCalEvent({
                    ...calEvent,
                    end_dt: moment(calEvent.end_dt).add(30, "minutes"),
                  });
                }}
              >
                30 min
              </Button>
              <Button
                style={{
                  whiteSpace: "nowrap",
                  maxHeight: "30px",
                  marginTop: "15px",
                }}
                disableElevation
                onClick={async () => {
                  await setCalEvent({
                    ...calEvent,
                    end_dt: moment(calEvent.end_dt).add(45, "minutes"),
                  });
                }}
              >
                45 min
              </Button>
              <Button
                style={{
                  whiteSpace: "nowrap",
                  maxHeight: "30px",
                  marginTop: "15px",
                }}
                disableElevation
                onClick={async () => {
                  await setCalEvent({
                    ...calEvent,
                    end_dt: moment(calEvent.end_dt).add(60, "minutes"),
                  });
                }}
              >
                60 min
              </Button>
            </div>
            <TextField
              value={appointmentLengthDays}
              variant="outlined"
              margin="dense"
              className={classes.appointmentLength}
              size="small"
              id="appointmentLength"
              label="Length days"
              name="appointmentLength"
              autoComplete="appointmentLength"
              onChange={(event) => handleOnChange(event)}
              disabled
              defaultValue={`${appointmentLengthDays === 0 ? "Same day" : `${appointmentLength} day`}`}
            />
            <TextField
              value={appointmentLength}
              variant="outlined"
              margin="dense"
              className={classes.appointmentLength}
              size="small"
              id="appointmentLength"
              label="Length minutes"
              name="appointmentLength"
              autoComplete="appointmentLength"
              onChange={(event) => handleOnChange(event)}
              disabled
            />
            <TextField
              value={currentDayLength}
              variant="outlined"
              margin="dense"
              className={classes.appointmentLength}
              size="small"
              id="appointmentLength"
              label="In days"
              name="appointmentLength"
              autoComplete="appointmentLength"
              onChange={(event) => handleOnChange(event)}
              disabled
              defaultValue={`${currentDayLength === 0 ? "Today" : `In ${appointmentLength} days`}`}
            />
            <FormControl className={classes.statuses}>
              <FormLabel component="legend">Status</FormLabel>
              <RadioGroup
                aria-label="status"
                name="status"
                value={calEvent.status ? calEvent.status : "R"}
                onChange={(event) => handleOnChange(event)}
                className={classes.statusList}
              >
                <FormControlLabel value="R" control={<Radio />} label="Requested" />
                <FormControlLabel value="A" control={<Radio />} label="Approved" />
                <FormControlLabel value="D" control={<Radio />} label="Declined" />
              </RadioGroup>
            </FormControl>
            <FormControl variant="outlined" size="small" className={classes.formControl}>
              <InputLabel id="provider-select-outlined-label">Provider</InputLabel>
              <Select
                labelId="provider-select-outlined-label"
                id="provider-select-outlined-label"
                value={!!provider && provider.id}
                onChange={handleProviderChange}
                label="Provider"
                defaultValue={providers[indexP]?.id}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {providers.map((provider) => (
                  <MenuItem key={provider.id} value={provider.id}>
                    {provider.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl component="div" className={classes.formControl}>
              <TextField
                value={patientSearchTerm}
                variant="outlined"
                margin="normal"
                size="small"
                required
                fullWidth
                id="patient"
                label="Patient"
                name="patient"
                autoComplete="patient"
                onChange={(event) => setPatientSearchTerm(event.target.value)}
                error={errorText.patient.length > 0}
                helperText={errorText.patient.length > 0 && errorText.patient}
              />
              {patients.length > 0 && !selectedPatient && (
                <Card className={classes.patientListCard}>
                  <CardContent className={classes.patientListContent}>
                    <List component="nav" aria-label="secondary mailbox folder">
                      {patients.map((patient) => (
                        <ListItem
                          button
                          onClick={(event) => handlePatientChange(event, patient)}
                          key={patient.id}
                        >
                          <ListItemText primary={`${patient.firstname} ${patient.lastname}`} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              )}
            </FormControl>
            <Typography component="p" variant="body2" color="textPrimary">
              Notes
            </Typography>
            <TextareaAutosize
              className={classes.textArea}
              aria-label="minimum hei ght"
              placeholder="Notes..."
              name="notes"
              value={calEvent.notes}
              onChange={(event) => handleOnChange(event)}
            />
          </div>
          <div>
            <Typography
              onClick={() => history.push(`/patients/${selectedPatient}`)}
              component="p"
              variant="body2"
              color="textPrimary"
              className={classes.patientLink}
            >
              Go to patient page
            </Typography>
            <Typography
              onClick={() => history.push(`/patients/${selectedPatient}`)}
              component="p"
              variant="body2"
              color="textPrimary"
              className={classes.patientLink}
            >
              Go to patient page in new tab
            </Typography>
          </div>
        </div>
      </DialogContent>
      <DialogActions className={classes.modalAction}>
        <Button size="small" variant="outlined" onClick={() => onClose()}>
          close
        </Button>
        <div>
          <Button
            disabled={!calEvent}
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleSaveOrUpdate()}
          >
            {isNewEvent ? "Save" : "Update"}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

NewOrEditEvent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  appointments: PropTypes.arrayOf(
    PropTypes.arrayOf({
      id: PropTypes.string,
      appointment_type: PropTypes.string,
      appointment_name_portal: PropTypes.string,
      length: PropTypes.string,
      allow_patients_schedule: PropTypes.bool,
      sort_order: PropTypes.number,
      note: PropTypes.string,
      created: PropTypes.string,
      created_user: PropTypes.string,
      updated: PropTypes.string,
      updated_user: PropTypes.string,
    })
  ).isRequired,
  selectedProvider: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  providers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onEventUpdate: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  isNewEvent: PropTypes.bool.isRequired,
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      msg: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NewOrEditEvent;

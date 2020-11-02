import React, { useEffect, useState } from "react";

import { makeStyles, withStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";

import DashboardHome from "../../../services/DashboardHome.service";
import Messages from "../../../services/message-to-patient.service";
import Appointments from "./../../../services/appointments.service";
import { setSuccess } from "./../../../store/common/actions";
import { statusToColorCode } from "./../../../utils/helpers";
import {
  AppointmentRequests,
  Calendar,
  MessagesUnread,
  MessageToPatient,
  NewOrEditEvent,
  ProviderCards,
  ProviderDetailsCard
} from "./components";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    marginBottom: theme.spacing(2)
  },
  root: {
    flexGrow: 1,
    padding: "40px 0px"
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "60px",
    marginTop: "5px",
    fontSize: "15px"
  }
}));

const GreenSwitch = withStyles({
  switchBase: {
    color: green[400],
    "&$checked": {
      color: green[500]
    },
    "&$checked + $track": {
      backgroundColor: green[500]
    }
  },
  checked: {},
  track: {}
})(Switch);

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [providerDetails, setProviderDetails] = useState("");
  const [messagesUnread, setMessagesUnread] = useState([]);
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedMsg, setSelectedMsg] = useState("");
  const [providers, setProviders] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewEvent, setIsNewEvent] = useState(true);
  const [isNewMessage, setIsNewMessage] = useState(true);
  const [patient_id_to, setPatient_id_to] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const [isMessageToPatientOpen, setIsMessageToPatientOpen] = useState(false);

  const getMapFromArray = (data) => {
    const formedData = data.reduce((acc, item) => {
      return [
        ...acc,
        {
          ...item,
          title: item.title ? item.title : item.firstname,
          start: item.start_dt,
          end: item.end_dt,
          backgroundColor: statusToColorCode(item.status)
        }
      ];
    }, []);

    return formedData;
  };

  useEffect(() => {
    async function fetchProviders() {
      const { data } = await DashboardHome.getProviders();
      setProviders(data);
      if (data.length > 0) {
        setSelectedProvider(data[0]);
        fetchEventsByProvider(data[0]);
      }
    }

    fetchProviders();
    fetchAppointments();
    fetchProviderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchAppointments() {
    const { data } = await Appointments.getAll();
    const eventsFromAPI = getMapFromArray(data);
    setEvents(eventsFromAPI);
    setAppointments(data);
  }

  const handleProviderClick = async (provider) => {
    setSelectedProvider(provider);
    fetchEventsByProvider(provider);
    fetchUnreadPatientMessages(provider.id);
    fetchPatientApptRequests(provider.id);
  };

  async function fetchEventsByProvider(provider) {
    const { data } = await Appointments.getAllByProvider(provider.id);
    const eventsFromAPI = getMapFromArray(data);
    setEvents(eventsFromAPI);
  }

  async function fetchProviderDetails() {
    const { data } = await DashboardHome.getProviderDetails();
    setProviderDetails(data);
  }
  async function fetchUnreadPatientMessages(providerId) {
    const { data } = await DashboardHome.getPatientUnreadMessages(providerId);
    setMessagesUnread(data);
  }
  async function fetchPatientApptRequests(providerId) {
    const { data } = await DashboardHome.getPatientApptRequests(providerId);
    setAppointmentRequests(data);
  }
  const handleDayClick = (date) => {
    setIsNewEvent(true);
    setIsOpen(true);
    setSelectedDate(date);
  };

  const handleEventCreation = (payload) => {
    setIsLoading(true);
    Appointments.create(payload).then(
      (response) => {
        setIsLoading(false);
        fetchEventsByProvider(selectedProvider);
        fetchPatientApptRequests(selectedProvider.id);
        dispatch(setSuccess(`${response.data.message}`));
        setIsOpen(false);
      },
      (error) => {
        setErrors(error.response.data.error);
      }
    );
  };

  const handleEventClick = (calEvent) => {
    setIsNewEvent(false);
    const eventClicked = events.filter(
      (event) => event.id === parseInt(calEvent.event.id)
    );
    setSelectedEvent(eventClicked[0]);
    setIsOpen(true);
  };

  const handleEventCancellation = (payload) => {
    setIsLoading(true);
    Appointments.cancelEvent(payload).then(
      (response) => {
        setIsLoading(false);
        fetchEventsByProvider(selectedProvider);
        fetchPatientApptRequests(selectedProvider.id);
        dispatch(setSuccess(`${response.data.message}`));
        setIsOpen(false);
      },
      (error) => {
        setErrors(error.response.data.error);
      }
    );
  };

  const handleEventUpdate = (payload) => {
    setIsLoading(true);
    Appointments.update(payload).then(
      (response) => {
        setIsLoading(false);
        fetchEventsByProvider(selectedProvider);
        dispatch(setSuccess(`${response.data.message}`));
        setIsOpen(false);
      },
      (error) => {
        setErrors(error.response.data.error);
      }
    );
  };

  const handleMessageClick = (_, patient_id_to) => {
    setPatient_id_to(patient_id_to);
    setIsMessageToPatientOpen(true);
    setIsNewMessage(true);
  };

  const handleMessageEditClick = (_, msg) => {
    setIsMessageToPatientOpen(true);
    setIsNewMessage(false);
    setSelectedMsg(msg);
  };

  const fetchSingleMessage = () =>
    !isNewMessage &&
    Messages.getMessageByID(selectedMsg.id).then(
      (response) => {
        const { data } = response;
        setSelectedMsg(data[0]);
      },
      (error) => {
        if (error.response) {
          setErrors(error.response.data);
        }
      }
    );

  const handleMessageToPatientFormSubmit = (_, message, isNewMessage) => {
    setIsLoading(true);
    const payload = {
      data: {
        ...message,
        user_id_from: selectedProvider.id,
        patient_id_to: patient_id_to
      }
    };
    if (isNewMessage) {
      //Create new message
      Messages.create(payload).then(
        (response) => {
          setIsLoading(false);
          setIsMessageToPatientOpen(false);
          fetchUnreadPatientMessages(selectedProvider.id);
        },
        (errors) => {
          setIsLoading(false);
          setIsMessageToPatientOpen(false);
        }
      );
    } else {
      //Update message
      Messages.update(payload).then(
        (response) => {
          setIsLoading(false);
          setIsMessageToPatientOpen(false);
          fetchUnreadPatientMessages(selectedProvider.id);
        },
        (errors) => {
          setIsLoading(false);
          setIsMessageToPatientOpen(false);
        }
      );
    }
  };

  return (
    <div className={classes.root}>
      <div style={{ display: "flex" }}>
        <Typography
          component="h1"
          variant="h2"
          color="textPrimary"
          className={classes.pageTitle}
        >
          Home {selectedProvider && `- ${selectedProvider.name}`}
        </Typography>
        <FormControl component="div" className={classes.formControl}>
          <p className={classes.formHelperText}>Show canceled/rejected</p>
          <GreenSwitch
            size="small"
            name="active"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </FormControl>
      </div>
      <Grid container spacing={8}>
        <Grid item md={7} xs={12}>
          <Calendar
            events={events}
            onDayClick={handleDayClick}
            onEventClick={handleEventClick}
          />
        </Grid>
        <Grid item md={5} xs={12}>
          <ProviderCards
            providers={providers}
            handleProviderClick={handleProviderClick}
          />
          <ProviderDetailsCard
            selectedProvider={selectedProvider}
            providerDetails={providerDetails}
          />
          {!!selectedProvider && (
            <React.Fragment>
              <MessagesUnread
                appointmentRequests={appointmentRequests}
                messagesUnread={messagesUnread}
                onMessageEdit={handleMessageEditClick}
              />
              <AppointmentRequests
                selectedProvider={selectedProvider}
                appointmentRequests={appointmentRequests}
                onMessageClick={handleMessageClick}
                onAccept={(payload) => handleEventCreation(payload)}
                onReject={(payload) => handleEventCancellation(payload)}
              />
            </React.Fragment>
          )}
        </Grid>
      </Grid>
      <NewOrEditEvent
        isLoading={isLoading}
        isNewEvent={isNewEvent}
        event={selectedEvent && selectedEvent}
        selectedDate={selectedDate}
        selectedProvider={selectedProvider}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        providers={providers}
        onSave={handleEventCreation}
        onEventUpdate={(payload) => handleEventUpdate(payload)}
        errors={errors}
        appointments={appointments}
      />
      <MessageToPatient
        isLoading={isLoading}
        msg={selectedMsg}
        isNewMessage={isNewMessage}
        onModalEnter={fetchSingleMessage}
        isOpen={isMessageToPatientOpen}
        onSubmit={handleMessageToPatientFormSubmit}
        onClose={() => setIsMessageToPatientOpen(false)}
        errors={errors}
      />
    </div>
  );
}

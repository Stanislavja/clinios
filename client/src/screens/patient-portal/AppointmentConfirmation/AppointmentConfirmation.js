import React from "react";

import {
  makeStyles, Typography,
} from "@material-ui/core";
import moment from "moment";
import { useLocation } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(2),
  },
}));

const AppointmentConfirmation = () => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <div className={classes.root}>
      <Typography
        component="p"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Appointment Request Confirmation
      </Typography>
      <Typography
        component="h1"
        variant="body1"
        color="textPrimary"

      >
        {`An appointment at ${moment(location?.state?.date).format("ll")} ${location?.state?.time}
         to ${moment(location?.state?.time?.split("am")[0], "HH:mm")
      .add(location?.state?.appointmentType, "minutes").format("h:mma")}
         with ${location?.state?.practitionar} has been requested.`}
      </Typography>
    </div>
  );
};

export default AppointmentConfirmation;

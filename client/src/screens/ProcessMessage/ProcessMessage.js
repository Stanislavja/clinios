import React, { useCallback, useEffect, useState } from "react";

import {
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useParams } from "react-router-dom";

import PatientService from "../../services/patient.service";
import MessageSection from "./components/MessageSection";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
  },
  gutterBottom: {
    marginBottom: theme.spacing(1),
  },
}));

const ProcessMessage = () => {
  const classes = useStyles();
  const { userId } = useParams();

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = useCallback(() => {
    PatientService.getMessages(userId).then((res) => {
      setMessages(res.data);
      setIsLoading(false);
    })
      .catch(() => {
        setIsLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.gutterBottom}
      >
        Message From Patient
      </Typography>
      {
        messages.length
          ? messages.map(((item, index) => (
            <Grid key={item.id}>
              <MessageSection
                message={item}
                showDivider={messages.length !== index + 1}
              />
            </Grid>
          )))
          : (
            <Typography variant="h5">
              {isLoading ? "Fetching Messages..." : "No Messages Found!"}
            </Typography>
          )
      }
    </div>
  );
};

export default ProcessMessage;

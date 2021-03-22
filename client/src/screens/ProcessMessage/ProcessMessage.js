import React, { useCallback, useEffect, useState } from "react";

import {
  Grid,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";

import MessageToUserService from "../../services/message-to-user.service";
import MessageSection from "./components/MessageSection";

const useStyles = makeStyles((theme) => ({
  gutterBottom: {
    marginBottom: theme.spacing(2),
  },
  mr3: {
    marginRight: theme.spacing(3),
  },
}));

const ProcessMessage = (props) => {
  const classes = useStyles();
  const { fetchProviderDetails } = props;

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = useCallback(() => {
    MessageToUserService.getAllMessages().then((res) => {
      setMessages(res.data);
      setIsLoading(false);
    })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <>
      <Grid container className={classes.gutterBottom}>
        <Typography
          component="h1"
          variant="h2"
          color="textPrimary"
          className={classes.mr3}
        >
          Message From Patient
        </Typography>
        <Button onClick={() => { }}>
          User History
        </Button>
      </Grid>
      {
        messages.length
          ? messages.map(((item, index) => (
            <Grid key={item.id}>
              <MessageSection
                message={item}
                showDivider={messages.length !== index + 1}
                fetchMessages={() => {
                  fetchMessages();
                  fetchProviderDetails();
                }}
              />
            </Grid>
          )))
          : (
            <Typography variant="h5">
              {isLoading ? "Fetching Messages..." : "No Messages Found!"}
            </Typography>
          )
      }
    </>
  );
};

ProcessMessage.propTypes = {
  fetchProviderDetails: PropTypes.func.isRequired,
};

export default ProcessMessage;

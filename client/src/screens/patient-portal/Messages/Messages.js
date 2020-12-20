import React, { useEffect, useState } from "react";

import {
  Button, Divider, Grid, makeStyles, TextField,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

import MessagesService from "../../../services/patient_portal/messages.service";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  titleSection: {
    display: "flex",
    alignItems: "center",
  },
  newMessage: {
    fontSize: "16px",
    marginLeft: "40px",
    marginBottom: "10px",
  },
  content: {
    marginTop: "30px",
  },
  divider: {
    margin: "10px 0",
    maxWidth: "520px",
  },
}));

export default function Messages() {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const fetchMessages = async () => {
    const msg = await MessagesService.getMessages();
    setMessages(msg.data.data);
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <div className={classes.titleSection}>
        <Typography component="h1" variant="h2" color="textPrimary" className={classes.title}>
          Messages
        </Typography>
        <Button
          className={classes.newMessage}
          onClick={() => setOpen(true)}
          size="small"
          variant="contained"
          color="primary"
        >
          New Message
        </Button>
      </div>
      <Typography component="p" variant="body2" color="textPrimary">
        This page is used to send administrative messages to your practitioner. To send a new message click
        New Message.
      </Typography>

      <div className={classes.content}>
        {messages.map((msg) => (
          <Grid key={msg.id} container spacing={4} alignItems="flex-start">
            <Grid item xs={4}>
              <Typography component="p" variant="body2" color="textPrimary">
                <span style={{ fontWeight: "bold" }}>Time: </span>
                {" "}
                {moment(msg.created).format("ll, h:mm")}
                {" "}
                <span style={{ fontWeight: "bold" }}>Subject: </span>
                {" "}
                {msg.subject}
                {" "}
                <span style={{ fontWeight: "bold" }}>From: </span>
                {msg.user_to_from}
                {" "}
                <span style={{ fontWeight: "bold" }}>To: </span>
                {msg.user_to_name ? msg.user_to_name : "You"}
                <br />
                {msg.message}
              </Typography>
              <Divider className={classes.divider} />
            </Grid>
            <Grid item xs={4}>
              <Grid container spacing={2}>
                <Grid item>
                  <Button size="small" variant="outlined">
                    Reply
                  </Button>
                </Grid>
                <Grid item>
                  <Button size="small" variant="outlined">
                    Edit
                  </Button>
                </Grid>
                <Grid item>
                  <Button size="small" variant="outlined">
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{ minWidth: "600px" }}>
          <Typography variant="h2">Send A Secure Message</Typography>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField fullWidth margin="normal" variant="outlined" label="To" />
            <TextField fullWidth margin="normal" variant="outlined" label="Subject" />
            <TextField
              fullWidth
              variant="outlined"
              label="Message"
              className={classes.texArea}
              InputProps={{
                classes: classes.normalOutline,
                inputComponent: TextareaAutosize,
                rows: 8,
              }}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              size="small"
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button>Send</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

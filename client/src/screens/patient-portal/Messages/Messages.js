import React, { useEffect, useState } from "react";

import {
  Button, Divider, Grid, makeStyles, TextField,
  colors,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { useSnackbar } from "notistack";

import MessagesService from "../../../services/patient_portal/messages.service";
import UsersService from "../../../services/users.service";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  modalTitle: {
    backgroundColor: theme.palette.primary.light,
    "& h2": {
      color: "#fff",
      fontSize: "16px",
    },
  },
  titleSection: {
    display: "flex",
    alignItems: "center",
  },
  newMessage: {
    fontSize: "14px",
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(1),
  },
  content: {
    marginTop: "30px",
  },
  modalContent: {
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(6),
    fontSize: "18px",
    "& p": {
      fontSize: "16px",
    },
  },
  divider: {
    margin: "10px 0",
    maxWidth: "520px",
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
}));

export default function Messages() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [isNewView, setIsNewView] = useState(false);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const fetchMessages = async () => {
    const msg = await MessagesService.getMessages();
    setMessages(msg.data.data);
  };

  const fetchUsers = () => {
    UsersService.getAllUsers().then((res) => {
      setUsers(res.data.data);
    });
  };

  useEffect(() => {
    fetchMessages();
    fetchUsers();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const onNewMessageButton = () => {
    setIsNewView(true);
    setOpen(true);
  };

  const handleMessageSubmission = () => {
    const formData = {
      data: {
        user_id_to: selectedUser,
        subject,
        message,
      },
    };
    MessagesService.createMessage(formData).then((response) => {
      enqueueSnackbar(`${response.data.message}`, {
        variant: "success",
      });
      fetchMessages();
      handleClose();
    });
  };

  const handleOnEditClick = (msg) => {
    setIsNewView(false);
    setSubject(msg.subject);
    setMessage(msg.message);
    setSelectedUser(msg.user_id_to);
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <div className={classes.titleSection}>
        <Typography component="h1" variant="h2" color="textPrimary" className={classes.title}>
          Messages
        </Typography>
        <Button
          className={classes.newMessage}
          onClick={() => onNewMessageButton()}
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
                  <Button size="small" variant="outlined" onClick={() => handleOnEditClick(msg)}>
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
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.modalTitle}>
          {isNewView ? "Send A Secure Message" : "Edit Message"}
        </DialogTitle>
        <DialogContent className={classes.modalContent} style={{ minWidth: "600px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <FormControl
              variant="outlined"
              className={classes.customSelect}
              size="small"
            >
              <InputLabel htmlFor="age-native-simple">To</InputLabel>
              <Select
                native
                value={selectedUser}
                onChange={(event) => setSelectedUser(event.target.value)}
                inputProps={{
                  name: "type",
                  id: "age-native-simple",
                }}
                label="User"
              >
                <option aria-label="None" value="" />
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstname}
                    {" "}
                    {user.lastname}
                  </option>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Subject"
              size="small"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Message"
              className={classes.textArea}
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
        </DialogContent>
        <DialogActions className={classes.modalAction}>
          <Button
            size="small"
            variant="outlined"
            onClick={handleClose}
            style={{
              borderColor: colors.orange[600],
              color: colors.orange[600],
            }}
          >
            Cancel
          </Button>
          {
            isNewView
              ? (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleMessageSubmission()}
                >
                  Send
                </Button>
              )
              : (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => alert("Update Alert!")}
                >
                  Update
                </Button>
              )
          }

        </DialogActions>
      </Dialog>
    </div>
  );
}

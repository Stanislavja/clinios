import React, { useState } from "react";

import {
  TextField, Button, Grid, Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import Dialog from "../../../../components/Dialog";
import PatientService from "../../../../services/patient.service";

const useStyles = makeStyles((theme) => ({
  formInput: {
    marginBottom: theme.spacing(4),
  },
  dateInput: {
    marginBottom: theme.spacing(2),
  },
  actionContainer: {
    marginTop: theme.spacing(4),
  },
}));

const NewMessage = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { isOpen, onClose, reloadData } = props;

  const [formFields, setFormFields] = useState({
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const onMessageSend = (e) => {
    e.preventDefault();
    const patientId = 1;
    const reqBody = {
      data: {
        message: formFields.message,
        subject: formFields.subject,
        unread_notify_dt: moment().format("YYYY-MM-DD"),
      },
    };
    PatientService.createMessage(patientId, reqBody)
      .then((response) => {
        enqueueSnackbar(`${response.data.message}`, { variant: "success" });
        reloadData();
      });
  };

  return (
    <Dialog
      open={isOpen}
      title="New Message"
      message={(
        <form onSubmit={onMessageSend}>
          <Grid className={classes.formInput} item md={4}>
            <TextField
              autoFocus
              required
              variant="standard"
              name="subject"
              id="subject"
              label="Subject"
              type="text"
              fullWidth
              value={formFields.subject}
              onChange={(e) => handleInputChange(e)}
            />
          </Grid>
          <Grid item lg={2}>
            <Typography gutterBottom variant="body1" color="textPrimary">
              Message
            </Typography>
          </Grid>
          <Grid className={classes.formInput} item md={12}>
            <TextField
              required
              variant="outlined"
              name="message"
              id="message"
              type="text"
              fullWidth
              value={formFields.message}
              onChange={(e) => handleInputChange(e)}
              multiline
              rows={5}
            />
          </Grid>

          <Grid
            className={classes.actionContainer}
            container
            justify="space-between"
          >
            <Button variant="outlined" type="submit">
              Send
            </Button>
          </Grid>
        </form>
      )}
      cancelForm={() => onClose()}
      hideActions
      size="md"
    />
  );
};

NewMessage.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  reloadData: PropTypes.func.isRequired,
};

export default NewMessage;

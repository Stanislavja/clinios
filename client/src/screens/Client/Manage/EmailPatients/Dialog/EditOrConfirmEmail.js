import React, { useEffect, useState } from "react";

import { colors, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import useAuth from "../../../../../hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.primary.light,
    "& h2": {
      color: "#fff",
    },
  },
  content: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: "18px",
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: theme.palette.text.secondary,
    "& .MuiSelect-select": {
      minWidth: 120,
    },
  },
  formLabel: {
    fontSize: "14px",
    fontWeight: "600",
    width: "220px",
  },
  formHelperText: {
    // width: "230px",
    fontSize: "12px",
    paddingLeft: "16px",
  },
  formField: {
    flex: 1,
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
  formFieldLarge: {
    maxWidth: "270px",
    flex: 1,
    width: "300px",
  },
  formFieldSmall: {
    maxWidth: "100px",
    flex: 1,
  },
  textArea: {
    marginTop: "12px",
  },
}));

const EditOrConfirmEmail = ({
  isOpen,
  onClose,
  isConfirmView,
  ...props
}) => {
  const classes = useStyles();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { savedAppointments } = props;
  const [emaildata, setEmailData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [nameError, setNameError] = useState(false);
  const [typeError, setTypeError] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react/destructuring-assignment
  }, []);

  const handleFormSubmission = () => {
    // Duplicate names
  };

  const handleOnChange = (event) => {
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.title}>
          {isConfirmView ? "Email Confirmation" : "Edit Email"}
        </DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText id="alert-dialog-description">
            {isConfirmView
              ? "It will send email to all patient."
              : "Edit the following for this email"}
          </DialogContentText>
          {errors
            && errors.map((error, index) => (
               // eslint-disable-next-line react/no-array-index-key
              <Alert severity="error" key={index}>
                {error.msg}
              </Alert>
            ))}
          <div className={classes.root}>
            <FormControl component="div" className={classes.formControl}>
              <TextField
                autoFocus
                className={classes.formFieldLarge}
                variant="outlined"
                label="Subject"
                margin="normal"
                fullWidth
                name="subject"
                id="subject"
                autoComplete="subject"
                onChange={(event) => handleOnChange(event)}
                value="Value goes here"
                size="small"
                error={typeError}
                helperText={typeError ? "You entered a duplicate type" : ""}
              />
            </FormControl>
            <FormControl component="div" className={classes.formControl}>
              <TextField
                className={classes.formFieldLarge}
                variant="outlined"
                label="Status"
                margin="normal"
                fullWidth
                name="status"
                id="status"
                autoComplete="status"
                onChange={(event) => handleOnChange(event)}
                value="name value"
                size="small"
                error={nameError}
                helperText={nameError ? "You entered a duplicate name" : ""}
              />
            </FormControl>
            <FormControl
              component="div"
              className={`${classes.formControl} ${classes.textArea}`}
            >
              <TextField
                fullWidth
                variant="outlined"
                label="Note"
                multiline
                name="note"
                InputProps={{
                  classes: classes.normalOutline,
                  inputComponent: TextareaAutosize,
                  rows: 8,
                }}
                value="value goes here.."
                onChange={(event) => handleOnChange(event)}
              />
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions className={classes.modalAction}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onClose()}
            style={{
              borderColor: colors.orange[600],
              color: colors.orange[600],
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleFormSubmission()}
          >
            {isConfirmView ? "Send" : "Send updated email"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

EditOrConfirmEmail.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isConfirmView: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  appointment: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      id: PropTypes.number,
      appointment_type: PropTypes.string,
      appointment_name_portal: PropTypes.string,
      length: PropTypes.number,
      sort_order: PropTypes.number,
      allow_patients_schedule: PropTypes.number,
      note: PropTypes.string,
    }),
  ]).isRequired,
  savedAppointments: PropTypes.arrayOf(
    PropTypes.shape({
      appointment_name_portal: PropTypes.string,
      appointment_type: PropTypes.string,
    }),
  ).isRequired,
};

export default EditOrConfirmEmail;

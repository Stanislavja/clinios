import React, { useEffect, useState } from "react";

import { colors } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
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
  statusWrapper: {
    display: "block",
  },
  status: {
    display: 'inline'
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

const EditEmail = ({
  isOpen,
  onClose,
  ...props
}) => {
  const classes = useStyles();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { savedAppointments } = props;
  const [emailData, setEmailData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [nameError, setNameError] = useState(false);
  const [typeError, setTypeError] = useState(false);

  useEffect(() => {
    setEmailData(props.selectedEmail)
    // eslint-disable-next-line react/destructuring-assignment
  }, [props.selectedEmail]);

  const handleFormSubmission = () => {
    // Duplicate names
  };

  console.log('emailData:', emailData)

  const handleOnChange = (event) => {
    setEmailData({
      ...emailData,
      [event.target.name]: event.target.value.trim(),
    });
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth='sm'
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.title}>
           Edit Email
        </DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText id="alert-dialog-description">
            Edit the following for this email
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
                value={emailData.subject}
                size="small"
                error={typeError}
                helperText={typeError ? "You entered a duplicate type" : ""}
              />
            </FormControl>
            <div className={classes.statusWrapper}>
              <Typography component="p" variant="body2" color="textPrimary">
                Patient Status:
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup 
                  aria-label="status" 
                  name="status" 
                  value={emailData.status} 
                  onChange={handleOnChange} 
                  className={classes.status}
                >
                  <FormControlLabel value="A" control={<Radio />} label="Active" />
                  <FormControlLabel value="I" control={<Radio />} label="Inactive" />
                </RadioGroup>
              </FormControl>
            </div>
            <FormControl
              component="div"
              className={`${classes.formControl} ${classes.textArea}`}
            >
              <TextField
                fullWidth
                variant="outlined"
                label="Message"
                multiline
                name="message"
                InputProps={{
                  classes: classes.normalOutline,
                  inputComponent: TextareaAutosize,
                  rows: 8,
                }}
                value={emailData.message}
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
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

EditEmail.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isConfirmView: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedEmail: PropTypes.shape({
    id: PropTypes.number,
    created: PropTypes.string,
    created_user: PropTypes.string,
    message: PropTypes.string,
    status: PropTypes.string,
    subject: PropTypes.string,
  }).isRequired,
};

export default EditEmail;

import React, { useEffect, useState } from "react";

import {
  Button,
  colors,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  makeStyles,
  Switch,
  TextField,
  withStyles
} from "@material-ui/core";
import { green, grey } from "@material-ui/core/colors";
import Alert from "@material-ui/lab/Alert";
import moment from "moment";
import { useDispatch } from "react-redux";

import UserService from "../../../../../../services/users.service";
import { setSuccess } from "../../../../../../store/common/actions";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.primary.light,
    "& h2": {
      color: "#fff"
    }
  },
  content: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: "18px"
  },
  formControl: {
    margin: "10px 0",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: theme.palette.text.secondary,
    "& .MuiSelect-select": {
      minWidth: 120
    }
  },
  formLabel: {
    margin: "5px 10px"
  },
  root: {
    "& .MuiTypography-root": {
      marginLeft: "5px"
    }
  },
  formHelperText: {
    width: "220px",
    fontSize: "12px",
    paddingLeft: "10px"
  },
  statusText: {
    width: "220px",
    fontSize: "14px"
  },
  modalAction: {
    borderTop: `1px solid ${theme.palette.background.default}`,
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  }
}));
const GreenSwitch = withStyles({
  switchBase: {
    color: grey[300],
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

const errorsInitialState = { one: "", two: "", three: "", four: "", five: "" };

const NewOrEditUserModal = ({
  isOpen,
  handleOnClose,
  isNewUser,
  forwardEmailList,
  fetchAllUsers,
  allUsers,
  authUser,
  ...props
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [errors, setErrors] = useState([]);
  const [errorChecking, setErrorChecking] = useState(errorsInitialState);

  const nameError = allUsers.some((u) =>
    isNewUser
      ? String(u.firstname).trim().toLowerCase() ===
          String(user.firstname).trim().toLowerCase() &&
        String(u.lastname).trim().toLowerCase() ===
          String(user.lastname).trim().toLowerCase()
      : false
  );
  const firstnameError =
    String(user.firstname).length <= 0 || String(user.firstname).length > 25;
  const lastnameError =
    String(user.lastname).length <= 0 || String(user.lastname).length > 255;
  const emailError = allUsers.some((u) =>
    isNewUser
      ? String(u.email).trim().toLowerCase() ===
        String(user.email).trim().toLowerCase()
      : false
  );
  const statusError = user.id === authUser.id && String(user.status) === "D";

  /* TODO: if row edited==self, admin was false, user sets admin=true, then print message "You cant grant yourself administrator permissions!" and stop
   const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };
  const prevVal = usePrevious(user.admin);
  
  const adminError = () => {
    if (Boolean(user.admin) === true) {
      if (Boolean(prevVal) === false) {
        if (user.id === authUser.id) {
          return true;
        }
      }
    }
    return false;
  }; */

  const isValid = () => {
    const checkEmailIsValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!user.firstname) {
      setErrorChecking({ ...errorChecking, one: "Firstname can't be blank !" });
      return false;
    }
    if (!user.lastname) {
      setErrorChecking({ ...errorChecking, two: "Lastname can't be blank!" });
      return false;
    }
    if (!user.email) {
      setErrorChecking({ ...errorChecking, three: "Email can't be blank!" });
      return false;
    }
    if (!checkEmailIsValid.test(String(user.email).toLowerCase())) {
      setErrorChecking({ ...errorChecking, five: "Invalid email" });
      return false;
    }
    if (!user.type) {
      setErrorChecking({ ...errorChecking, four: "Please select a type!" });
      return false;
    }
    return true;
  };
  const validate = () => {
    if (
      nameError ||
      firstnameError ||
      lastnameError ||
      emailError ||
      statusError
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const tempUser = {
      ...props.user
    };
    setUser(tempUser);
  }, [props.user]);

  const payload = {
    firstname: user.firstname,
    lastname: user.lastname,
    title: user.title,
    email: user.email,
    phone: user.phone,
    note: user.note,
    status: user.status,
    appointments: user.appointments,
    type: user.type,
    schedule: user.schedule,
    admin: user.admin,
    email_forward_user_id: user.email_forward_user_id
  };
  const handleCreateNewOrEditUser = () => {
    if (isValid()) {
      if (isNewUser) {
        UserService.createNewUser(payload).then(
          (response) => {
            setTimeout(() => {
              dispatch(setSuccess(response.data.message));
            }, 300);
          },
          (error) => {
            setTimeout(() => {
              setErrors(error.response.error);
            }, 300);
          }
        );
      } else {
        UserService.updateUser(authUser.id, user.id, payload).then(
          (response) => {
            setTimeout(() => {
              dispatch(setSuccess(response.data.message));
            }, 300);
          },
          (error) => {
            setTimeout(() => {
              setErrors(error.response.error);
            }, 300);
          }
        );
      }
      handleOnClose();
      setTimeout(() => {
        fetchAllUsers();
      }, 200);
    }
  };

  const handleOnChange = (event) => {
    const isChecked = event.target.type === "checkbox";
    setUser({
      ...user,
      [event.target.name]: isChecked
        ? event.target.checked
        : event.target.value.trim()
    });
    setErrorChecking(errorsInitialState);
  };

  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      handleCreateNewOrEditUser();
    }
  };

  return (
    <div>
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={isOpen}
        onClose={handleOnClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.title}>
          {isNewUser ? "New User" : "Edit User"}
        </DialogTitle>
        <DialogContent className={classes.content}>
          {errors &&
            errors.map((error, index) => (
              <Alert severity="error" key={index}>
                {error.msg}
              </Alert>
            ))}
          <div className={classes.root}>
            <Grid container justify="center" spacing={1}>
              <Grid item xs={12} md={4} className={classes.gridMargin}>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth
                    autoFocus
                    required
                    label="Firstname"
                    name="firstname"
                    value={user.firstname ? String(user.firstname) : ""}
                    onChange={handleOnChange}
                    onKeyUp={handleKeyUp}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                    error={errorChecking.one || nameError || firstnameError}
                    helperText={
                      (errorChecking.one && errorChecking.one) ||
                      (nameError &&
                        "This firstname and lastname already exists!") ||
                      (firstnameError &&
                        "Firstname can't be less then 0 or greater then 255 characters!")
                    }
                  />
                </FormControl>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    required
                    fullWidth={true}
                    label="Lastname"
                    name="lastname"
                    value={user.lastname ? String(user.lastname) : ""}
                    onChange={handleOnChange}
                    onKeyUp={handleKeyUp}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                    error={errorChecking.two || nameError || lastnameError}
                    helperText={
                      (errorChecking.two && errorChecking.two) ||
                      (nameError &&
                        "This firstname and lastname already exists!") ||
                      (lastnameError &&
                        "Lastname can't be less then 0 or greater then 255 characters!")
                    }
                  />
                </FormControl>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth={true}
                    label="Title"
                    name="title"
                    value={user.title ? String(user.title) : ""}
                    onChange={handleOnChange}
                    onKeyUp={handleKeyUp}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </FormControl>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth
                    required
                    label="Email"
                    name="email"
                    value={user.email ? String(user.email) : ""}
                    onChange={handleOnChange}
                    onKeyUp={handleKeyUp}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                    error={
                      errorChecking.three || emailError || errorChecking.five
                    }
                    helperText={
                      (errorChecking.three && errorChecking.three) ||
                      (emailError && "This email already exists!") ||
                      (errorChecking.five && errorChecking.five)
                    }
                  />
                </FormControl>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={user.phone ? String(user.phone) : ""}
                    onChange={handleOnChange}
                    onKeyUp={handleKeyUp}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </FormControl>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth={true}
                    disabled={true}
                    label="Created"
                    value={
                      user.created ? moment(user.created).format("lll") : ""
                    }
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </FormControl>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth={true}
                    disabled={true}
                    label="Created By"
                    value={user.created_user}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} className={classes.gridMargin}>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth={true}
                    id="outlined-select-currency"
                    select
                    label="Status"
                    name="status"
                    value={user.status}
                    onChange={handleOnChange}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                    SelectProps={{
                      native: true
                    }}
                    error={statusError}
                    helperText={
                      statusError && "You can't set yourself to deleted!"
                    }
                  >
                    <option aria-label="None" value="A">
                      Active
                    </option>
                    <option aria-label="None" value="I">
                      Inactive
                    </option>
                    <option aria-label="None" value="D">
                      Deleted
                    </option>
                  </TextField>
                </FormControl>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth
                    required
                    id="outlined-select-currency"
                    select
                    label="Type"
                    name="type"
                    value={user.type}
                    onChange={handleOnChange}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                    SelectProps={{
                      native: true
                    }}
                    error={errorChecking.four}
                    helperText={errorChecking.four && errorChecking.four}
                  >
                    <option aria-label="None" value="" />
                    <option aria-label="None" value="PP">
                      Primary Provider
                    </option>
                    <option aria-label="None" value="SP">
                      Secondary Provider
                    </option>
                    <option aria-label="None" value="A">
                      Administrative
                    </option>
                    <option aria-label="None" value="L">
                      Limited
                    </option>
                  </TextField>
                </FormControl>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth={true}
                    id="outlined-select-currency"
                    select
                    label="Schedule"
                    name="schedule"
                    value={user.schedule}
                    onChange={handleOnChange}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                    SelectProps={{
                      native: true
                    }}
                  >
                    <option aria-label="None" value="F">
                      Full
                    </option>
                    <option aria-label="None" value="H">
                      Half
                    </option>
                    <option aria-label="None" value="Q">
                      Quarter
                    </option>
                  </TextField>
                </FormControl>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth={true}
                    id="outlined-select-currency"
                    select
                    label="Forward Email"
                    name="email_forward_user_id"
                    value={user.email_forward_user_id}
                    onChange={handleOnChange}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                    SelectProps={{
                      native: true
                    }}
                  >
                    <option aria-label="None" value="" />
                    {forwardEmailList.map((list) => (
                      <option key={list.id} value={list.id}>
                        {list.name}
                      </option>
                    ))}
                  </TextField>
                </FormControl>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth={true}
                    disabled={true}
                    label="Last Login"
                    value={
                      user.login_dt ? moment(user.login_dt).format("lll") : ""
                    }
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </FormControl>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth={true}
                    disabled={true}
                    label="Updated"
                    value={
                      user.updated ? moment(user.updated).format("lll") : ""
                    }
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </FormControl>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth={true}
                    disabled={true}
                    label="Updated By"
                    value={user.updated_user}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  className={classes.formLabel}
                  control={
                    <GreenSwitch
                      checked={Boolean(user.appointments)}
                      size="small"
                      name="appointments"
                      onChange={handleOnChange}
                    />
                  }
                  label="Appointments"
                />
                <FormControlLabel
                  className={classes.formLabel}
                  control={
                    <GreenSwitch
                      checked={Boolean(user.admin)}
                      size="small"
                      name="admin"
                      onChange={handleOnChange}
                    />
                  }
                  label="Administrator"
                />
                {/*TODO {adminError() && (
                  <FormHelperText
                    style={{ textAlign: "center", marginTop: "-3PX" }}
                    error={true}
                  >
                    You can't grant yourself administrator permissions!
                  </FormHelperText>
                )} */}
              </Grid>
            </Grid>

            <FormControl component="div" className={classes.formControl}>
              <TextField
                className={classes.noteMargin}
                fullWidth
                variant="outlined"
                multiline
                name="note"
                label="Notes"
                InputLabelProps={{
                  shrink: true
                }}
                InputProps={{
                  rows: 6
                }}
                value={user.note ? String(user.note) : ""}
                onChange={handleOnChange}
                onKeyUp={handleKeyUp}
              />
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions className={classes.modalAction}>
          <Button
            size="small"
            variant="outlined"
            onClick={handleOnClose}
            style={{
              borderColor: colors.orange[600],
              color: colors.orange[600]
            }}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleCreateNewOrEditUser}
            disabled={!validate()}
          >
            {isNewUser ? "Save" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewOrEditUserModal;

import React, { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";

import PracticeForm from "../../components/signup/PracticeForm";
import Success from "../../components/signup/Success";
import { AuthConsumer } from "../../providers/AuthProvider";
import AuthService from "../../services/auth.service";
import { signupComplete } from "../../store/auth/actions";
import { setSuccess } from "../../store/common/actions";
import { sendVerificationEmail } from "../../store/email/actions";


const useStyles = makeStyles((theme) => ({
  pageTitle: {
    marginBottom: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "transparent",
    color: theme.palette.text.secondary,
  },
  lockIcon: {
    fontSize: "40px",
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const success = useSelector(
    (state) => state.auth.success || false,
    shallowEqual,
  );

  const handleFormSubmit = (data) => {
    AuthService.register(data).then(
      (response) => {
        if (response.data) {
          dispatch(signupComplete(response.data.data.user));
          dispatch(sendVerificationEmail(response.data.data.user));
        }
        dispatch(setSuccess(`${response.data.message}`));
      },
      (error) => {
        if (error.response) {
          setErrors(error.response.data);
        }
      },
    );
  };

  return (
    <AuthConsumer>
      {({ isAuth }) => {
        if (isAuth) {
          history.push("/");
        }
        return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon className={classes.lockIcon} />
              </Avatar>
              <Typography
                component="h1"
                variant="h2"
                className={classes.pageTitle}
              >
                Physician Sign Up
              </Typography>
              {success ? (
                <Success />
              ) : (
                <PracticeForm
                  onFormSubmit={handleFormSubmit}
                  errors={errors.error}
                />
              )}
            </div>
          </Container>
        );
      }}
    </AuthConsumer>
  );
};

export default SignUp;

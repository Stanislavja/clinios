// CAll common action creator to set error
import AuthService from "../../services/auth.service";
import EmailService from "../../services/email.service";
import {
  startFetching,
  fetchingCompleted,
  setError,
  setSuccess,
} from "../common/actions";
import { sendVerificationEmail } from "../email/actions";
import {
  SIGNUP_COMPLETED,
  CLOSE_SNACKBAR,
  LOGOUT,
  LOGIN_ERROR,
  LOGIN_COMPLETED,
  PARTIAL_LOGIN_COMPLETED,
  RESET_PASSWORD_SUCCESS,
} from "./types";

export const partialLoginComplete = (data) => ({
  type: PARTIAL_LOGIN_COMPLETED,
  data,
});

export const loginComplete = (data) => ({
  type: LOGIN_COMPLETED,
  data,
});

const loginError = (err) => ({
  type: LOGIN_ERROR,
  err,
});

export const closeSnackbar = () => ({
  type: CLOSE_SNACKBAR,
});

export const signupComplete = (data) => ({
  type: SIGNUP_COMPLETED,
  data,
});

export const resetPasswordSuccess = () => ({
  type: RESET_PASSWORD_SUCCESS,
});

export const verificationEmail = (userId, token) => (dispatch) => {
  dispatch(startFetching());
  EmailService.emailVerify(userId, token).then(
    (response) => {
      dispatch(setSuccess(`${response.data.message}`));
      console.log("EmailService.emailVerify:", response);
      dispatch(fetchingCompleted());
    },
    (error) => {
      console.log("EmailService emailVerify error:", error);
      const resMessage = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();
      dispatch(fetchingCompleted());
      const severity = "error";
      dispatch(
        setError({
          severity,
          message: resMessage,
        }),
      );
    },
  );
};

export const loginAction = (email, password, authProviderLogin) => (dispatch) => {
  AuthService.login({
    email,
    password,
  }).then(
    (res) => {
      console.log(" AuthService.login:", res);
      authProviderLogin(); // login to authContext
      dispatch(loginComplete(res.data));
      dispatch(fetchingCompleted());
      window.location.reload();
    },
    (error) => {
      const resMessage = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();
      let severity = "error";
      if (error.response.status === 403) {
        severity = "warning";
      }
      dispatch(
        setError({
          severity,
          message: resMessage,
        }),
      );
      dispatch(loginError(resMessage));
      dispatch(fetchingCompleted());
    },
  );
};

export const signupPatient = (data) => (dispatch) => {
  dispatch(startFetching());
  AuthService.register(data).then(
    (response) => {
      dispatch(signupComplete(response.data.data.user));
      if (response.data) {
        dispatch(sendVerificationEmail(response.data.data.user));
      }
      dispatch(setSuccess(`${response.data.message}`));
      dispatch(fetchingCompleted());
    },
    (error) => {
      console.log("error.res.data", error.response.data);
      const resMessage = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();
      let severity = "error";
      if (error.response.status === 403) {
        severity = "warning";
      }
      dispatch(fetchingCompleted());
      dispatch(
        setError({
          severity,
          message: resMessage,
        }),
      );
    },
  );
};

export const logOut = () => {
  localStorage.removeItem("patient");
  return {
    type: LOGOUT,
  };
};

import EmailService from "../../services/email.service";
import { setError } from "../common/actions";
import {
  enqueueSnackbar as enqueueSnackbarAction,
} from "../notifications/actions";
import {
  EMAIL_PENDING,
  EMAIL_ERROR,
  EMAIL_ALREADY_VERIFIED,
  VERIFICATION_EMAIL_SUCCESS,
  VERIFICATION_EMAIL_FAILED,
} from "./types";
// CAll common action creator to set error


export const startEmail = () => ({
  type: EMAIL_PENDING,
});

const emailError = (data) => ({
  type: EMAIL_ERROR,
  data,
});

const verificationEmailSuccess = (message) => ({
  type: VERIFICATION_EMAIL_SUCCESS,
  data: message,
});

const verificationEmailFailed = () => ({
  type: VERIFICATION_EMAIL_FAILED,
});

export const emailAlreadyVerified = (message) => ({
  type: EMAIL_ALREADY_VERIFIED,
  data: message,
});

export const verificationEmail = (userId, token) => (dispatch) => {
  dispatch(startEmail());
  EmailService.emailVerify(userId, token).then(
    (response) => {
      //dispatch(setSuccess(`${response.data.message}`));

      
      dispatch(enqueueSnackbarAction({
        message: `${response.data.message}`,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success",
        },
      })) 

      if (response.data.isVerified) {
        dispatch(emailAlreadyVerified(response.data.message));
      }
      dispatch(verificationEmailSuccess(response.data.message));
    },
    (error) => {
      const resMessage = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();
      dispatch(emailError(resMessage));
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

export const sendVerificationEmail = (data) => (dispatch) => {
  EmailService.sendEmailVerification(data).then(
    (response) => {
      dispatch(verificationEmailSuccess(response));
    },
    (error) => {
      dispatch(verificationEmailFailed(error));
    },
  );
};

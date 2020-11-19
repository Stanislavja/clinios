import axios from "axios";

import { LOGOUT } from "./store/auth/types";
import {
  enqueueSnackbar as enqueueSnackbarAction,
} from "./store/notifications/actions";

export default {
  setupInterceptors: (store) => {
    // Add a response interceptor
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // catches if the session ended!
        if (error.message === "Network Error" && !error.response) {
          store.dispatch(enqueueSnackbarAction({
            message: "Network error - make sure API is running",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "error",
            },
          }));
        }
        if (error.response) {
          const { status, data } = error.response;
          let severity = "error";
          if (status === 403) {
            severity = "warning";
          }
          // 400 usually for form validation, so we would like to skip redux
          if (status === 400) {
            return Promise.reject(error);
          }
          const resMessage = (data && data.message) || error.message || error.toString();
          store.dispatch(enqueueSnackbarAction({
            message: resMessage,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: severity,
            },
          }));
          // TODO:: Check access token validaity on backend and handle on fronend client
          if (data.data.token && data.data.KEY === "ERR_EXPIRED_TOKEN") {
            console.info("EXPIRED TOKEN!");
            localStorage.clear();
            store.dispatch({ type: LOGOUT });
          }
        }

        return Promise.reject(error);
      },
    );
  },
};

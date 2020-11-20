import { combineReducers } from "redux";

import authReducer from "./auth";
import commonReducer from "./common";
import emailReducer from "./email";
import notificationsReducer from "./notifications";
import patientReducer from "./patient";

const appReducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
  email: emailReducer,
  patient: patientReducer,
  notifications: notificationsReducer,
});

/* eslint-disable */
const reducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};
/* eslint-enable */
export default reducer;

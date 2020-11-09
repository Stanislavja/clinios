import { combineReducers } from "redux";

import authReducer from "./auth";
import commonReducer from "./common";
import emailReducer from "./email";
import patientReducer from "./patient";

const appReducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
  email: emailReducer,
  patient: patientReducer,
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

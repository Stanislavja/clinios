import React from "react";
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { AuthProvider } from "./providers/AuthProvider";
import { AuthProviderX } from './contexts/AuthContext';
import AppRouter from "./routes/AppRoutes";
import theme from "./theme";
import routes, { renderRoutes } from './routes';
const history = createBrowserHistory();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router history={history}>
        <AuthProvider>
        <AuthProviderX>
          {renderRoutes(routes)}
        </AuthProviderX>
        </AuthProvider>
      </Router>
        {/* <AppRouter /> */}
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;

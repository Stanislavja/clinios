import React from "react";

import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createBrowserHistory } from "history";
import { SnackbarProvider } from "notistack";
import { Router } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import routes, { renderRoutes } from "./routes";
import theme from "./theme";

const history = createBrowserHistory();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <SnackbarProvider
          dense
          maxSnack={3}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Router history={history}>
            <AuthProvider>
              {renderRoutes(routes)}
            </AuthProvider>
          </Router>
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;

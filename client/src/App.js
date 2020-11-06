import React from "react";

import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import AppRouter from "./routes/AppRoutes";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <AppRouter />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;

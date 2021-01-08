import React from "react";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
  },
  title: {
    marginBottom: theme.spacing(0.5),
  },
  forms: {
    maxWidth: "150px",
  },
  labels: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 10px",
    "& p": {
      margin: 0,
    },
  },
  gridLabels: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  formFields: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  formField: {
    width: "80px",
  },
}));

export default function AppointmentTypesUser() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Container maxWidth={false} className={classes.root}>
        <Typography
          component="h1"
          variant="h2"
          color="textPrimary"
          className={classes.title}
        >
          Appointment Types User Assignment
        </Typography>
        <Typography component="p" variant="body2" color="textPrimary">
          This page is used to select which appointment types are used by
          which providers
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={3} className={classes.gridLabels}>
            <p>-</p>
            <p>Initial appointment 1/2 hour</p>
            <p>Initial appointment 1 hour</p>
            <p>Initial appointment 2 hour</p>
          </Grid>

          <Grid item xs={3}>
            <p>John Doe</p>
            <div className={classes.forms}>
              <div className={classes.labels}>
                <p>Fee</p>
                <p>Active</p>
              </div>
              <div className={classes.formFields}>
                <TextField
                  className={classes.formField}
                  variant="outlined"
                  margin="dense"
                  name="fee"
                  id="fee"
                  autoComplete="fee"
                  label="Fee"
                  value="100"
                />
                <Switch
                  checked
                  onChange={() => {}}
                  name="active"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>
              <div className={classes.formFields}>
                <TextField
                  className={classes.formField}
                  variant="outlined"
                  margin="dense"
                  name="fee"
                  id="fee"
                  autoComplete="fee"
                  label="Fee"
                  value="100"
                />
                <Switch
                  checked={false}
                  onChange={() => {}}
                  name="active"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>
              <div className={classes.formFields}>
                <TextField
                  className={classes.formField}
                  variant="outlined"
                  margin="dense"
                  name="fee"
                  id="fee"
                  autoComplete="fee"
                  label="Fee"
                  value="100"
                />
                <Switch
                  checked
                  onChange={() => {}}
                  name="active"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={3}>
            <p>Max Mustermann</p>
            <div />
            <div />
            <div />
          </Grid>
          <Grid item xs={3}>
            <p>Tim Johnson</p>
            <div />
            <div />
            <div />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

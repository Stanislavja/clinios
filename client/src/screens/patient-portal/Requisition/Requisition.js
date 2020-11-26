import React from "react";

import {
  Button, makeStyles, Typography, Grid, TextField, MenuItem,
} from "@material-ui/core";

import { timings } from "../../../static/patient-portal/appointments";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  btnContainer: {
    margin: theme.spacing(1, 0),
  },
  btn: {
    marginRight: 15,
    minWidth: 120,
  },
}));

const Encounters = () => {
  const classes = useStyles();

  const onFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Requisition
      </Typography>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <form onSubmit={onFormSubmit}>
          <TextField
            select
            required
            variant="outlined"
            label="Lab Requisitions"
            margin="dense"
            fullWidth
          >
            {timings.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </form>
      </Grid>
      <Grid
        container
        className={classes.btnContainer}
      >
        <Button
          variant="outlined"
          className={classes.btn}
        >
          Download
        </Button>
        <Button
          variant="outlined"
          className={classes.btn}
        >
          Print
        </Button>
      </Grid>
    </div>
  );
};

export default Encounters;

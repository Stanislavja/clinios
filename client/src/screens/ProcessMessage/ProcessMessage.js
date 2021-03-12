import React from "react";

import {
  Grid, Typography, makeStyles,
} from "@material-ui/core";

import MessageSection from "./components/MessageSection";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
  },
  gutterBottom: {
    marginBottom: theme.spacing(1),
  },
}));

const ProcessMessage = () => {
  const classes = useStyles();
  const messages = [1, 2, 3];
  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.gutterBottom}
      >
        Message From Patient
      </Typography>
      {
        messages.map(((item, index) => (
          <Grid key={item}>
            <MessageSection
              message={item}
              showDivider={messages.length !== index + 1}
            />
          </Grid>
        )))
      }
    </div>
  );
};

export default ProcessMessage;

import * as React from "react";

import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";

import Video from "../../components/videos/Video";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
}));
const ProcessLab = () => {
  const classes = useStyles();
  const { userId } = useParams();
  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Process Lab - ID:
        {" "}
        {userId}
      </Typography>
      <Grid container justify="center" spacing={8}>
        <Grid item md={6} xs={12} />
        <Grid item md={6} xs={12}>
          <Video url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProcessLab;

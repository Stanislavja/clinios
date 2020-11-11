import * as React from "react";

import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Video from "../../../../components/videos/Video";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
  },
}));

const Handouts = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={8}>
        <Grid item md={6} xs={12}>
          <Typography
            component="h1"
            variant="h2"
            color="textPrimary"
            className={classes.title}
          >
            Handouts
          </Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <Video url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Handouts;

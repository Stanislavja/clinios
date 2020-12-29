import * as React from "react";

import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Video from "../../../../components/videos/Video";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
  },
  titleButtonWrap: {
    display: "flex",
    marginBottom: theme.spacing(2),
    "& button": {
      marginLeft: theme.spacing(4),
    },
  },
}));

const Handouts = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={8}>
        <Grid item md={6} xs={12}>
          <div className={classes.titleButtonWrap}>
            <Typography
              component="h1"
              variant="h2"
              color="textPrimary"
              className={classes.title}
            >
              Handouts
            </Typography>
            <Button variant="outlined">Add</Button>
          </div>
          <p>These are files we give to patients about specific topics.</p>
        </Grid>
        <Grid item md={6} xs={12}>
          <Video url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Handouts;

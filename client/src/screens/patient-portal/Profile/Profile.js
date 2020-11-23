import React from "react";

import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import ProfileForm from "./Form";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
}));

const Profile = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Profile
      </Typography>
      <Typography
        variant="h5"
        color="textPrimary"
        className={classes.title}
      >
        This page is used to set your own personal information.
      </Typography>
      <ProfileForm />
    </div>
  );
};

export default Profile;

import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import WarningIcon from "@material-ui/icons/Warning";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    paddingTop: "60px",
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundSize: "cover",
    mixBlendMode: "overlay",
    backgroundColor: "rgb(255, 244, 229)",
  },
  title: {
    fontSize: "44px",
    color: "rgb(102, 60, 0)",
    width: "100%",
    display: "flex",
    backgorundPosition: "center",
    alignItems: "center",
    backgroundSize: "cover",
    justifyContent: "center",
    marginBottom: 0,
  },
  subTitle: {
    fontSize: "30px",
    color: "rgb(102, 60, 0)",
    margin: "0",
  },
}));

const Restricted = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.bg} />
      <WarningIcon style={{ size: "large" }} />
      <h1 className={classes.title}>Restricted area!</h1>
      <p className={classes.subTitle}>Only authorized user can access.</p>
    </div>
  );
};

export default Restricted;

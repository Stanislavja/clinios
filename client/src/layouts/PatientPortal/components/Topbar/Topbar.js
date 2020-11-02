import React from "react";

import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    backgroundColor: "#FFFFFF"
  },
  LogoWrapper: {
    display: "block",
    textAlign: "center",
    width: "100%",
    "& img": {
      width: "auto",
      height: "65px"
    }
  }
}));

const Topbar = (props) => {
  const { className, onSidebarOpen, user, ...rest } = props;
  const classes = useStyles();

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.LogoWrapper}>
          <img
            src={
              process.env.REACT_APP_API_URL +
              `static/client/c${user.client_id}_logo.png`
            }
            alt="Client portal logo"
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;

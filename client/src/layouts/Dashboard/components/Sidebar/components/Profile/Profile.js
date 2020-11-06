import React from "react";

import { Avatar, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputIcon from "@material-ui/icons/Input";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { logOut } from "../../../../../../store/auth/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    marginTop: theme.spacing(1),
  },
  authCredential: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
    backgroundColor: fade(theme.palette.secondary.light, 0.15),
  },
}));

const Profile = (props) => {
  const {
    className, isAuth, logout, user, ...rest
  } = props;

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleLogout = (event, authProviderLogOut) => {
    dispatch(logOut());
    authProviderLogOut();
    window.location.reload();
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={(user && user.avatar) || ""}
        to="/settings"
      />
      <Typography className={classes.name} variant="h4">
        {user && `${user.firstname} ${user.lastname}`}
      </Typography>
      <Typography variant="body2">{user && user.bio}</Typography>
      <>
        <Divider className={classes.divider} />
        <Hidden lgUp>
          <div className={classes.authCredential}>
            <IconButton
              className={classes.signOutButton}
              color="inherit"
              onClick={(event) => handleLogout(event, logout)}
            >
              <InputIcon />
            </IconButton>
          </div>
        </Hidden>
      </>
    </div>
  );
};

Profile.defaultProps = {
  className: null,
  logout: () => {},
};

Profile.propTypes = {
  className: PropTypes.string,
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  isAuth: PropTypes.bool.isRequired,
  logout: PropTypes.func,
};

export default Profile;

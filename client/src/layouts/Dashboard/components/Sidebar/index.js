import React from "react";

import { Divider, Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import { mdiChartBox, mdiAccount, mdiAccountSupervisor } from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "clsx";
import PropTypes from "prop-types";

import { Profile, SidebarNav, SearchBar } from "./components";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up("lg")]: {
      marginTop: 64,
      height: "calc(100% - 64px)",
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}));

const Sidebar = (props) => {
  const {
    open,
    variant,
    isAuth,
    logout,
    onClose,
    className,
    user,
    ...rest
  } = props;
  const classes = useStyles();

  const pages = [
    {
      title: "Home",
      href: "/dashboard/appoinment-types",
      icon: <Icon path={mdiAccount} size={1} horizontal vertical rotate={180} />,
    },
    {
      title: "Manage",
      href: "/manage/accounting-search",
      icon: (
        <Icon
          path={mdiAccountSupervisor}
          size={1}
          horizontal
          vertical
          rotate={180}
        />
      ),
    },
    {
      title: "Setup",
      href: "/setup/accounting-types",
      icon: <SettingsIcon />,
    },
    {
      title: "Reports",
      href: "/reports",
      icon: (
        <Icon path={mdiChartBox} size={1} horizontal vertical rotate={180} />
      ),
    },
    {
      title: "Myself",
      href: "/myself",
      icon: <Icon path={mdiAccount} size={1} horizontal vertical rotate={180} />,
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <Profile isAuth={isAuth} logout={logout} user={user} />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />
        <SearchBar />
      </div>
    </Drawer>
  );
};

Sidebar.defaultProps = {
  className: null,
  logout: () => {},
  onClose: () => {},
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  isAuth: PropTypes.bool.isRequired,
  logout: PropTypes.func,
};

export default Sidebar;

import React from "react";

import { Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PaymentIcon from "@material-ui/icons/Payment";
import ReceiptIcon from "@material-ui/icons/Receipt";
import SettingsIcon from "@material-ui/icons/Settings";
import {
  mdiChartBox,
  mdiAccount,
  mdiMessage,
  mdiHome,
  mdiTestTube,
  mdiAllergy,
  mdiPrescription,
  mdiPharmacy,
  mdiCalendar,
  mdiFormSelect,
  mdiLogoutVariant,
} from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "clsx";
import PropTypes from "prop-types";

import { SidebarNav } from "./components";

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
    open, variant, onClose, className, ...rest
  } = props;
  const classes = useStyles();

  const pages = [
    {
      title: "Home",
      href: "/patient",
      icon: <Icon path={mdiHome} size={1} horizontal vertical rotate={180} />,
    },
    {
      title: "Messages",
      href: "/patient/messages",
      icon: <Icon path={mdiMessage} size={1} horizontal vertical rotate={180} />,
    },
    {
      title: "Encounters",
      href: "/patient/encounters",
      icon: <SettingsIcon />,
    },
    {
      title: "Handouts",
      href: "/patient/handouts",
      icon: (
        <Icon path={mdiChartBox} size={1} horizontal vertical rotate={180} />
      ),
    },
    {
      title: "Labs/Documents",
      href: "/patient/labs",
      icon: (
        <Icon path={mdiTestTube} size={1} horizontal vertical rotate={180} />
      ),
    },
    {
      title: "Labs/Requisition",
      href: "/patient/labs-requisition",
      icon: (
        <Icon path={mdiTestTube} size={1} horizontal vertical rotate={180} />
      ),
    },
    {
      title: "Billing",
      href: "/patient/billing",
      icon: <ReceiptIcon />,
    },
    {
      title: "Payment Methods",
      href: "/patient/payment-methods",
      icon: <PaymentIcon />,
    },
    {
      title: "Allergies",
      href: "/patient/allergies",
      icon: <Icon path={mdiAllergy} size={1} horizontal vertical rotate={180} />,
    },
    {
      title: "Prescriptions",
      href: "/patient/prescriptions",
      icon: (
        <Icon
          path={mdiPrescription}
          size={1}
          horizontal
          vertical
          rotate={180}
        />
      ),
    },
    {
      title: "Pharmacies",
      href: "/patient/pharmacies",
      icon: (
        <Icon path={mdiPharmacy} size={1} horizontal vertical rotate={180} />
      ),
    },
    {
      title: "Appointments",
      href: "/patient/appointments",
      icon: (
        <Icon path={mdiCalendar} size={1} horizontal vertical rotate={180} />
      ),
    },
    {
      title: "Profile",
      href: "/patient/profile",
      icon: <Icon path={mdiAccount} size={1} horizontal vertical rotate={180} />,
    },
    {
      title: "Forms",
      href: "/patient/forms",
      icon: (
        <Icon path={mdiFormSelect} size={1} horizontal vertical rotate={180} />
      ),
    },
    {
      title: "Signoff",
      href: "/",
      logout: true,
      icon: (
        <Icon
          path={mdiLogoutVariant}
          size={1}
          horizontal
          vertical
          rotate={180}
        />
      ),
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
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <div {...rest} className={clsx(classes.root, className)}>
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  );
};

Sidebar.defaultProps = {
  className: null,
  onClose: () => {},
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;

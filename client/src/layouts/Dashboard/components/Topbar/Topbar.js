import React, { useState, useEffect } from "react";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
import moment from "moment";
import PropTypes from "prop-types";
import { NavLink as RouterLink, useHistory } from "react-router-dom";

import useAuth from "../../../../hooks/useAuth";
import useDebounce from "../../../../hooks/useDebounce";
import * as API from "../../../../utils/API";
import { SearchResults } from "./components";
import MenuWithDropDowns from "./components/MenuWithDropDowns";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
  },
  flexGrow: {
    flexGrow: 1,
  },
  toolbar: {
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  headerWithNav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    display: "none",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontWeight: 700,
    fontSize: "18px",
    marginRight: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    "& a": {
      color: theme.palette.white,
      textDecoration: "none",
    },
  },
  navs: {
    display: "block",
  },
  link: {
    color: "#ffffff",
    padding: "10px 10px",
    textDecoration: "none",
  },
  patientLink: {
    color: "#ffffff",
    padding: "10px 10px",
    textDecoration: "none",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  grow: {
    flexGrow: 0,
  },
  headerWithSearchBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  name: {
    marginRight: theme.spacing(2),
    fontSize: 14,
    color: theme.palette.primary.contrastText,
  },
  date: {
    fontSize: 14,
    color: theme.palette.primary.contrastText,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
}));

const pages = [
  {
    id: 1,
    title: "Home",
    href: "/dashboard",
  },
  {
    id: 2,
    title: "Manage",
    href: "/dashboard/manage",
    subMenus: [
      {
        id: 21,
        title: "Accounting Search",
        href: "/manage/accounting-search",
      },
      {
        id: 22,
        title: "Email Patients",
        href: "/manage/email-patients",
      },
      {
        id: 23,
        title: "Fax",
        href: "/manage/fax",
      },
      {
        id: 24,
        title: "Merge Patient",
        href: "/manage/merge-patient",
      },
      {
        id: 25,
        title: "Delete Patient",
        href: "/manage/delete-patient",
      },
      {
        id: 26,
        title: "Patient Search",
        href: "/manage/patient-search",
      },
      {
        id: 27,
        title: "Support Center",
        href: "/manage/support",
      },
    ],
  },
  {
    id: 23,
    title: "Setup",
    href: "/setup",
    subMenus: [
      {
        id: 31,
        title: "Accounting Types",
        href: "/setup/accounting-types",
      },
      {
        id: 32,
        title: "Appointment Types",
        href: "/setup/appointment-types",
      },
      {
        id: 33,
        title: "Appointment Types User Assignment",
        href: "/setup/appoinment-user-types",
      },
      {
        id: 34,
        title: "Backup",
        href: "/setup/backup",
      },
      {
        id: 35,
        title: "Configuration",
        href: "/setup/configuration",
      },
      {
        id: 36,
        title: "CPT Codes",
        href: "/setup/ctp-codes",
      },
      {
        id: 37,
        title: "Drugs",
        href: "/setup/drugs",
      },
      {
        id: 38,
        title: "Forms",
        href: "/setup/forms",
      },
      {
        id: 39,
        title: "Handouts",
        href: "/setup/handouts",
      },
      {
        id: 310,
        title: "ICD Codes",
        href: "/setup/icd-codes",
      },
      {
        id: 311,
        title: "Integrations",
        href: "/setup/integrations",
      },
      {
        id: 312,
        title: "Lab Ranges",
        href: "/setup/lab-ranges",
      },
      {
        id: 313,
        title: "Patient Portal Header",
        href: "/setup/patient-portal-header",
      },
      {
        id: 314,
        title: "Schedule",
        href: "/setup/schedule",
      },
      {
        id: 315,
        title: "Users",
        href: "/setup/users",
      },
    ],
  },
  {
    id: 4,
    title: "Reports",
    href: "/reports",
  },
  {
    id: 5,
    title: "Myself",
    href: "/myself",
  },
  {
    id: 6,
    title: "Logout",
    href: "/",
    logout: true,
  },
];


const corporate_pages = [
  {
    id: 1,
    title: "Home",
    href: "/corporate",
  },
  {
    id: 2,
    title: "Clients",
    href: "/corporate/clients",
  },
  {
    id: 3,
    title: "Users",
    href: "/corporate/users",
  },
  {
    id: 4,
    title: "Myself",
    href: "/corporate/myself",
  },
  {
    id: 6,
    title: "Logout",
    href: "/",
    logout: true,
  },
];

const Topbar = (props) => {
  const {
    className, onSidebarOpen, ...rest
  } = props;

  const classes = useStyles();
  const history = useHistory();
  const { lastVisitedPatient, user, logout } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [nothingFound, setNothingFound] = useState(false);

  const navPages = (user.role === "CORPORATE") ? corporate_pages : pages;
  const handleClose = () => {
    setOpen(false);
    setSearchTerm("");
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  useEffect(
    () => {
      // Make sure we have a value (user has entered something in input)
      if (debouncedSearchTerm) {
        // Fire off our API call
        API.search(debouncedSearchTerm).then(
          (response) => {
            const { data } = response;
            setResults(data);
            if (data.length < 1) {
              setNothingFound(true);
            }
          },
          (error) => {
            console.error("search error", error);
          },
        );
      } else {
        setResults([]);
        setNothingFound(false);
      }
    },
    // This is the useEffect input array
    // Our useEffect function will only execute if this value changes ...
    // ... and thanks to our hook it will only change if the original ...
    // value (searchTerm) hasn't changed for more than 500ms.
    [debouncedSearchTerm],
  );
  const handleLogout = async () => {
    try {
      await logout();
      history.push("/login_client");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar variant="dense" className={classes.toolbar}>
        <div className={classes.headerWithNav}>
          <Typography className={classes.title} variant="h6" noWrap>
            <RouterLink to="/dashboard" className={classes.titleAsLogo}>
              Clinios
            </RouterLink>
          </Typography>
          <Hidden mdDown>
            <div className={classes.navs}>
              {
                navPages.map((page) => (
                  page.subMenus
                    ? (
                      <MenuWithDropDowns
                        parentName={page.title}
                        parentChildrenItems={page.subMenus}
                        parentId={page.id}
                        key={page.id}
                      />
                    )
                    : (
                      <Button key={page.id}>
                        <RouterLink
                          to={page.href}
                          className={classes.link}
                          onClick={page.logout && handleLogout}
                        >
                          {page.title}
                        </RouterLink>
                      </Button>
                    )
                ))
              }

            </div>
          </Hidden>
        </div>
        <Hidden mdDown>
          <div className={classes.grow} />
          <div className={classes.headerWithSearchBar}>
            <div className={classes.sectionDesktop}>
              <Typography className={classes.name}>
                {
                  lastVisitedPatient && (
                    <RouterLink to={`/patients/${lastVisitedPatient.id}`} className={classes.patientLink}>
                      {lastVisitedPatient.firstname}
                      {" "}
                      {lastVisitedPatient.lastname}
                    </RouterLink>
                  )
                }
              </Typography>
              <Typography className={classes.date}>
                {moment().format("ddd, MMM Do")}
              </Typography>
            </div>

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                onChange={(e) => setSearchTerm(e.target.value)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
              {!!searchTerm && (
                <SearchResults
                  open={open}
                  handleClose={handleClose}
                  results={results}
                  noContent={
                    nothingFound && results.length < 1 && "Nothing found!"
                  }
                />
              )}
            </div>
          </div>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.defaultProps = {
  className: null,
  onSidebarOpen: () => {},
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

export default Topbar;

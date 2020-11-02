import React, { useState } from "react";

import { useMediaQuery } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";

import Sidebar from "../Dashboard/components/Sidebar";
import Topbar from "../Dashboard/components/Topbar";
import { AuthConsumer } from "./../../providers/AuthProvider";
import Footer from "./../Dashboard/components/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 60,
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 62
    }
  },
  shiftContent: {
    paddingLeft: 0
  },
  content: {
    height: "100%"
  }
}));

const Plain = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true
  });
  const [openSidebar, setOpenSidebar] = useState(false);

  const shouldOpenSidebar = isDesktop ? false : openSidebar;

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };
  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };
  return (
    <AuthConsumer>
      {({ isAuth, logout, user }) => (
        <div
          className={clsx({
            [classes.root]: true,
            [classes.shiftContent]: isDesktop
          })}
        >
          <Topbar
            onSidebarOpen={handleSidebarOpen}
            logout={logout}
            user={user}
          />
          <Sidebar
            onClose={handleSidebarClose}
            open={shouldOpenSidebar}
            variant={isDesktop ? "persistent" : "temporary"}
            isAuth={isAuth}
            logout={logout}
            user={user}
          />

          <Container maxWidth="xl">{children}</Container>
          <Footer />
        </div>
      )}
    </AuthConsumer>
  );
};

export default Plain;

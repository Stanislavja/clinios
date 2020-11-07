import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { AuthConsumer } from "../../providers/AuthProvider";

const Main = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };
  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };
  return (
    <AuthConsumer>
      {({ isAuth }) => (
        <div className="main-container">
          <Header onSidebarOpen={handleSidebarOpen} />
          <Sidebar
            onClose={handleSidebarClose}
            open={openSidebar}
            variant="temporary"
            isAuth={isAuth}
          />

          <Container maxWidth="lg">{children}</Container>
          <Footer />
        </div>
      )}
    </AuthConsumer>
  );
};

Main.defaultProps = {
  children: null,
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;

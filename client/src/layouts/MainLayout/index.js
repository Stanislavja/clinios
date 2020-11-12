import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { AuthConsumer } from "../../providers/AuthProvider";

const MainLayout = ({ children }) => {
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

MainLayout.defaultProps = {
  children: null,
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;

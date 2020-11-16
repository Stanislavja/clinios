import React from "react";

import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to="/login_client" />;
  }

  return (
    <>
      {children}
    </>
  );
};

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthGuard;

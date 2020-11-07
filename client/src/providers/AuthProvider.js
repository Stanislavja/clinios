import React from "react";

import PropTypes from "prop-types";

import AuthService from "../services/auth.service";

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    const isAuthenticated = AuthService.checkAuth();
    this.state = {
      isAuth: isAuthenticated || false,
    };
  }

  login() {
    this.setState({ isAuth: true });
  }

  logout() {
    this.setState({ isAuth: false });
    localStorage.removeItem("user");
  }

  render() {
    const { isAuth } = this.state;
    const { children } = this.props;
    return (
      <AuthContext.Provider
        value={{
          isAuth,
          login: this.login,
          logout: this.logout,
          user: JSON.parse(localStorage.getItem("user")),
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

AuthProvider.defaultProps = {
  children: null,
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

const AuthConsumer = AuthContext.Consumer;

export { AuthContext, AuthProvider, AuthConsumer };

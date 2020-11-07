import React from "react";

import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import { AuthConsumer } from "../providers/AuthProvider";

const PrivateRouteWithLayout = ({
  layout: Layout,
  component: Component,
  ...rest
}) => (
  <AuthConsumer>
    {({ isAuth }) => (
      <Route
        render={(props) => (isAuth ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: "/login_client",
              state: { from: props.location },
            }}
          />
        ))}
        {...rest}
      />
    )}
  </AuthConsumer>
);

PrivateRouteWithLayout.defaultProps = {
  location: null,
};

PrivateRouteWithLayout.propTypes = {
  layout: PropTypes.node.isRequired,
  component: PropTypes.node.isRequired,
  location: PropTypes.string,
};

export default PrivateRouteWithLayout;

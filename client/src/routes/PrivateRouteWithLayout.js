import React, { useContext } from "react";

import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../providers/AuthProvider";

const PrivateRouteWithLayout = ({
  layout: Layout,
  component: Component,
  ...rest
}) => {
  const { isAuth } = useContext(AuthContext);
  return (
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
  );
};

PrivateRouteWithLayout.defaultProps = {
  location: null,
};

PrivateRouteWithLayout.propTypes = {
  layout: PropTypes.node.isRequired,
  component: PropTypes.node.isRequired,
  location: PropTypes.objectOf(PropTypes.string),
};

export default PrivateRouteWithLayout;

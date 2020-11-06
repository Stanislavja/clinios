import React from "react";

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

export default PrivateRouteWithLayout;

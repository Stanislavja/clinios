import React from "react";

import PropTypes from "prop-types";
import { Route } from "react-router-dom";

const RouteWithLayout = (props) => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.node.isRequired,
  layout: PropTypes.node.isRequired,
};

export default RouteWithLayout;

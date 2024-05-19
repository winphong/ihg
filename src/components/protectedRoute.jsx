import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../services/miscService";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth.getCurrentAdmin())
          return (
            <Redirect
              to={{ pathname: "/admin", state: { from: props.location } }}
            />
          );

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;

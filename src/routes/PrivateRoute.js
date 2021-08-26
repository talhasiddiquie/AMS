import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  let data = sessionStorage.getItem("userData");
  console.log(data);
  return (
    <Route
      {...rest}
      render={() => {
        return data ? children : <Redirect to="/" />;
      }}
    />
  );
}
export default PrivateRoute;

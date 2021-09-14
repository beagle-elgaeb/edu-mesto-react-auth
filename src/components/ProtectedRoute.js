import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ path, children, loggedIn }) => {
  return <Route path={path}>{() => (loggedIn ? children : <Redirect to="./sign-in" />)}</Route>;
};

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default ProtectedRoute;

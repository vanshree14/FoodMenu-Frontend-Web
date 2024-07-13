import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {

  const isAuth = sessionStorage.getItem("isAuth");

  return isAuth ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateRoute;
import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {

  // const isAuth = true;
  const isAuth = sessionStorage.getItem("isAuth");
  return isAuth ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
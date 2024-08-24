import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const OtpRouter = () => {

  // const isAuth = true;
  const otp = sessionStorage.getItem("otp");
  
  return otp ? <Outlet /> : <Navigate to="/signup" />;
};

export default OtpRouter;
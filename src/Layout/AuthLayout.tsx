import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="auth-layout"> 
      {/* This is where the child routes will be rendered */}
      <Outlet />
    </div>
  );
};

export default AuthLayout;

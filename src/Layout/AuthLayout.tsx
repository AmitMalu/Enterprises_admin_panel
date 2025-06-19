import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row bg-white ">
      <Outlet />
    </div>
  );
};

export default AuthLayout;

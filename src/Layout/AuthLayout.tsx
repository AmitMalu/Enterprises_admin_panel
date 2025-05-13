import React from "react";
import { Outlet } from "react-router-dom";
import AuthContentWrapper from "../Features/Auth/AuthContentWrapper";

const AuthLayout : React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row bg-white ">
      <AuthContentWrapper>
        <Outlet />
      </AuthContentWrapper>
    </div>
  );
};

export default AuthLayout;

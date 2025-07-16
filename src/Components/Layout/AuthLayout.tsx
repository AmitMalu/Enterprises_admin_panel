import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContentWrapper from "./AuthContentWrapper";
import { checkTokenValidity } from "../../Utils/utils";
import { useAppDispatch } from "../../Redux/hooks";
import { resetMenuState } from "../../Redux/Features/Menu/MenuReducer";

const AuthLayout: React.FC = () => {
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();

  const isValid = checkTokenValidity(token);

  if (isValid) {
    dispatch(resetMenuState());
    return <Navigate to="/" />;
  }

  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row bg-white ">
      <AuthContentWrapper>
        <Outlet />
      </AuthContentWrapper>
    </div>
  );
};

export default AuthLayout;

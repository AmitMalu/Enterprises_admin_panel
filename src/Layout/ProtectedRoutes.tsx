import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  return (
    localStorage.getItem("token") !== null &&
    localStorage.getItem("token") !== "undefined" &&
    localStorage.getItem("token") !== ""
  );
};

const ProtectedRoutes = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;

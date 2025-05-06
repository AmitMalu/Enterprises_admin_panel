import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "../Layout/ProtectedRoutes";
import AuthLayout from "../Layout/AuthLayout";
import MainLayout from "../Layout/MainLayout";
import OtpVerify from "../Features/Auth/Pages/OtpVerify";

// Lazy loaded pages
const LoginPage = lazy(() => import("../Features/Auth/Pages/LoginPage"));
const HomePage = lazy(() => import("../Features/Home/HomePage"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <Routes>
        {/* Auth Routes with AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/otp-verify" element={<OtpVerify />} />
        </Route>

        {/* protected Routes with MainLayout */}
        <Route element={<ProtectedRoutes />}>
          {/* check if User has token? if yes ? render MainLayout : loginPage */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Route>

        {/* Redirect all unknown routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

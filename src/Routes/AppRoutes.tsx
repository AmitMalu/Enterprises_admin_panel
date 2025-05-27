import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../Components/Layout/AuthLayout";
import MainLayout from "../Components/Layout/MainLayout";
import LoginPage from "../Features/Auth/LoginPage";
import OtpVerify from "../Features/Auth/OtpVerify";
import ForgetPassword from "../Features/Auth/ForgetPassword";
import SetPassword from "../Features/Auth/SetPassword";
import UserCreation from "../Features/Management/UserCreation";
import UserFormPage from "../Features/Management/UserFormPage";
import ProtectedRoutes from "./ProtectedRoutes";
import PreFundingAuth from "../Features/Funding/PreFundingAuth";
import VendorMaster from "../Features/Master/VendorMaster";
import OperationMaster from "../Features/Master/OperationMaster";
import SubProductMaster from "../Features/Master/SubProductMaster";
import ProductMaster from "../Features/Master/ProductMaster";

// Lazy loaded pages
const HomePage = lazy(() => import("../Features/Dashboard/HomePage"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <Routes>
        {/* Auth Routes with AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/otp-verify" element={<OtpVerify />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/set-password" element={<SetPassword />} />
        </Route>

        {/* protected Routes with MainLayout */}
        <Route element={<ProtectedRoutes />}>
          {/* check if User has token? if yes ? render MainLayout : loginPage */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/master/product-master" element={<ProductMaster />} />
            <Route
              path="/master/sub-product-master"
              element={<SubProductMaster />}
            />
            <Route
              path="/master/operation-master"
              element={<OperationMaster />}
            />
            <Route path="/master/vendor-master" element={<VendorMaster />} />

            <Route path="/funding/pre-funding-authorization" element={<PreFundingAuth />} />
            
            <Route
              path="/management/user-creation"
              element={<UserCreation />}
            />
            <Route
              path="/management/user/create/:type"
              element={<UserFormPage />}
            />
          </Route>
        </Route>

        {/* Redirect all unknown routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

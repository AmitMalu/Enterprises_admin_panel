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
import OperatorMaster from "../Features/Master/OperatorMaster";
import SubProductMaster from "../Features/Master/SubProductMaster";
import ProductMaster from "../Features/Master/ProductMaster";
import PrefundingForm from "../Features/Funding/PrefundingForm";
import ProductForm from "../Features/Master/ProductForm";
import OperatorForm from "../Features/Master/OperatorForm";
import VendorForm from "../Features/Master/VendorForm";
import SubProductForm from "../Features/Master/SubProductForm";
import SchemesList from "../Features/Schemes/SchemesList";

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
              path="/master/product-master/add"
              element={<ProductForm mode="add" />}
            />
            <Route
              path="/master/product-master/edit/:id"
              element={<ProductForm mode="edit" />}
            />
            <Route
              path="/master/sub-product-master"
              element={<SubProductMaster />}
            />
            <Route
              path="/master/sub-product-master/add"
              element={<SubProductForm mode="add" />}
            />
            <Route
              path="/master/sub-product-master/edit/:id"
              element={<SubProductForm mode="edit" />}
            />

            <Route
              path="/master/operator-master"
              element={<OperatorMaster />}
            />
            <Route
              path="/master/operator-master/add"
              element={<OperatorForm mode="add" />}
            />
            <Route
              path="/master/operator-master/edit/:id"
              element={<OperatorForm mode="edit" />}
            />

            <Route path="/master/vendor-master" element={<VendorMaster />} />
            <Route
              path="/master/vendor-master/add"
              element={<VendorForm mode="add" />}
            />
            <Route
              path="/master/vendor-master/edit/:id"
              element={<VendorForm mode="edit" />}
            />

            <Route
              path="/funding/pre-funding-authorization"
              element={<PreFundingAuth />}
            />
            <Route
              path="/prefunding/add"
              element={<PrefundingForm mode="add" />}
            />
            <Route
              path="/prefunding/edit/:id"
              element={<PrefundingForm mode="edit" />}
            />

            <Route
              path="/management/user-creation"
              element={<UserCreation />}
            />
            <Route
              path="/management/user/create/:type"
              element={<UserFormPage />}
            />
             <Route
              path="/schemes/schemeslist"
              element={<SchemesList />}
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

import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../Components/Layout/AuthLayout";
import MainLayout from "../Components/Layout/MainLayout";
import LoginPage from "../Pages/Auth/LoginPage";
import OtpVerify from "../Pages/Auth/OtpVerify";
import ForgetPassword from "../Pages/Auth/ForgetPassword";
import SetPassword from "../Pages/Auth/SetPassword";
import UserCreation from "../Pages/Management/UserCreation";
import UserFormPage from "../Pages/Management/UserFormPage";
import ProtectedRoutes from "./ProtectedRoutes";
import PreFundingAuth from "../Pages/Funding/PreFundingAuth";
import VendorMaster from "../Pages/Master/Types/Vendor/VendorMaster";
import OperatorMaster from "../Pages/Master/Types/Operator/OperatorMaster";
import SubProductMaster from "../Pages/Master/Types/SubProduct/SubProductMaster";
import ProductMaster from "../Pages/Master/Types/Product/ProductMaster";
import PrefundingForm from "../Components/Organisms/PrefundingForm";
import ProductForm from "../Pages/Master/Types/Product/ProductForm";
import OperatorForm from "../Pages/Master/Types/Operator/OperatorForm";
import VendorForm from "../Pages/Master/Types/Vendor/VendorForm";
import SubProductForm from "../Pages/Master/Types/SubProduct/SubProductForm";
import SchemesList from "../Pages/Schemes/SchemesList";
import SchemeSettingsPage from "../Pages/Schemes/SchemeSettingsPage";

// Lazy loaded pages
const HomePage = lazy(() => import("../Pages/Dashboard/HomePage"));

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
            <Route path="/schemes/schemeslist" element={<SchemesList />} />

            <Route
              path="/schemes/setting/:schemeId"
              element={<SchemeSettingsPage />}
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

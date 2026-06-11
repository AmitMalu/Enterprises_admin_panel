import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "../Components/Layout/AuthLayout";
import MainLayout from "../Components/Layout/MainLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import { ReportRoutes } from "./ReportRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { MasterRoutes } from "./MasterRoutes";
import { FundingRoutes } from "./FundingRoutes";
import { ManagementRoutes } from "./ManagementRoutes";
import { SchemesRoutes } from "./SchemeRoutes";
import { NotificationRoutes } from "./NotificationRoutes";
import { SupportRoutes } from "./SupportRoutes";
import { WebSettingRoutes } from "./WebSettingRoutes";
import { MyAccountRoutes } from "./MyAccountRoutes";
import { NotFoundRoute } from "./NotFoundRoute";
import { LogsRoute } from "./LogsRoute";
import FullPageLoader from "../Components/Layout/FullPageLoader";
import TestComponent from "../Pages/TestComponent";

const HomePage = lazy(() => import("../Pages/Dashboard/HomePage"));
const Profile = lazy(() => import("../Pages/Account/Profile"));
const ChangePassword = lazy(() => import("../Pages/Auth/ChangePassword"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <Routes>
        {/*AuthLayout */}
        <Route element={<AuthLayout />}>{AuthRoutes}</Route>

        {/* ProtectedRoutes */}
        {/* check if User has token? if yes ? render MainLayout : loginPage */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<MainLayout />}>
            {/* MainLayout  */}
            <Route path="/" element={<HomePage />} />
            <Route path="/account/profile" element={<Profile />} />
            <Route path="/change-password" element={<ChangePassword />} />
            {MasterRoutes}
            {FundingRoutes}
            {ManagementRoutes}
            {SchemesRoutes}
            {ReportRoutes}
            {NotificationRoutes}
            {SupportRoutes}
            {WebSettingRoutes}
            {MyAccountRoutes}
            {LogsRoute}
          </Route>
        </Route>
        <Route path="/test-error" element={<TestComponent />} />
        {/* Redirect all unknown routes */}
        {NotFoundRoute}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

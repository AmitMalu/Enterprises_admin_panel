import { Route } from "react-router-dom";
import {
  ForgetPassword,
  LoginPage,
  OtpVerify,
  SetPassword,
} from "../Pages/Auth";

export const AuthRoutes = (
  <>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/otp-verify" element={<OtpVerify />} />
    <Route path="/forget-password" element={<ForgetPassword />} />
    <Route path="/set-password" element={<SetPassword />} />
  </>
);

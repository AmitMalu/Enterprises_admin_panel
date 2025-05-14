import loginImage from "../../assets/Images/loginPageBg.png";
import otpImage from "../..//assets/Images/otpVerifyBg.png";
import forgetImage from "../..//assets/Images/forgetPassBg.png";
import setPassImage from "../..//assets/Images/setPassBg.png";

export const authLayoutRouteConfig: Record<string, { step: number; bg: string }> = {
  "/login": { step: 1, bg: loginImage },
  "/otp-verify": { step: 2, bg: otpImage },
  "/forget-password": { step: 3, bg: forgetImage },
  "/set-password": { step: 4, bg: setPassImage },
};
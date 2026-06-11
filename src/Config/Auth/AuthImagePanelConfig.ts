import loginLeftImage from "../../assets/Images/loginLeftBg.png";
import loginRightImage from "../../assets/Images/loginRightBg.png";
// import otpImage from "../..//assets/Images/otpVerifyBg.png";
import forgetImage from "../..//assets/Images/ForgotPassLeftBg.png";
// import setPassImage from "../..//assets/Images/setPassBg.png";

export const authLayoutRouteConfig: Record<string, { step: number; bg: string; oneLiner: string; rightBg?: string }> = {
  "/login": { step: 1, bg: loginLeftImage, oneLiner: "Your Trusted Gateway to Smarter Banking. Login and take control of your future", rightBg: loginRightImage },
  "/otp-verify": { step: 2, bg: loginLeftImage, oneLiner: "Serious about your security. Passionate about your growth.", rightBg: loginRightImage },
  "/forget-password": { step: 3, bg: forgetImage, oneLiner: "Serious about your security. Passionate about your growth.", rightBg: loginRightImage },
  "/set-password": { step: 4, bg: forgetImage, oneLiner: "Serious about your security. Passionate about your growth.", rightBg: loginRightImage },
};
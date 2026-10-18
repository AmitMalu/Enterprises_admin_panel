import loginLeftImage from "../../assets/Images/loginLeftBg.png";
import loginRightImage from "../../assets/Images/loginRightBg.png";
// import otpImage from "../..//assets/Images/otpVerifyBg.png";
import forgetImage from "../..//assets/Images/ForgotPassLeftBg.png";
// import setPassImage from "../..//assets/Images/setPassBg.png";

export const authLayoutRouteConfig: Record<string, { step: number; bg: string; oneLiner: string; rightBg?: string }> = {
  "/login": { step: 1, bg: loginLeftImage, oneLiner: "One console to run your network, funding, schemes and reports.", rightBg: loginRightImage },
  "/otp-verify": { step: 2, bg: loginLeftImage, oneLiner: "Your account is protected with OTP verification and encrypted sessions.", rightBg: loginRightImage },
  "/forget-password": { step: 3, bg: forgetImage, oneLiner: "Your account is protected with OTP verification and encrypted sessions.", rightBg: loginRightImage },
  "/set-password": { step: 4, bg: forgetImage, oneLiner: "Your account is protected with OTP verification and encrypted sessions.", rightBg: loginRightImage },
};
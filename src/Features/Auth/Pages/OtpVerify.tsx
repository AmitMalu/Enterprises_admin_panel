import React, { useEffect, useState } from "react";
import LeftSideLayout from "../Component/LeftSideLayout";
import StepperLines from "../Component/StepperLines";
import otpVerifyBgImage from "../../../assets/Images/otpVerifyBg.png";
import { PinInput } from "@mantine/core";
import CommonButton from "../Component/CommonButton";
import { useScreenSize } from "../../../Utils/CustomHooks/useScreenSize";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../Redux/store";
import { otpVerify, resendOtp } from "../../../Redux/reducers/AuthReducer";
import { toast } from "react-toastify";

const OtpVerify: React.FC = () => {
  const screenSize = useScreenSize();
  const navigate = useNavigate();
  const [Otp, setOtp] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const locationState = location.state as {
    username?: string;
    otpFor?: string;
  };
  const username =
    locationState?.username ?? sessionStorage.getItem("otp-username") ?? "";
  const otpFor =
    locationState?.otpFor ?? sessionStorage.getItem("otpFor") ?? "";

  const pinSize =
    screenSize === "sm"
      ? "sm"
      : screenSize === "md" || screenSize === "lg"
      ? "md"
      : screenSize === "xl"
      ? "lg"
      : "xl";

  const handleResendOtp = async (): Promise<void> => {
    try {
      const result = await dispatch(resendOtp({ username })).unwrap();
      toast.success(result.message);
    } catch (error: any) {
      toast.error(error.message || "OTP resend failed");
    }
  };

  const handleOTPSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault(); // Prevent default form submission
    setHasSubmitted(true); // Set submitted state to true
    if (Otp.length < 6) {
      return; // Do not proceed if invalid
    }
    try {
      const result = await dispatch(otpVerify({ username, otp: Otp })).unwrap();
      toast.success(result.message);
      if (otpFor === "forgetPassword") {
        navigate("/set-password");
      } else if (otpFor === "login") {
        sessionStorage.removeItem("otpFor");
        sessionStorage.removeItem("otp-username");
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message || "OTP verification failed");
    }
  };

  useEffect(() => {
    const resolvedUsername =
      locationState?.username ?? sessionStorage.getItem("otp-username");
    const resolvedOtpFor =
      locationState?.otpFor ?? sessionStorage.getItem("otpFor");

    if (!resolvedUsername || !resolvedOtpFor) {
      toast.error("Session expired. Please login again.");
      navigate("/login", { replace: true });
    } else {
      sessionStorage.setItem("otp-username", resolvedUsername);
      sessionStorage.setItem("otpFor", resolvedOtpFor);
    }
  }, []);

  return (
    <>
      {/* Left Side - only visible on large screens */}
      <LeftSideLayout bgImage={otpVerifyBgImage}>
        <StepperLines activeStep={2} totalSteps={4} />
      </LeftSideLayout>

      {/* Right Side */}
      <div className="w-full lg:w-[35%] h-full flex items-center justify-center overflow-auto">
        <div className="w-full px-10 flex flex-col text-left">
          <h2 className="pl-4 mb-8 text-[#4C4C57] font-geologica  text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl font-medium mb-6">
            Enter OTP
          </h2>

          <div className="pl-4 mb-8 font-poppins font-normal text-sm 2xl:text-xl 3xl:text-2xl text-[#BF0204]">
            Please Enter Your OTP
          </div>
          <form onSubmit={handleOTPSubmit}>
            <div className="flex justify-center items-center ">
              <PinInput
                value={Otp}
                onChange={(value) => setOtp(value)} // Update OTP state on change
                oneTimeCode
                placeholder=""
                size={pinSize}
                length={6}
                error={hasSubmitted && Otp.length < 6} // Show error only after submission attempt
                type="number"
              />
            </div>

            <div
              onClick={handleResendOtp}
              className="pl-4 font-poppins font-normal text-sm 2xl:text-xl 3xl:text-2xl cursor-pointer text-[#BF0204] text-center py-6"
            >
              Resend OTP
            </div>

            <div className="flex justify-center items-center ">
              <CommonButton type="submit" className="w-[80%] ">
                VERIFY
              </CommonButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OtpVerify;

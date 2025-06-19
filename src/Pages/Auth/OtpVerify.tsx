import React, { useEffect, useState } from "react";
import { useScreenSize } from "../../Utils/hooks/useScreenSize";
import { useLocation, useNavigate } from "react-router-dom";
import { otpVerify, resendOtp } from "../../Redux/Features/Auth/Thunk";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../Redux/hooks";
import TextInputComponent from "../../Components/Atoms/TextInputComponent";
import { logoutUser } from "../../Utils/utils";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";

const OtpVerify: React.FC = () => {
  const screenSize = useScreenSize();
  const navigate = useNavigate();
  const [Otp, setOtp] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const dispatch = useAppDispatch();
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
    if (Otp.length < 6) return;

    try {
      const result = await dispatch(otpVerify({ username, otp: Otp })).unwrap();
      toast.success(result.message);
      if (otpFor === "forgetPassword") {
        navigate("/set-password", {
          state: { username: username }, // Pass username to Set Password page);
        });
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
      logoutUser();
    } else {
      sessionStorage.setItem("otp-username", resolvedUsername);
      sessionStorage.setItem("otpFor", resolvedOtpFor);
    }
  }, []);

  return (
    <div className="w-full px-10 flex flex-col text-left">
      <h2 className="pl-4 mb-8 text-[#4C4C57] font-geologica  text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl font-medium mb-6">
        Enter OTP
      </h2>

      <div className="pl-4 mb-8 font-poppins font-normal text-sm 2xl:text-xl 3xl:text-2xl text-[#BF0204]">
        Please Enter Your OTP
      </div>
      <form onSubmit={handleOTPSubmit}>
        <div className="flex justify-center items-center ">
          <TextInputComponent
            name="otp"
            value={Otp}
            onChange={(e) => setOtp(e.target.value)} // Update OTP state on change
            oneTimeCode
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

        <div className="flex justify-center items-center">
          <ButtonComponent
            fullWidth
            size="md"
            bgColor="#DB2729"
            textColor="#fff"
            radius={12}
            type="submit"
          >
            VERIFY
          </ButtonComponent>
        </div>
      </form>
    </div>
  );
};

export default OtpVerify;

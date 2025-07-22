import React, { useEffect } from "react";
import { useScreenSize } from "../../Utils/hooks/useScreenSize";
import { useLocation, useNavigate } from "react-router-dom";
import { otpVerify, resendOtp } from "../../Redux/Features/Auth/Thunk";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../Redux/hooks";
import TextInputComponent from "../../Components/Atoms/TextInputComponent";
import { logoutUser, setLoginData } from "../../Utils/utils";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { useThrottledFormSubmit } from "../../Utils/hooks/useThrottleFormSubmit";
import * as Yup from "yup";
import { Form, Formik } from "formik";

const validationSchema = Yup.object({
  otp: Yup.string().length(6, "OTP must be 6 digits").required("OTP is required"),
})

const OtpVerify: React.FC = () => {
  const screenSize = useScreenSize();
  const navigate = useNavigate();

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
      const result = await dispatch(resendOtp({ userName: username })).unwrap();
      toast.success(result.message);
      toast.success(result.data.otp, {
        autoClose: false, // Do not close automatically
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
      });
    } catch (error: any) {
      toast.error(error.message || "OTP resend failed");
    }
  };

  const handleOTPSubmit = useThrottledFormSubmit((values: { otp: string }) => {
    if (values.otp.length < 6) return;

    const handleAsync = async () => {
      try {
        const result = await dispatch(
          otpVerify({ userName: username, otp: values.otp })
        ).unwrap();
        toast.success(result.message);
        setTimeout(() => {
          toast.dismiss();
        }, 1500)
        if (otpFor === "forgetPassword") {
          navigate("/set-password", {
            state: { username: username }, // Pass username to Set Password page);
          });
        } else if (otpFor === "login") {
          setLoginData(dispatch, result.data);
          sessionStorage.setItem("justLoggedIn", "true");
          if (username) {
            localStorage.setItem("username", username);
          }
          sessionStorage.removeItem("otpFor");
          sessionStorage.removeItem("otp-username");
          navigate("/");
        }
      } catch (error: any) {
        toast.error(error.message || "OTP verification failed");
      }
    }

    handleAsync();
  }, 5000)

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

      <Formik
        enableReinitialize
        validateOnBlur={false}
        initialValues={{ otp: "" }}
        validationSchema={validationSchema}
        onSubmit={handleOTPSubmit}
      >
        {({ values, handleChange, errors, submitCount }) => (
          <Form>
            <div className="flex justify-center items-center ">
              <TextInputComponent
                name="otp"
                value={values.otp}
                onChange={handleChange}
                oneTimeCode
                size={pinSize}
                length={6}
                error={!!errors.otp && submitCount > 0 ? errors.otp : undefined} // Show error only after submission attempt
                type="text"
              />
            </div>

            <div
              className="pl-4 py-4 text-center"
            >
              <ButtonComponent
                onClick={handleResendOtp}
                textColor="#BF0204"
                fontSize="14"
                font="poppins"
                throttleMs={10000}
              >
                Resend OTP
              </ButtonComponent>
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OtpVerify;

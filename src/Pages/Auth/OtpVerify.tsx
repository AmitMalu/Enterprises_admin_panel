import { useEffect, useState } from "react";
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
import { IconArrowLeft } from "@tabler/icons-react";
import { colors } from "../../theme/colors";
import { Card } from "@mantine/core";
import { OtpKeyIconSvg } from "../../assets/Icons/Svgs";

const validationSchema = Yup.object({
  otp: Yup.string().length(6, "OTP must be 6 digits").required("OTP is required"),
})

const OtpVerify = () => {
  const screenSize = useScreenSize();
  const navigate = useNavigate();

  const [timer, setTimer] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const location = useLocation();
  const locationState = location.state as {
    username?: string;
    password?: string;
    otpFor?: string;
    // otp?: string;
  };
  const username =
    locationState?.username ?? sessionStorage.getItem("otp-username") ?? "";
  const password =
    locationState?.password ?? sessionStorage.getItem("password") ?? "";
  const otpFor =
    locationState?.otpFor ?? sessionStorage.getItem("otpFor") ?? "";
  // const otp =
  //   locationState?.otp ?? sessionStorage.getItem("otp") ?? "";

  const pinSize =
    screenSize === "sm"
      ? "sm"
      : screenSize === "md" || screenSize === "lg"
        ? "sm"
        : screenSize === "xl"
          ? "sm"
          : "md";

  const handleResendOtp = async (): Promise<void> => {
    try {
      const result = await dispatch(resendOtp({ userName: username })).unwrap();
      toast.dismiss();
      toast.success(result.message);
      // toast.success(result.data.otp, {
      //   toastId: "resend-otp-toast",
      //   autoClose: false, // Do not close automatically
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: false,
      // });
      setTimer(30);
    } catch (error: any) {
      toast.error(error.message || "OTP resend failed");
    }
  };

  const handleOTPSubmit = useThrottledFormSubmit((values: { otp: string }) => {
    if (values.otp.length < 6) return;

    const handleAsync = async () => {
      try {
        setIsSubmitting(true); // Start loading
        setHasError(false); // Reset error state on new submission
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
        setHasError(true); // Set error state on failure
        toast.error(error.message || "OTP verification failed");
      } finally {
        setIsSubmitting(false); // Stop loading
      }
    }

    handleAsync();
  }, 5000)

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000)
    }
    return () => clearInterval(interval);
  }, [timer])

  useEffect(() => {
    setTimer(30)
  }, [])

  useEffect(() => {
    const resolvedUsername =
      locationState?.username ?? sessionStorage.getItem("otp-username");
    const resolvedOtpFor =
      locationState?.otpFor ?? sessionStorage.getItem("otpFor");
    // const resolvedOtp =
    //   locationState?.otp ?? sessionStorage.getItem("otp");

    if (!resolvedUsername || !resolvedOtpFor) {
      logoutUser();
    } else {
      sessionStorage.setItem("otp-username", resolvedUsername);
      sessionStorage.setItem("otpFor", resolvedOtpFor);
      // if (resolvedOtp) {
      //   sessionStorage.setItem("otp", resolvedOtp);
      // }
    }
  }, []);

  return (
    <Card
      shadow="none"
      p="xl"
      withBorder={false}
      className="w-full bg-transparent"
    >
      <div className="mb-6">
        <h1 className="text-[28px] font-extrabold tracking-tight text-slate-900">Verify it’s you</h1>
      </div>

      <div className="text-center mb-8 font-poppins font-normal text-sm 2xl:text-xl 3xl:text-2xl text-brand-primary">
        Please enter your One-Time Password (OTP) Sent to
        your registered mobile number below.
      </div>

      {/* OTP Text Above Input Boxes */}
      <div className="text-left mb-1">
        <span className="text-brand-accent font-geologica font-medium text-md">
          OTP
        </span>
      </div>

      <Formik
        enableReinitialize
        validateOnBlur={false}
        initialValues={{ otp: "" }}
        validationSchema={validationSchema}
        onSubmit={handleOTPSubmit}
      >
        {({ values, handleChange, errors, submitCount }) => {
          // useEffect(() => {
          //   if (values.otp && values.otp.length === 6 && !hasError) {
          //     submitForm();
          //   }
          // }, [values.otp, hasError]);

          // Reset error state when user changes OTP
          useEffect(() => {
            if (hasError && values.otp.length < 6) {
              setHasError(false);
            }
          }, [values.otp, hasError]);

          return (
            <Form>
              <div className="flex flex-row items-center justify-center gap-4">
                <div className="flex justify-start">
                  <OtpKeyIconSvg width={20} height={20} color={colors.text.soft} />
                </div>
                <span className="text-text-soft">|</span>
                <div className="flex-1">
                  <TextInputComponent
                    name="otp"
                    value={values.otp}
                    onChange={handleChange}
                    oneTimeCode
                    radius="xl"
                    size={pinSize}
                    length={6}
                    error={!!errors.otp && submitCount > 0 ? errors.otp : undefined} // Show error only after submission attempt
                    type="text"
                  />
                </div>

              </div>

              <div className="text-center text-sm my-4 flex justify-center items-center gap-1">
                <span style={{ color: colors.brand.light }}>
                  Didn’t receive the OTP?
                </span>

                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={timer > 0}
                  style={{
                    color: timer > 0 ? colors.text.soft : colors.brand.primary,
                    cursor: timer > 0 ? "not-allowed" : "pointer",
                    fontWeight: 500,
                    background: "none",
                    border: "none",
                    padding: 0,
                  }}
                  className={timer === 0 ? "hover:underline" : ""}
                >
                  {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
                </button>
              </div>

              <div className="w-[50%] mx-auto flex flex-col-reverse gap-2">
                <ButtonComponent
                  fullWidth
                  size="md"
                  bgColor={colors.text.inverse}
                  textColor={colors.brand.accent}
                  borderColor={colors.brand.accent}
                  radius={10}
                  leftIcon={<IconArrowLeft />}
                  onClick={() => {
                    if (otpFor === "forgetPassword") {
                      sessionStorage.setItem("from-login-forget", "true");
                      navigate("/forget-password");
                    } else {
                      navigate("/login", {
                        state: { username, password },
                      });
                    }
                    toast.dismiss();
                    sessionStorage.removeItem("otpFor");
                    sessionStorage.removeItem("otp-username");
                  }}
                >
                  Back
                </ButtonComponent>
                <ButtonComponent
                  fullWidth
                  size="md"
                  bgColor={colors.brand.primary}
                  textColor={colors.text.inverse}
                  radius={10}
                  type="submit"
                >
                  {isSubmitting ? (
                    <div>
                      Verifying OTP...
                    </div>
                  ) : (
                    <div>
                      Verify
                    </div>
                  )}
                </ButtonComponent>
              </div>
            </Form>
          )
        }}
      </Formik>
    </Card>
  );
};

export default OtpVerify;

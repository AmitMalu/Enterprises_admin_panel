import React, { useEffect } from "react";
import {
  // AppleSvg,
  // FacebookSvg,
  // GoogleSvg,
  LockIconSvg,
  UsernameSvg,
} from "../../assets/Icons/Svgs";
import welcomeTextImage from "../../assets/Images/WelcomeText.png";
import loginAccountTextImage from "../../assets/Images/LoginAccountText.png";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { encryptCredentials, persistOtpSession } from "../../Utils/utils";
import { useAppDispatch } from "../../Redux/hooks";
import TextInputComponent from "../../Components/Atoms/TextInputComponent";
import { login } from "../../Redux/Features/Auth/Thunk";
import {
  passwordValidation,
  usernamePhoneEmailValidation,
} from "../../Utils/ValidationUtils";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { useThrottledFormSubmit } from "../../Utils/hooks/useThrottleFormSubmit";
import { colors } from "../../theme/colors";
import { Card } from "@mantine/core";

const validationSchema = Yup.object().shape({
  username: usernamePhoneEmailValidation,
  password: passwordValidation,
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleForgetPassword = () => {
    sessionStorage.setItem("from-login-forget", "true");
    navigate("/forget-password");
  };

  const handleSubmit = useThrottledFormSubmit<{
    username: string;
    password: string;
  }>((values) => {
    const handleAsync = async () => {

      const { encryptedUsername, encryptedPassword, salt, iv } = encryptCredentials(values.username, values.password);

      try {
        const hostname = window.location.hostname;

        const isDevEnv = ["localhost", "127.0.0.1"].includes(hostname) ||
          hostname.startsWith("192.168.") ||
          hostname === ""; // in case of file:// or blank

        const result = await dispatch(
          login({
            userName: encryptedUsername,
            password: encryptedPassword,
            salt,
            iv,
            url: isDevEnv ? "https://uat.nfttech.in/" : `${window.location.origin}/`,
          })
        ).unwrap();

        //Admin , Admin User, WhiteLabel Admin, WhiteLabel User
        const AllowedRoles = ["AD", "AU", "WLAD", "WLAU"]

        const role = result?.data?.role;
        if (!AllowedRoles.includes(role)) {
          toast.error("Invalid credentials");
          return;
        }

        toast.success(result.message);
        // toast.success(result.data.otp, {
        //   toastId: "otp-toast",
        //   autoClose: false, // Do not close automatically
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: false,
        // });
        persistOtpSession(values.username, "login");
        navigate("/otp-verify", {
          state: {
            username: values.username, otpFor: "login" //, otp: result.data.otp
          },
        });
      } catch (error) {
        toast.error((error as string) || "Login failed");
      }
    };

    handleAsync();
  }, 5000);

  useEffect(() => {
    toast.dismiss();
    sessionStorage.removeItem("from-login-forget"); // Remove stale flag
  }, []);

  return (
    <Card
      shadow="xl"
      p="xl"
      radius="xl"
      // withBorder
      className="w-95 bg-white/95 backdrop-blur-sm border-gray-100"
    >
      {/* Welcome Text */}
      <div className="flex justify-center mb-4">
        <img
          src={welcomeTextImage}
          alt="Welcome Back"
          className="max-w-full h-auto"
        />
      </div>
      <div className="flex justify-center mb-6">
        <img
          src={loginAccountTextImage}
          alt="Login to Your Account"
          className="max-w-full h-auto"
        />
      </div>

      <Formik
        enableReinitialize
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            {/* Username */}
            <TextInputComponent
              type="text"
              className="mb-4"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              placeholder="Username"
              required
              error={formik.touched.username && formik.errors.username}
              maxLength={51}
              radius="lg"
              leftSection={<UsernameSvg />}
              leftSectionWidth={36}
            />

            {/* Password */}
            <TextInputComponent
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="********"
              required
              radius="lg"
              leftSection={<LockIconSvg />}
              leftSectionWidth={36}
              rightSectionWidth={48}
              error={
                formik.touched.password
                  ? formik.errors.password || false
                  : false
              }
              maxLength={51}
            />

            {/* Forgot Password? */}
            <div
              className="mt-1 font-geologica font-normal text-sm xl:text-sm 2xl:text-xl text-right text-text-brand-light"
            >
              <span
                className="cursor-pointer hover:underline"
                onClick={handleForgetPassword}
              >
                Forget Password?
              </span>
            </div>

            {/* Login Button */}
            <div className="flex justify-center items-center mt-3">
              <ButtonComponent
                size="md"
                bgColor={colors.brand.accent}
                textColor={colors.text.inverse}
                radius={24}
                type="submit"
              >
                LOGIN NOW
              </ButtonComponent>
            </div>
          </Form>
        )}
      </Formik>

      {/* Divider */}
      {/* <div className="flex items-center w-full">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="font-open px-3 text-black text-sm xl:text-sm 2xl:text-xl font-medium">
          Or Login With
        </span>
        <hr className="flex-grow border-t border-gray-400" />
      </div> */}

      {/* Social Icons */}
      {/* <div className="flex items-center justify-center gap-6 my-6">
        <FacebookSvg />
        <GoogleSvg />
        <AppleSvg />
      </div> */}

      {/* Sign Up Prompt */}
      {/* <p className="text-center text-sm xl:text-lg 2xl:text-xl font-lora text-text-soft ">
        Don't have an account?
        <span className="text-status-danger cursor-pointer"> Sign up here</span>
      </p> */}
    </Card>
  );
};

export default LoginPage;

import React, { useEffect } from "react";
import {
  // AppleSvg,
  // FacebookSvg,
  // GoogleSvg,
  LockIconSvg,
  UsernameSvg,
} from "../../assets/Icons/Svgs";
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
        const isDevEnv = ["localhost", "127.0.0.1"].includes(window.location.hostname) ||
          window.location.hostname.startsWith("192.168.") ||
          window.location.hostname === ""; // in case of file:// or blank

        const result = await dispatch(
          login({
            userName: encryptedUsername,
            password: encryptedPassword,
            salt,
            iv,
            url: isDevEnv ? "https://uat.decipay.in/" : `${window.location.origin}/`,
          })
        ).unwrap();

        toast.success(result.message);
        toast.success(result.data.otp, {
          toastId: "otp-toast",
          autoClose: false, // Do not close automatically
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        });
        persistOtpSession(values.username, "login");
        navigate("/otp-verify", {
          state: {
            username: values.username, otpFor: "login"
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
    <div className="w-full px-10 flex flex-col text-left">
      {/* Welcome Text */}
      <p className="text-[#747483] font-extralight font-geologica text-xl md:text-sm xl:text-2xl 2xl:text-3xl mb-1">
        Welcome Back
      </p>
      <h2 className="text-[#4C4C57] font-geologica  text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-medium mb-6">
        Login to Your Account
      </h2>

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
              leftSection={<UsernameSvg />}
              leftSectionWidth={36}
            />

            {/* Password */}
            <TextInputComponent
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
              required
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

            {/* Login Button */}
            <div className="flex justify-center items-center mt-5">
              <ButtonComponent
                fullWidth
                size="md"
                bgColor="#DB2729"
                textColor="#fff"
                radius={8}
                type="submit"
              >
                LOGIN NOW
              </ButtonComponent>
            </div>
          </Form>
        )}
      </Formik>

      {/* Forgot Password? */}
      <div
        onClick={handleForgetPassword}
        className="mb-4 font-geologica font-normal text-sm xl:text-sm 2xl:text-xl cursor-pointer text-right text-[#4C4C57]"
      >
        Forget Password?
      </div>

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
      {/* <p className="text-center text-sm xl:text-lg 2xl:text-xl font-lora text-[#747483] ">
        Don't have an account?
        <span className="text-[#BF0204] cursor-pointer"> Sign up here</span>
      </p> */}
    </div>
  );
};

export default LoginPage;

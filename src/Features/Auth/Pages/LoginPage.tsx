import React, { useEffect } from "react";
import bgImage from "../../../assets/Images/loginPageBg.png";
import orgLogo from "../../../assets/Images/orgLogo.png";
import { UsernameInput } from "../Component/UsernameInput";
import { PasswordInputBox } from "../Component/PasswordInputBox";
import CommonButton from "../Component/CommonButton";
import { AppleSvg, FacebookSvg, GoogleSvg } from "../../../assets/Icons/Svgs";
import { useFormik } from "formik";
import * as Yup from "yup";
import StepperLines from "../Component/StepperLines";
import LeftSideLayout from "../Component/LeftSideLayout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Redux/store";
import { login } from "../../../Redux/reducers/AuthReducer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { persistOtpSession } from "../../../Utils/utils";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .max(50, "Username cannot be longer than 50 characters")
    .test(
      "is-valid-username",
      "Username must be a valid mobile number or email",
      function (value) {
        const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile numbers start from 6-9
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) return false;
        return phoneRegex.test(value) || emailRegex.test(value);
      }
    ),
  password: Yup.string()
    .required("Password is required")
    .max(50, "Password cannot be longer than 50 characters")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least One Uppercase letter")
    .matches(/[a-z]/, "Password must contain at least One Lowercase letter")
    .matches(/[0-9]/, "Password must contain at least One Number")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least One Special Character"
    )
    .matches(/^\S*$/, "No spaces allowed"),
});

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {} = useSelector((state: RootState) => state.auth);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const handleForgetPassword = () => {
    sessionStorage.setItem("from-login-forget", "true");
    navigate("/forget-password");
  };

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      const result = await dispatch(login(values)).unwrap();
      toast.success(result.message);
      persistOtpSession(values.username, "login"); //set both values in Session storage
      navigate("/otp-verify", {
        state: { username: values.username, otpFor: "login" },
      });
    } catch (error) {
      toast.error((error as string) || "Login failed");
    }
  };

  useEffect(() => {
    sessionStorage.removeItem("from-login-forget"); // Remove stale flag
  }, []);

  return (
    <>
      {/* Left Side - only visible on large screens */}
      <LeftSideLayout bgImage={bgImage}>
        <StepperLines activeStep={1} totalSteps={4} />
      </LeftSideLayout>

      {/* Right Side */}
      <div className="w-full lg:w-[35%] h-full flex items-center justify-center overflow-auto">
        <div className="w-full px-10 flex flex-col text-left">
          {/* Welcome Text */}
          <p className="text-[#747483] font-extralight font-geologica text-xl md:text-sm xl:text-2xl 2xl:text-3xl mb-1">
            Welcome Back
          </p>
          <h2 className="text-[#4C4C57] font-geologica  text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-medium mb-6">
            Login to Your Account
          </h2>

          {/* Username */}
          <form onSubmit={formik.handleSubmit}>
            <UsernameInput
              className="mb-4"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              placeholder="Username"
              required
              error={formik.touched.username && formik.errors.username}
              max={51}
            />

            {/* Password */}
            <PasswordInputBox
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
              required
              name="password"
              max={51}
              error={
                formik.touched.password
                  ? formik.errors.password || false
                  : false
              }
            />

            <CommonButton type="submit" className="mt-4 mb-2">
              LOGIN NOW
            </CommonButton>
          </form>

          {/* Forgot Password? */}
          <div
            onClick={handleForgetPassword}
            className="mb-4 font-geologica font-normal text-sm xl:text-sm 2xl:text-xl cursor-pointer text-right text-[#4C4C57]"
          >
            Forget Password?
          </div>

          {/* Divider */}
          <div className="flex items-center w-full">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="font-open px-3 text-black text-sm xl:text-sm 2xl:text-xl font-medium">
              Or Login With
            </span>
            <hr className="flex-grow border-t border-gray-400" />
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-6 my-6">
            <FacebookSvg />
            <GoogleSvg />
            <AppleSvg />
          </div>

          {/* Sign Up Prompt */}
          <p className="text-center text-sm xl:text-lg 2xl:text-xl font-lora text-[#747483] ">
            Don't have an account?
            <span className="text-[#BF0204] cursor-pointer"> Sign up here</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

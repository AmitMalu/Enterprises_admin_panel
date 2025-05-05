import React, { useState } from "react";
import bgImage from "../../../assets/Images/loginPageBg.png";
import orgLogo from "../../../assets/Images/orgLogo.png";
import { UsernameInput } from "../Component/UsernameInput";
import { PasswordInputBox } from "../Component/PasswordInputBox";
import CommonButton from "../Component/CommonButton";
import { AppleSvg, FacebookSvg, GoogleSvg } from "../../../assets/Icons/Svgs";
import { useFormik } from "formik";
import * as Yup from "yup";

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
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form values:", values);
      handleLogin(values);
    },
  });

  const handleLogin = (values: { username: string; password: string }) => {
    console.log("Logging in with:", values.username, values.password);
  };

  return (
    <div className="w-screen h-screen flex bg-white ">
      {/* Left Side */}
      <div className="hidden md:block w-[65%] h-full relative overflow-hidden bg-[#F2ECEC]">
        <img
          src={bgImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Logo */}
        <div className="absolute top-0 left-6">
          <img
            src={orgLogo}
            alt="Instant Mudra Logo"
            className="w-24 md:w-32 max-w-none"
          />
        </div>

        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-[5px]">
          <div className="w-[6px] h-[12vh] bg-[#FF4D4D] rounded-full"></div>
          <div className="w-[6px] h-[4vh] bg-[#FF4D4D] rounded-full"></div>
          <div className="w-[6px] h-[4vh] bg-[#FF4D4D] rounded-full"></div>
          <div className="w-[6px] h-[4vh] bg-[#FF4D4D] rounded-full"></div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-[35%] h-full flex items-center justify-center">
        <div className="w-full px-10 flex flex-col text-left">
          {/* Welcome Text */}
          <p className="text-[#747483] font-extralight font-geologica text-xl md:text-sm xl:text-2xl 2xl:text-3xl mb-1">
            Welcome Back
          </p>
          <h2 className="text-[#4C4C57] font-geologica md:text-lg text-2xl xl:text-3xl 2xl:text-4xl font-medium mb-6">
            Login to Your Account
          </h2>
          {/* Username */}
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <UsernameInput
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                placeholder="Username"
                required
                error={formik.touched.username && formik.errors.username}
                max={51}
              />
            </div>

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
          <div className="mb-4 font-geologica font-normal text-sm xl:text-sm 2xl:text-xl cursor-pointer text-right text-[#4C4C57]">
            Forget Password?
          </div>

          {/* Divider */}
          <div className="flex items-center w-full">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="px-3 text-black text-sm xl:text-sm 2xl:text-xl font-medium">
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
    </div>
  );
};

export default LoginPage;

import React from "react";
import LeftSideLayout from "../Component/LeftSideLayout";
import StepperLines from "../Component/StepperLines";
import bgImage from "../../../assets/Images/forgetPassBg.png";
import { UsernameInput } from "../Component/UsernameInput";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Redux/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CommonButton from "../Component/CommonButton";
import { forgetPassword } from "../../../Redux/reducers/AuthReducer";

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
});

const ForgetPassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {} = useSelector((state: RootState) => state.auth);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleForgetPassword(values);
    },
  });

  const handleForgetPassword = async (values: { username: string }) => {
    try {
      const result = await dispatch(forgetPassword(values)).unwrap();
      toast.success(result.message);
      navigate("/set-password", { state: { username: values.username }});
    } catch (error) {
      toast.error((error as string) || "Login failed");
    }
  };

  return (
    <>
      {/* Left Side - only visible on large screens */}
      <LeftSideLayout bgImage={bgImage}>
        <StepperLines activeStep={4} totalSteps={4} />
      </LeftSideLayout>

      {/* Right Side */}
      <div className="w-full lg:w-[35%] h-full flex items-center justify-center overflow-auto">
        <div className="w-full px-10 flex flex-col text-left">
          <h2 className="mb-8 text-[#4C4C57] font-geologica  text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl font-medium mb-6">
            Forget Password
          </h2>

          <div className="mb-8 font-poppins font-normal text-sm 2xl:text-xl 3xl:text-2xl text-[#BF0204]">
            Please Enter Your Username
          </div>

          <form onSubmit={formik.handleSubmit}>
            <UsernameInput
              className="mb-8"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              placeholder="Username"
              required
              error={formik.touched.username && formik.errors.username}
              max={51}
            />

            <CommonButton type="submit">CONTINUE</CommonButton>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;

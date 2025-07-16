import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgetPassword } from "../../Redux/Features/Auth/Thunk";
import { persistOtpSession } from "../../Utils/utils";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import TextInputComponent from "../../Components/Atoms/TextInputComponent";
import { UsernameSvg } from "../../assets/Icons/Svgs";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { usernamePhoneEmailValidation } from "../../Utils/ValidationUtils";

const validationSchema = Yup.object().shape({
  username: usernamePhoneEmailValidation,
});

const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
      const result = await dispatch(
        forgetPassword({ userName: values.username })
      ).unwrap();
      toast.success(result.message);
      sessionStorage.removeItem("from-login-forget");
      persistOtpSession(values.username, "forgetPassword"); //set both values in Session storage
      navigate("/otp-verify", {
        state: { username: values.username, otpFor: "forgetPassword" },
      });
    } catch (error) {
      console.error("Forget Password Error:", error);
      toast.error((error as string) || "Login failed");
    }
  };

  useEffect(() => {
    if (!sessionStorage.getItem("from-login-forget")) {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <div className="w-full px-10 flex flex-col text-left">
      <h2 className="mb-8 text-[#4C4C57] font-geologica  text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl font-medium mb-6">
        Forget Password
      </h2>

      <div className="mb-8 font-poppins font-normal text-sm 2xl:text-xl 3xl:text-2xl text-[#BF0204]">
        Please Enter Your Username
      </div>

      <form onSubmit={formik.handleSubmit}>
        <TextInputComponent
          type="text"
          className="mb-8"
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

        <div className="flex justify-center items-center">
          <ButtonComponent
            fullWidth
            size="md"
            bgColor="#DB2729"
            textColor="#fff"
            radius={12}
            type="submit"
          >
            CONTINUE
          </ButtonComponent>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;

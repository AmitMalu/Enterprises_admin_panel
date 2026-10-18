import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { setPassword } from "../../Redux/Features/Auth/Thunk";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../Redux/hooks";
import TextInputComponent from "../../Components/Atoms/TextInputComponent";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { passwordValidation } from "../../Utils/ValidationUtils";
import { colors } from "../../theme/colors";
import { IconArrowLeft } from "@tabler/icons-react";
import { Card } from "@mantine/core";

const validationSchema = Yup.object().shape({
  newPassword: passwordValidation,
  reEnteredPassword: Yup.string()
    .required("Please Re-Enter your password")
    .oneOf([Yup.ref("newPassword")], "Passwords not matched"),
});

const SetPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const username =
    (location.state as { username?: string })?.username ??
    sessionStorage.getItem("otp-username") ??
    ""; // Extract username from location state or session storage

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      reEnteredPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      handleSetPassword(values);
    },
  });

  const handleSetPassword = async (values: {
    newPassword: string;
    reEnteredPassword: string;
  }) => {
    try {
      const result = await dispatch(
        setPassword({
          userName: username,
          newPassword: values.newPassword,
          reEnteredPassword: values.reEnteredPassword,
        })
      ).unwrap();
      toast.success(result.message);
      sessionStorage.removeItem("from-login-forget");
      sessionStorage.removeItem("otp-username");
      sessionStorage.removeItem("otpFor");
      navigate("/login"); // Navigate to login page after successful password reset
    } catch (error: any) {
      toast.error(error.message || "failed to Set Password");
    }
  };

  useEffect(() => {
    toast.dismiss();
    const username = sessionStorage.getItem("otp-username");
    const otpFor = sessionStorage.getItem("otpFor");

    if (!username || otpFor !== "forgetPassword") {
      toast.error("Session expired. Please try again.");
      navigate("/login", { replace: true });
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
        <h1 className="text-[28px] font-extrabold tracking-tight text-slate-900">Set a new password</h1>
      </div>
      <div className="mb-8 font-poppins font-normal text-sm 2xl:text-xl 3xl:text-2xl text-brand-primary">
        Please Enter New Password
      </div>

      <form onSubmit={formik.handleSubmit}>
        <TextInputComponent
          className="mb-8"
          type="password"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          placeholder="New Password"
          required
          name="newPassword"
          minLength={8}
          maxLength={50}
          radius="lg"
          error={
            formik.touched.newPassword
              ? formik.errors.newPassword
              : false
          }
        />

        <TextInputComponent
          className="mb-8"
          type="password"
          value={formik.values.reEnteredPassword}
          onChange={formik.handleChange}
          placeholder="Re-Enter New Password"
          required
          name="reEnteredPassword"
          minLength={8}
          maxLength={50}
          radius="lg"
          error={
            formik.touched.reEnteredPassword
              ? formik.errors.reEnteredPassword
              : false
          }
        />

        <div className="flex justify-around items-center">
          <ButtonComponent
            size="md"
            bgColor={colors.brand.primary}
            textColor={colors.text.inverse}
            radius={10}
            leftIcon={<IconArrowLeft />}
            onClick={() => navigate("/login")}
          >
            Back
          </ButtonComponent>
          <div className="font-poppins font-normal text-sm text-brand-primary">
            OR
          </div>
          <ButtonComponent
            size="md"
            bgColor={colors.brand.primary}
            textColor={colors.text.inverse}
            radius={10}
            type="submit"
          >
            CONTINUE
          </ButtonComponent>
        </div>
      </form>
    </Card>
  );
};

export default SetPassword;

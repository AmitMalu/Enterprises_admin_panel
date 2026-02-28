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
    const username = sessionStorage.getItem("otp-username");
    const otpFor = sessionStorage.getItem("otpFor");

    if (!username || otpFor !== "forgetPassword") {
      toast.error("Session expired. Please try again.");
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <div className="w-full px-10 flex flex-col text-left">
      <h2 className="mb-8 text-text-muted font-geologica  text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl font-medium mb-6">
        Set Password
      </h2>

      <div className="mb-8 font-poppins font-normal text-sm 2xl:text-xl 3xl:text-2xl text-status-danger">
        Please Enter new Password
      </div>

      <form onSubmit={formik.handleSubmit}>
        {/*New Password */}
        <TextInputComponent
          className="mb-8"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          placeholder="New Password"
          required
          name="newPassword"
          maxLength={51}
          error={
            formik.touched.newPassword
              ? formik.errors.newPassword || false
              : false
          }
        />

        <TextInputComponent
          className="mb-8"
          value={formik.values.reEnteredPassword}
          onChange={formik.handleChange}
          placeholder="Re-Enter New Password"
          required
          name="reEnteredPassword"
          maxLength={51}
          error={
            formik.touched.reEnteredPassword
              ? formik.errors.reEnteredPassword || false
              : false
          }
        />

        <div className="flex justify-center items-center">
          <ButtonComponent
            fullWidth
            size="md"
            bgColor={colors.brand.accent}
            textColor={colors.text.inverse}
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

export default SetPassword;

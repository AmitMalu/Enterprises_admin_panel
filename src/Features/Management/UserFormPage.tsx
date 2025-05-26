import React, { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  UserConfig,
  UserType,
} from "../../Config/UserCreationConfig/UserConfig";
import TextComponent from "../../Components/Atoms/TextComponent";
import { capitalizeWords } from "../../Utils/utils";
import BreadCrumb from "../../Components/Molecules/BreadCrumb";
import FormStepperButton from "../../Components/Molecules/FormStepperButton";
import FormStepper from "../../Components/Atoms/FormStepper";
import {
  cleanPayload,
  masterInitialValues,
  masterValidationSchema,
  transformUserCreationPayload,
} from "../../Config/UserCreationConfig/MasterFormConfig";
import { Form, Formik, FormikProps } from "formik";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { createUser } from "../../Redux/Features/Management/Thunk";
import { toast } from "react-toastify";
import FormSuccessModel from "../../Components/Atoms/FormSuccessModel";

const UserFormPage = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const { type } = useParams<{ type: string }>();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  console.log(auth);

  const isValidType = (type: string): type is UserType => {
    return type in UserConfig;
  };

  if (!type || !isValidType(type)) {
    return <div>User Type Not Available</div>;
  }

  const getValidationSchema = (
    userType: UserType,
    step: number
  ): Yup.ObjectSchema<any> => {
    const fields = UserConfig[userType].stepFieldMap[step];
    const shape: Record<string, any> = {};

    fields.forEach((field) => {
      shape[field] =
        masterValidationSchema[field as keyof typeof masterValidationSchema];
    });

    return Yup.object().shape(shape);
  };

  const userType: UserType = type;
  const config = UserConfig[userType];

  const handleFormSubmit = async (
    values: any,
    formikHelpers: import("formik").FormikHelpers<any>
  ) => {
    console.log("Final Submission", values);

    // 1. Transforming form values to the payload structure
    const payload = transformUserCreationPayload(values, auth.user);
    // 2. Filter Empty or null values
    const cleanedPayload = cleanPayload(payload);

    const formData = new FormData();
    formData.append("data", JSON.stringify(cleanedPayload));

    // 3. Append Files if they exist
    const fileFields = {
      aadhaarCardFrontImage: values.adhaarFront,
      aadhaarCardBackImage: values.adhaarBack,
      shopImage: values.shopPhoto,
      panCardImage: values.pancardPhoto,
      businessProofImage: values.businessProof,
    };

    Object.entries(fileFields).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });

    try {
      const result = await dispatch(
        createUser({
          userType: userType,
          data: formData,
        })
      ).unwrap();

      // Show success message from API
      toast.success(result.message || "User created successfully");
      // Reset form and go back to step 1
      // On success, show the modal
      setShowSuccessModal(true);

      // Auto-close after 2 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 2000);
      formikHelpers.resetForm();
      setActiveStep(0);
    } catch (err) {
      toast.error((err as string) || "Failed to Create User");
    }
  };

  return (
    <div className="p-4 w-full h-[calc(100vh-90px)] flex flex-col">
      {/* Header Form Type */}
      <TextComponent fontSize={24} fontFamily="Inter" fontWeight={600}>
        {capitalizeWords(type)} Form
      </TextComponent>

      {/* Sub Heading */}
      <BreadCrumb type={type} />

      {/* Stepper */}
      <FormStepper steps={config.steps} activeStep={activeStep} />

      {/* Formik Wrapper */}
      <Formik
        initialValues={masterInitialValues}
        validationSchema={getValidationSchema(userType, activeStep)}
        onSubmit={async (values, formikHelpers) => {
          if (activeStep === config.steps.length - 1) {
            await handleFormSubmit(values, formikHelpers);
          } else {
            setActiveStep((prev) => prev + 1);

            // Reset submit count to treat next step as fresh
            formikHelpers.setTouched({});
            formikHelpers.setFormikState((prev) => ({
              ...prev,
              submitCount: 0,
            }));
          }
        }}
      >
        {(formik: FormikProps<any>) => (
          // Scrollable Form Content area
          <Form className="flex-1 overflow-auto scrollbar-hide py-2 xl:py-4 px-4 bg-white rounded-2xl">
            {/* Form Heading */}
            <div className="mb-4">
              <TextComponent fontFamily="Inter" fontSize={20} fontWeight={500}>
                {config.steps[activeStep]}
              </TextComponent>
            </div>

            {/* Render the actual form for current step */}
            {config.renderStepForm(activeStep, formik)}

            {/* Buttons */}
            <FormStepperButton
              activeStep={activeStep}
              maxSteps={config.steps.length}
              onBack={() => setActiveStep((prev) => prev - 1)}
              onNext={() => formik.handleSubmit()}
              onFinalStep={() => formik.handleSubmit()}
            />
          </Form>
        )}
      </Formik>

      {/* Success Modal */}
      <FormSuccessModel
        opened={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
};

export default UserFormPage;

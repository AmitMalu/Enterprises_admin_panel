import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
  getValidationSchema,
  handleFormSubmit,
  masterInitialValues,
} from "../../Config/UserCreationConfig/MasterFormConfig";
import { Form, Formik, FormikProps } from "formik";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import FormSuccessModel from "../../Components/Atoms/FormSuccessModel";

const UserFormPage = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const { type } = useParams<{ type: string }>();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const isValidType = (type: string): type is UserType => {
    return type in UserConfig;
  };

  if (!type || !isValidType(type)) {
    return <div>User Type Not Available</div>;
  }

  const userType: UserType = type;
  const config = UserConfig[userType];

  return (
    <div className="p-4 w-full h-[calc(100vh-90px)] flex flex-col">
      {/* Header Form Type */}
      <TextComponent fontSize={24} fontFamily="Inter" fontWeight={600}>
        {capitalizeWords(type)} Form
      </TextComponent>

      {/* Sub Heading */}
      <BreadCrumb type={`${type} Form`} text="Management" />

      {/* Stepper */}
      <FormStepper steps={config.steps} activeStep={activeStep} />

      {/* Formik Wrapper */}
      <Formik
        initialValues={masterInitialValues}
        validationSchema={getValidationSchema(userType, activeStep)}
        onSubmit={async (values, formikHelpers) => {
          if (activeStep === config.steps.length - 1) {
            await handleFormSubmit({
              values,
              formikHelpers,
              username: auth.user,
              userType,
              dispatch,
              setShowSuccessModal,
              setActiveStep,
            });
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

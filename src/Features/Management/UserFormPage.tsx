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

const UserFormPage = () => {
  const { type } = useParams<{ type: string }>();
  const [activeStep, setActiveStep] = useState<number>(0);

  const isValidType = (type: string): type is UserType => {
    return type in UserConfig;
  };

  if (!type || !isValidType(type)) {
    return <div>User Type Not Available</div>;
  }

  const config = UserConfig[type];

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

      {/* Scrollable Form Content area */}
      <div className="flex-1 overflow-auto mt-2 scrollbar-hide p-4 bg-white rounded-2xl ">
        {config.renderStepForm(activeStep)}

        <FormStepperButton
          activeStep={activeStep}
          maxSteps={config.steps.length}
          onBack={() => setActiveStep((prev) => prev - 1)}
          onNext={() => setActiveStep((prev) => prev + 1)}
          onFinalStep={() => alert("Thank you")}
        />
      </div>
    </div>
  );
};

export default UserFormPage;

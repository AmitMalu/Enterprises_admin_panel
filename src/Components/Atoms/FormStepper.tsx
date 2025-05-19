import React from "react";

interface FormStepperProps {
  steps: string[];
  activeStep: number;
}

const FormStepper: React.FC<FormStepperProps> = ({ steps, activeStep }) => {
  const progressPercent =
    steps.length === 1 ? 100 : ((activeStep + 1) / steps.length) * 100;

  return (
    <div className="w-full mx-auto m-w-screen my-4">
      {/* Step labels */}
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <div key={index} className="text-center flex flex-col items-center">
            <span
              className={`text-[14px] sm:text-[16px] md:text-[18px] font-['Inter'] whitespace-nowrap ${
                index <= activeStep
                  ? "text-[#D82226] font-medium"
                  : "text-[#91929F] font-normal"
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>

      <div className="relative w-full h-[5px]">
        {/* Outer line */}
        <div className="absolute top-0 left-0 w-full h-full bg-[#EBEEF2] rounded" />
        {/* Progress line */}
        <div
          className="absolute top-0 left-0 h-full bg-[#D82226] rounded transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export default FormStepper;

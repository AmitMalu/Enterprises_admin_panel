import React from "react";

interface StepperLinesPrope {
  activeStep: number;
  totalSteps?: number;
}

const StepperLines: React.FC<StepperLinesPrope> = ({
  activeStep,
  totalSteps = 4,
}) => {
  return (
    <div className="flex items-center justify-center gap-4">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className={`w-10 h-2 rounded-full transition-all duration-300
                  ${index === activeStep - 1 
                    ? "bg-brand-accent w-16" 
                    : index < activeStep - 1
                    ? "bg-brand-accent w-10"
                    : "bg-gray-300 w-8"}`}
          />
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300
                  ${index === activeStep - 1 
                    ? "bg-brand-accent scale-150" 
                    : index < activeStep - 1
                    ? "bg-brand-accent"
                    : "bg-gray-300"}`}
          />
        </div>
      ))}
    </div>
  );
};

export default StepperLines;

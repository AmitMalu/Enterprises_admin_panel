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
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className={`h-1.5 rounded-full transition-all duration-300
                  ${index === activeStep - 1 
                    ? "bg-emerald-500 w-12" 
                    : index < activeStep - 1
                    ? "bg-emerald-300 w-8"
                    : "bg-slate-200 w-6"}`}
          />
        </div>
      ))}
    </div>
  );
};

export default StepperLines;

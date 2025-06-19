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
    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-[5px] z-10">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`w-[6px] bg-[#FF4D4D] rounded-full
                ${index === activeStep - 1 ? "h-[12vh]" : "h-[4vh]"}`}
        />
      ))}
    </div>
  );
};

export default StepperLines;

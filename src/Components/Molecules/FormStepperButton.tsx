import ButtonComponent from "../Atoms/ButtonComponent";

interface FormStepperButtonProps {
  activeStep: number;
  maxSteps: number;
  onBack: () => void;
  onNext: () => void;
  onFinalStep?: () => void;
}

const FormStepperButton: React.FC<FormStepperButtonProps> = ({
  activeStep,
  maxSteps,
  onBack,
  onNext,
  onFinalStep,
}) => (
  <div className="mt-5 flex justify-end items-center gap-x-3">
    {activeStep > 0 && (
      <ButtonComponent
        fullWidth={false}
        radius={6}
        variant="filled"
        bgColor="#FDE4E4"
        textColor="#C30305"
        style={{ padding: "10px 30px" }}
        onClick={onBack}
      >
        Back
      </ButtonComponent>
    )}
    <ButtonComponent
      fullWidth={false}
      radius={6}
      variant="filled"
      bgColor="#C30305"
      textColor="#FFFFFF"
      style={{ padding: "10px 30px" }}
      onClick={() => {
        if (onFinalStep && activeStep === maxSteps - 1) {
          onFinalStep();
        } else {
          onNext(); // Go to next step
        }
      }}
    >
      Next
    </ButtonComponent>
  </div>
);

export default FormStepperButton;

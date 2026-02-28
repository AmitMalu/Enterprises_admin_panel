import ButtonComponent from "../Atoms/ButtonComponent";
import { colors } from "../../theme/colors";

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
        bgColor={colors.status.dangerSoft}
        textColor={colors.brand.primary}
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
      bgColor={colors.brand.primary}
      textColor={colors.text.inverse}
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

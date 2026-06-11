import React, { ReactNode } from "react";
import { Stepper, StepperProps } from "@mantine/core";


interface Step {
    label?: string;
    description?: string;
    icon?: ReactNode;
}

interface CustomMantineStepperProps extends Partial<StepperProps> {
    steps: Step[];
    activeStep: number;
    onStepClick?: (step: number) => void;
}

const CustomMantineStepper: React.FC<CustomMantineStepperProps> = ({
    steps,
    activeStep,
    onStepClick,
    ...stepperProps
}) => {
    return (
        <Stepper active={activeStep} onStepClick={onStepClick} {...stepperProps}>
            {steps.map((step, index) => (
                <Stepper.Step
                    key={index}
                    label={step?.label}
                    description={step?.description}
                    icon={step?.icon}
                />
            ))}
        </Stepper>
    );
};

export default CustomMantineStepper;

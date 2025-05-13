import React, { useState } from "react";
import { useScreenSize } from "../../Utils/CustomHooks/useScreenSize";
import { PasswordInput, PinInput, TextInput } from "@mantine/core";

type InputType = "text" | "password" | "number" | "email";

interface TextInputComponentProps {
  type?: InputType;
  label?: string;
  name?: string;
  placeholder?: string;
  value: string;
  oneTimeCode?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | boolean;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  radius?: "xs" | "sm" | "md" | "lg" | "xl";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  withAsterisk?: boolean;
  disabled?: boolean;
  leftSection?: React.ReactNode;
  leftSectionWidth?: number;
  rightSection?: React.ReactNode;
  rightSectionWidth?: number;
  className?: string;
  length?: number;
}

const TextInputComponent: React.FC<TextInputComponentProps> = ({
  type = "text",
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  maxLength,
  minLength,
  radius,
  size,
  withAsterisk = false,
  disabled = false,
  leftSection,
  leftSectionWidth = 36,
  rightSection,
  rightSectionWidth = 36,
  className = "",
  oneTimeCode = false,
  length = 6,
}) => {
  const screenSize = useScreenSize();
  const [isFocused, setIsFocused] = useState(false);

  const defaultSize =
    size ||
    (screenSize === "sm"
      ? "sm"
      : screenSize === "md" || screenSize === "lg"
      ? "md"
      : screenSize === "xl" || screenSize === "2xl"
      ? "lg"
      : "xl");

  const defaultRadius = radius || (screenSize === "sm" ? "sm" : "md");

  const sharedProps = {
    name,
    label,
    placeholder,
    value,
    onChange,
    oneTimeCode,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    error: typeof error === "string" ? true : !!error,
    required,
    maxLength,
    minLength,
    radius: defaultRadius,
    size: defaultSize,
    withAsterisk,
    disabled,
    leftSection,
    leftSectionWidth,
    rightSection,
    rightSectionWidth,
    length,
    styles: {
      input: {
        color: "#282828",
        fontWeight: 500,
      },
    },
  };

  const InputComponent = oneTimeCode ? (
    <PinInput
      oneTimeCode
      value={value}
      onChange={(val) =>
        onChange({
          target: { value: val },
        } as React.ChangeEvent<HTMLInputElement>)
      } // mock event
      size={defaultSize}
      length={length}
      type="number"
      error={typeof error === "string" ? true : !!error}
      placeholder=""
    />
  ) : type === "password" ? (
    <PasswordInput {...sharedProps} />
  ) : (
    <TextInput {...sharedProps} type={type} />
  );

  return (
    <div className={className}>
      {InputComponent}
      {typeof error === "string" && (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      )}
    </div>
  );
};

export default TextInputComponent;

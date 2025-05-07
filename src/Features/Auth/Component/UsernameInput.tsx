import { TextInput, TextInputProps } from "@mantine/core";
import { UsernameSvg } from "../../../assets/Icons/Svgs";
import React from "react";
import { number } from "yup";
import { useScreenSize } from "../../../Utils/CustomHooks/useScreenSize";

interface UsernameInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  radius?: TextInputProps["radius"];
  size?: TextInputProps["size"];
  name: string;
  error?: string | boolean;
  max?: number;
  className?: string;
}

export function UsernameInput({
  value,
  onChange,
  placeholder = "Username",
  required = true,
  radius,
  size,
  name = "username",
  max = 100,
  error,
  className = "",
}: UsernameInputProps) {
  const screenSize = useScreenSize();

  const defaultSize: TextInputProps["size"] =
    screenSize === "sm"
      ? "sm"
      : screenSize === "md" || screenSize === "lg"
      ? "md"
      : screenSize === "xl" || screenSize === "2xl"
      ? "lg"
      : "xl";

  const defaultRadius: TextInputProps["radius"] =
    screenSize === "sm" ? "sm" : "md";

  return (
    <div className={className}>
      <TextInput
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        leftSection={<UsernameSvg />}
        leftSectionWidth={36}
        radius={radius || defaultRadius}
        size={size || defaultSize}
        maxLength={max}
        required={required}
        error={!!error} // this enables red border if error exists
        styles={{
          input: {
            color: "#282828",
            fontWeight: 500,
          },
        }}
      />
      {typeof error === "string" && (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      )}
    </div>
  );
}

import { TextInput, TextInputProps } from "@mantine/core";
import { UsernameSvg } from "../../../assets/Icons/Svgs";
import React from "react";
import { number } from "yup";

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
}

export function UsernameInput({
  value,
  onChange,
  placeholder = "Username",
  required = true,
  radius = "sm",
  size = "md",
  name = "username",
  max = 100,
  error,
}: UsernameInputProps) {
  return (
    <div>
      <TextInput
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        leftSection={<UsernameSvg />}
        leftSectionWidth={36}
        radius={radius}
        size={size}
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

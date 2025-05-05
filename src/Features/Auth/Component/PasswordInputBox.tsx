import { PasswordInput, PasswordInputProps } from "@mantine/core";
import { LockIconSvg } from "../../../assets/Icons/Svgs";

interface PasswordInputBoxProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  radius?: PasswordInputProps["radius"];
  size?: PasswordInputProps["size"];
  name: string;
  error: string | boolean;
  max?: number;
}

export function PasswordInputBox({
  value,
  onChange,
  placeholder = "Password",
  required = true,
  radius = "sm",
  size = "md",
  name = "password",
  error,
  max = 100,
}: PasswordInputBoxProps) {
  return (
    <>
      <PasswordInput
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        radius={radius}
        size={size}
        error={error}
        leftSection={<LockIconSvg />}
        leftSectionWidth={36}
        maxLength={max}
        styles={{
          input: {
            color: "#282828",
            fontWeight: 500,
          },
        }}
      />
    </>
  );
}

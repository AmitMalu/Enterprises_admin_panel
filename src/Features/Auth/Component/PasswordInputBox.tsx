import { PasswordInput, PasswordInputProps } from "@mantine/core";
import { LockIconSvg } from "../../../assets/Icons/Svgs";
import { useScreenSize } from "../../../Utils/CustomHooks/useScreenSize";

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
  className?: string;
}

export function PasswordInputBox({
  value,
  onChange,
  placeholder = "Password",
  required = true,
  radius,
  size,
  name = "password",
  error,
  max = 100,
  className = "", // <-- add this
}: PasswordInputBoxProps) {
  const screenSize = useScreenSize();

  const defaultSize: PasswordInputProps["size"] =
    screenSize === "sm"
      ? "sm"
      : screenSize === "md" || screenSize === "lg"
      ? "md"
      : screenSize === "xl" || screenSize === "2xl"
      ? "lg"
      : "xl";

  const defaultRadius: PasswordInputProps["radius"] =
    screenSize === "sm" ? "sm" : "md";

  return (
    <div className={className}>
      <PasswordInput
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        radius={radius || defaultRadius}
        size={size || defaultSize}
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
    </div>
  );
}

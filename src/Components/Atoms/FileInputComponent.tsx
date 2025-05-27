import { FileInput } from "@mantine/core";
import React from "react";
import { useScreenSize } from "../../Utils/CustomHooks/useScreenSize";

interface FileInputComponentProps {
  label?: string;
  name: string;
  placeholder?: string;
  accept?: string;
  value: File | null;
  onChange: (value: File | null) => void;
  error?: string | boolean;
  required?: boolean;
  withAsterisk?: boolean;
  disabled?: boolean;
  radius?: "xs" | "sm" | "md" | "lg" | "xl";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const FileInputComponent: React.FC<FileInputComponentProps> = ({
  label,
  name,
  placeholder = "Select File",
  accept = "image/png, image/jpeg",
  value,
  onChange,
  radius,
  size,
  error,
  required = false,
  withAsterisk = false,
  disabled = false,
}) => {
  const screenSize = useScreenSize();
  const defaultSize =
    size ||
    (screenSize === "sm" || screenSize === "md" || screenSize === "lg"
      ? "sm"
      : screenSize === "xl" || screenSize === "2xl"
      ? "md"
      : screenSize === "3xl"
      ? "lg"
      : "xl");

  const defaultRadius = radius || (screenSize === "3xl" ? "md" : "sm");

  const sharedProps = {
    label,
    name,
    placeholder,
    accept,
    value,
    onChange,
    error: typeof error === "string" ? true : !!error,
    required: withAsterisk || required,
    disabled,
    size: defaultSize,
    radius: defaultRadius,
    styles: {
      input: {
        color: "#282828",
        fontWeight: 500,
      },
    },
  };

  return (
    <div>
      <FileInput {...sharedProps} />
      {typeof error === "string" && (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      )}
    </div>
  );
};

export default FileInputComponent;

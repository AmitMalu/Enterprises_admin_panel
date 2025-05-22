import { FileInput } from "@mantine/core";
import React from "react";

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
}

const FileInputComponent: React.FC<FileInputComponentProps> = ({
  label,
  name,
  placeholder = "Select File",
  accept = "image/png, image/jpeg",
  value,
  onChange,
  error,
  required = false,
  withAsterisk = false,
  disabled = false,
}) => {
  return (
    <div>
      <FileInput
        label={label}
        placeholder={placeholder}
        accept={accept}
        value={value}
        onChange={onChange}
        withAsterisk={withAsterisk || required}
        error={typeof error === "string" ? true : !!error}
        disabled={disabled}
      />
      {typeof error === "string" && (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      )}
    </div>
  );
};

export default FileInputComponent;

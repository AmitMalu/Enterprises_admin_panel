// components/Atoms/SelectComponent.tsx
import React from "react";
import { Select } from "@mantine/core";
import { useScreenSize } from "../../Utils/CustomHooks/useScreenSize";

interface SelectComponentProps {
  label?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (value: string | null) => void;
  error?: string | boolean;
  required?: boolean;
  radius?: "xs" | "sm" | "md" | "lg" | "xl";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  withAsterisk?: boolean;
  disabled?: boolean;
  data: { value: string; label: string }[];
  onBlur?: () => void;
  className?: string;
  allowDeselect? : boolean
  searchable? : boolean
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  radius,
  size,
  withAsterisk = false,
  disabled = false,
  data,
  onBlur,
  allowDeselect = false,
  searchable = true,
  className = "",
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

  return (
    <div className={className}>
      <Select
        name={name}
        label={label}
        placeholder={placeholder}
        value={value}
        allowDeselect={allowDeselect}
        onChange={onChange}
        onBlur={onBlur}
        error={typeof error === "string" ? true : !!error}
        required={required}
        radius={defaultRadius}
        size={defaultSize}
        withAsterisk={withAsterisk}
        disabled={disabled}
        data={data}
        searchable={searchable}
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
};

export default SelectComponent;

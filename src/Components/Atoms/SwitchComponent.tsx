import React from "react";
import { Switch, SwitchProps } from "@mantine/core";

interface SwitchComponentProps extends SwitchProps {
  name: string;
  error?: string | boolean;
  className?: string;
}

const SwitchComponent: React.FC<SwitchComponentProps> = ({
  name,
  error,
  className = "",
  ...rest
}) => {
  return (
    <div className={className}>
      <Switch
        name={name}
        {...rest}
        error={!!error}
      />
      {typeof error === "string" && (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      )}
    </div>
  );
};

export default SwitchComponent;

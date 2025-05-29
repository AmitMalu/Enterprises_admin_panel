import React from "react";
import { Button } from "@mantine/core";

interface ButtonComponentProps {
  onClick?: () => void;
  variant?: "filled" | "outline" | "light" | "gradient" | "default";
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  radius?: number;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode; // Only this instead of `title`
  style?: React.CSSProperties; // Add this line for custom inline styles
  font? : string
  fontSize? : string
  fw? :string
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  children,
  onClick,
  variant = "filled",
  className,
  leftIcon,
  rightIcon,
  disabled = false,
  loading = false,
  size = "sm",
  fullWidth = false,
  radius,
  borderColor = "",
  bgColor = "transparent",
  textColor = "#000000",
  type = "button",
  font = "",
  fw = "500",
  fontSize = "",
  style = {}, // Default empty object for custom inline styles
}) => {
  const isStringChild = typeof children === "string";

  return (
    <Button
      type={type}
      onClick={onClick}
      variant={variant}
      leftSection={leftIcon}
      rightSection={rightIcon}
      disabled={disabled}
      fullWidth={fullWidth}
      loading={loading}
      radius={radius || 16}
      size={size}
      className={className || ""}
      styles={{
        root: {
          backgroundColor: variant === "filled" ? bgColor : "transparent",
          borderColor: borderColor ? borderColor : bgColor,
          margin: "3px",
          "&:hover": {
            backgroundColor: variant === "filled" ? "#A30002" : "transparent",
            opacity: 0.8,
          },
          color: textColor,
          opacity: disabled ? 0.6 : 1,
          width: fullWidth ? "100%" : "fit-content",
          ...style, // Apply custom styles passed from the parent component
        },
      }}
    >
      {isStringChild ? (
        <span
          style={{ color: textColor , fontFamily : font, fontSize : `${fontSize}px`, fontWeight : fw}}
          className="font-open text-sm xl:text-lg 2xl:text-xl 3xl:text-2xl font-semibold text-white"
        >
          {children}
        </span>
      ) : (
        children
      )}
    </Button>
  );
};

export default ButtonComponent;

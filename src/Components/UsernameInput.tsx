import { TextInput, TextInputProps } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import React from "react";

interface UsernameInputProps extends Omit<TextInputProps, "icon"> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

export function UsernameInput({
  value,
  onChange,
  placeholder = "Enter your username",
  required = true,
  ...props
}: UsernameInputProps) {
  return (
    <TextInput
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      leftSection={<IconUser size={18} color="#282828" />}
      leftSectionWidth={36}
      radius="md"
      size="md"
      withAsterisk={required}
      styles={{
        input: {
          color: "#282828", // text color
          fontWeight: 500,
        },
      }}
      {...props}
    />
  );
}

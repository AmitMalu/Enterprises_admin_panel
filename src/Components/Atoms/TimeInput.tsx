import { TextInput, TextInputProps } from "@mantine/core";

interface CustomTimeInputProps extends Omit<TextInputProps, "type"> {
  placeholder?: string;
}

const TimeInput = ({ placeholder = "Select time", ...rest }: CustomTimeInputProps) => {
  return (
    <TextInput
      type="time"
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default TimeInput;

import { useField, useFormikContext } from "formik";
import { DateValue } from "@mantine/dates";
import DateTimePicker from "../Atoms/DateTimePicker";

interface FormikDateTimePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  minDate?: Date;
  maxDate?: Date;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  clearable?: boolean;
}

const FormikDateTimePicker = ({
  name,
  label,
  required = false,
  minDate,
  maxDate,
  size = "md",
  disabled = false,
  clearable = true,
}: FormikDateTimePickerProps) => {
  const [field, meta] = useField<DateValue | null>(name);
  const { setFieldValue, setFieldTouched } = useFormikContext<any>();

  return (
    <DateTimePicker
      label={label}
      required={required}
      value={field.value}
      onChange={(value: DateValue | null) => {
        setFieldValue(name, value);
      }}
      onBlur={() => {
        setFieldTouched(name, true);
      }}
      minDate={minDate}
      maxDate={maxDate}
      size={size}
      disabled={disabled}
      clearable={clearable}
      error={meta.touched && meta.error ? String(meta.error) : undefined}
    />
  );
};

export default FormikDateTimePicker;

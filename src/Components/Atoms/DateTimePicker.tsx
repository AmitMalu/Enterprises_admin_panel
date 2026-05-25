import { useState, ChangeEvent } from "react";
import { Group, Box, Text, ActionIcon } from "@mantine/core";
import { DateValue } from "@mantine/dates";
import { IconCalendar, IconClock } from "@tabler/icons-react";
import CustomDatePicker from "./CustomDatePicker";
import TimeInput from "./TimeInput";

interface DateTimePickerProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  value?: DateValue | null;
  onChange?: (value: DateValue | null) => void;
  onBlur?: () => void;
  minDate?: Date;
  maxDate?: Date;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  error?: string;
  disabled?: boolean;
  clearable?: boolean;
}

const DateTimePicker = ({
  label,
  required = false,
  value,
  onChange,
  onBlur,
  minDate,
  maxDate,
  size = "md",
  error,
  disabled = false,
  clearable = true,
}: DateTimePickerProps) => {
  const [timeValue, setTimeValue] = useState<string>("");

  const handleDateChange = (date: DateValue | null) => {
    if (onChange) {
      // If we have a time value, combine it with the new date
      if (timeValue && date) {
        const [hours, minutes] = timeValue.split(':');
        const newDateTime = new Date(date);
        newDateTime.setHours(parseInt(hours), parseInt(minutes));
        onChange(newDateTime as DateValue);
      } else {
        onChange(date);
      }
    }
  };

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const time = event.target.value;
    setTimeValue(time);

    if (onChange && value) {
      const [hours, minutes] = time.split(':');
      const newDateTime = new Date(value);
      newDateTime.setHours(parseInt(hours), parseInt(minutes));
      onChange(newDateTime as DateValue);
    }
  };

  const handleClear = () => {
    setTimeValue("");
    onChange?.(null as any);
  };

  return (
    <Box>
      {label && (
        <Text size="sm" fw={500} mb={4}>
          {label}
          {required && <Text span c="red">*</Text>}
        </Text>
      )}

      <Group gap={8} wrap="nowrap">
        <CustomDatePicker
          placeholder="Select date"
          value={value || null}
          onChange={handleDateChange}
          onBlur={onBlur}
          minDate={minDate}
          maxDate={maxDate}
          size={size}
          disabled={disabled}
          clearable={clearable}
          leftSection={<IconCalendar size={16} />}
          styles={{ 
            input: { 
              flex: 1,
              borderColor: error ? 'var(--mantine-color-red-6)' : undefined,
              color: error ? 'var(--mantine-color-red-6)' : undefined,
              '&::placeholder': {
                color: error ? 'var(--mantine-color-red-6)' : undefined
              }
            }
          }}
        />

        <TimeInput
          placeholder="Select time"
          value={timeValue || (value ? `${new Date(value).getHours().toString().padStart(2, '0')}:${new Date(value).getMinutes().toString().padStart(2, '0')}` : "")}
          onChange={handleTimeChange}
          size={size}
          disabled={disabled}
          leftSection={<IconClock size={16} />}
          styles={{ 
            input: { 
              width: 170,
              borderColor: error ? 'var(--mantine-color-red-6)' : undefined,
              color: error ? 'var(--mantine-color-red-6)' : undefined,
              '&::placeholder': {
                color: error ? 'var(--mantine-color-red-6)' : undefined
              }
            }
          }}
        />

        {clearable && value && (
          <ActionIcon
            size={size}
            variant="subtle"
            onClick={handleClear}
            disabled={disabled}
          >
            ×
          </ActionIcon>
        )}
      </Group>

      {error && (
        <Text c="red" size="xs" mt={4}>
          {error}
        </Text>
      )}
    </Box>
  );
};

export default DateTimePicker;

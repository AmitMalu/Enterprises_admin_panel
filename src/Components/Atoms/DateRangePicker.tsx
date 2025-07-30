// src/Components/Atoms/DateRangePickerComponent.tsx
import { DatePickerInput } from '@mantine/dates';
import { Group } from '@mantine/core';

interface DateRangePickerProps {
  value: [Date | null, Date | null];
  onChange: (value: [Date | null, Date | null]) => void;
  label?: string;
}

const DateRangePicker = ({
  value,
  onChange,
  label = 'Select date range',
}: DateRangePickerProps) => {
  return (
    <Group gap="sm" grow>
      <DatePickerInput
        type="range"
        value={value}
        onChange={onChange}
        label={label}
        placeholder="From – To"
        mx="auto"
        clearable
      />
    </Group>
  );
};

export default DateRangePicker;

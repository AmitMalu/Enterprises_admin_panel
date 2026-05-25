import { DateTimePicker, DateTimePickerProps } from "@mantine/dates";
import { Text } from "@mantine/core";

interface NewDateTimePickerProps
    extends Omit<DateTimePickerProps, "value" | "onChange"> {
    label?: string;
    required?: boolean;
    error?: string;
    value?: Date | null;
    onChange?: (value: Date | null) => void;
}

const safeClassNames = {
    levelsGroup: "w-[320px]",
    calendarHeader: "flex items-center justify-between gap-3",
    calendarHeaderLevel: "font-[600] text-[16px]",
    calendarHeaderControl: "w-10 h-10",
    month: "flex flex-col gap-2 w-full",
    timeWrapper: "flex items-center justify-between gap-3 mt-2",
    monthThead: "grid grid-cols-7 w-full",
    monthTbody: "grid grid-cols-7 gap-0 w-full",
    weekdaysRow: "contents",
    monthsListRow: "flex justify-between w-full gap-3 px-4",
    weekday: "text-primaryColor text-xs font-medium text-center py-1",
    monthRow: "contents",
    monthCell: "flex justify-center",
    monthsList: "w-full",
    monthsListControl: "text-textColor font-[400] text-[18px]",
    yearsList: "w-full",
    yearsListRow: "flex items-center justify-between w-full gap-3 px-2",
    yearsListControl: "text-textColor font-[400] text-[18px]",
    day: `
    font-[400] text-xs text-center 
    w-7 h-7 rounded 
    flex items-center justify-center 
    data-[selected]:!bg-blue-500 data-[selected]:!text-white
    data-[in-range]:bg-blue-100 data-[in-range]:text-blue-800
    data-[today]:border data-[today]:border-dashed data-[today]:border-blue-400
    data-[outside]:text-gray-400
    hover:bg-gray-100
  `,
};

const NewDateTimePicker = ({
    label,
    required,
    error,
    value,
    onChange,
    ...rest
}: NewDateTimePickerProps) => {
    return (
        <div>
            {label && (
                <Text size="sm" fw={500} mb={4}>
                    {label}
                    {required && <Text span c="red">*</Text>}
                </Text>
            )}

            <DateTimePicker
                value={value as any}
                onChange={(val) => onChange?.(val as Date | null)}
                placeholder="Pick date and time"
                clearable
                withSeconds={false}
                popoverProps={{
                    withinPortal: true,
                    styles: {
                        dropdown: {
                            minWidth: 320,
                            padding: 12,
                        },
                    },
                }}
                styles={{
                    input: {
                        borderColor: error ? "var(--mantine-color-red-6)" : undefined,
                    },
                }}
                classNames={safeClassNames}
                {...rest}
            />

            {error && (
                <Text c="red" size="xs" mt={4}>
                    {error}
                </Text>
            )}
        </div>
    );
};

export default NewDateTimePicker;
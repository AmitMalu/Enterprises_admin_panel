import { DatePicker, DatePickerProps, DatesRangeValue } from "@mantine/dates";
import { LeftDateArrowSvgIcon, RightDateArrowSvgIcon } from "../../assets/Icons";
import moment from "moment";
import { Box, Button, Flex, Popover, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const defaultClassNames = {
    levelsGroup: "w-full",
    calendarHeader: "flex items-center justify-between gap-3",
    calendarHeaderLevel: "font-[600] text-[16px]",
    month: "flex items-center justify-center flex-col gap-2 w-full",
    monthThead: "flex items-center justify-center w-full",
    monthTbody: "flex items-center justify-center w-full flex-col gap-2",
    weekdaysRow: "flex items-center justify-between w-full",
    monthsListRow: "flex items-center justify-between w-full gap-3",
    weekday: "text-primaryColor",
    monthRow: "flex items-center justify-between w-full gap-3",
    monthCell: "w-full text-center",
    monthsList: "w-full",
    monthsListControl: "text-textColor font-[400] text-[18px]",
    yearsListRow: "flex items-center justify-between w-full gap-3",
    yearsListControl: "text-textColor font-[400] text-[18px]",
    day: `
  font-[500] text-[14px] text-center 
  w-8 h-8 rounded-md 
  flex items-center justify-center 
  data-[selected]:!text-[#BF0204] 
   data-[in-range]:bg-red-100 data-[in-range]:text-red-800
  data-[today]:border data-[today]:border-dashed data-[today]:border-blue-400
  data-[outside]:text-gray-400
`,
};

interface CustomDateRangePickerProps
    extends Omit<DatePickerProps<"range">, 'type' | 'value' | 'onChange' | 'defaultValue'> {
    value: DatesRangeValue;
    onChange: (val: DatesRangeValue) => void;
    defaultValue?: DatesRangeValue;
    minDate?: Date;
    maxDate?: Date;
    shortcuts?: boolean;
    valueFormat?: string;
    placeholder?: string;
}

export const CustomDateRangePicker = ({
    value,
    onChange,
    valueFormat = "DD/MM/YYYY",
    nextIcon = <RightDateArrowSvgIcon />,
    previousIcon = <LeftDateArrowSvgIcon />,
    placeholder = "Pick date",
    minDate = new Date(2024, 0, 1),
    maxDate = new Date(),
    shortcuts = false,
    ...rest
}: CustomDateRangePickerProps) => {
    const [opened, { open, close }] = useDisclosure(false);

    const today = moment();
    const yesterday = moment().subtract(1, "day");
    const last7 = [moment().subtract(6, "days"), today];

    const handleShortcut = (label: string) => {
        const range: DatesRangeValue =
            label === "Today"
                ? [today.toDate(), today.toDate()]
                : label === "Yesterday"
                    ? [yesterday.toDate(), yesterday.toDate()]
                    : label === "Last 7 Days"
                        ? [last7[0].toDate(), last7[1].toDate()]
                        : [null, null];

        onChange(range);
        close();
    };

    return (
        <Popover opened={opened} onChange={opened ? close : open} position="bottom-start" width="auto" trapFocus shadow="md">
            <Popover.Target>
                <Box onClick={open} className="w-full">
                    {/* Trigger input box */}
                    <input
                        readOnly
                        value={
                            Array.isArray(value)
                                ? value
                                    .filter((v) => v)
                                    .map((d) => moment(d).format("DD/MM/YYYY"))
                                    .join(" - ")
                                : value
                                    ? moment(value).format("DD/MM/YYYY")
                                    : ""
                        }
                        className="w-full border px-3 py-1 rounded text-sm cursor-pointer"
                        placeholder={placeholder}
                    />
                </Box>
            </Popover.Target>

            <Popover.Dropdown>
                <Flex gap="md">
                    <DatePicker
                        type="range"
                        size="xs"
                        value={value as DatesRangeValue}
                        onChange={(val) => {
                            const [start, end] = val || [];
                            if (start && end && moment(start).isSame(end, 'day')) {
                                onChange([start, null]); // Prevent same day
                            } else {
                                onChange(val);
                            }
                        }}
                        nextIcon={nextIcon}
                        previousIcon={previousIcon}
                        classNames={defaultClassNames}
                        minDate={minDate}
                        maxDate={maxDate}
                        {...rest}
                    />
                    {shortcuts && (
                        <Stack gap={6} className="min-w-[100px] mt-2">
                            <Button variant="light" size="xs" onClick={() => handleShortcut("Today")}>Today</Button>
                            <Button variant="light" size="xs" onClick={() => handleShortcut("Yesterday")}>Yesterday</Button>
                            <Button variant="light" size="xs" onClick={() => handleShortcut("Last 7 Days")}>Last 7 Days</Button>
                        </Stack>
                    )}
                </Flex>
            </Popover.Dropdown>
        </Popover>
    )
};

export default CustomDateRangePicker;

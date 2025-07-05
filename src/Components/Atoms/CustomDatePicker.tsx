// components/Atoms/CustomDatePicker.tsx
import { DatePickerInput, DatePickerInputProps } from "@mantine/dates";
import { LeftDateArrowSvgIcon, RightDateArrowSvgIcon } from "../../assets/Icons";

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
    day: "font-[500] text-[14px] w-[30px] text-center",
};

const CustomDatePicker = ({
    value,
    onChange,
    valueFormat = "DD/MM/YYYY",
    nextIcon = <RightDateArrowSvgIcon />,
    previousIcon = <LeftDateArrowSvgIcon />,
    placeholder = "Pick date",
    ...rest
}: DatePickerInputProps) => {
    return (
        <DatePickerInput
            size="xs"
            value={value}
            onChange={(value) => {
                if (Array.isArray(value)) return;
                if (value instanceof Date || value === null) {
                    onChange?.(value);
                }
            }}
            valueFormat={valueFormat}
            placeholder={placeholder}
            nextIcon={nextIcon}
            previousIcon={previousIcon}
            classNames={defaultClassNames}
            {...rest}
        />
    );
};

export default CustomDatePicker;

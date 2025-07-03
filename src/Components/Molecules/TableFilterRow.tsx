import { Table } from "@mantine/core";
import { booleanSelectData2, GenericTableHeader } from "../../Utils/utils";
import SelectComponent from "../Atoms/SelectComponent";
import { DatePickerInput } from "@mantine/dates";
import TextInputComponent from "../Atoms/TextInputComponent";
import moment from "moment";
import {
  LeftDateArrowSvgIcon,
  RightDateArrowSvgIcon,
} from "../../assets/Icons";

const TableFilterRow = <T,>({
  headers,
  filterValues,
  onFilterChange,
  onFilterSubmit,
  renderExtraRowCell,
}: {
  headers: GenericTableHeader<T>[];
  filterValues: Record<string, any>;
  onFilterChange?: (key: string, value: any) => void;
  onFilterSubmit?: (key: string, value: any) => void;
  renderExtraRowCell?: (item: T, index: number) => React.ReactNode;
}) => (
  <Table.Tr>
    {renderExtraRowCell && <Table.Td />}
    {headers.map(
      ({ key, filterType = "text", searchable = true, filterOptions }) => {
        const value = filterValues?.[String(key)] ?? "";
        if (!searchable) return <Table.Td key={String(key)} />;
        switch (filterType) {
          case "boolean":
            return (
              <Table.Td key={String(key)}>
                <SelectComponent
                  name={String(key)}
                  value={value}
                  allowDeselect={true}
                  onChange={(val) => {
                    if (val !== null) {
                      onFilterChange?.(String(key), val ?? "");
                      onFilterSubmit?.(String(key), val ?? "");
                    }
                  }}
                  data={filterOptions ?? booleanSelectData2} // ✅ Use custom options if provided
                  placeholder="Select"
                  size="xs"
                />
              </Table.Td>
            );
          case "date":
            return (
              <Table.Td key={String(key)}>
                <DatePickerInput
                  value={value ? moment(value, "DD-MM-YYYY").toDate() : null}
                  valueFormat="DD/MM/YYYY"
                  onChange={(val) => {
                    if (val) {
                      const formatted = moment(val).format("DD-MM-YYYY");
                      onFilterChange?.(String(key), formatted);
                      onFilterSubmit?.(String(key), formatted);
                    } else {
                      onFilterChange?.(String(key), null);
                      onFilterSubmit?.(String(key), "");
                    }
                  }}
                  nextIcon={<RightDateArrowSvgIcon />}
                  previousIcon={<LeftDateArrowSvgIcon />}
                  size="xs"
                  placeholder="Pick date"
                  classNames={{
                    levelsGroup: "w-full ",
                    calendarHeader: "flex items-center justify-between gap-3",
                    calendarHeaderLevel: "font-[600] text-[16px] ",
                    month:
                      "flex items-center justify-center flex-col gap-2 w-full",
                    monthThead: "flex items-center justify-center w-full",
                    monthTbody:
                      "flex items-center justify-center w-full flex-col gap-2",
                    weekdaysRow: "flex items-center justify-between w-full",
                    monthsListRow:
                      "flex items-center justify-between w-full gap-3",
                    weekday: "text-primaryColor",
                    monthRow: "flex items-center justify-between w-full gap-3",
                    monthCell: "w-full text-center ",
                    monthsList: "w-full",
                    monthsListControl: "text-textColor font-[400] text-[18px]",
                    yearsListRow:
                      "flex items-center justify-between w-full gap-3",
                    yearsListControl: "text-textColor font-[400] text-[18px]",
                    day: "font-[500] text-[14px] w-[30px] text-center ",
                  }}
                />
              </Table.Td>
            );
          case "text":
          default:
            return (
              <Table.Td key={String(key)}>
                <TextInputComponent
                  size="xs"
                  name={String(key)}
                  value={value}
                  onChange={(e) => {
                    onFilterChange?.(String(key), e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onFilterSubmit?.(String(key), value?.trim() ?? "");
                    }
                  }}
                />
              </Table.Td>
            );
        }
      }
    )}
  </Table.Tr>
);

export default TableFilterRow;

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
import CustomDatePicker from "../Atoms/CustomDatePicker";

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
                  data={filterOptions ?? booleanSelectData2}
                  placeholder="Select"
                  size="xs"
                />
              </Table.Td>
            );
          case "date":
            return (
              <Table.Td key={String(key)}>
                <CustomDatePicker
                  value={value ? moment(value, "DD-MM-YYYY").toDate() : null}
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

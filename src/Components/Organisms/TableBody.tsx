import { Table, Tooltip } from "@mantine/core";
import { booleanSelectData2, ellipsisCellStyle, GenericTableHeader } from "../../Utils/utils";
import SelectComponent from "../Atoms/SelectComponent";
import moment from "moment";
import TextInputComponent from "../Atoms/TextInputComponent";
import CustomDatePicker from "../Atoms/CustomDatePicker";

const TableBody = <T,>({
  data,
  headers,
  renderExtraRowCell,
  editable,
  onChange
}: {
  data: T[];
  headers: GenericTableHeader<T>[];
  renderExtraRowCell?: (item: T, index: number) => React.ReactNode;
  editable?: boolean;
  onChange?: (rowIndex: number, key: keyof T, value: any) => void;
}) => {

  if (!data?.length) {
    return (
      <Table.Tr>
        <Table.Td colSpan={headers.length + (renderExtraRowCell ? 1 : 0)}>
          No data available
        </Table.Td>
      </Table.Tr>
    );
  }

  return (
    <>
      {data.map((item, index) => (
        <Table.Tr key={index}>
          {renderExtraRowCell && (
            <Table.Td>{renderExtraRowCell(item, index)}</Table.Td>
          )}
          {headers.map(({ key, renderType, filterType, filterOptions }) => {
            const cellData = item[key];
            const isEmpty =
              cellData === undefined || cellData === null || cellData === "";

            // ---------- EDITABLE MODE ----------
            if (editable) {
              switch (filterType) {
                case "boolean":
                  return (
                    <Table.Td key={String(key)}>
                      <SelectComponent
                        size="xs"
                        name={String(key)}
                        allowDeselect
                        data={filterOptions ?? booleanSelectData2}
                        value={
                          cellData !== undefined && cellData !== null
                            ? String(cellData)
                            : null
                        }
                        onChange={(val) =>
                          onChange?.(index, key, filterOptions ? val : val === "true" ? true : false)
                        }
                        placeholder="Select"
                      />
                    </Table.Td>
                  );

                case "date":
                  return (
                    <Table.Td key={String(key)}>
                      <CustomDatePicker
                        value={cellData ? moment(cellData, "DD-MM-YYYY").toDate() : null}
                        onChange={(d) =>
                          onChange?.(
                            index,
                            key,
                            d ? moment(d).format("DD-MM-YYYY") : null
                          )
                        }
                      />
                    </Table.Td>
                  );

                case "text":
                default:
                  return (
                    <Table.Td key={String(key)} style={ellipsisCellStyle}>
                      <TextInputComponent
                        name={String(key)}
                        size="xs"
                        value={cellData !== undefined && cellData !== null ? String(cellData) : ""}
                        onChange={(e) =>
                          onChange?.(index, key, e.target.value)
                        }
                      />
                    </Table.Td>
                  );
              }
            }

            // ---------- READ‑ONLY MODE ----------
            const displayValue = isEmpty ? "-" : String(cellData);

            if (isEmpty) {
              return (
                <Table.Td key={String(key)} style={ellipsisCellStyle}>
                  {displayValue}
                </Table.Td>
              );
            }

            return (

              <Table.Td key={String(key)} style={ellipsisCellStyle}>
                {isEmpty ? (
                  displayValue
                ) : renderType === "link" && typeof cellData === "string" ? (
                  <a
                    href={cellData}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    <Tooltip label={displayValue} withArrow>
                      <span>{displayValue}</span>
                    </Tooltip>
                  </a>
                ) : (
                  <Tooltip label={displayValue} withArrow>
                    <span>{displayValue}</span>
                  </Tooltip>
                )}
              </Table.Td>
            );
          })}
        </Table.Tr>
      ))}
    </>
  );
};

export default TableBody;

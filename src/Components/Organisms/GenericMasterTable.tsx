import { Group, Pagination, Select, Table, Tooltip } from "@mantine/core";
import React from "react";
import {
  booleanSelectData,
  ellipsisCellStyle,
  GenericTableHeader,
} from "../../Utils/utils";
import TextComponent from "../Atoms/TextComponent";
import { paginationBackIcon, paginationFrontIcon } from "../../assets/Icons";
import SelectComponent from "../Atoms/SelectComponent";
import TextInputComponent from "../Atoms/TextInputComponent";
import { DateInput } from "@mantine/dates";

type GenericMasterTableProps<T> = {
  data: T[];
  headers: GenericTableHeader<T>[];
  renderExtraHeader?: () => React.ReactNode;
  renderExtraRowCell?: (item: T, index: number) => React.ReactNode;
  pagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;

  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: { label: string; value: string }[];
  message?: string;
  filterVisible?: boolean;
  onFilterChange?: (key: string, value: any) => void;
  filterValues?: Record<string, any>;
  onFilterSubmit?: (key: string, value: any) => void;
};

const GenericMasterTable = <T,>({
  data,
  headers,
  renderExtraHeader,
  renderExtraRowCell,
  currentPage,
  totalPages,
  onPageChange,

  pagination = false,
  pageSize = 5,
  onPageSizeChange,
  pageSizeOptions,
  message,
  filterVisible = false,
  onFilterChange,
  filterValues,
  onFilterSubmit,
}: GenericMasterTableProps<T>) => {
  return (
    <Table.ScrollContainer minWidth={1600} className="mt-4">
      <Table
        withColumnBorders
        striped
        highlightOnHover
        style={{ borderRadius: 8, overflow: "hidden" }}
        styles={{
          th: {
            backgroundColor: "#BF0204",
            color: "white",
            textAlign: "center",
            padding: "6px 12px",
            fontWeight: 600,
            fontSize: 14,
            whiteSpace: "nowrap", // prevent wrapping
          },
          td: {
            textAlign: "center",
            fontSize: 14,
            padding: "4px",
          },
        }}
      >
        <Table.Thead>
          <Table.Tr>
            {renderExtraHeader && <Table.Th>{renderExtraHeader()}</Table.Th>}
            {headers.map(({ key, label }) => (
              <Table.Th key={String(key)}>{label || ""}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {filterVisible && data.length > 0 && (
            <Table.Tr>
              {renderExtraRowCell && <Table.Td></Table.Td>}
              {headers.map(
                ({ key, filterType = "text", searchable = true }) => {
                  const value = filterValues?.[String(key)] ?? "";

                  if (!searchable) return <Table.Td key={String(key)} />;

                  switch (filterType) {
                    case "boolean":
                      return (
                        <Table.Td key={String(key)}>
                          <SelectComponent
                            name={String(key)}
                            value={value}
                            onChange={(val) => {
                              if (val !== null) {
                                onFilterChange?.(String(key), val);
                                onFilterSubmit?.(String(key), val);
                              }
                            }}
                            data={booleanSelectData}
                            placeholder="Select"
                            size="xs"
                          />
                        </Table.Td>
                      );

                    case "date":
                      return (
                        <Table.Td key={String(key)}>
                          <DateInput
                            value={value}
                            valueFormat="DD/MM/YYYY"
                            onChange={(val) => {
                              if (val) {
                                onFilterChange?.(String(key), val);
                                onFilterSubmit?.(String(key), val);
                              }
                            }}
                            size="xs"
                            placeholder="Pick date"
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
                              if (e.key === "Enter" && value?.trim() !== "") {
                                onFilterSubmit?.(String(key), value.trim());
                              }
                            }}
                          />
                        </Table.Td>
                      );
                  }
                }
              )}
            </Table.Tr>
          )}
          {data?.length > 0 ? (
            data.map((item, index) => (
              <Table.Tr key={index}>
                {renderExtraRowCell && (
                  <Table.Td>{renderExtraRowCell(item, index)}</Table.Td>
                )}
                {headers.map(({ key }) => (
                  <Table.Td key={String(key)} style={ellipsisCellStyle}>
                    <Tooltip
                      arrowPosition="side"
                      arrowSize={5}
                      position="top-start"
                      label={String(item[key])}
                      withArrow
                    >
                      <span>{String(item[key])}</span>
                    </Tooltip>
                  </Table.Td>
                ))}
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan={headers.length + (renderExtraRowCell ? 1 : 0)}>
                No data available
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>

        {pagination && data?.length > 0 && (
          <Table.Tfoot>
            <Table.Tr>
              <Table.Td
                colSpan={headers?.length + (renderExtraRowCell ? 1 : 0)}
              >
                <Group
                  style={{
                    padding: "6px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {message && (
                    <TextComponent
                      color="#667085"
                      fontFamily="Inter"
                      fontSize={14}
                    >
                      {message}
                    </TextComponent>
                  )}

                  <div className="flex gap-4 items-center">
                    <SelectComponent
                      name="pageSize"
                      size="sm"
                      className="w-20"
                      value={String(pageSize)}
                      placeholder="Select Page Size"
                      onChange={(value: string | null) => {
                        if (onPageSizeChange && value !== null) {
                          const num = Number(value);
                          if (!isNaN(num)) {
                            onPageSizeChange(num);
                          }
                        }
                      }}
                      data={pageSizeOptions || []}
                    />

                    <Pagination
                      total={totalPages || 0}
                      value={currentPage}
                      onChange={onPageChange}
                      styles={{ control: { borderColor: "#fff" } }}
                      color="#BF0204"
                      size="sm"
                      radius="md"
                      previousIcon={(props) =>
                        paginationBackIcon({ ...props, color: "#BF0204" })
                      }
                      nextIcon={(props) =>
                        paginationFrontIcon({ ...props, color: "#BF0204" })
                      }
                    />
                  </div>
                </Group>
              </Table.Td>
            </Table.Tr>
          </Table.Tfoot>
        )}
      </Table>
    </Table.ScrollContainer>
  );
};

export default GenericMasterTable;

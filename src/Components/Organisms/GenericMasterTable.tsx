import { Group, Pagination, Table, Tooltip } from "@mantine/core";
import React from "react";
import { ellipsisCellStyle } from "../../Utils/utils";
import TextComponent from "../Atoms/TextComponent";
import { paginationBackIcon, paginationFrontIcon } from "../../assets/Icons";

type Header<T> = {
  key: keyof T;
  label?: string; // Optional to allow blank header (e.g., for actions)
};

type GenericMasterTableProps<T> = {
  data: T[];
  headers: Header<T>[];
  renderExtraHeader?: () => React.ReactNode;
  renderExtraRowCell?: (item: T, index: number) => React.ReactNode;
  pagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;

  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];

  message?: string;
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
              <Table.Td colSpan={headers?.length + (renderExtraRowCell ? 1 : 0)}>
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

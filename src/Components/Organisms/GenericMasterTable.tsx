import { Table } from "@mantine/core";
import React from "react";
import { GenericTableHeader } from "../../Utils/utils";
import TableFilterRow from "../Molecules/TableFilterRow";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";

const thStyle = {
  backgroundColor: "#BF0204",
  color: "white",
  textAlign: "center" as const,
  padding: "6px 12px",
  fontWeight: 600,
  fontSize: 14,
  whiteSpace: "nowrap", // prevent wrapping
};
const tdStyle = {
  textAlign: "center" as const,
  fontSize: 14,
  padding: "4px",
};

type GenericMasterTableProps<T> = {
  data: T[];
  headers: GenericTableHeader<T>[];
  renderExtraHeader?: () => React.ReactNode;
  renderExtraRowCell?: (item: T, index: number) => React.ReactNode;
  extraColumnPosition?: "left" | "right";
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
  extraColumnPosition = "left",
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
    <Table.ScrollContainer minWidth={600} className="mt-4">
      <Table
        withColumnBorders
        striped
        highlightOnHover
        style={{ borderRadius: 8, overflow: "hidden" }}
        styles={{
          th: thStyle,
          td: tdStyle,
        }}
      >
        <Table.Thead>
          <Table.Tr>
            {/* Left Extra Header */}
            {renderExtraHeader && extraColumnPosition === "left" ? (
              <Table.Th>{renderExtraHeader()}</Table.Th>
            ) : null}
            {headers.map(({ key, label }) => (
              <Table.Th key={String(key)}>{label || ""}</Table.Th>
            ))}
            {/* Left Extra Header */}
            {renderExtraHeader && extraColumnPosition === "right" ? (
              <Table.Th>{renderExtraHeader()}</Table.Th>
            ) : null}
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {/* Filter Row */}
          {filterVisible && (
            <TableFilterRow
              headers={headers}
              filterValues={filterValues || []}
              onFilterChange={onFilterChange}
              onFilterSubmit={onFilterSubmit}
              renderExtraRowCell={renderExtraRowCell}
            />
          )}

          <TableBody
            data={data}
            headers={headers}
            renderExtraRowCell={renderExtraRowCell}
          />
        </Table.Tbody>

        {pagination && data?.length > 0 && (
          <TableFooter
            headersLength={headers.length}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            pageSize={pageSize}
            onPageSizeChange={onPageSizeChange}
            pageSizeOptions={pageSizeOptions}
            message={message}
            renderExtraRowCell={!!renderExtraRowCell}
          />
        )}
      </Table>
    </Table.ScrollContainer>
  );
};

export default GenericMasterTable;

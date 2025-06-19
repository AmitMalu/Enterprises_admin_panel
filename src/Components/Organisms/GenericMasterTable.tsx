import { Table, Tooltip } from "@mantine/core";
import React from "react";
import { ellipsisCellStyle } from "../../Utils/utils";

type Header<T> = {
  key: keyof T;
  label?: string; // Optional to allow blank header (e.g., for actions)
};

type GenericMasterTableProps<T> = {
  data: T[];
  headers: Header<T>[];
  renderExtraHeader?: () => React.ReactNode;
  renderExtraRowCell?: (item: T, index: number) => React.ReactNode;
};

const GenericMasterTable = <T,>({
  data,
  headers,
  renderExtraHeader,
  renderExtraRowCell,
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
      </Table>
    </Table.ScrollContainer>
  );
};

export default GenericMasterTable;

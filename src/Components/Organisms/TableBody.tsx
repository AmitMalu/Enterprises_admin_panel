import { Table, Tooltip } from "@mantine/core";
import { ellipsisCellStyle, GenericTableHeader } from "../../Utils/utils";

const TableBody = <T,>({
  data,
  headers,
  renderExtraRowCell,
}: {
  data: T[];
  headers: GenericTableHeader<T>[];
  renderExtraRowCell?: (item: T, index: number) => React.ReactNode;
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
          {headers.map(({ key, renderType }) => {
            const cellData = item[key];
            const isEmpty =
              cellData === undefined || cellData === null || cellData === "";
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
                {renderType === "link" && typeof cellData === "string" ? (
                  <a
                    href={cellData}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    <Tooltip
                      arrowPosition="side"
                      arrowSize={5}
                      position="top-start"
                      label={displayValue}
                      withArrow
                    >
                      <span>{displayValue}</span>
                    </Tooltip>
                  </a>
                ) : (
                  <Tooltip
                    arrowPosition="side"
                    arrowSize={5}
                    position="top-start"
                    label={displayValue}
                    withArrow
                  >
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

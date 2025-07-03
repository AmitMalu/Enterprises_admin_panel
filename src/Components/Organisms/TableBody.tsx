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
  if (!data.length) {
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
      ))}
    </>
  );
};

export default TableBody;

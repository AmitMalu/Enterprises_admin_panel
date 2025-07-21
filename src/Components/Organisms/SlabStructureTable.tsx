import { ellipsisCellStyle } from "../../Utils/utils";
import { Table, Tooltip } from "@mantine/core";
import TextComponent from "../Atoms/TextComponent";

type GenericTableProps<T> = {
  data: T[];
  headers: { key: keyof T; label: string }[];
  label?: string;
};

const SlabStructureTable = <T,>({
  data,
  headers,
  label,
}: GenericTableProps<T>) => {
  const rows =
    data && data.length > 0 ? (
      data?.map((item, index) => (
        <Table.Tr key={index}>
          {headers?.map(({ key }) => (
            <Table.Td key={String(key)} style={ellipsisCellStyle}>
              <Tooltip
                arrowPosition="side"
                arrowSize={5}
                position="top-start"
                label={String(item[key as keyof T])}
                withArrow
              >
                <span>{String(item[key as keyof T])}</span>
              </Tooltip>
            </Table.Td>
          ))}
        </Table.Tr>
      ))
    ) : (
      <Table.Tr>
        <Table.Td
          style={{ textAlign: "center", padding: "12px" }}
          colSpan={headers.length}
        >
          No data available
        </Table.Td>
      </Table.Tr>
    );

  return (
    <>
      {label && (
        <TextComponent
          color="#1D1F2C"
          fontFamily="Inter"
          fontWeight={500}
          fontSize={18}
        >
          {label}
        </TextComponent>
      )}
      <Table.ScrollContainer
        minWidth={700}
        style={{ margin: "10px 0px 20px 0px" }}
      >
        <Table
          withColumnBorders
          style={{
            borderRadius: 8,
            overflow: "hidden",
            background: "#fff",
          }}
          styles={{
            th: {
              background:
                "linear-gradient(180deg, rgba(2, 53, 91, 0.16) 60%, rgba(50, 47, 53, 0) 100%)",
              textAlign: "center",
              fontFamily: "Segoe UI",
              padding: "6px",
              fontWeight: "bold",
              fontSize: 14,
              whiteSpace: "nowrap",
            },
            td: {
              textAlign: "center",
              fontSize: 14,
              padding: "6px",
            },
          }}
        >
          <Table.Thead>
            <Table.Tr>
              {headers?.map(({ key, label }) => (
                <Table.Th key={String(key)}>{label}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
};

export default SlabStructureTable;

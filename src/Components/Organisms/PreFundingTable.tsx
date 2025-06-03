import { Table, Tooltip } from "@mantine/core";
import React from "react";
import { EditIcon, EyeIcon } from "../../assets/Icons";
import { ellipsisCellStyle } from "../../Utils/utils";
import { PrefundingType } from "../../Config/Funding/fundingConfig";

const PreFundingTable = ({
  data,
  headers,
  onEdit,
}: {
  data: PrefundingType[];
  headers: { key: keyof PrefundingType; label: string }[];
  onEdit: (item: PrefundingType) => void;
}) => {
  const rows = data?.map((item, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <div className="flex justify-center gap-2">
          <span className="cursor-pointer">
            <EyeIcon />
          </span>
          <span onClick={() => onEdit(item)} className="cursor-pointer">
            <EditIcon />
          </span>
        </div>
      </Table.Td>

      {headers?.map(({ key }) => (
        <Table.Td key={key} style={ellipsisCellStyle}>
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
  ));

  return (
    <Table.ScrollContainer minWidth={1600} style={{ marginTop: "20px" }}>
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
            <Table.Th></Table.Th>
            {headers?.map((item, index) => (
              <Table.Th key={index}>{item.label}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default PreFundingTable;

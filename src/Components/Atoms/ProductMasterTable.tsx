import { Table, ScrollArea } from "@mantine/core";
import { EyeIcon } from "../../assets/Icons/EyeIcon";

const data = [
  {
    productId: "101",
    productName: "Card A",
    vendorId: "V001",
    vendorName: "Vendor X",
    bankId: "B123",
    binId: "BIN987",
    kycId: "K001",
    formId: "F001",
    formTypeId: "FT01",
    usageId: "U001",
    reloadId: "R001",
    plasticTypeId: "P001",
    channelId: "C001",
    subtypeId: "S001",
    createdDate: "2024-05-10",
    createdBy: "UserX",
  },
  // more rows...
];


export default function ProductMasterTable() {
  const rows = data.map((item, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
          <EyeIcon/>
        </div>
      </Table.Td>
      <Table.Td>{item.productId}</Table.Td>
      <Table.Td>{item.productName}</Table.Td>
      <Table.Td>{item.vendorId}</Table.Td>
      <Table.Td>{item.vendorName}</Table.Td>
      <Table.Td>{item.bankId}</Table.Td>
      <Table.Td>{item.binId}</Table.Td>
      <Table.Td>{item.kycId}</Table.Td>
      <Table.Td>{item.formId}</Table.Td>
      <Table.Td>{item.formTypeId}</Table.Td>
      <Table.Td>{item.usageId}</Table.Td>
      <Table.Td>{item.reloadId}</Table.Td>
      <Table.Td>{item.plasticTypeId}</Table.Td>
      <Table.Td>{item.channelId}</Table.Td>
      <Table.Td>{item.subtypeId}</Table.Td>
      <Table.Td>{item.createdDate}</Table.Td>
      <Table.Td>{item.createdBy}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={1600}>
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
            padding: "12px",
            fontWeight: 600,
            fontSize: 14,
          },
          td: {
            textAlign: "center",
            fontSize: 14,
            padding: "10px",
          },
        }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Product ID</Table.Th>
            <Table.Th>Product Name</Table.Th>
            <Table.Th>Vendor ID</Table.Th>
            <Table.Th>Vendor Name</Table.Th>
            <Table.Th>Bank ID</Table.Th>
            <Table.Th>Bin ID</Table.Th>

          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

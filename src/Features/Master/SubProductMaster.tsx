import { Table, Tooltip } from "@mantine/core";
import React from "react";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import {
  AddIconSvg,
  ColIcon,
  DownloadIcon,
  DropDownArrowIcon,
  EditIcon,
  EyeIcon,
  FilterIcon,
  GridIcon,
  RefreshIcon,
  SettingIcon,
} from "../../assets/Icons";
import TextInputComponent from "../../Components/Atoms/TextInputComponent";
import TextComponent from "../../Components/Atoms/TextComponent";
import { ellipsisCellStyle } from "../../Utils/utils";

const SubProductMaster = () => {
  const data = [
    {
      id: "101",
      subProductCode: "CARD-AX123",
      subProductTitle: "Prepaid Visa",
      productId: "Vendor Alpha",
      isSettlement: "Yes",
      settlementName: "Standard Settlement",
      enabled: "true",
      product: "BIN1234",
      walletType: "Digital",
      isActive: "true",
      createdOn: "2024-01-15",
      editedOn: "2024-04-12",
      createdBy: "Alice",
      editedBy: "Bob",
    },
    {
      id: "102",
      subProductCode: "CARD-MC456",
      subProductTitle: "Mastercard Gold",
      productId: "Vendor Beta",
      isSettlement: "No",
      settlementName: "None",
      enabled: "false",
      product: "BIN5678",
      walletType: "Physical",
      isActive: "false",
      createdOn: "2023-11-10",
      editedOn: "2024-02-18",
      createdBy: "Charlie",
      editedBy: "Diana",
    },
    {
      id: "103",
      subProductCode: "CARD-UPI789",
      subProductTitle: "UPI Virtual",
      productId: "Vendor Gamma",
      isSettlement: "Yes",
      settlementName: "Real-time",
      enabled: "true",
      product: "BIN9012",
      walletType: "UPI",
      isActive: "true",
      createdOn: "2024-03-22",
      editedOn: "2024-05-01",
      createdBy: "Eve",
      editedBy: "Frank",
    },
    {
      id: "104",
      subProductCode: "CARD-NFC321",
      subProductTitle: "NFC Enabled",
      productId: "Vendor Delta",
      isSettlement: "Yes",
      settlementName: "Instant",
      enabled: "true",
      product: "BIN4321",
      walletType: "Tap&Pay",
      isActive: "true",
      createdOn: "2023-12-01",
      editedOn: "2024-01-05",
      createdBy: "Grace",
      editedBy: "Heidi",
    },
    {
      id: "105",
      subProductCode: "CARD-INTL654",
      subProductTitle: "International Travel",
      productId: "Vendor Zeta",
      isSettlement: "No",
      settlementName: "Manual",
      enabled: "false",
      product: "BIN8765",
      walletType: "Travel",
      isActive: "false",
      createdOn: "2024-02-14",
      editedOn: "2024-04-10",
      createdBy: "Ivan",
      editedBy: "Judy",
    },
  ];

  const rows = data.map((item, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <div className="flex justify-center gap-2">
          <span className="cursor-pointer">
            <EyeIcon />
          </span>
          <span className="cursor-pointer">
            <EditIcon />
          </span>
        </div>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={item.id}
          withArrow
        >
          <span>{item.id}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={item.subProductCode}
          withArrow
        >
          <span>{item.subProductCode}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={item.subProductTitle}
          withArrow
        >
          <span>{item.subProductTitle}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={item.productId}
          withArrow
        >
          <span>{String(item.productId)}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={String(item.isSettlement)}
          withArrow
        >
          <span>{String(item.isSettlement)}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={String(item.settlementName)}
          withArrow
        >
          <span>{item.settlementName}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={item.enabled}
          withArrow
        >
          <span>{String(item.enabled)}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={String(item.product)}
          withArrow
        >
          <span>{String(item.product)}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={String(item.walletType)}
          withArrow
        >
          <span>{String(item.walletType)}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={String(item.isActive)}
          withArrow
        >
          <span>{String(item.isActive)}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={String(item.createdOn)}
          withArrow
        >
          <span>{String(item.createdOn)}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={item.editedOn}
          withArrow
        >
          <span>{item.editedOn}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={item.createdBy}
          withArrow
        >
          <span>{item.createdBy}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={item.editedBy}
          withArrow
        >
          <span>{item.editedBy}</span>
        </Tooltip>
      </Table.Td>
    </Table.Tr>
  ));

  const handleSearchChange = () => {};

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <TextComponent fontSize={22} fontFamily="Manrope" fontWeight={500}>
        Sub Product Master
      </TextComponent>

      <div className="flex justify-end items-center gap-2 mt-2">
        <ButtonComponent
          style={{ height: 40, width: 10, paddingLeft: "28px" }}
          radius={1}
          textColor="#000000"
          bgColor="#ffffff"
          borderColor="#CACACA"
          leftIcon={<RefreshIcon />}
        >
          <></>
        </ButtonComponent>

        <TextInputComponent
          size="md"
          type="text"
          placeholder="Search"
          name="search"
          value=""
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex justify-between mt-2">
        <ButtonComponent
          style={{ padding: "5px 20px", height: 40 }}
          radius={1}
          textColor="#fff"
          bgColor="#BF0204"
          borderColor="#FFFFFF"
          leftIcon={<AddIconSvg />}
        >
          Add Sub Product
        </ButtonComponent>
        <div>
          <ButtonComponent
            style={{ padding: "5px 16px", height: 36 }}
            radius={1}
            textColor="#000000"
            borderColor="#CACACA"
            bgColor="#ffffff"
            leftIcon={<FilterIcon />}
          >
            Filter
          </ButtonComponent>

          <ButtonComponent
            style={{ padding: "5px 16px", height: 36 }}
            radius={1}
            textColor="#000000"
            borderColor="#CACACA"
            bgColor="#ffffff"
            leftIcon={<DownloadIcon />}
          >
            Export
          </ButtonComponent>

          <ButtonComponent
            style={{ height: 36, width: 10, paddingLeft: "28px" }}
            radius={1}
            textColor="#000000"
            borderColor="#CACACA"
            bgColor="#ffffff"
            leftIcon={<GridIcon />}
          >
            <></>
          </ButtonComponent>

          <ButtonComponent
            style={{ padding: "5px 10px", height: 36 }}
            radius={1}
            textColor="#000000"
            borderColor="#CACACA"
            bgColor="#ffffff"
            leftIcon={<ColIcon />}
          >
            Cols
          </ButtonComponent>

          <ButtonComponent
            style={{ height: 36, padding: "5px" }}
            radius={1}
            textColor="#000000"
            borderColor="#CACACA"
            bgColor="#ffffff"
            leftIcon={<SettingIcon />}
          >
            <DropDownArrowIcon />
          </ButtonComponent>
        </div>
      </div>

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
              <Table.Th>{" "}</Table.Th>
              <Table.Th>ID</Table.Th> <Table.Th>Sub Product Code</Table.Th>
              <Table.Th>Sub Product Title</Table.Th>
              <Table.Th>Product ID</Table.Th>
              <Table.Th>Is Settlement</Table.Th>
              <Table.Th>Settlement Name</Table.Th>
              <Table.Th>Enabled</Table.Th>
              <Table.Th>Product</Table.Th>
              <Table.Th>Wallet Type</Table.Th>
              <Table.Th>Is Active</Table.Th>
              <Table.Th>Created On</Table.Th>
              <Table.Th>Edited On</Table.Th>
              <Table.Th>Created By</Table.Th>
              <Table.Th>Edited By</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
};

export default SubProductMaster;

import React from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
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
import { Table, Tooltip } from "@mantine/core";
import TextInputComponent from "../../Components/Atoms/TextInputComponent";
import { ellipsisCellStyle } from "../../Utils/utils";

const ProductMaster = () => {
  const data = [
    {
      id: "101",
      name: "Card A",
      productCode: "V001",
      productCodeForScheme: "Vendor X",
      isShow: "B123",
      hasSharges: "BIN987",
      isCommissions: "K001",
      isInventory: "F001",
      isSettlement: "FT01",
      isVirtual: "U001",
      isVisible: "R001",
      reverseTx: "P001",
      walletType: "C001",
      subProducts: "S001",
      productGroup: "2024-05-10",
      clusterMode: "UserX",
      blocked: "false",
      active: "true",
    },
    {
      id: "101",
      name: "Card A",
      productCode: "V001",
      productCodeForScheme: "Vendor X",
      isShow: "B123",
      hasSharges: "BIN987",
      isCommissions: "K001",
      isInventory: "F001",
      isSettlement: "FT01",
      isVirtual: "U001",
      isVisible: "R001",
      reverseTx: "P001",
      walletType: "C001",
      subProducts: "S001",
      productGroup: "2024-05-10",
      clusterMode: "UserX",
      blocked: "false",
      active: "true",
    },
    {
      id: "101",
      name: "Card A",
      productCode: "V001",
      productCodeForScheme: "Vendor X",
      isShow: "B123",
      hasSharges: "BIN987",
      isCommissions: "K001",
      isInventory: "F001",
      isSettlement: "FT01",
      isVirtual: "U001",
      isVisible: "R001",
      reverseTx: "P001",
      walletType: "C001",
      subProducts: "S001",
      productGroup: "2024-05-10",
      clusterMode: "UserX",
      blocked: "false",
      active: "true",
    },
    {
      id: "101",
      name: "Card A",
      productCode: "V001",
      productCodeForScheme: "Vendor X",
      isShow: "B123",
      hasSharges: "BIN987",
      isCommissions: "K001",
      isInventory: "F001",
      isSettlement: "FT01",
      isVirtual: "U001",
      isVisible: "R001",
      reverseTx: "P001",
      walletType: "C001",
      subProducts: "S001",
      productGroup: "2024-05-10",
      clusterMode: "UserX",
      blocked: "false",
      active: "true",
    },
    {
      id: "101",
      name: "Card A",
      productCode: "V001",
      productCodeForScheme: "Vendor X",
      isShow: "B123",
      hasSharges: "BIN987",
      isCommissions: "K001",
      isInventory: "F001",
      isSettlement: "FT01",
      isVirtual: "U001",
      isVisible: "R001",
      reverseTx: "P001",
      walletType: "C001",
      subProducts: "S001",
      productGroup: "2024-05-10",
      clusterMode: "UserX",
      blocked: "false",
      active: "true",
    },
    {
      id: "101",
      name: "Card A",
      productCode: "V001",
      productCodeForScheme: "Vendor X",
      isShow: "B123",
      hasSharges: "BIN987",
      isCommissions: "K001",
      isInventory: "F001",
      isSettlement: "FT01",
      isVirtual: "U001",
      isVisible: "R001",
      reverseTx: "P001",
      walletType: "C001",
      subProducts: "S001",
      productGroup: "2024-05-10",
      clusterMode: "UserX",
      blocked: "false",
      active: "true",
    },
    {
      id: "101",
      name: "Card A",
      productCode: "V001",
      productCodeForScheme: "Vendor X",
      isShow: "B123",
      hasSharges: "BIN987",
      isCommissions: "K001",
      isInventory: "F001",
      isSettlement: "FT01",
      isVirtual: "U001",
      isVisible: "R001",
      reverseTx: "P001",
      walletType: "C001",
      subProducts: "S001",
      productGroup: "2024-05-10",
      clusterMode: "UserX",
      blocked: "false",
      active: "true",
    },
    {
      id: "101",
      name: "Card A",
      productCode: "V001",
      productCodeForScheme: "Vendor X",
      isShow: "B123",
      hasSharges: "BIN987asdasda",
      isCommissions: "K001",
      isInventory: "F001",
      isSettlement: "FT01",
      isVirtual: "U001",
      isVisible: "R001",
      reverseTx: "P001",
      walletType: "C001",
      subProducts: "S001",
      productGroup: "2024-05-10",
      clusterMode: "UserX",
      blocked: "false",
      active: "true",
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
          label={item.name}
          withArrow
        >
          <span>{item.name}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={item.productCode}
          withArrow
        >
          <span>{item.productCode}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={item.productCodeForScheme}
          withArrow
        >
          <span>{item.productCodeForScheme}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={String(item.isShow)}
          withArrow
        >
          <span>{String(item.isShow)}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={String(item.hasSharges)}
          withArrow
        >
          <span>{String(item.hasSharges)}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={String(item.isCommissions)}
          withArrow
        >
          <span>{String(item.isCommissions)}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={String(item.isInventory)}
          withArrow
        >
          <span>{String(item.isInventory)}</span>
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
          label={String(item.isVirtual)}
          withArrow
        >
          <span>{String(item.isVirtual)}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={String(item.isVisible)}
          withArrow
        >
          <span>{String(item.isVisible)}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={String(item.reverseTx)}
          withArrow
        >
          <span>{String(item.reverseTx)}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={item.walletType}
          withArrow
        >
          <span>{item.walletType}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={item.subProducts}
          withArrow
        >
          <span>{item.subProducts}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={item.productGroup}
          withArrow
        >
          <span>{item.productGroup}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={item.clusterMode}
          withArrow
        >
          <span>{item.clusterMode}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={String(item.blocked)}
          withArrow
        >
          <span>{String(item.blocked)}</span>
        </Tooltip>
      </Table.Td>

      <Table.Td style={ellipsisCellStyle}>
        <Tooltip
          arrowPosition="side"
          arrowSize={5}
          position="top-start"
          label={String(item.active)}
          withArrow
        >
          <span>{String(item.active)}</span>
        </Tooltip>
      </Table.Td>
    </Table.Tr>
  ));

  const handleSearchChange = () => {};

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <TextComponent fontSize={22} fontFamily="Manrope" fontWeight={500}>
        Product Master
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
          style={{ padding: "5px 30px", height: 40 }}
          radius={1}
          textColor="#fff"
          bgColor="#BF0204"
          borderColor="#FFFFFF"
          leftIcon={<AddIconSvg />}
        >
          Add product
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
              <Table.Th></Table.Th>
              <Table.Th>Id</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Product Code</Table.Th>
              <Table.Th>Product Code for Scheme</Table.Th>
              <Table.Th>Is Show</Table.Th>
              <Table.Th>Has Sharges</Table.Th>
              <Table.Th>Is Commisions</Table.Th>
              <Table.Th>Is Inventory</Table.Th>
              <Table.Th>Is Settlement</Table.Th>
              <Table.Th>Is Virtual</Table.Th>
              <Table.Th>Is Visible</Table.Th>
              <Table.Th>Reverse Tx</Table.Th>
              <Table.Th>Wallet Type</Table.Th>
              <Table.Th>Sub Product</Table.Th>
              <Table.Th>Product Group</Table.Th>
              <Table.Th>Cluster Mode</Table.Th>
              <Table.Th>Blocked</Table.Th>
              <Table.Th>Active</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
};

export default ProductMaster;

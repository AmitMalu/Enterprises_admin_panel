import React from "react";
import TextComponent from "../../../../Components/Atoms/TextComponent";
import ButtonComponent from "../../../../Components/Atoms/ButtonComponent";
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
} from "../../../../assets/Icons";
import { Table, Tooltip } from "@mantine/core";
import TextInputComponent from "../../../../Components/Atoms/TextInputComponent";
import { ellipsisCellStyle } from "../../../../Utils/utils";
import { ProductType } from "../../../../Config/Master/ProductFormConfig";
import { useNavigate } from "react-router-dom";

const ProductMaster = () => {
  const navigate = useNavigate();

  const data: ProductType[] = [
    {
      id: "101",
      name: "Card A",
      productCode: "V001",
      productCodeForScheme: "Vendor X",
      isShow: true,
      hasCharges: "BIN987",
      isCommissions: false,
      isInventory: true,
      isSettlement: true,
      isVirtual: false,
      isVisible: true,
      reverseTx: "P001",
      walletType: "C001",
      subProducts: "S001",
      productGroup: "2024-05-10",
      clusterMode: "UserX",
      blocked: false,
      active: true,
    },
    {
      id: "102",
      name: "Card A",
      productCode: "V001",
      productCodeForScheme: "Vendor X",
      isShow: false,
      hasCharges: "BIN987",
      isCommissions: true,
      isInventory: true,
      isSettlement: true,
      isVirtual: false,
      isVisible: true,
      reverseTx: "P001",
      walletType: "C001",
      subProducts: "S001",
      productGroup: "2024-05-10",
      clusterMode: "UserX",
      blocked: false,
      active: true,
    },
  ];

  const headers: { key: keyof ProductType; label: string }[] = [
    { key: "id", label: "Id" },
    { key: "name", label: "Name" },
    { key: "productCode", label: "Product Code" },
    { key: "productCodeForScheme", label: "Product Code For Scheme" },
    { key: "isShow", label: "Is Show" },
    { key: "hasCharges", label: "Has Charges" },
    { key: "isCommissions", label: "Is Commissions" },
    { key: "isInventory", label: "Is Inventory" },
    { key: "isSettlement", label: "Is Settlement" },
    { key: "isVirtual", label: "Is Virtual" },
    { key: "isVisible", label: "Is Visible" },
    { key: "reverseTx", label: "Reverse Tx" },
    { key: "walletType", label: "Wallet Type" },
    { key: "subProducts", label: "Sub Products" },
    { key: "productGroup", label: "Product Group" },
    { key: "clusterMode", label: "Cluster Mode" },
    { key: "blocked", label: "Blocked" },
    { key: "active", label: "Active" },
  ];

  const handleEdit = (item: any) => {
    navigate(`/master/product-master/edit/${item.id}`, { state: item });
  };

  const rows = data.map((item, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <div className="flex justify-center gap-2">
          <span className="cursor-pointer">
            <EyeIcon />
          </span>
          <span onClick={() => handleEdit(item)} className="cursor-pointer">
            <EditIcon />
          </span>
        </div>
      </Table.Td>

      {headers.map(({ key }) => (
        <Table.Td key={key} style={ellipsisCellStyle}>
          <Tooltip
            arrowPosition="side"
            arrowSize={5}
            position="top-start"
            label={String(item[key as keyof ProductType])}
            withArrow
          >
            <span>{String(item[key as keyof ProductType])}</span>
          </Tooltip>
        </Table.Td>
      ))}
    </Table.Tr>
  ));

  const handleAdd = () => {
    navigate("/master/product-master/add");
  };

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
          onClick={handleAdd}
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
              {headers.map(({ key, label }) => (
                <Table.Th key={key}>{label}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
};

export default ProductMaster;

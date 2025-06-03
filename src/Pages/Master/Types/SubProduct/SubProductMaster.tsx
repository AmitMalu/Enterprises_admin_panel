import { Table, Tooltip } from "@mantine/core";
import React from "react";
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
import TextInputComponent from "../../../../Components/Atoms/TextInputComponent";
import TextComponent from "../../../../Components/Atoms/TextComponent";
import { ellipsisCellStyle } from "../../../../Utils/utils";
import { SubProductType } from "../../../../Config/Master/SubProductFormConfig";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const SubProductMaster = () => {
  const navigate = useNavigate();

  const data: SubProductType[] = [
    {
      id: "101",
      subProductCode: "CARD-AX123",
      subProductTitle: "Prepaid Visa",
      productId: "Vendor Alpha",
      isSettlement: false,
      settlementName: "Standard Settlement",
      enabled: true,
      product: "BIN1234",
      walletType: "Digital",
      isActive: true,
      createdOn: moment().format("2024-01-15"),
      editedOn: moment().format("2024-04-12"),
      createdBy: "Alice",
      editedBy: "Bob",
    },
    {
      id: "102",
      subProductCode: "CARD-MC456",
      subProductTitle: "Mastercard Gold",
      productId: "Vendor Beta",
      isSettlement: false,
      settlementName: "None",
      enabled: false,
      product: "BIN5678",
      walletType: "Physical",
      isActive: false,
      createdOn: moment().format("2023-11-10"),
      editedOn: moment().format("2024-02-18"),
      createdBy: "Charlie",
      editedBy: "Diana",
    },
  ];

  const headers: { key: keyof SubProductType; label: string }[] = [
    { key: "id", label: "ID" },
    { key: "subProductCode", label: "Sub Product Code" },
    { key: "subProductTitle", label: "Sub Product Title" },
    { key: "productId", label: "Product ID" },
    { key: "isSettlement", label: "Is Settlement" },
    { key: "settlementName", label: "Settlement Name" },
    { key: "enabled", label: "Enabled" },
    { key: "product", label: "Product" },
    { key: "walletType", label: "Wallet Type" },
    { key: "isActive", label: "Is Active" },
    { key: "createdOn", label: "Created On" },
    { key: "editedOn", label: "Edited On" },
    { key: "createdBy", label: "Created By" },
    { key: "editedBy", label: "Edited By" },
  ];

  const handleEdit = (item: any) => {
    navigate(`/master/sub-product-master/edit/${item.id}`, { state: item });
  };

  const rows = data.map((item, index) => (
    <Table.Tr >
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
            label={String(item[key as keyof SubProductType])}
            withArrow
          >
            <span>{String(item[key as keyof SubProductType])}</span>
          </Tooltip>
        </Table.Td>
      ))}
    </Table.Tr>
  ));

  const handleAdd = () => {
    navigate("/master/sub-product-master/add");
  };

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
          onClick={handleAdd}
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

export default SubProductMaster;

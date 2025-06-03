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
import { VendorType } from "../../../../Config/Master/VendorFormConfig";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const VendorMaster = () => {
  const navigate = useNavigate();

  const handleEdit = (item: any) => {
    navigate(`/master/vendor-master/edit/${item.id}`, { state: item });
  };

  const headers: { key: keyof VendorType; label: string }[] = [
    { key: "id", label: "Id" },
    { key: "productId", label: "Product Id" },
    { key: "productName", label: "Product Name" },
    { key: "vendorName", label: "Vendor Name" },
    { key: "vendorCode", label: "Vendor Code" },
    { key: "subProductId", label: "Sub Product Id" },
    { key: "subProductCode", label: "Sub Product Code" },
    { key: "modesSupported", label: "Modes Supported" },
    { key: "priority", label: "Priority" },
    { key: "isActive", label: "Active" },
    { key: "blanks", label: "Blanks" },
    { key: "createdOn", label: "Created On" },
    { key: "createdBy", label: "Created By" },
    { key: "editedOn", label: "Edited On" },
    { key: "editedBy", label: "Edited By" },
  ];

  const data: VendorType[] = [
    {
      id: "201",
      productId: "PID-001",
      productName: "TravelCard",
      vendorName: "Vendor One",
      vendorCode: "V001",
      subProductId: "SPID-01",
      subProductCode: "CARD-T001",
      modesSupported: "Online, NFC",
      priority: "High",
      isActive: true,
      blanks: "abc",
      createdOn: moment().format("2024-09-23"),
      createdBy: "Admin",
      editedOn: moment().format("2025-01-22"),
      editedBy: "Editor1",
    },
    {
      id: "202",
      productId: "PID-002",
      productName: "GiftCard",
      vendorName: "Vendor Two",
      vendorCode: "V002",
      subProductId: "SPID-02",
      subProductCode: "CARD-G002",
      modesSupported: "Online",
      priority: "Medium",
      isActive: false,
      blanks: "",
      createdOn: moment().format("2024-02-15"),
      createdBy: "System",
      editedOn: moment().format("2024-04-20"),
      editedBy: "Editor2",
    },
  ];

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
            label={String(item[key])}
            withArrow
          >
            <span>{String(item[key])}</span>
          </Tooltip>
        </Table.Td>
      ))}
    </Table.Tr>
  ));

  const handleAdd = () => {
    navigate("/master/vendor-master/add");
  };

  const handleSearchChange = () => {};

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <TextComponent fontSize={22} fontFamily="Manrope" fontWeight={500}>
        Vendor Master
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
          onClick={handleAdd}
          borderColor="#FFFFFF"
          leftIcon={<AddIconSvg />}
        >
          Add Vendor
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
              {headers.map((item, index) => (
                <Table.Th key={index}>{item.label}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
};
export default VendorMaster;

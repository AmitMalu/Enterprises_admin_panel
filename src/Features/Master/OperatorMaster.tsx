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
import { OperatorType } from "./OperatorFormConfig";
import { useNavigate } from "react-router-dom";

const OperatorMaster = () => {
  const navigate = useNavigate();

  const data : OperatorType[] = [
    {
      id: "101",
      operatorAlias: "Airtel DTH",
      operatorCategory: "DTH",
      operatorCode: "DTH101",
      operatorName: "Airtel Digital TV",
      productCode: "BIN1234",
      productId: "PRD1001",
      subProductCode: "CARD-AX123",
      subProductId: "SUBPRD-AX123",
      alias: "Airtel TV Card",
      isActive: true,
      cardBinNo: "987654",
      createdOn: "2024-01-15",
      editedOn: "2024-04-12",
      createdBy: "Alice",
      editedBy: "Bob",
    },
    {
      id: "102",
      operatorAlias: "Jio Fiber",
      operatorCategory: "Broadband",
      operatorCode: "BRD102",
      operatorName: "Jio Broadband",
      productCode: "BIN5678",
      productId: "PRD1002",
      subProductCode: "CARD-JF456",
      subProductId: "SUBPRD-JF456",
      alias: "Jio Fiber Card",
      isActive: false,
      cardBinNo: "876543",
      createdOn: "2023-11-10",
      editedOn: "2024-02-18",
      createdBy: "Charlie",
      editedBy: "Diana",
    },
    {
      id: "103",
      operatorAlias: "BSNL Landline",
      operatorCategory: "Landline",
      operatorCode: "LL103",
      operatorName: "BSNL",
      productCode: "BIN9012",
      productId: "PRD1003",
      subProductCode: "CARD-BS789",
      subProductId: "SUBPRD-BS789",
      alias: "BSNL Card",
      isActive: true,
      cardBinNo: "765432",
      createdOn: "2024-03-22",
      editedOn: "2024-05-01",
      createdBy: "Eve",
      editedBy: "Frank",
    },
    {
      id: "104",
      operatorAlias: "Tata Sky",
      operatorCategory: "DTH",
      operatorCode: "DTH104",
      operatorName: "Tata Play",
      productCode: "BIN4321",
      productId: "PRD1004",
      subProductCode: "CARD-TP321",
      subProductId: "SUBPRD-TP321",
      alias: "Tata Sky Card",
      isActive: false,
      cardBinNo: "654321",
      createdOn: "2023-12-01",
      editedOn: "2024-01-05",
      createdBy: "Grace",
      editedBy: "Heidi",
    },
    {
      id: "105",
      operatorAlias: "ACT Fibernet",
      operatorCategory: "Broadband",
      operatorCode: "BRD105",
      operatorName: "ACT Internet",
      productCode: "BIN8765",
      productId: "PRD1005",
      subProductCode: "CARD-ACT654",
      subProductId: "SUBPRD-ACT654",
      alias: "ACT Card",
      isActive: false,
      cardBinNo: "543210",
      createdOn: "2024-02-14",
      editedOn: "2024-04-10",
      createdBy: "Ivan",
      editedBy: "Judy",
    },
  ];

  const handleEdit = (item: any) => {
    navigate(`/master/operator-master/edit/${item.id}`, { state: item });
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

      {[
        "id",
        "operatorAlias",
        "operatorCategory",
        "operatorCode",
        "operatorName",
        "productCode",
        "productId",
        "subProductCode",
        "subProductId",
        "alias",
        "isActive",
        "cardBinNo",
        "createdOn",
        "editedOn",
        "createdBy",
        "editedBy",
      ].map((key) => (
        <Table.Td key={key} style={ellipsisCellStyle}>
          <Tooltip
            arrowPosition="side"
            arrowSize={5}
            position="top-start"
            label={String(item[key as keyof OperatorType])}
            withArrow
          >
            <span>{String(item[key as keyof OperatorType])}</span>
          </Tooltip>
        </Table.Td>
      ))}
    </Table.Tr>
  ));

  const handleAdd = () => {
    navigate("/master/operator-master/add");
  };

  const handleSearchChange = () => {};

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <TextComponent fontSize={22} fontFamily="Manrope" fontWeight={500}>
        Operato Master
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
          onClick={handleAdd}
          textColor="#fff"
          bgColor="#BF0204"
          borderColor="#FFFFFF"
          leftIcon={<AddIconSvg />}
        >
          Add Operator
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
              <Table.Th>Operator Alias</Table.Th>
              <Table.Th>Operator Category</Table.Th>
              <Table.Th>Operator Code</Table.Th>
              <Table.Th>Operator Name</Table.Th>
              <Table.Th>Product Code</Table.Th>
              <Table.Th>Product Id</Table.Th>
              <Table.Th>Sub Product Code</Table.Th>
              <Table.Th>Sub Product Id</Table.Th>
              <Table.Th>Alias</Table.Th>
              <Table.Th>Is Active</Table.Th>
              <Table.Th>Card Bin No</Table.Th>
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

export default OperatorMaster;

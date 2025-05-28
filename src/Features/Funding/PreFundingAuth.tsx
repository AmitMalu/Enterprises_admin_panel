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
import { useNavigate } from "react-router-dom";
import { PrefundingType } from "./PrefundingConfig";
import moment from "moment";

const headers: { key: keyof PrefundingType; label: string }[] = [
  { key: "depositType", label: "Depposit Type" }, // typo kept as-is
  { key: "transactionId", label: "Transaction ID" },
  { key: "amount", label: "Amount" },
  { key: "bankAccount", label: "Bank Account" },
  { key: "depositDate", label: "Deposit Date" },
  { key: "depositSlip", label: "Deposit Slip" },
  { key: "partnerName", label: "Partner Name" },
  { key: "requestedBy", label: "Requested By" },
  { key: "clientIp", label: "Client IP" },
  { key: "partnerMobileNumber", label: "Partner Mobile Number" },
  { key: "requestStatus", label: "Request Status" },
];

const data: PrefundingType[] = [
  {
    depositType: "Cash",
    transactionId: "TX123456",
    amount: "1000",
    bankAccount: "AXIS-12345",
    depositDate: moment().format("2024-12-18"),
    depositSlip: null,
    partnerName: "ABC Corp",
    requestedBy: "JohnDoe",
    clientIp: "192.168.0.1",
    partnerMobileNumber: "9876543210",
    requestStatus: "Pending",
  },
  {
    depositType: "Cash",
    transactionId: "TX123456",
    amount: "1000",
    bankAccount: "AXIS-12345",
    depositDate: "2024-06-01",
    depositSlip: null,
    partnerName: "ABC Corp",
    requestedBy: "JohnDoe",
    clientIp: "192.168.0.1",
    partnerMobileNumber: "9876543210",
    requestStatus: "Pending",
  },
  {
    depositType: "Cash",
    transactionId: "TX123456",
    amount: "1000",
    bankAccount: "AXIS-12345",
    depositDate: "2024-06-01",
    depositSlip: null,
    partnerName: "ABC Corp",
    requestedBy: "JohnDoe",
    clientIp: "192.168.0.1",
    partnerMobileNumber: "9876543210",
    requestStatus: "Pending",
  },
  {
    depositType: "Cash",
    transactionId: "TX123456",
    amount: "1000",
    bankAccount: "AXIS-12345",
    depositDate: "2024-06-01",
    depositSlip: null,
    partnerName: "ABC Corp",
    requestedBy: "JohnDoe",
    clientIp: "192.168.0.1",
    partnerMobileNumber: "9876543210",
    requestStatus: "Pending",
  },
];

const PreFundingAuth = () => {
  const navigate = useNavigate();

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
  const handleSearchChange = () => {};

  const handleEdit = (item: any) => {
    navigate(`/prefunding/edit/${item.id}`, { state: item });
  };

  const handleAdd = () => {
    navigate("/prefunding/add");
  };

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <TextComponent fontSize={22} fontFamily="Manrope" fontWeight={500}>
        Prefunding Request
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
          onClick={handleAdd}
          style={{ padding: "5px 20px", height: 40 }}
          radius={1}
          textColor="#fff"
          bgColor="#BF0204"
          borderColor="#FFFFFF"
          leftIcon={<AddIconSvg />}
        >
          Add Product
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

export default PreFundingAuth;

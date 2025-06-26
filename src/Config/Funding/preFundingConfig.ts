import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";
import moment from "moment";
import { API_ENDPOINTS } from "../Api/EndPoints";
import { GenericTableHeader } from "../../Utils/utils";

export const FUNDING_KEY = "prefunding";
export const FUNDING_URL = API_ENDPOINTS.FUNDING.PREFUNDING;

export interface PrefundingFormType {
  paymentMode: string;
  bankTranId: string;
  depositAmount: string;
  bankAccountNumber: string;
  depositDate: string;
  depositImage: string | null;
  // partnerName: string;
  requestedBy: string;
  ipAddress: string;
  mobileNumber: string;
  status: string;
}

export interface PrefundingTableType extends PrefundingFormType {
  id: string | number;
}

export const initialValues: PrefundingFormType = {
  paymentMode: "",
  bankTranId: "",
  depositAmount: "",
  bankAccountNumber: "",
  depositDate: "",
  depositImage: "",
  // partnerName: "",
  requestedBy: "",
  ipAddress: "",
  mobileNumber: "",
  status: "pending",
};

export const validationSchema: Record<keyof PrefundingFormType, Yup.AnySchema> =
  {
    paymentMode: textField("Deposit Type", 150, false, true),
    bankTranId: textField("Transaction Id", 150, false, true),
    depositAmount: textField("Deposit Amount", 150, false, true),
    bankAccountNumber: textField("Account Number", 150, false, true),
    depositDate: textField("Deposit Date", 150, false, true),
    depositImage: Yup.string().nullable().notRequired(),
    // partnerName: textField("Partner Name", 150, false, true),
    requestedBy: textField("Requested By", 150, false, true),
    ipAddress: textField("Client IP", 150, false, true),
    mobileNumber: textField("Partner Mobile Number", 150, false, true),
    status: textField("Request Status", 150, false, true).default("pending"),
  };

export const headers: GenericTableHeader<PrefundingTableType>[] = [
  { key: "paymentMode", label: "Deposit Type", filterType: "text" },
  { key: "bankTranId", label: "Transaction ID", filterType: "text" },
  { key: "depositAmount", label: "Amount", filterType: "text" },
  { key: "bankAccountNumber", label: "Account Number", filterType: "text" },
  { key: "depositDate", label: "Deposit Date", filterType: "date" },
  {
    key: "depositImage",
    label: "Deposit Slip",
    filterType: "text",
    renderType: "link",
  },
  // { key: "partnerName", label: "Partner Name", filterType: "text" },
  { key: "requestedBy", label: "Requested By", filterType: "text" },
  { key: "ipAddress", label: "Client IP", filterType: "text" },
  { key: "mobileNumber", label: "Partner Mobile Number", filterType: "text" },
  {
    key: "status",
    label: "Request Status",
    filterType: "boolean",
    filterOptions: [
      { label: "PENDING", value: "pending" },
      { label: "APPROVE", value: "approve" },
      { label: "REJECT", value: "reject" },
    ],
  },
];

export const data: PrefundingTableType[] = [
  {
    id: "1",
    paymentMode: "Cash",
    bankTranId: "TX1001",
    depositAmount: "1000",
    bankAccountNumber: "AXIS-12345",
    depositDate: moment().format("2024-12-18"),
    depositImage: "",
    // partnerName: "ABC Corp",
    requestedBy: "JohnDoe",
    ipAddress: "192.168.0.1",
    mobileNumber: "9876543210",
    status: "Pending",
  },
  {
    id: "2",
    paymentMode: "Cash",
    bankTranId: "TX1001",
    depositAmount: "1000",
    bankAccountNumber: "AXIS-12345",
    depositDate: moment().format("2024-12-18"),
    depositImage: "",
    // partnerName: "ABC Corp",
    requestedBy: "JohnDoe",
    ipAddress: "192.168.0.1",
    mobileNumber: "9876543210",
    status: "Approved",
  },
];

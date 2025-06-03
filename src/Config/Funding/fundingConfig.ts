import * as Yup from "yup";
import {
  fileValidation,
  mobileValidation,
  textField,
} from "../../Utils/ValidationUtils";
import moment from "moment";

export type PrefundingType = {
  depositType: string;
  transactionId: string;
  amount: string;
  bankAccount: string;
  depositDate: string;
  depositSlip: File | null;
  partnerName: string;
  requestedBy: string;
  clientIp: string;
  partnerMobileNumber: string;
  requestStatus: string;
};

export const initialValues: PrefundingType = {
  depositType: "",
  transactionId: "",
  amount: "",
  bankAccount: "",
  depositDate: "",
  depositSlip: null,
  partnerName: "",
  requestedBy: "",
  clientIp: "",
  partnerMobileNumber: "",
  requestStatus: "",
};

export const validationSchema: Record<keyof PrefundingType, Yup.AnySchema> = {
  depositType: textField("Deposit Type", 50, true),
  transactionId: textField("Transaction Id", 50, true),
  amount: textField("Amount", 20, true),
  bankAccount: textField("Bank Account", 50, true),
  depositDate: Yup.date()
    .required("Deposit Date is required")
    .typeError("Invalid date format"),
  depositSlip: fileValidation("Deposit Slip", [
    "application/pdf",
    "image/jpeg",
    "image/png",
  ]),
  partnerName: textField("Partner Name", 50, true),
  requestedBy: textField("Request By", 50, true),
  clientIp: textField("Client IP", 50, true),
  partnerMobileNumber: mobileValidation,
  requestStatus: textField("Request Status", 50, true),
};


export const headers: { key: keyof PrefundingType; label: string }[] = [
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

export const data: PrefundingType[] = [
  {
    depositType: "Cash",
    transactionId: "TX1001",
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
    transactionId: "TX1002",
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
    transactionId: "TX1003",
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
    transactionId: "TX1004",
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
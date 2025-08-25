import moment from "moment";
import {
  dateRangeValidationSchema,
  GenericTableHeader,
} from "../../Utils/utils";
import { API_ENDPOINTS } from "../Api/EndPoints";
import { DatesRangeValue } from "@mantine/dates";
import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";

export const SETTLEMENT_URL = API_ENDPOINTS.FUNDING.FUNDING;
export const SETTLEMENT_KEY = "FUNDING_SETTLEMENT";

interface PreSettlementFormType {
  dateRange: DatesRangeValue;
  productId: string | number;
  subProductId: string | number;
  vendorId: string | number;
  walletType: string;
}
export interface PreSettlementTableType {
  id: string | number;
  userId: string | number;
  mobileNo: string;
  amount: string | number;
  product: string;
  subProductName: string;
  txId: string;
  txStatus: string;
  txType: string;
  schemeName: string;
  remarks: string;
  walletType: string;
  updatedAt: string;
  created: string;
  userOutletName: string;
  refNo: string;
  txRef: string;
  txMode: string;
  txStart: string;
  txEnd: string;
  createdBy: string;
  medium: string;
  site: string;
}

export const settlementFilterInitialValues = {
  dateRange: [
    moment().subtract(6, "days").toDate(), // from: 6 days ago
    moment().toDate(), // to: today
  ] as DatesRangeValue,
  productId: "",
  subProductId: "",
  vendorId: "",
  walletType: "PREPAID",
};

export const settlementFilterValidationSchema: Record<
  keyof PreSettlementFormType,
  Yup.AnySchema
> = {
  dateRange: dateRangeValidationSchema,
  productId: textField("Product", 100, true, true),
  subProductId: textField("Sub Product", 100, true, true),
  vendorId: textField("Vendor", 100, false, true),
  walletType: textField("Wallet Type", 150, true, true).default("PREPAID"),
};

export const preSettlementHeaders: GenericTableHeader<PreSettlementTableType>[] =
  [
    { key: "id", label: "ID", filterType: "text" },
    { key: "userId", label: "User ID", filterType: "text" },
    { key: "mobileNo", label: "Mobile Number", filterType: "text" },
    { key: "amount", label: "Amount", filterType: "text" },
    { key: "subProductName", label: "Sub Product", filterType: "text" },
    { key: "txId", label: "Transaction Id", filterType: "text" },
    { key: "product", label: "Product", filterType: "text" },
    { key: "txStatus", label: "Status", filterType: "text" },
    { key: "walletType", label: "Wallet Type", filterType: "text" },
    { key: "remarks", label: "Remarks", filterType: "text" },
    { key: "txType", label: "Transaction Type", filterType: "text" },
    { key: "schemeName", label: "Scheme Name", filterType: "text" },
    { key: "updatedAt", label: "Last Update", filterType: "date" },
    { key: "medium", label: "Medium", filterType: "text" },
    { key: "created", label: "Created", filterType: "text" },
    { key: "userOutletName", label: "User Outlet Name", filterType: "text" },
    { key: "refNo", label: "Ref No", filterType: "text" },
    { key: "txRef", label: "TX Ref", filterType: "text" },
    { key: "txMode", label: "TX Mode", filterType: "text" },
    { key: "txStart", label: "TX Start", filterType: "text" },
    { key: "txEnd", label: "TX End", filterType: "text" },
    { key: "createdBy", label: "Created By", filterType: "text" },
    { key: "site", label: "Site", filterType: "text" },
  ];

// export const postSettlementHeaders: GenericTableHeader<PostSettlementTableType>[] =
//   [
//     { key: "id", label: "ID", filterType: "text" },
//     { key: "created", label: "Created", filterType: "text" },
//     { key: "lastUpdate", label: "Last Update", filterType: "text" },
//     { key: "userId", label: "User ID", filterType: "text" },
//     { key: "userOutletName", label: "User Outlet Name", filterType: "text" },
//     { key: "userMobileNo", label: "User Mobile No", filterType: "text" },
//     { key: "scheme", label: "Scheme", filterType: "text" },
//     { key: "product", label: "Product", filterType: "text" },
//     { key: "subProduct", label: "Sub Product", filterType: "text" },
//     { key: "walletType", label: "Wallet Type", filterType: "text" },
//     { key: "amount", label: "Amount", filterType: "text" },
//     { key: "status", label: "Status", filterType: "text" },
//     { key: "uriPath", label: "URI Path", filterType: "text" },
//     { key: "txType", label: "TX Type", filterType: "text" },
//     { key: "refNo", label: "Ref No", filterType: "text" },
//     { key: "txRef", label: "TX Ref", filterType: "text" },
//     { key: "remarks", label: "Remarks", filterType: "text" },
//     { key: "txMode", label: "TX Mode", filterType: "text" },
//     { key: "txStart", label: "TX Start", filterType: "text" },
//     { key: "txEnd", label: "TX End", filterType: "text" },
//     { key: "txid", label: "Txid", filterType: "text" },
//     { key: "createdBy", label: "Created By", filterType: "text" },
//     { key: "medium", label: "Medium", filterType: "text" },
//     { key: "site", label: "Site", filterType: "text" },
//     { key: "updateBy", label: "Update By", filterType: "text" },
//   ];

export const transformToViewSettlementPayload = (values: any) => {
  const [fromDate, toDate] = values.dateRange || [];

  return {
    fromDate: moment(fromDate).format("YYYY-MM-DD"),
    toDate: moment(toDate).format("YYYY-MM-DD"),
    // productId: values?.productId ?? "",
    subProductId: values.subProductId ?? "",
    vendorId: values.vendorId ?? "",
    walletType: values.walletType ?? "PREPAID",
    reportType: "PRE_SETTLEMENT",
    tranStatus: "SETTLEMENT PENDING",
  };
};

// Dummy data matching PreSettlementTableType
// export const dummyPreSettlementData: PreSettlementTableType[] = [
//   {
//     id: 101,
//     created: "2025-08-01T10:15:00Z",
//     lastUpdate: "2025-08-02T12:30:00Z",
//     userId: "U1001",
//     userOutletName: "Outlet One",
//     userMobileNo: "9876543210",
//     scheme: "Scheme A",
//     product: "Product X",
//     subProduct: "Sub Product X1",
//     walletType: "PREPAID",
//     amount: 2500,
//     status: "PENDING",
//     txType: "DEBIT",
//     refNo: "REF12345",
//     txRef: "TXREF12345",
//     remarks: "Transaction pending approval",
//     txMode: "ONLINE",
//     txStart: "2025-08-01T09:00:00Z",
//     txEnd: "2025-08-01T09:30:00Z",
//     txid: "TX1001",
//     createdBy: "Admin",
//     medium: "WEB",
//     site: "SITE-A",
//   },
//   {
//     id: 201,
//     created: "2025-08-03T14:20:00Z",
//     lastUpdate: "2025-08-03T15:45:00Z",
//     userId: "U1002",
//     userOutletName: "Outlet Two",
//     userMobileNo: "9123456780",
//     scheme: "Scheme B",
//     product: "Product Y",
//     subProduct: "Sub Product Y1",
//     walletType: "POSTPAID",
//     amount: 5000,
//     status: "APPROVED",
//     txType: "CREDIT",
//     refNo: "REF67890",
//     txRef: "TXREF67890",
//     remarks: "Approved by finance",
//     txMode: "OFFLINE",
//     txStart: "2025-08-03T13:00:00Z",
//     txEnd: "2025-08-03T13:45:00Z",
//     txid: "TX1002",
//     createdBy: "Manager",
//     medium: "MOBILE",
//     site: "SITE-B",
//   },
//   {
//     id: 301,
//     created: "2025-08-04T08:00:00Z",
//     lastUpdate: "2025-08-04T08:15:00Z",
//     userId: "U1003",
//     userOutletName: "Outlet Three",
//     userMobileNo: "9988776655",
//     scheme: "Scheme C",
//     product: "Product Z",
//     subProduct: "Sub Product Z1",
//     walletType: "PREPAID",
//     amount: 1200,
//     status: "REJECTED",
//     txType: "DEBIT",
//     refNo: "REF99999",
//     txRef: "TXREF99999",
//     remarks: "Insufficient balance",
//     txMode: "ONLINE",
//     txStart: "2025-08-04T07:30:00Z",
//     txEnd: "2025-08-04T07:45:00Z",
//     txid: "TX1003",
//     createdBy: "System",
//     medium: "API",
//     site: "SITE-C",
//   },
// ];

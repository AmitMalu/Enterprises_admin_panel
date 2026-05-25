import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";
import {
  dateRangeValidationSchema,
  GenericTableHeader,
  walletTypeSelectData,
} from "../../Utils/utils";
import { DatesRangeValue } from "@mantine/dates";
import moment from "moment";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const TRANX_REPORT_URL = API_ENDPOINTS.REPORTS.TRANSACTION;
export const TRANX_REPORT_KEY = "transaction-report";

export interface TransactionReportTableType {
  id: string;
  tranxId: string;
  transactionDate: string;
  transactionTime: string;
  balBefore: string;
  balAfter: string;
  amount: string;
  hierarchyId: string;
  productName: string;
  subProductName: string;
  schemeName: string;
  status: string;
  walletType: string;
  actionOnBalanceAmount: string;
  narration: string;
  latitude: string | null;
  longitude: string | null;
  vendorName: string | null;
  vendorTransactionId: string | null;
}

export const initialValues = {
  dateRange: [
    moment().subtract(6, "days").toDate(), // from: 6 days ago
    moment().toDate(), // to: today
  ] as DatesRangeValue,
  productId: "",
  hierarchy: "",
  subHierarchy: "",
  walletType: "",
  status: "",
};

// Yup schema
export const TransactionReportSchema = Yup.object().shape({
  dateRange: dateRangeValidationSchema,
  productId: textField("Product", 100, false, true),
  hierarchy: textField("Hierarchy", 100, false, true),
  subHierarchy: textField("Hierarchy ID", 100, false, true),
  walletType: textField("Wallet Type", 100, false, true),
  status: textField("Status", 100, false, true),
});

export const transformToTransactionReportPayload = (values: any) => {
  const [fromDate, toDate] = values.dateRange || [];

  return {
    hierarchyType: values.hierarchy ?? "",
    hierarchyId: values.subHierarchy ?? "",
    fromDate: moment(fromDate).format("YYYY-MM-DD"),
    toDate: moment(toDate).format("YYYY-MM-DD"),
    productId: values?.productId ?? "",
    walletType: values.walletType ?? "",
    status: values.status ?? "",
  };
};

export const headers: GenericTableHeader<TransactionReportTableType>[] = [
  { key: "id", label: "Id", filterType: "number", searchable: true },
  { key: "tranxId", label: "Transaction ID", filterType: "text" },
  { key: "balBefore", label: "Balance Before", filterType: "text" },
  { key: "balAfter", label: "Balance After", filterType: "text" },
  { key: "amount", label: "Amount", filterType: "text" },
  {
    key: "status",
    label: "Status",
    renderType: "statusBadge",
    filterType: "boolean",
    filterOptions: [
      { label: "SUCCESS", value: "SUCCESS" },
      { label: "FAILED", value: "FAILURE" },
      { label: "PENDING", value: "PENDING" },
      { label: "VENDOR PENDING", value: "VENDOR_PENDING" },
    ],
  },
  { key: "transactionDate", label: "Transaction Date", filterType: "none" },
  { key: "transactionTime", label: "Transaction Time", filterType: "text" },
  { key: "hierarchyId", label: "Hierarchy Id", filterType: "text" },
  { key: "productName", label: "Product", filterType: "text" },
  { key: "subProductName", label: "Sub Product", filterType: "text" },
  { key: "schemeName", label: "Scheme Name", filterType: "text" },
  {
    key: "walletType",
    label: "Wallet Type",
    filterType: "boolean",
    filterOptions: walletTypeSelectData,
  },
  {
    key: "actionOnBalanceAmount",
    label: "Action On Balance",
    filterType: "text",
  },
  { key: "narration", label: "Narration", filterType: "text" },
  { key: "latitude", label: "Latitude", filterType: "text" },
  { key: "longitude", label: "Longitude", filterType: "text" },
  { key: "vendorName", label: "Vendor Name", filterType: "text" },
  { key: "vendorTransactionId", label: "Vendor TxnId", filterType: "text" },
];

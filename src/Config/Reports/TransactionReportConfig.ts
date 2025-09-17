import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";
import {
  dateRangeValidationSchema,
  GenericTableHeader,
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
  subProductName: string;
  status: string;
  walletType: string;
  actionOnBalanceAmount: string;
  narration: string;
}

export const initialValues = {
  dateRange: [
    moment().subtract(6, "days").toDate(), // from: 6 days ago
    moment().toDate(), // to: today
  ] as DatesRangeValue,
  subProduct: "",
  hierarchy: "",
  subHierarchy: "",
  walletType: "POSTPAID",
  status: "ALL",
};

// Yup schema
export const TransactionReportSchema = Yup.object().shape({
  dateRange: dateRangeValidationSchema,
  subProduct: textField("Sub Product", 100, true, true),
  hierarchy: textField("Hierarchy", 100, true, true),
  subHierarchy: textField("Hierarchy ID", 100, true, true),
  walletType: textField("Wallet Type", 100, true, true),
  status: textField("Status", 100, false, true),
});

export const transformToTransactionReportPayload = (values: any) => {
  const [fromDate, toDate] = values.dateRange || [];

  return {
    hierarchyId: values.subHierarchy,
    fromDate: moment(fromDate).format("YYYY-MM-DD"),
    toDate: moment(toDate).format("YYYY-MM-DD"),
    subProductName: values?.subProduct,
    walletType: values.walletType ?? "",
    status: values.status ?? "ALL",
    page: 0,
    size: 10,
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
      { label: "PENDING", value: "PENDING" },
      { label: "SUCCESS", value: "SUCCESS" },
      { label: "FAILED", value: "FAILED" },
    ],
  },
  { key: "transactionDate", label: "Transaction Date", filterType: "date" },
  { key: "transactionTime", label: "Transaction Time", filterType: "date" },
  { key: "subProductName", label: "Sub Product", filterType: "text" },
  { key: "walletType", label: "Wallet Type", filterType: "text" },
  {
    key: "actionOnBalanceAmount",
    label: "Action On Balance",
    filterType: "text",
  },
  { key: "narration", label: "Narration", filterType: "text" },
];

import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";
import {
  dateRangeValidationSchema,
  GenericTableHeader,
} from "../../Utils/utils";
import { DatesRangeValue } from "@mantine/dates";
import moment from "moment";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const REFUND_REPORT_URL = API_ENDPOINTS.REPORTS.REFUND_REPORT;
export const REFUND_REPORT_KEY = "refund-report";

interface RefundReportFormType {
  dateRange: DatesRangeValue;
  hierarchyType: string;
  walletType: string;
}

export interface RefundReportTableType {
  id: string | number;
  amount: string | number;
  balAfterTran: string | number;
  balBeforeTran: string | number;
  dateOfTransaction: string;
  timeOfTransaction: string;
  updatedDateOfTransaction: string | null;
  updatedTimeOfTransaction: string | null;
  actionOnBalanceAmount: string | null;
  bankRefId: string | null;
  operatorName: string | null;
  userId: string;
  schemeHierarchyName: string | null;
  schemeName: string | null;
  service: string | null;
  subOperatorName: string | null;
  subProductName: string | null;
  tranStatus: string;
  transactionId: string;
  transactionType: string | null;
}

export const refundReportInitialValues: RefundReportFormType = {
  dateRange: [
    moment().subtract(6, "days").toDate(), // from: 6 days ago
    moment().toDate(), // to: today
  ] as DatesRangeValue,
  hierarchyType: "",
  walletType: "",
};

// Yup schema
export const refundReportSchema: Record<
  keyof RefundReportFormType,
  Yup.AnySchema
> = {
  dateRange: dateRangeValidationSchema,
  hierarchyType: textField("Hierarchy Type", 100, true, true),
  walletType: textField("Wallet Type", 100, false, true),
};

export const refundReportHeaders: GenericTableHeader<RefundReportTableType>[] =
  [
    { key: "id", label: "Id", filterType: "number", searchable: true },
    { key: "transactionId", label: "Transaction ID", filterType: "text" },
    { key: "userId", label: "User Id", filterType: "text" },
    { key: "service", label: "Service", filterType: "text" },
    { key: "balBeforeTran", label: "Balance Before", filterType: "text" },
    { key: "balAfterTran", label: "Balance After", filterType: "text" },
    { key: "amount", label: "Amount", filterType: "text" },
    { key: "dateOfTransaction", label: "TXN Date", filterType: "date" },
    { key: "timeOfTransaction", label: "TXN Time", filterType: "text" },
    {
      key: "updatedDateOfTransaction",
      label: "TXN Update Date",
      filterType: "date",
    },
    {
      key: "updatedTimeOfTransaction",
      label: "TXN Update Time",
      filterType: "text",
    },
    { key: "bankRefId", label: "Bank Ref ID", filterType: "text" },
    {
      key: "actionOnBalanceAmount",
      label: "Action On Bal Amount",
      filterType: "text",
    },
    { key: "tranStatus", label: "TXN Status", filterType: "text" },
    { key: "transactionType", label: "TXN Type", filterType: "text" },
    {
      key: "schemeHierarchyName",
      label: "Scheme Hierarchy",
      filterType: "text",
    },
    { key: "schemeName", label: "Scheme Name", filterType: "text" },
    { key: "subProductName", label: "Sub Product", filterType: "text" },
    { key: "operatorName", label: "Operator", filterType: "text" },
  ];

export const transformToRefundReportPayload = (values: any) => {
  const [fromDate, toDate] = values.dateRange || [];

  return {
    fromDate: moment(fromDate).format("YYYY-MM-DD"),
    toDate: moment(toDate).format("YYYY-MM-DD"),
    hierarchyType: values.hierarchyType ?? "",
    walletType: values.walletType ?? "",
  };
};

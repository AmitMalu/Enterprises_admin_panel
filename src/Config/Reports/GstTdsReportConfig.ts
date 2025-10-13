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

export const GST_TDS_REPORT_URL = API_ENDPOINTS.REPORTS.GST_TDS;
export const GST_TDS_REPORT_KEY = "gst-tds-report";

interface GstTdsReportFormType {
  dateRange: DatesRangeValue;
  subProduct: string | number;
  hierarchy: string;
  hierarchyId: string;
  walletType: string;
  reportType: string;
}

export interface GstTdsReportTableType {
  id: string | number;
  transactionDate: string;
  transactionTime: string;
  subProductName: string;
  walletType: string | null;
  txType: string;
  balBefore: string | number;
  amount: string | number;
  balAfter: string | number;
  operator: string | null;
  txId: string;
}

export const GstTdsReportInitialValues: GstTdsReportFormType = {
  dateRange: [
    moment().subtract(6, "days").toDate(), // from: 6 days ago
    moment().toDate(), // to: today
  ] as DatesRangeValue,
  subProduct: "",
  hierarchy: "",
  hierarchyId: "",
  walletType: "POSTPAID",
  reportType: "",
};

// Yup schema
export const GstTdsReportSchema: Record<
  keyof GstTdsReportFormType,
  Yup.AnySchema
> = {
  dateRange: dateRangeValidationSchema,
  subProduct: textField("Sub Product", 100, true, true),
  hierarchy: textField("Hierarchy", 100, true, true),
  hierarchyId: textField("Hierarchy ID", 100, false, true),
  walletType: textField("Wallet Type", 100, true, true),
  reportType: textField("Report Type", 100, true, true),
};

export const GstTdsheaders: GenericTableHeader<GstTdsReportTableType>[] = [
  { key: "id", label: "Id", filterType: "number", searchable: true },
  { key: "txId", label: "Transaction ID", filterType: "text" },
  { key: "txType", label: "Transaction Type", filterType: "text" },
  { key: "balBefore", label: "Balance Before", filterType: "number" },
  { key: "balAfter", label: "Balance After", filterType: "number" },
  { key: "amount", label: "Amount", filterType: "number" },
  { key: "transactionDate", label: "Transaction Date", filterType: "date" },
  { key: "transactionTime", label: "Transaction Time", filterType: "date" },
  { key: "subProductName", label: "Sub Product", filterType: "text" },
  { key: "operator", label: "Operator", filterType: "text" },
  {
    key: "walletType",
    label: "Wallet Type",
    filterType: "boolean",
    filterOptions: walletTypeSelectData,
  },
];

export const transformToGstTdsReportPayload = (values: any) => {
  const [fromDate, toDate] = values.dateRange || [];

  return {
    fromDate: moment(fromDate).format("YYYY-MM-DD"),
    toDate: moment(toDate).format("YYYY-MM-DD"),
    hierarchyType: values.hierarchy ?? "",
    hierarchyId: values.hierarchyId,
    subProductName: values?.subProduct,
    walletType: values.walletType ?? "",
    reportType: values.reportType ?? "",
    page: 0,
    size: 10,
  };
};

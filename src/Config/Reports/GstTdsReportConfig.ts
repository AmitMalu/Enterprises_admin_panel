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
  productId: string | number;
  hierarchy: string;
  hierarchyId: string;
  walletType: string;
  reportType: string;
}

export interface GstTdsReportTableType {
  id: string | number;
  transactionDate: string;
  transactionTime: string;
  productName: string;
  subProductName: string;
  walletType: string | null;
  txType: string;
  balBefore: string | number;
  amount: string | number;
  balAfter: string | number;
  operator: string | null;
  txId: string;
  latitude: string | null;
  longitude: string | null;
  vendorName: string | null;
  vendorTransactionId: string | null;
}

export const GstTdsReportInitialValues: GstTdsReportFormType = {
  dateRange: [
    moment().subtract(6, "days").toDate(), // from: 6 days ago
    moment().toDate(), // to: today
  ] as DatesRangeValue,
  productId: "",
  hierarchy: "",
  hierarchyId: "",
  reportType: "",
  walletType: "",
};

// Yup schema
export const GstTdsReportSchema: Record<
  keyof GstTdsReportFormType,
  Yup.AnySchema
> = {
  dateRange: dateRangeValidationSchema,
  productId: textField("Product", 100, false, true),
  hierarchy: textField("Hierarchy", 100, false, true),
  hierarchyId: textField("Hierarchy ID", 100, false, true),
  reportType: textField("Report Type", 100, false, true),
  walletType: textField("Wallet Type", 100, false, true),
};

export const GstTdsheaders: GenericTableHeader<GstTdsReportTableType>[] = [
  { key: "id", label: "Id", filterType: "number", searchable: true },
  { key: "txId", label: "Transaction ID", filterType: "text" },
  { key: "txType", label: "Transaction Type", filterType: "text" },
  { key: "balBefore", label: "Balance Before", filterType: "number" },
  { key: "balAfter", label: "Balance After", filterType: "number" },
  { key: "amount", label: "Amount", filterType: "number" },
  { key: "productName", label: "Product", filterType: "text" },
  { key: "subProductName", label: "Sub Product", filterType: "text" },
  { key: "operator", label: "Operator", filterType: "text" },
  {
    key: "walletType",
    label: "Wallet Type",
    filterType: "boolean",
    filterOptions: walletTypeSelectData,
  },
  { key: "transactionDate", label: "Transaction Date", filterType: "date" },
  { key: "transactionTime", label: "Transaction Time", filterType: "text" },
  { key: "latitude", label: "Latitude", filterType: "text" },
  { key: "longitude", label: "Longitude", filterType: "text" },
  { key: "vendorName", label: "Vendor Name", filterType: "text" },
  { key: "vendorTransactionId", label: "Vendor TxnId", filterType: "text" },
];

export const transformToGstTdsReportPayload = (values: any) => {
  const [fromDate, toDate] = values.dateRange || [];

  return {
    fromDate: moment(fromDate).format("YYYY-MM-DD"),
    toDate: moment(toDate).format("YYYY-MM-DD"),
    hierarchyType: values.hierarchy ?? "",
    hierarchyId: values.hierarchyId ?? "",
    productId: values?.productId ?? "",
    reportType: values.reportType ? values.reportType : "GST_TDS",
    walletType: values.walletType ?? "",
  };
};

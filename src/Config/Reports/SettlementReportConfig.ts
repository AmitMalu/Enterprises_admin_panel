import moment from "moment";
import {
  dateRangeValidationSchema,
  GenericTableHeader,
} from "../../Utils/utils";
import { API_ENDPOINTS } from "../Api/EndPoints";
import { DatesRangeValue } from "@mantine/dates";
import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";

//Same Config as Used for Settlement/Unsettled/Pending Report with different transform functions

export const SETTLEMENT_REPORT_URL = API_ENDPOINTS.FUNDING.FUNDING;
export const SETTLEMENT_REPORT_KEY = "SETTLEMENT_REPORT";
export const UNSETTLED_REPORT_KEY = "UNSETTLED_REPORT";
export const PENDING_TRANSCATION_REPORT_KEY = "PENDING_TRANSCATION_REPORT";

interface SettlementReportFormType {
  dateRange: DatesRangeValue;
  productId: string | number;
  subProductId: string | number;
  // vendorId: string | number;
  walletType: string;
  tranStatus: string;
}
export interface SettlementReportTableType {
  id: string | number;
  userId: string | number;
  mobileNo: string;
  amount: string | number;
  productName: string;
  subProductName: string;
  vendor: string;
  txId: string;
  txStatus: string;
  txType: string;
  schemeName: string;
  remarks: string;
  walletType: string;
  // created: string;
  // userOutletName: string;
  // refNo: string;
  // txRef: string;
  // txMode: string;
  // txStart: string;
  // txEnd: string;
  dateOfTransaction: string;
  medium: string;
  updateBy: string;
  updatedAt: string;
  // site: string;
  // uriPath: string;
}

export const settlementReportFilterInitialValues = {
  dateRange: [
    moment().subtract(6, "days").toDate(), // from: 6 days ago
    moment().toDate(), // to: today
  ] as DatesRangeValue,
  productId: "",
  subProductId: "",
  // vendorId: "",
  walletType: "",
  tranStatus: "",
};

export const settlementReportFilterValidationSchema: Record<
  keyof SettlementReportFormType,
  Yup.AnySchema
> = {
  dateRange: dateRangeValidationSchema,
  productId: textField("Product", 100, false, true),
  subProductId: textField("Sub Product", 100, false, true),
  // vendorId: textField("Vendor", 100, false, true),
  walletType: textField("Wallet Type", 150, false, true),
  tranStatus: textField("Transaction Status", 50, false, true),
};

export const settlementReportHeaders: GenericTableHeader<SettlementReportTableType>[] =
  [
    { key: "id", label: "Id", filterType: "number", searchable: true },
    { key: "userId", label: "User ID", filterType: "text" },
    { key: "mobileNo", label: "User Mobile No", filterType: "text" },
    { key: "amount", label: "Amount", filterType: "text" },
    // { key: "product", label: "Product", filterType: "text" },
    { key: "productName", label: "Product", filterType: "text" },
    { key: "subProductName", label: "Sub Product", filterType: "text" },
    { key: "vendor", label: "Vendor", filterType: "text" },
    { key: "txId", label: "Transaction Id", filterType: "text" },
    { key: "txType", label: "TX Type", filterType: "text" },
    { key: "txStatus", label: "Status", filterType: "none" },
    // { key: "txRef", label: "TX Ref", filterType: "text" },
    // { key: "txMode", label: "TX Mode", filterType: "text" },
    // { key: "txStart", label: "TX Start", filterType: "text" },
    // { key: "txEnd", label: "TX End", filterType: "text" },
    { key: "walletType", label: "Wallet Type", filterType: "text" },
    // { key: "createdBy", label: "Created By", filterType: "text" },
    { key: "remarks", label: "Remarks", filterType: "text" },
    { key: "schemeName", label: "Scheme Name", filterType: "text" },
    { key: "medium", label: "Medium", filterType: "text" },
    // { key: "updateBy", label: "Update By", filterType: "text" },
    { key: "dateOfTransaction", label: "Created At", filterType: "date" },
    { key: "updatedAt", label: "Updated At", filterType: "date" },
    // { key: "refNo", label: "Ref No", filterType: "text" },
    // { key: "userOutletName", label: "User Outlet Name", filterType: "text" },
    // { key: "site", label: "Site", filterType: "text" },
    // { key: "uriPath", label: "URI Path", filterType: "text" },
  ];

export const transformToViewSettlementReportPayload = (values: any) => {
  const [fromDate, toDate] = values.dateRange || [];

  return {
    fromDate: moment(fromDate).format("YYYY-MM-DD"),
    toDate: moment(toDate).format("YYYY-MM-DD"),
    productId: values?.productId ?? "",
    subProductId: values.subProductId ?? "",
    // vendorId: values.vendorId ?? "",
    walletType: values.walletType ?? "",
    // reportType: "PRE_SETTLEMENT",
    tranStatus: values.tranStatus ? values.tranStatus : "POST SETTLEMENT",
  };
};

export const transformToUnSettledTranxReportPayload = (values: any) => {
  const [fromDate, toDate] = values.dateRange || [];

  return {
    fromDate: moment(fromDate).format("YYYY-MM-DD"),
    toDate: moment(toDate).format("YYYY-MM-DD"),
    productId: values?.productId ?? "",
    subProductId: values.subProductId ?? "",
    // vendorId: values.vendorId ?? "",
    walletType: values.walletType ?? "",
    // reportType: "PRE_SETTLEMENT",
    tranStatus: "SETTLEMENT PENDING",
  };
};

export const transformToPendingTranxReportPayload = (values: any) => {
  const [fromDate, toDate] = values.dateRange || [];

  return {
    fromDate: moment(fromDate).format("YYYY-MM-DD"),
    toDate: moment(toDate).format("YYYY-MM-DD"),
    productId: values?.productId ?? "",
    subProductId: values.subProductId ?? "",
    // vendorId: values.vendorId ?? "",
    walletType: values.walletType ?? "",
    // reportType: "PRE_SETTLEMENT",
    tranStatus: "PENDING",
  };
};

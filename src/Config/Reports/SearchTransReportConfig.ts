import { API_ENDPOINTS } from "../Api/EndPoints";
import * as Yup from "yup";
import {
  GenericTableHeader,
  transactionStatusSelectData,
  walletTypeSelectData,
} from "../../Utils/utils";
import { textField } from "../../Utils/ValidationUtils";

export const SEARCH_TRANSACTION_REPORT_URL =
  API_ENDPOINTS.REPORTS.SEARCH_TRANSACTION;
export const SEARCH_TRANSACTION_REPORT_KEY = "search-transaction";

interface SearchTransReportFormType {
  transactionId: string;
}

export interface SearchTransReportTableType {
  transactionId: string;
  hierarchyId: string;
  walletType: string;
  balBefore: number;
  amount: number;
  balAfter: number;
  subProductName: string | null;
  narration: string | null;
  status: string;
  date: string;
  time: string;
  latitude: string | null;
  longitude: string | null;
  vendorName: string | null;
  vendorTransactionId: string | null;
}

export interface SearchTransReportData {
  transactionDetails: SearchTransReportTableType[];
  walletDetails: SearchTransReportTableType[];
}

export const searchTransInitialValues = {
  transactionId: "",
};

// Yup schema
export const SearchTransReportSchema: Record<
  keyof SearchTransReportFormType,
  Yup.AnySchema
> = {
  transactionId: textField("Transaction ID", 100, true, true),
};

export const SearchTransReportHeaders: GenericTableHeader<SearchTransReportTableType>[] =
  [
    {
      key: "transactionId",
      label: "Transaction ID",
      filterType: "text",
      copyable: true,
    },
    { key: "hierarchyId", label: "Hierarchy ID", filterType: "text" },
    {
      key: "walletType",
      label: "Wallet Type",
      filterType: "boolean",
      filterOptions: walletTypeSelectData,
    },
    { key: "balBefore", label: "Balance Before", filterType: "amount" },
    { key: "amount", label: "Amount", filterType: "amount" },
    { key: "balAfter", label: "Balance After", filterType: "amount" },
    { key: "subProductName", label: "Sub Product Name", filterType: "text" },
    { key: "narration", label: "Narration", filterType: "text" },
    {
      key: "status",
      label: "Status",
      filterType: "boolean",
      filterOptions: transactionStatusSelectData,
    },
    { key: "date", label: "Date", filterType: "date" },
    { key: "time", label: "Time", filterType: "text" },
    { key: "latitude", label: "Latitude", filterType: "coordinate" },
    { key: "longitude", label: "Longitude", filterType: "coordinate" },
    { key: "vendorName", label: "Vendor Name", filterType: "text" },
    { key: "vendorTransactionId", label: "Vendor TxnId", filterType: "text" },
  ];

import { API_ENDPOINTS } from "../Api/EndPoints";
import * as Yup from "yup";
import {
  dateRangeValidationSchema,
  GenericTableHeader,
  transactionStatusSelectData2,
} from "../../Utils/utils";
import { DatesRangeValue } from "@mantine/dates";
import moment from "moment";

export const LEDGER_REPORT_URL = API_ENDPOINTS.REPORTS.LEDGER_REPORT;
export const LEDGER_REPORT_KEY = "ledger-report";

interface LedgerReportFormType {
  dateRange: DatesRangeValue;
}

export interface LedgerReportTableType {
  id: string | number;
  transactionId: string | number;
  hierarchyId: string | number;
  dateOfTransaction: string;
  timeOfTransaction: string;
  balBeforeTran: number;
  amount: string | number;
  balAfterTran: string | number;
  finalBalance: string | number;
  tranStatus: string;
  actionOnBalanceAmount: string;
  service: string;
  mobileNo: string | null;
  subProductName: string;
  remarks: string | null;
  narration: string | null;
  sourceTable: string;
  latitude: string | null;
  longitude: string | null;
  vendorName: string | null;
  vendorTransactionId: string | null;
}

export const ledgerReportInitialValues: LedgerReportFormType = {
  dateRange: [
    moment().subtract(6, "days").toDate(), // from: 6 days ago
    moment().toDate(), // to: today
  ] as DatesRangeValue,
};

// Yup schema
export const LedgerReportValidationSchema: Record<
  keyof LedgerReportFormType,
  Yup.AnySchema
> = {
  dateRange: dateRangeValidationSchema,
};

export const LedgerReportHeaders: GenericTableHeader<LedgerReportTableType>[] =
  [
    {
      key: "id",
      label: "ID",
      filterType: "text",
      copyable: true,
    },
    {
      key: "transactionId",
      label: "Transaction ID",
      filterType: "text",
      copyable: true,
    },
    {
      key: "hierarchyId",
      label: "Hierarchy ID",
      filterType: "text",
    },
    {
      key: "dateOfTransaction",
      label: "Date of TXN",
      filterType: "date",
    },
    {
      key: "timeOfTransaction",
      label: "Time of TXN",
      filterType: "time",
    },
    {
      key: "balBeforeTran",
      label: "Balance Before TXN",
      filterType: "amount",
    },
    {
      key: "amount",
      label: "Amount",
      filterType: "amount",
    },
    {
      key: "balAfterTran",
      label: "Balance After TXN",
      filterType: "amount",
    },
    {
      key: "finalBalance",
      label: "Final Balance",
      filterType: "amount",
    },
    {
      key: "tranStatus",
      label: "Transaction Status",
      filterType: "boolean",
      filterOptions: transactionStatusSelectData2,
    },
    {
      key: "actionOnBalanceAmount",
      label: "Action On Balance Amount",
      filterType: "text",
    },
    {
      key: "service",
      label: "Service",
      filterType: "text",
    },
    {
      key: "mobileNo",
      label: "Mobile Number",
      filterType: "number",
    },
    {
      key: "subProductName",
      label: "Sub Product Name",
      filterType: "text",
    },
    {
      key: "remarks",
      label: "Remarks",
      filterType: "text",
    },
    {
      key: "narration",
      label: "Narration",
      filterType: "text",
    },
    {
      key: "sourceTable",
      label: "Source Table",
      filterType: "text",
    },
    { key: "latitude", label: "Latitude", filterType: "coordinate" },
    { key: "longitude", label: "Longitude", filterType: "coordinate" },
    { key: "vendorName", label: "Vendor Name", filterType: "text" },
    { key: "vendorTransactionId", label: "Vendor TxnId", filterType: "text" },
  ];

import { API_ENDPOINTS } from "../Api/EndPoints";
import * as Yup from "yup";
import {
  dateRangeValidationSchema,
  GenericTableHeader,
  transactionStatusSelectData,
  walletTypeSelectData,
} from "../../Utils/utils";
import { textField } from "../../Utils/ValidationUtils";
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
      filterType: "text",
    },
    {
      key: "balBeforeTran",
      label: "Balance Before TXN",
      filterType: "text",
    },
    {
      key: "amount",
      label: "Amount",
      filterType: "text",
    },
    {
      key: "balAfterTran",
      label: "Balance After TXN",
      filterType: "text",
    },
    {
      key: "finalBalance",
      label: "Final Balance",
      filterType: "text",
    },
    {
      key: "tranStatus",
      label: "Transaction Status",
      filterType: "boolean",
      filterOptions: transactionStatusSelectData,
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
      filterType: "text",
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
  ];

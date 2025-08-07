import { DatesRangeValue } from "@mantine/dates";
import { API_ENDPOINTS } from "../Api/EndPoints";
import * as Yup from "yup";
import {
  dateRangeValidationSchema,
  GenericTableHeader,
} from "../../Utils/utils";
import moment from "moment";
import { textField } from "../../Utils/ValidationUtils";

export const LOGS_REPORT_URL = API_ENDPOINTS.REPORTS.LOGS;
export const LOGS_REPORT_KEY = "logs";

interface LogsReportFormType {
  dateRange: DatesRangeValue;
  logType: string;
}

export interface LogsReportTableType {
  srNo: string;
  request: string;
  response: string;
  ipAddress: string;
  requestDateTime: string;
  responseDateTime: string;
}

export const initialValues = {
  dateRange: [
    moment().subtract(6, "days").toDate(), // from: 6 days ago
    moment().toDate(), // to: today
  ] as DatesRangeValue,
  logType: "",
};

// Yup schema
export const LogsReportSchema: Record<keyof LogsReportFormType, Yup.AnySchema> =
  {
    dateRange: dateRangeValidationSchema,
    logType: textField("Log Type", 50, true, true),
  };

export const transformToLogsReportFilter = (values: any) => {
  const [fromDate, toDate] = values.dateRange || [];

  const filter = {
    startDate: fromDate ? moment(fromDate).format("YYYY-MM-DD") : undefined,
    endDate: toDate ? moment(toDate).format("YYYY-MM-DD") : undefined,
  };

  const finalFilter = Object.fromEntries(
    Object.entries(filter).filter(([_, v]) => v != null)
  );

  return finalFilter;
};

export const headers: GenericTableHeader<LogsReportTableType>[] = [
  { key: "srNo", label: "Sr No", filterType: "text" },
  { key: "request", label: "Request", filterType: "text", copyable: true },
  { key: "response", label: "Response", filterType: "text", copyable: true },
  { key: "ipAddress", label: "IP Address", filterType: "text" },
  { key: "requestDateTime", label: "Request Date Time", filterType: "date" },
  { key: "responseDateTime", label: "Response Date Time", filterType: "date" },
];

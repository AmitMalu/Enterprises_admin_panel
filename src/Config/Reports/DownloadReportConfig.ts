import * as Yup from "yup";
import {
  GenericTableHeader,
  singleDateValidationSchema,
} from "../../Utils/utils";
import { DateValue } from "@mantine/dates";
import moment from "moment";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const DOWNLOAD_REPORT_URL = API_ENDPOINTS.REPORTS.REPORT;
export const DOWNLOAD_REPORT_KEY = "download-report";

interface DownloadReportFormType {
  date: DateValue;
}

export interface DownloadReportTableType {
  id: string;
  dated: string;
  timestamp: string;
  subject: string;
  fileName: string;
  filePath: string;
  reportType: string;
  createdAt: string | null;
}

export const downloadReportInitialValues: DownloadReportFormType = {
  date: moment().toDate() as DateValue,
};

// Yup schema
export const downloadReportSchema: Record<
  keyof DownloadReportFormType,
  Yup.AnySchema
> = {
  date: singleDateValidationSchema,
};

export const downloadReportHeaders: GenericTableHeader<DownloadReportTableType>[] =
  [
    { key: "id", label: "ID", filterType: "text", copyable: true },
    { key: "dated", label: "Date", filterType: "date" },
    { key: "timestamp", label: "Timestamp", filterType: "text" },
    { key: "subject", label: "Subject", filterType: "text" },
    { key: "fileName", label: "File Name", filterType: "text" },
    {
      key: "filePath",
      label: "File Path",
      renderType: "link",
      filterType: "text",
      copyable: true,
    },
    { key: "reportType", label: "Report Type", filterType: "text" },
    { key: "createdAt", label: "Created At", filterType: "date" },
  ];

export const transformToDownloadReportPayload = (values: any) => {
  const date = values.date;

  return {
    date: date ? moment(date).format("YYYY-MM-DD") : null,
  };
};

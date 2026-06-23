import { GenericTableHeader } from "../../Utils/utils";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const DOWNLOAD_REPORT_WALLET_KEY = "download-report-wallet";
export const DOWNLOAD_REPORT_WALLET_URL = API_ENDPOINTS.REPORTS.WALLET_HISTORY;

export interface DownloadReportWalletTableType {
  id: number | string;
  date: string;
  timestamp: string;
  subject: string;
  frequency: string;
  fileName: string;
  recordCount: number | string;
  createdAt: string;
}

export const downloadReportWalletHeaders: GenericTableHeader<DownloadReportWalletTableType>[] =
  [
    { key: "id", label: "ID", filterType: "number" },
    { key: "date", label: "Date", filterType: "date" },
    { key: "timestamp", label: "Timestamp", filterType: "text" },
    { key: "subject", label: "Subject", filterType: "text" },
    { key: "frequency", label: "Frequency", filterType: "text" },
    { key: "fileName", label: "File Name", filterType: "text" },
    { key: "recordCount", label: "Record Count", filterType: "number" },
    { key: "createdAt", label: "Created At", filterType: "text" },
  ];

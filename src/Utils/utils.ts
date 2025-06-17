import { toast } from "react-toastify";
import { persistor } from "../Redux/Store/store";
import moment from "moment";
import * as Papa from "papaparse";

export const persistOtpSession = (username: string, otpFor: string) => {
  sessionStorage.setItem("otp-username", username);
  sessionStorage.setItem("otpFor", otpFor);
};

export const capitalizeWords = (str: string) =>
  str
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word

export const logoutUser = (
  message = "Session expired. Redirecting to login page."
) => {
  clearStorage();
  toast.warning(`${message}`);
  setTimeout(() => {
    window.location.href = "/login";
  }, 1000);
};

export function clearStorage() {
  // Clear localStorage and sessionStorage
  localStorage.clear();
  sessionStorage.clear();

  // Purge persisted Redux state
  persistor.purge();
}

export function checkTokenValidity(token: string | null) {
  const isTokenValid =
    token && token !== "null" && token !== "undefined" && token.trim() !== "";

  return isTokenValid;
}

// utils/getIpAddress.ts
export async function getIpAddress(): Promise<string> {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip || "";
  } catch (error) {
    console.error("Failed to fetch IP address:", error);
    return "";
  }
}

export const ellipsisCellStyle = {
  maxWidth: 160,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const formatDateTime = (dateString: string) => {
  return dateString ? moment(dateString).format("DD-MM-YYYY HH:mm") : "";
};

export const booleanSelectData = [
  { label: "Yes", value: "true" },
  { label: "No", value: "false" },
];

export const booleanSelectData2 = [
  { label: "none", value: "" },
  { label: "true", value: "true" },
  { label: "false", value: "false" },
];

export const prioritySelectDataInNumbers = [
  { label: "1 - Very High", value: "1" },
  { label: "2 - High", value: "2" },
  { label: "3 - Medium", value: "3" },
  { label: "4 - Low", value: "4" },
  { label: "5 - Very Low", value: "5" },
];

export const pubPvtSelectData = [
  { label: "Public", value: "Public" },
  { label: "Private", value: "Private" },
];

export const pageSizeSelectData = [
  { label: "5", value: "5" },
  { label: "10", value: "10" },
  { label: "15", value: "15" },
];

export type GenericTableHeader<T> = {
  key: keyof T;
  label?: string;
  filterType?: "text" | "boolean" | "date" | "none";
  searchable?: boolean; // optionally override with this
};

/**
 * Exports flat array of objects to CSV and triggers browser download
 * @param data Array of flat objects to export
 * @param filename Name of the CSV file to download
 */
export function exportToCsv<T extends Record<string, any>>(
  data: T[],
  filename: string
) {
  if (!data || data.length === 0) {
    console.warn("No data available to export.");
    return;
  }

  const csv = Papa.unparse(data);

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

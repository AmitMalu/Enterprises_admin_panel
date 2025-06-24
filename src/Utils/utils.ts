import { toast } from "react-toastify";
import { AppDispatch, persistor } from "../Redux/Store/store";
import moment from "moment";
import * as Papa from "papaparse";
import { NavigateFunction } from "react-router-dom";
import {
  createMasterItem,
  updateMasterItem,
} from "../Redux/Features/Masters/MastersThunk";

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

// Masters form submit Handler
type TransformPayloadFn<T> = (data: T) => Record<string, any>;
export interface HandleMasterFormSubmitProps<T> {
  mode: "add" | "edit";
  id?: string;
  values: T;
  dispatch: AppDispatch;
  navigate: NavigateFunction;
  resetFormData: () => void;
  masterKey: string;
  masterUrl: string;
  transformCreatePayload: TransformPayloadFn<T>;
  transformUpdatePayload: TransformPayloadFn<T>;
  successNavigatePath: string;
  entityName: string;
}

export const handleMasterFormSubmit = async <T>({
  mode,
  id,
  values,
  dispatch,
  navigate,
  resetFormData,
  masterKey,
  masterUrl,
  transformCreatePayload,
  transformUpdatePayload,
  successNavigatePath,
  entityName = "Item",
}: HandleMasterFormSubmitProps<T>) => {
  try {
    const payload =
      mode === "edit" && id
        ? transformUpdatePayload(values)
        : transformCreatePayload(values);

    const thunk =
      mode === "edit" && id
        ? updateMasterItem({
            key: masterKey,
            url: masterUrl,
            id,
            data: payload,
          })
        : createMasterItem({ key: masterKey, url: masterUrl, data: payload });

    const res = await dispatch(thunk).unwrap();

    toast.success(
      res.message ||
        `${entityName} ${mode === "edit" ? "updated" : "created"} successfully`
    );

    // if (mode === "edit" && id) {
    //   const payload = transformUpdatePayload(values);
    //   const res = await dispatch(
    //     updateMasterItem({ key: masterKey, url: masterUrl, id, data: payload })
    //   ).unwrap();
    //   toast.success(res.message || successMessages.update);
    // } else {
    //   const payload = transformCreatePayload(values);
    //   const res = await dispatch(
    //     createMasterItem({ key: masterKey, url: masterUrl, data: payload })
    //   ).unwrap();
    //   toast.success(res.message || successMessages.create);
    // }

    resetFormData();
    navigate(successNavigatePath);
  } catch (err: any) {
    console.error(
      `${mode === "edit" ? "Update" : "Create"} ${entityName} failed:`,
      err
    );
    toast.error(
      err || `${mode === "edit" ? "Update" : "Create"} ${entityName} failed:`
    );
  }
};

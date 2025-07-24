import { toast } from "react-toastify";
import { AppDispatch, persistor } from "../Redux/Store/store";
import moment from "moment";
import * as Papa from "papaparse";
import { NavigateFunction } from "react-router-dom";
import {
  createMasterItem,
  updateMasterItem,
} from "../Redux/Features/Masters/MastersThunk";
import { setToken, setUserInfo } from "../Redux/Features/Auth/Reducer";

export const persistOtpSession = (username: string, otpFor: string) => {
  sessionStorage.setItem("otp-username", username);
  sessionStorage.setItem("otpFor", otpFor);
};

export const capitalizeWords = (str: string) =>
  str
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word

export const redirectTo = (path: string) => {
  const basePath = import.meta.env.VITE_BASE_PATH || "";

  window.location.href = `${basePath}${path}`;
};

export const logoutUser = (
  message = "Session expired. Redirecting to login page."
) => {
  clearStorage();
  toast.warning(`${message}`);
  setTimeout(() => {
    redirectTo("/login");
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

export const setLoginData = (dispatch: any, payload: any) => {
  const { token, ...rest } = payload;

  // Save to localStorage
  localStorage.setItem("token", token);
  localStorage.setItem("userInfo", JSON.stringify(rest));

  // Dispatch Redux state updates
  dispatch(setToken(token));
  dispatch(setUserInfo({ userInfo: rest }));
};

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
  if (!dateString) return "";

  const parsed = moment(dateString); // Automatically parses ISO strings

  if (!parsed.isValid()) return dateString;

  return parsed.format("DD-MM-YYYY HH:mm:ss");
};

export const booleanSelectData = [
  { label: "Yes", value: "true" },
  { label: "No", value: "false" },
];

export const settlementTimeData = [
  { label: "1 Hr", value: "1 hr" },
  { label: "3 Hrs", value: "3 hrs" },
  { label: "6 Hrs", value: "6 hrs" },
  { label: "9 Hrs", value: "9 hrs" },
];

export const booleanSelectData2 = [
  { label: "true", value: "true" },
  { label: "false", value: "false" },
];

export const SelectRegionTypeData = [
  { label: "State", value: "state" },
  { label: "Union Territory", value: "union territory" },
];

export const SelectZoneData = [
  { label: "Central", value: "Central" },
  { label: "Eastern", value: "Eastern" },
  { label: "Western", value: "Western" },
  { label: "Northern", value: "Northern" },
  { label: "Southern", value: "Southern" },
  { label: "North-Eastern", value: "North-Eastern" },
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
  filterOptions?: { label: string; value: any }[];
  searchable?: boolean; // optionally override with this
  renderType?: "link" | "custom" | "statusBadge"; //
  showCalculatedBelow?: boolean;
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

export const toFormData = (obj: Record<string, any>): FormData => {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (value === null || value === undefined) return;

    if (value instanceof File) {
      formData.append(key, value);
    } else if (typeof value === "object") {
      // Send objects (like bankData) as JSON blobs
      const blob = new Blob([JSON.stringify(value)], {
        type: "application/json",
      });
      formData.append(key, blob);
    } else {
      formData.append(key, value.toString());
    }
  });

  return formData;
};

// Masters form submit Handler
type TransformPayloadFn<T> = (data: T) => Record<string, any>;
export interface HandleMasterFormSubmitProps<T> {
  mode?: "add" | "edit";
  id?: string;
  useFormData?: boolean;
  values: T;
  dispatch: AppDispatch;
  navigate: NavigateFunction;
  resetFormData?: () => void;
  masterKey: string;
  addUrl: string;
  updateUrl: string;
  transformCreatePayload?: TransformPayloadFn<T>;
  transformUpdatePayload?: TransformPayloadFn<T>;
  successNavigatePath: string;
  entityName: string;
}

export const handleMasterFormSubmit = async <T>({
  mode = "add",
  id,
  useFormData = false,
  values,
  dispatch,
  navigate,
  resetFormData,
  masterKey,
  addUrl,
  updateUrl,
  transformCreatePayload,
  transformUpdatePayload,
  successNavigatePath,
  entityName = "Item",
}: HandleMasterFormSubmitProps<T>) => {
  try {
    const rawPayload =
      mode === "edit" && typeof transformUpdatePayload === "function"
        ? transformUpdatePayload(values)
        : mode === "add" && typeof transformCreatePayload === "function"
        ? transformCreatePayload(values)
        : values;

    const payload = useFormData
      ? toFormData(rawPayload as Record<string, any>)
      : rawPayload;

    const url = mode === "edit" ? updateUrl : addUrl;

    const thunk =
      mode === "edit"
        ? updateMasterItem({
            key: masterKey,
            url: url,
            ...(id ? { id } : {}),
            data: payload,
            useFormData,
          })
        : createMasterItem({
            key: masterKey,
            url: url,
            data: payload,
            useFormData,
          });

    const res = await dispatch(thunk).unwrap();

    toast.success(
      res.message ||
        `${entityName} ${mode === "edit" ? "updated" : "created"} successfully`
    );

    navigate(successNavigatePath);
    if (resetFormData) {
      resetFormData();
    }
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

export type GenericVerticalHeader<T> = {
  key: keyof T;
  label: string;
};

export interface VerticalKeyValueTableProps<T extends Record<string, any>> {
  loading?: boolean;
  data: T;
  headers: GenericVerticalHeader<T>[]; // not just one header
}

export const isFile = (val: any): val is File =>
  val &&
  typeof val === "object" &&
  typeof val.name === "string" &&
  typeof val.size === "number" &&
  typeof val.type === "string";

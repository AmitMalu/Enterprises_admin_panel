import { toast } from "react-toastify";
import { AppDispatch, persistor } from "../Redux/Store/store";
import moment from "moment";
import * as Papa from "papaparse";
import * as Yup from "yup";
import { NavigateFunction } from "react-router-dom";
import {
  createMasterItem,
  updateMasterItem,
} from "../Redux/Features/Masters/MastersThunk";
import { setToken, setUserInfo } from "../Redux/Features/Auth/Reducer";
import CryptoJS from "crypto-js";

// constants/version.ts
// export const DEV_APP_VERSION_LABEL = "v1.0.2 (27-03-2026 05:35 AM)";

export function encryptCredentials(username: string, password: string) {
  const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
  if (!SECRET_KEY) {
    throw new Error(
      "SECRET_KEY is undefined! Check your environment variables.",
    );
  }
  // Generate random salt
  const salt = CryptoJS.lib.WordArray.random(16);
  // Derive key from secret + salt
  const key = CryptoJS.PBKDF2(SECRET_KEY, salt, {
    keySize: 128 / 32,
    iterations: 65536,
    hasher: CryptoJS.algo.SHA256,
  });
  // Generate random IV
  const iv = CryptoJS.lib.WordArray.random(16);

  // Encrypt username & password using KEY and iv
  const encryptedUsername = CryptoJS.AES.encrypt(username, key, {
    iv,
  }).toString();
  const encryptedPassword = CryptoJS.AES.encrypt(password, key, {
    iv,
  }).toString();

  // Send ciphertext + IV + salt to backend
  return {
    salt: CryptoJS.enc.Base64.stringify(salt),
    iv: CryptoJS.enc.Base64.stringify(iv),
    encryptedUsername,
    encryptedPassword,
  };
}

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
  message = "Session expired. Redirecting to login page.",
) => {
  clearStorage();
  
  // Set flag to prevent beforeunload prompt during intentional logout
  // This must be set after clearStorage to avoid being cleared
  sessionStorage.setItem("intentionalLogout", "true");
  
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

export const walletTypeSelectData = [
  { value: "PREPAID", label: "PREPAID" },
  { value: "POSTPAID", label: "POSTPAID" },
];

export const transactionStatusSelectData = [
  { label: "PENDING", value: "PENDING" },
  { label: "APPROVED", value: "APPROVED" },
  { label: "REJECTED", value: "REJECTED" },
];

export const transactionStatusSelectData2 = [
  { label: "PENDING", value: "PENDING" },
  { label: "SUCCESS", value: "SUCCESS" },
  { label: "FAILURE", value: "FAILURE" },
];

export const pageSizeSelectData = [
  { label: "5", value: "5" },
  { label: "10", value: "10" },
  { label: "20", value: "20" },
  { label: "50", value: "50" },
];

export type GenericTableHeader<T> = {
  key: keyof T;
  label?: string;
  filterType?: "text" | "number" | "boolean" | "date" | "none";
  filterOptions?: { label: string; value: any }[];
  searchable?: boolean; // optionally override with this
  renderType?: "link" | "custom" | "statusBadge"; //
  showCalculatedBelow?: boolean;
  copyable?: boolean;
};

export function exportToCsv<T extends Record<string, any>>(
  data: T[],
  filename: string,
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

type ToastOptions = {
  successAutoClose?: number | false;
  errorAutoClose?: number | false;
};
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
  successNavigatePath?: string;
  entityName: string;
  toastOptions?: ToastOptions;
}

// utils/normalize.ts
export const trimFormValues = <T>(values: T): T => {
  if (typeof values !== "object" || values === null) return values;

  const cleaned: Record<string, any> = {};

  for (const key in values as Record<string, any>) {
    const val = (values as Record<string, any>)[key];

    if (typeof val === "string") {
      cleaned[key] = val.trim(); // trim string
    } else if (Array.isArray(val)) {
      // map arrays and trim strings inside, recurse for objects
      cleaned[key] = val.map((item) =>
        typeof item === "string" ? item.trim() : trimFormValues(item),
      );
    } else if (typeof val === "object" && val !== null) {
      // recurse for nested objects
      cleaned[key] = trimFormValues(val);
    } else {
      cleaned[key] = val; // keep other types as-is
    }
  }

  return cleaned as T;
};

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
  toastOptions,
}: HandleMasterFormSubmitProps<T>) => {
  try {
    // Sanitize values here
    const normalizedValues = trimFormValues(values);

    const rawPayload =
      mode === "edit" && typeof transformUpdatePayload === "function"
        ? await transformUpdatePayload(normalizedValues)
        : mode === "add" && typeof transformCreatePayload === "function"
          ? await transformCreatePayload(normalizedValues)
          : normalizedValues;

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

    const res = await (dispatch as any)(thunk).unwrap();

    toast.success(
      res.message ||
        `${entityName} ${mode === "edit" ? "updated" : "created"} successfully`,
      {
        autoClose: toastOptions?.successAutoClose ?? 3000, // default
      },
    );
    if (successNavigatePath) {
      navigate(successNavigatePath);
    }
    if (resetFormData) {
      resetFormData();
    }
  } catch (err: any) {
    console.error(
      `${mode === "edit" ? "Update" : "Create"} ${entityName} failed:`,
      err,
    );
    toast.error(
      err || `${mode === "edit" ? "Update" : "Create"} ${entityName} failed:`,
      {
        autoClose: toastOptions?.errorAutoClose ?? 3000,
        pauseOnHover: true,
        closeOnClick: false,
        draggable: true,
      },
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

export const dateRangeValidationSchema = Yup.array()
  .of(Yup.date().nullable())
  .test("date-range-validation", function (value) {
    const [start, end] = value || [];
    const { path, createError } = this;

    if (!start && !end) {
      return createError({ path, message: "Date range is required" });
    }

    if (start && !end) {
      return createError({ path, message: "End date is required" });
    }

    if (!start && end) {
      return createError({ path, message: "Start date is required" });
    }

    if (start && end && new Date(start) > new Date(end)) {
      return createError({
        path,
        message: "Start date must be before or equal to end date",
      });
    }

    return true;
  });

export const singleDateValidationSchema = Yup.date()
  .nullable()
  .required("Date is required");

export function buildPermissions(
  menus: string[],
  subMenus: string[],
): string[] {
  const permissions: string[] = [...subMenus]; // start with all selected submenus

  menus.forEach((menuCode) => {
    const hasSubmenu = subMenus.some((sm) => sm.startsWith(menuCode));
    if (!hasSubmenu) {
      permissions.push(menuCode + "00");
    }
  });

  return permissions;
}

export const transformPermissionsToMenus = (permission: string) => {
  if (!permission) {
    return {
      menus: [],
      subMenus: [],
    };
  }

  const allPerms = permission
    .split(",")
    .map((perm) => perm.trim())
    .filter(Boolean);

  const menus = [...new Set(allPerms.map((perm) => perm.substring(0, 2)))];

  const subMenus = allPerms.filter((perm) => perm.substring(2) !== "00");

  return {
    menus,
    subMenus,
  };
};

export interface VerificationApiData {
  data: any; // varies by API type
  status_code?: number;
  success?: boolean;
  message?: string | null;
  message_code?: string;
}

export const extractVerificationApiMessage = (
  response: VerificationApiData,
  fallback = "Something went wrong",
): string => {
  if (!response) return fallback;

  if (response.data?.aadhaar_number) return "Aadhaar verification successful";

  // Error messages first
  if (response.message && response.message.trim() !== "") {
    return response.message;
  }

  if (response.data?.message && response.data.message.trim() !== "") {
    return response.data.message;
  }

  if (response.data?.remarks && response.data.remarks.trim() !== "") {
    return response.data.remarks;
  }

  if (response.data?.reason && response.data.reason.trim() !== "") {
    return response.data.reason;
  }

  if (
    response.data?.detailed_reason &&
    response.data.detailed_reason.trim() !== ""
  ) {
    return response.data.detailed_reason;
  }

  // If API was successful but no message provided
  if (response.success) {
    // PAN success
    if (response.data?.pan_number) return "PAN validation successful";
    // Aadhaar success
    if (response.data?.aadhaar_number) return "Aadhaar verification successful";
    // Link success
    if (response.data?.linking_status) return "Aadhaar-PAN linked successfully";

    return "Verification successful";
  }

  // Default fallback
  return fallback;
};

export const formatIndianNumber = (input: any) => {
  if (input === null || input === undefined) return "";

  let value = input;

  // Convert to string
  if (typeof value === "number") {
    value = value.toString();
  }

  if (typeof value !== "string") return value;

  // Remove ₹, commas, spaces
  const cleaned = value.replace(/₹|,/g, "").trim();

  // Check if it's a valid number
  if (isNaN(Number(cleaned))) return input;

  const number = Number(cleaned);

  // Format in Indian style
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: cleaned.includes(".") ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(number);
};
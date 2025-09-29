import { GenericTableHeader, isFile } from "../../Utils/utils";
import {
  fileValidation,
  ifscValidation,
  textField,
} from "../../Utils/ValidationUtils";
import * as Yup from "yup";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const MASTER_KEY = "network-banks";
export const MASTER_URL = API_ENDPOINTS.MASTER.NETWORK_BANK_MASTER;

export interface NetworkBankMasterFormType {
  bankCode: string;
  bankName: string;
  bankCodeBI: string;
  ifscCode: string;
  imps: boolean;
  neft: boolean;
  rtgs: boolean;
  logo?: string | null;
  maxAccountNoLength: string;
  isActive?: boolean;
  verification?: boolean;
  isBlocked?: boolean;
}

export interface NetworkBankMasterTableType extends NetworkBankMasterFormType {
  id: string | number;
  createdBy: string;
  createdOn?: string;
  editedBy?: string;
  editedOn?: string;
}

export interface NetworkBankMasterCreatePayload
  extends NetworkBankMasterFormType {
  createdBy: string;
}

export interface NetworkBankMasterUpdatePayload
  extends NetworkBankMasterFormType {
  editedBy: string;
}

export type FetchNetworkBankMasterListParams = {
  page: number;
  size: number;
  filter?: { key: string; value: string | boolean } | null;
};

export const initialValues: NetworkBankMasterFormType = {
  bankCode: "",
  bankName: "",
  bankCodeBI: "",
  ifscCode: "",
  imps: false,
  neft: false,
  rtgs: false,
  logo: null,
  maxAccountNoLength: "",
  isActive: false,
  verification: false,
  isBlocked: false,
};

export const validationSchema: Record<
  keyof NetworkBankMasterFormType,
  Yup.AnySchema
> = {
  bankCode: textField("Bank Code", 50, true, true),
  bankName: textField("Bank Name", 50, true, true),
  bankCodeBI: textField("BankCode BI", 50, true, true),
  ifscCode: ifscValidation,
  imps: Yup.boolean().required("IMPS is Required"),
  neft: Yup.boolean().required("NEFT is Required"),
  rtgs: Yup.boolean().required("RTGS is Required"),
  logo: fileValidation("Logo", ["application/pdf", "image/png", "image/jpeg"]),
  maxAccountNoLength: textField("Max Account No Length", 50, false, false),
  isActive: Yup.boolean().default(false),
  verification: Yup.boolean().default(false),
  isBlocked: Yup.boolean().default(false),
};

export const headers: GenericTableHeader<NetworkBankMasterTableType>[] = [
  { key: "id", label: "Id", filterType: "number", searchable: true },
  { key: "bankCode", label: "Bank Code", filterType: "text" },
  { key: "bankName", label: "Bank Name", filterType: "text" },
  { key: "ifscCode", label: "IFSC Code", filterType: "text" },
  { key: "imps", label: "IMPS", filterType: "boolean" },
  { key: "neft", label: "NEFT", filterType: "boolean" },
  { key: "rtgs", label: "RTGS", filterType: "boolean" },
  {
    key: "maxAccountNoLength",
    label: "Max Account No Length",
    filterType: "text",
  },
  { key: "isActive", label: "Active", filterType: "boolean" },
  { key: "verification", label: "Verification", filterType: "boolean" },
  { key: "isBlocked", label: "Blocked", filterType: "boolean" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "createdOn", label: "Created On", filterType: "date" },
  { key: "editedBy", label: "Edited By", filterType: "text" },
  { key: "editedOn", label: "Edited On", filterType: "date" },
];

export const transformToNetworkBankTableType = (
  raw: Record<string, any>
): NetworkBankMasterTableType => {
  return {
    id: raw.id ?? "",
    bankCode: raw.bankCode ?? "",
    bankName: raw.bankName ?? "",
    bankCodeBI: raw.bankCodeBI ?? "",
    ifscCode: raw.ifscCode ?? "",
    imps: !!raw.imps,
    neft: !!raw.neft,
    rtgs: !!raw.rtgs,
    maxAccountNoLength: raw.maxAccountNoLength ?? "",
    isActive: !!raw.isActive,
    isBlocked: !!raw.isBlocked,
    verification: !!raw.verification,
    createdBy: raw.createdBy ?? "",
    createdOn: raw.createdOn ?? "",
    editedBy: raw.editedBy ?? "",
    editedOn: raw.editedOn ?? "",
  };
};

// Convert API response to Formik-compatible form data
export const transformNetworkBankListToFormData = (
  raw: Record<string, any>
): NetworkBankMasterFormType => ({
  bankCode: raw.bankCode ?? "",
  bankName: raw.bankName ?? "",
  bankCodeBI: raw.bankCodeBI ?? "",
  ifscCode: raw.ifscCode ?? "",
  imps: !!raw.imps,
  neft: !!raw.neft,
  rtgs: !!raw.rtgs,
  maxAccountNoLength: raw.maxAccountNoLength ?? "",
  logo: raw.logo ?? null,
  isActive: !!raw.isActive,
  isBlocked: !!raw.isBlocked,
  verification: !!raw.verification,
});

// shared function to build the payload object (not FormData)
const getNetworkBankPayload = (
  formData: NetworkBankMasterFormType,
  mode: "add" | "edit"
): Record<string, any> => {
  const { logo, ...rest } = formData;

  return {
    bankData: {
      ...rest,
      [mode === "edit" ? "editedBy" : "createdBy"]:
        localStorage.getItem("username") || "system",
    },
    ...(isFile(logo) ? { logo } : {}),
  };
};

// === Your two required functions ===

export const transformFormToCreateNetworkBankMasterPayload = (
  formData: NetworkBankMasterFormType
): Record<string, any> => getNetworkBankPayload(formData, "add");

export const transformFormToUpdateNetworkBankMasterPayload = (
  formData: NetworkBankMasterFormType
): Record<string, any> => getNetworkBankPayload(formData, "edit");

import { formatDateTime, GenericTableHeader } from "../../Utils/utils";
import { ifscValidation, textField } from "../../Utils/ValidationUtils";
import * as Yup from "yup";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const MASTER_KEY = "banks";
export const MASTER_URL = API_ENDPOINTS.MASTER.BANK_MASTER;

export interface BankMasterFormType {
  bankCode: string;
  bankName: string;
  ifscCode: string;
  imps: boolean;
  neft: boolean;
  rtgs: boolean;
  isActive?: boolean;
  isBlocked?: boolean;
}

export interface BankMasterTableType extends BankMasterFormType {
  id: string | number;
  createdBy: string;
  createdOn?: string;
  editedBy?: string;
  editedOn?: string;
}

export interface BankMasterCreatePayload extends BankMasterFormType {
  createdBy: string;
}

export interface BankMasterUpdatePayload extends BankMasterFormType {
  editedBy: string;
}

export type FetchBankMasterListParams = {
  page: number;
  size: number;
  filter?: { key: string; value: string | boolean } | null;
};

export const initialValues: BankMasterFormType = {
  bankCode: "",
  bankName: "",
  ifscCode: "",
  imps: false,
  neft: false,
  rtgs: false,
  isActive: false,
  isBlocked: false,
};

export const validationSchema: Record<keyof BankMasterFormType, Yup.AnySchema> =
  {
    bankCode: textField("Bank Code", 50, true, true),
    bankName: textField("Bank Name", 50, true, true),
    ifscCode: ifscValidation,
    imps: Yup.boolean().required("IMPS is Required"),
    neft: Yup.boolean().required("NEFT is Required"),
    rtgs: Yup.boolean().required("RTGS is Required"),
    isActive: Yup.boolean().default(false),
    isBlocked: Yup.boolean().default(false),
  };

export const headers: GenericTableHeader<BankMasterTableType>[] = [
  { key: "id", label: "ID", filterType: "text" },
  { key: "bankCode", label: "Bank Code", filterType: "text" },
  { key: "bankName", label: "Bank Name", filterType: "text" },
  { key: "ifscCode", label: "IFSC Code", filterType: "text" },
  { key: "imps", label: "IMPS", filterType: "boolean" },
  { key: "neft", label: "NEFT", filterType: "boolean" },
  { key: "rtgs", label: "RTGS", filterType: "boolean" },
  { key: "isActive", label: "Active", filterType: "boolean" },
  { key: "isBlocked", label: "Blocked", filterType: "boolean" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "createdOn", label: "Created On", filterType: "text" },
  { key: "editedBy", label: "Edited By", filterType: "text" },
  { key: "editedOn", label: "Edited On", filterType: "text" },
];

export const transformToBankTableType = (
  raw: Record<string, any>
): BankMasterTableType => {
  return {
    id: raw.id ?? "",
    bankCode: raw.bankCode ?? "",
    bankName: raw.bankName ?? "",
    ifscCode: raw.ifscCode ?? "",
    imps: !!raw.imps,
    neft: !!raw.neft,
    rtgs: !!raw.rtgs,
    isActive: !!raw.isActive,
    isBlocked: !!raw.isBlocked,
    createdBy: raw.createdBy ?? "",
    createdOn: formatDateTime(raw.createdOn) ?? "",
    editedBy: raw.editedBy ?? "",
    editedOn: formatDateTime(raw.editedOn) ?? "",
  };
};

// Convert API response to Formik-compatible form data
export const transformBankListToFormData = (
  raw: Record<string, any>
): BankMasterFormType => ({
  bankCode: raw.bankCode ?? "",
  bankName: raw.bankName ?? "",
  ifscCode: raw.ifscCode ?? "",
  imps: !!raw.imps,
  neft: !!raw.neft,
  rtgs: !!raw.rtgs,
  isActive: !!raw.isActive,
  isBlocked: !!raw.isBlocked,
});

// Transform form data to Create payload
export const transformFormToCreateBankMasterPayload = (
  formData: BankMasterFormType
): BankMasterCreatePayload => ({
  ...formData,
  createdBy: localStorage.getItem("username") || "system",
});

// Transform form data to Update payload
export const transformFormToUpdateBankMasterPayload = (
  formData: BankMasterFormType
): BankMasterUpdatePayload => ({
  ...formData,
  editedBy: localStorage.getItem("username") || "system",
});

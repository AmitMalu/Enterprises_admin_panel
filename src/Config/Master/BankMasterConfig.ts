import { GenericTableHeader } from "../../Utils/utils";
import {
  accountNumberValidation,
  ifscValidation,
  textField,
} from "../../Utils/ValidationUtils";
import * as Yup from "yup";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const MASTER_KEY = "bank";
export const MASTER_URL = API_ENDPOINTS.MASTER.BANK_MASTER;

export interface BankMasterFormType {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  charges: false;
  chargesType: string;
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
  bankName: "",
  accountNumber: "",
  ifscCode: "",
  charges: false,
  chargesType: "percentage",
  isActive: false,
  isBlocked: false,
};

export const validationSchema: Record<keyof BankMasterFormType, Yup.AnySchema> =
  {
    bankName: textField("Bank Name", 50, true, true),
    accountNumber: accountNumberValidation,
    ifscCode: ifscValidation,
    charges: Yup.boolean().default(false),
    chargesType: textField("Charges Type", 50, true, true),
    isActive: Yup.boolean().default(false),
    isBlocked: Yup.boolean().default(false),
  };

export const headers: GenericTableHeader<BankMasterTableType>[] = [
  { key: "id", label: "Id", filterType: "number", searchable: true },
  { key: "bankName", label: "Bank Name", filterType: "text" },
  { key: "accountNumber", label: "Account Number", filterType: "text" },
  { key: "ifscCode", label: "IFSC Code", filterType: "text" },
  { key: "charges", label: "Charges", filterType: "boolean" },
  {
    key: "chargesType",
    label: "Charges Type",
    filterType: "boolean",
    filterOptions: [
      { label: "PERCENTAGE", value: "PERCENTAGE" },
      { label: "FLAT", value: "FLAT" },
    ],
  },
  { key: "isActive", label: "Active", filterType: "boolean" },
  { key: "isBlocked", label: "Blocked", filterType: "boolean" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "createdOn", label: "Created On", filterType: "date" },
  { key: "editedBy", label: "Edited By", filterType: "text" },
  { key: "editedOn", label: "Edited On", filterType: "date" },
];

export const transformToBankTableType = (
  raw: Record<string, any>
): BankMasterTableType => {
  return {
    id: raw.id ?? "",
    bankName: raw.bankName ?? "",
    accountNumber: raw.accountNumber ?? "",
    ifscCode: raw.ifscCode ?? "",
    charges: raw.charges ?? false,
    chargesType: raw.chargesType ?? "PERCENTAGE",
    isActive: !!raw.isActive,
    isBlocked: !!raw.isBlocked,
    createdBy: raw.createdBy ?? "",
    createdOn: raw.createdOn ?? "",
    editedBy: raw.editedBy ?? "",
    editedOn: raw.editedOn ?? "",
  };
};

// Convert API response to Formik-compatible form data
export const transformBankListToFormData = (
  raw: Record<string, any>
): BankMasterFormType => ({
  bankName: raw.bankName ?? "",
  accountNumber: raw.accountNumber ?? "",
  ifscCode: raw.ifscCode ?? "",
  charges: raw.charges ?? false,
  chargesType: raw.chargesType ?? "PERCENTAGE",
  isActive: !!raw.isActive,
  isBlocked: !!raw.isBlocked,
});

export const transformFormToCreateBankMasterPayload = (
  formData: BankMasterFormType
): BankMasterCreatePayload => {
  return {
    ...formData,
    createdBy: localStorage.getItem("username") || "system",
  };
};

export const transformFormToUpdateBankMasterPayload = (
  formData: BankMasterFormType
): BankMasterUpdatePayload => {
  return {
    ...formData,
    editedBy: localStorage.getItem("username") || "system",
  };
};

import * as Yup from "yup";
import { textField, websiteValidation } from "../../Utils/ValidationUtils";
import { formatDateTime, GenericTableHeader } from "../../Utils/utils";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const MASTER_KEY = "vendor";
export const MASTER_URL = API_ENDPOINTS.MASTER.VENDOR; 

export type VendorFormType = {
  vendorName: string;
  vendorCode: string;
  productId: string | number;
  subProductId: string | number;
  modesSupported: string;
  priority: string | number;
  isActive: boolean;
  bankType: string;
  website?: string;
  logo?: string;
  parameter?: string;
};
export interface VendorTableType extends VendorFormType {
  id: string;
  productCode: string;
  subProductCode: string;
  createdBy: string;
  createdOn?: string;
  editedBy?: string;
  editedOn?: string;
}

export interface CreateVendorPayload extends VendorFormType {
  vendorAccount: {
    transactionRateType: "Slab";
    transactionRate: 6.5;
    accVerificationCharges: 17.0;
    apiCharges: 9.0;
    bankCharges: 17.0;
    gst: 19.0;
  };
  createdBy: string;
}

export interface UpdateVendorPayload extends VendorFormType {
  vendorAccount: {
    transactionRateType: "Slab";
    transactionRate: 6.5;
    accVerificationCharges: 17.0;
    apiCharges: 9.0;
    bankCharges: 17.0;
    gst: 19.0;
  };
  editedBy: string;
}

export type FetchVendorParams = {
  page: number;
  size: number;
  filter?: { key: string; value: string | boolean } | null;
};

export const initialValues: VendorFormType = {
  vendorName: "",
  vendorCode: "",
  productId: "",
  subProductId: "",
  modesSupported: "",
  priority: "",
  isActive: false,
  bankType: "",
  website: "",
  logo: "",
  parameter: "",
};

export const validationSchema: Record<keyof VendorFormType, Yup.AnySchema> = {
  vendorName: textField("Vendor Name", 50, true),
  vendorCode: textField("Vendor Code", 50, true),
  productId: textField("Product Id", 20, true),
  subProductId: textField("Sub Product Id", 20, true),
  modesSupported: textField("Mode Supported", 50, true, true),
  priority: textField("Priority", 50, true),
  isActive: Yup.boolean().required("Is Active is required"),
  bankType: textField("BankType", 50, true),
  website: websiteValidation,
  logo: websiteValidation,
  parameter: textField("Parameter", 50, false),
};

export const headers: GenericTableHeader<VendorTableType>[] = [
  { key: "id", label: "Id", filterType: "text" },
  { key: "vendorName", label: "Vendor Name", filterType: "text" },
  { key: "vendorCode", label: "Vendor Code", filterType: "text" },
  { key: "productId", label: "Product Id", filterType: "text" },
  { key: "subProductId", label: "Sub Product Id", filterType: "text" },
  { key: "subProductCode", label: "Sub Product Code", filterType: "text" },
  { key: "modesSupported", label: "Modes Supported", filterType: "text" },
  { key: "priority", label: "Priority", filterType: "text" },
  { key: "isActive", label: "Active", filterType: "boolean" },
  { key: "bankType", label: "Blanks", filterType: "text" },
  { key: "createdOn", label: "Created On", filterType: "date" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "editedOn", label: "Edited On", filterType: "date" },
  { key: "editedBy", label: "Edited By", filterType: "text" },
];

export const mapToVendorTableType = (
  raw: Record<string, any>
): VendorTableType => {
  return {
    id: raw.id ?? "",
    vendorName: raw.vendorName ?? "",
    vendorCode: raw.vendorCode ?? "",
    productId: raw.productId ?? "",
    productCode: raw.productCode ?? "",
    subProductId: raw.subProductId ?? "",
    subProductCode: raw.subProductCode ?? "",
    modesSupported: raw.modesSupported ?? "",
    priority: String(raw.priority) ?? "1",
    isActive: !!raw.isActive,
    bankType: raw.bankType ?? "public",
    website: raw.website ?? "",
    logo: raw.logo ?? "",
    parameter: raw.parameter ?? "",
    createdBy: raw.createdBy ?? "",
    createdOn: formatDateTime(raw.createdOn) ?? "",
    editedBy: raw.editedBy ?? "",
    editedOn: formatDateTime(raw.editedOn) ?? "",
  };
};

// Convert API response to Formik-compatible form data
export const transformVendorToFormData = (
  raw: Record<string, any>
): VendorFormType => ({
  vendorName: raw.vendorName ?? "",
  vendorCode: raw.vendorCode ?? "",
  productId: raw.productId ?? "",
  subProductId: raw.subProductId ?? "",
  modesSupported: raw.modesSupported ?? "",
  priority: String(raw.priority) ?? "1",
  isActive: !!raw.isActive,
  bankType: raw.bankType ?? "public",
  website: raw.website ?? "",
  logo: raw.logo ?? "",
  parameter: raw.parameter ?? "",
});

// Transform form data to Create payload
export const transformFormToCreateVendorPayload = (
  formData: VendorFormType
): CreateVendorPayload => ({
  ...formData,
  vendorAccount: {
    transactionRateType: "Slab",
    transactionRate: 6.5,
    accVerificationCharges: 17.0,
    apiCharges: 9.0,
    bankCharges: 17.0,
    gst: 19.0,
  },
  priority: Number(formData.priority) ?? 1,
  createdBy: localStorage.getItem("username") || "system",
});

// Transform form data to Update payload
export const transformFormToUpdateVendorPayload = (
  formData: VendorFormType
): UpdateVendorPayload => ({
  ...formData,
  vendorAccount: {
    transactionRateType: "Slab",
    transactionRate: 6.5,
    accVerificationCharges: 17.0,
    apiCharges: 9.0,
    bankCharges: 17.0,
    gst: 19.0,
  },
  priority: Number(formData.priority) ?? 1,
  editedBy: localStorage.getItem("username") || "system",
});

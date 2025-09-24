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
  modesSupported: string;
  // priority: string | number;
  isWhiteLabelAdmin: boolean;
  whiteLabelAdminId?: "";
  // userField1?: string;
  // userField2?: string;
  // userField3?: string;
  active: boolean;
  bankType: string;
  website?: string;
  logo?: string;
  parameter?: string;
};
export interface VendorTableType extends VendorFormType {
  id: string;
  productCode: string;
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
  modesSupported: "",
  // priority: "",
  isWhiteLabelAdmin: false,
  whiteLabelAdminId: "",
  // userField1: "",
  // userField2: "",
  // userField3: "",
  active: false,
  bankType: "",
  website: "",
  logo: "",
  parameter: "",
};

export const validationSchema: Record<keyof VendorFormType, Yup.AnySchema> = {
  vendorName: textField("Vendor Name", 50, true),
  vendorCode: textField("Vendor Code", 50, true),
  productId: textField("Product Id", 20, true),
  modesSupported: textField("Mode Supported", 50, true, true),
  // priority: textField("Priority", 50, true),
  isWhiteLabelAdmin: Yup.boolean().default(false),
  whiteLabelAdminId: Yup.string()
    .max(50, "WL-Admin Id must be at most 50 characters")
    .when("isWhiteLabelAdmin", {
      is: true,
      then: (schema) => schema.required("WL-Admin Id is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  // userField1: textField("User Field 1", 50, false, true),
  // userField2: textField("User Field 2", 50, false, true),
  // userField3: textField("User Field 3", 50, false, true),
  active: Yup.boolean().required("Is Active is required"),
  bankType: textField("BankType", 50, true),
  website: websiteValidation,
  logo: websiteValidation,
  parameter: textField("Parameter", 50, false, true),
};

export const headers: GenericTableHeader<VendorTableType>[] = [
  { key: "id", label: "Id", filterType: "number", searchable: true },
  { key: "vendorName", label: "Vendor Name", filterType: "text" },
  { key: "vendorCode", label: "Vendor Code", filterType: "text" },
  { key: "productId", label: "Product Id", filterType: "text" },
  { key: "modesSupported", label: "Modes Supported", filterType: "text" },
  // { key: "priority", label: "Priority", filterType: "text" },
  { key: "isWhiteLabelAdmin", label: "Is WL-Admin", filterType: "boolean" },
  { key: "active", label: "Active", filterType: "boolean" },
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
    modesSupported: raw.modesSupported ?? "",
    // priority: String(raw.priority) ?? "1",
    isWhiteLabelAdmin: !!raw.isWhiteLabelAdmin,
    whiteLabelAdminId: raw.whiteLabelAdminId ?? "",
    // userField1: raw.userField1 ?? "",
    // userField2: raw.userField2 ?? "",
    // userField3: raw.userField3 ?? "",
    active: !!raw.active,
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
  productId: String(raw.productId) ?? "",
  modesSupported: raw.modesSupported ?? "",
  // priority: String(raw.priority) ?? "1",
  isWhiteLabelAdmin: !!raw.isWhiteLabelAdmin,
  whiteLabelAdminId:
    raw.whiteLabelAdminId && raw.whiteLabelAdminId !== "-"
      ? raw.whiteLabelAdminId
      : "",
  active: !!raw.active,
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
  whiteLabelAdminId: formData.isWhiteLabelAdmin
    ? formData.whiteLabelAdminId ?? ""
    : "",
  vendorAccount: {
    transactionRateType: "Slab",
    transactionRate: 6.5,
    accVerificationCharges: 17.0,
    apiCharges: 9.0,
    bankCharges: 17.0,
    gst: 19.0,
  },
  // priority: Number(formData.priority) ?? 1,
  createdBy: localStorage.getItem("username") || "system",
});

// Transform form data to Update payload
export const transformFormToUpdateVendorPayload = (
  formData: VendorFormType
): UpdateVendorPayload => ({
  ...formData,
  whiteLabelAdminId: formData.isWhiteLabelAdmin
    ? formData.whiteLabelAdminId ?? ""
    : "",
  vendorAccount: {
    transactionRateType: "Slab",
    transactionRate: 6.5,
    accVerificationCharges: 17.0,
    apiCharges: 9.0,
    bankCharges: 17.0,
    gst: 19.0,
  },
  // priority: Number(formData.priority) ?? 1,
  editedBy: localStorage.getItem("username") || "system",
});

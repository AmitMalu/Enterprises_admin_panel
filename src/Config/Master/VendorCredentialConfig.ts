import * as Yup from "yup";
import {
  apiUrlValidation,
  textField,
  websiteValidation,
} from "../../Utils/ValidationUtils";
import { formatDateTime, GenericTableHeader } from "../../Utils/utils";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const MASTER_KEY = "vendor-credential";
export const MASTER_URL = API_ENDPOINTS.MASTER.VENDOR_CREDENTIAL;

export type VendorCredentialFormType = {
  vendorId?: string | number;
  productId?: string | number;

  baseUrlUat?: string;
  baseUrlProd?: string;
  token?: string;
  tokenUrlUat?: string;
  tokenUrlProd?: string;

  clientId?: string;
  clientSecret?: string | null;
  saltKey?: string | null;

  username: string;
  password?: string;
  isActive: boolean;
  isWhiteLabelAdmin?: boolean;
  whiteLabelAdminId?: string;

  callbackUrl?: string;
  tokenType?: "JWT" | "AES";

  userField1?: string;
  userField2?: string;
  userField3?: string;
};

export interface VendorCredentialTableType extends VendorCredentialFormType {
  id?: string;
  vendorName: string;
  productName: string;
  whiteLabelAdminName?: string;
  createdOn?: string;
  createdBy?: string;
  editedOn?: string;
  editedBy?: string;
}

export interface CreateVendorCredentialPayload
  extends Omit<VendorCredentialFormType, "vendorId" | "productId"> {
  vendorId: {
    id: string;
  };
  productId: {
    id: string;
  };
  createdBy: string;
}

export interface UpdateVendorCredentialPayload
  extends Omit<VendorCredentialFormType, "vendorId" | "productId"> {
  vendorId: {
    id: string;
  };
  productId: {
    id: string;
  };
  editedBy: string;
}

export type FetchVendorCredentialParams = {
  page: number;
  size: number;
  filter?: { key: string; value: string | boolean } | null;
};

export const initialValues: VendorCredentialFormType = {
  vendorId: "",
  productId: "",
  token: "",
  tokenUrlUat: "",
  tokenUrlProd: "",
  baseUrlUat: "",
  baseUrlProd: "",
  clientId: "",
  saltKey: "",
  clientSecret: "",
  username: "",
  password: "",
  isActive: false,
  isWhiteLabelAdmin: false,
  whiteLabelAdminId: "",
  callbackUrl: "",
  tokenType: "AES",
};

export const validationSchema: Record<
  keyof VendorCredentialFormType,
  Yup.AnySchema
> = {
  vendorId: textField("Vendor", 50, true),
  productId: textField("Product", 50, true),
  token: textField("Token", 1000, false, true),
  tokenUrlUat: apiUrlValidation.required("Field is Required"),
  tokenUrlProd: apiUrlValidation.required("Field is Required"),
  baseUrlUat: apiUrlValidation.required("Field is Required"),
  baseUrlProd: apiUrlValidation.required("Field is Required"),
  clientId: textField("Client Id", 150, false, true),
  saltKey: textField("Salt Key", 150, false, true),
  clientSecret: textField("Client Secret", 150, false, true),
  username: textField("Username", 150, false, true),
  password: textField("Password", 150, false, true),
  isActive: Yup.boolean().required("Is Active is required"),
  isWhiteLabelAdmin: Yup.boolean().default(false),
  whiteLabelAdminId: Yup.string()
    .max(50, "WL-Admin Id must be at most 50 characters")
    .when("isWhiteLabelAdmin", {
      is: true,
      then: (schema) => schema.required("WL-Admin Id is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  callbackUrl: websiteValidation,
  tokenType: Yup.string()
    .oneOf(["JWT", "AES"], "Token Type must be either JWT or AES")
    .required("Token Type is required"),
  userField1: textField("User Field 1", 50, false, true),
  userField2: textField("User Field 2", 50, false, true),
  userField3: textField("User Field 3", 50, false, true),
};

export const headers: GenericTableHeader<VendorCredentialTableType>[] = [
  { key: "vendorName", label: "Vendor Name", filterType: "text" },
  { key: "productName", label: "Product Name", filterType: "text" },
  { key: "whiteLabelAdminName", label: "WL-Admin Name", filterType: "text" },
  { key: "username", label: "Username", filterType: "text" },
  { key: "isActive", label: "Active", filterType: "boolean" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "createdOn", label: "Created On", filterType: "date" },
  { key: "editedBy", label: "Edited By", filterType: "text" },
  { key: "editedOn", label: "Edited On", filterType: "date" },
];

export const mapToVendorCredentialTableType = (
  raw: Record<string, any>
): VendorCredentialTableType => {
  return {
    id: raw.id ?? "",
    vendorName: raw.vendorName ?? "",
    productName: raw.productName ?? "",
    whiteLabelAdminName: raw.whiteLabelAdminName ?? "",
    username: raw.username ?? "",
    isActive: !!raw.isActive,
    createdOn: formatDateTime(raw.createdOn) ?? "",
    createdBy: raw.createdBy ?? "",
    editedOn: formatDateTime(raw.editedOn) ?? "",
    editedBy: raw.editedBy ?? "",
  };
};

// Convert API response to Formik-compatible form data
export const transformVendorCredentialToFormData = (
  raw: Record<string, any>
): VendorCredentialFormType => ({
  vendorId: String(raw.vendorId) ?? "",
  productId: String(raw.productId) ?? "",

  baseUrlUat: raw.baseUrlUat ?? "",
  baseUrlProd: raw.baseUrlProd ?? "",
  token: raw.token ?? "",
  tokenUrlUat: raw.tokenUrlUat ?? "",
  tokenUrlProd: raw.tokenUrlProd ?? "",

  clientId: raw.clientId ?? "",
  clientSecret: raw.clientSecret ?? "",
  saltKey: raw.saltKey ?? "",

  username: raw.username ?? "",
  password: raw.password ?? "",
  isActive: raw.isActive ?? false,
  isWhiteLabelAdmin: raw.isWhiteLabelAdmin ?? false,
  whiteLabelAdminId: raw.whiteLabelAdminId ?? "",

  callbackUrl: raw.callbackUrl ?? "",
  tokenType: raw.tokenType ?? "AES",

  // userField1: raw.userField1 ?? "",
  // userField2: raw.userField2 ?? "",
  // userField3: raw.userField3 ?? "",
});

// Transform form data to Create payload
export const transformFormToCreateVendorCredentialPayload = (
  formData: VendorCredentialFormType
): CreateVendorCredentialPayload => ({
  ...formData,
  vendorId: {
    id: formData.vendorId !== undefined ? String(formData.vendorId) : "",
  },
  productId: {
    id: formData.productId !== undefined ? String(formData.productId) : "",
  },
  whiteLabelAdminId: formData.isWhiteLabelAdmin
    ? formData.whiteLabelAdminId ?? ""
    : "",
  createdBy: localStorage.getItem("username") || "system",
});

// Transform form data to Update payload
export const transformFormToUpdateVendorCredentialPayload = (
  formData: VendorCredentialFormType
): UpdateVendorCredentialPayload => ({
  ...formData,
  vendorId: {
    id: formData.vendorId !== undefined ? String(formData.vendorId) : "",
  },
  productId: {
    id: formData.productId !== undefined ? String(formData.productId) : "",
  },
  whiteLabelAdminId: formData.isWhiteLabelAdmin
    ? formData.whiteLabelAdminId ?? ""
    : "",
  editedBy: localStorage.getItem("username") || "system",
});

import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";
import {
  formatDateTime,
  GenericTableHeader,
  walletTypeSelectData,
} from "../../Utils/utils";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const MASTER_KEY = "sub-products";
export const MASTER_URL = API_ENDPOINTS.MASTER.SUB_PRODUCT; // Replace with actual URL or API_ENDPOINTS.MASTER.PRODUCTS
export interface SubProductFormType {
  subProductTitle: string;
  subProductCode: string;
  product: string | { id: string };
  walletType: string;
  isSettlement: boolean;
  settlementTime?: string;
  isWhiteLabelAdmin: boolean;
  whiteLabelAdminId?: "";
  userField1?: string;
  userField2?: string;
  userField3?: string;
  isActive: boolean;
  isBlocked: boolean;
  isVisible: boolean;
}
export interface SubProductTableType extends SubProductFormType {
  id?: string;
  productName: string;
  productCode: string;
  createdOn?: string;
  createdBy?: string;
  editedOn?: string;
  editedBy?: string;
}

export interface CreateSubProductPayload extends SubProductFormType {
  product: { id: string };
  createdBy: string;
}
export interface UpdateSubProductPayload extends SubProductFormType {
  product: { id: string };
  editedBy: string;
}

export type FetchSubProductParams = {
  page: number;
  size: number;
  filter?: { key: string; value: string | boolean } | null;
};

export const initialValues: SubProductFormType = {
  subProductTitle: "",
  subProductCode: "",
  product: "",
  walletType: "",
  isSettlement: false,
  settlementTime: "3 hrs",
  isWhiteLabelAdmin: false,
  whiteLabelAdminId: "",
  userField1: "",
  userField2: "",
  userField3: "",
  isActive: true,
  isBlocked: false,
  isVisible: true,
};

export const validationSchema: Record<keyof SubProductFormType, Yup.AnySchema> =
  {
    subProductTitle: textField("Sub Product Title", 100, true),
    subProductCode: textField("Sub Product Code", 50, true),
    product: textField("Product", 50, true),
    walletType: textField("Wallet Type", 50, true),
    isSettlement: Yup.boolean().required("Is Settlement is Required"),
    settlementTime: textField("Settlement Time", 50, false, true),
    isWhiteLabelAdmin: Yup.boolean().default(false),
    whiteLabelAdminId: Yup.string()
      .max(50, "WL-Admin Id must be at most 50 characters")
      .when("isWhiteLabelAdmin", {
        is: true,
        then: (schema) => schema.required("WL-Admin Id is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    userField1: textField("User Field 1", 50, false, true),
    userField2: textField("User Field 2", 50, false, true),
    userField3: textField("User Field 3", 50, false, true),
    isActive: Yup.boolean().default(true),
    isBlocked: Yup.boolean().default(false),
    isVisible: Yup.boolean().default(true),
  };

export const headers: GenericTableHeader<SubProductTableType>[] = [
  { key: "id", label: "Id", filterType: "number", searchable: true },
  { key: "subProductTitle", label: "Sub Product Title", filterType: "text" },
  { key: "subProductCode", label: "Sub Product Code", filterType: "text" },
  { key: "productName", label: "Product", filterType: "text" },
  {
    key: "walletType",
    label: "Wallet Type",
    filterType: "boolean",
    filterOptions: walletTypeSelectData,
  },
  { key: "isSettlement", label: "Is Settlement", filterType: "boolean" },
  { key: "settlementTime", label: "Settlement Time", filterType: "text" },
  { key: "isWhiteLabelAdmin", label: "Is WL-Admin", filterType: "boolean" },
  { key: "isActive", label: "Is Active", filterType: "boolean" },
  { key: "isVisible", label: "Is Visible", filterType: "boolean" },
  { key: "createdOn", label: "Created On", filterType: "date" },
  { key: "editedOn", label: "Edited On", filterType: "date" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "editedBy", label: "Edited By", filterType: "text" },
];

// Util to safely transform raw API data into SubProductTableType
export const mapToSubProductTableType = (
  raw: Record<string, any>
): SubProductTableType => {
  return {
    id: raw?.id ?? "",
    subProductTitle: raw.subProductTitle ?? "",
    subProductCode: raw.subProductCode ?? "",
    productCode: raw.productCode ?? "",
    product: raw.productId ?? "",
    productName: raw.productName ?? "",
    walletType: raw.walletType ?? "",
    isSettlement: !!raw.isSettlement,
    settlementTime: raw.settlementTime ?? "",
    isWhiteLabelAdmin: !!raw.isWhiteLabelAdmin,
    whiteLabelAdminId: raw.whiteLabelAdminId ?? "",
    isActive: !!raw.isActive,
    isBlocked: !!raw.isBlocked,
    isVisible: !!raw.isVisible,
    userField1: raw.userField1 ?? "",
    userField2: raw.userField2 ?? "",
    userField3: raw.userField3 ?? "",
    createdOn: formatDateTime(raw.createdOn) ?? "",
    createdBy: raw.createdBy ?? "",
    editedOn: formatDateTime(raw.editedOn) ?? "",
    editedBy: raw.editedBy ?? "",
  };
};

export const transformSubProductToFormData = (
  raw: Record<string, any>
): SubProductFormType => {
  return {
    subProductTitle: raw.subProductTitle,
    subProductCode: raw.subProductCode,
    product: String(raw.productId), // assuming it's productId (you may need to adjust this)
    walletType: raw.walletType,
    isSettlement: !!raw.isSettlement,
    settlementTime:
      raw.settlementTime && raw.settlementTime !== "-"
        ? raw.settlementTime
        : "3 hrs",
    isWhiteLabelAdmin: !!raw.isWhiteLabelAdmin,
    whiteLabelAdminId:
      raw.whiteLabelAdminId && raw.whiteLabelAdminId !== "-"
        ? raw.whiteLabelAdminId
        : "",
    userField1: raw.userField1 ?? "",
    userField2: raw.userField2 ?? "",
    userField3: raw.userField3 ?? "",
    isActive: !!raw.isActive,
    isBlocked: !!raw.isBlocked,
    isVisible: !!raw.isVisible,
  };
};

export const transformFormToCreateSubProductPayload = (
  formData: SubProductFormType
): CreateSubProductPayload => ({
  ...formData,
  product: { id: String(formData.product) },
  settlementTime: formData.isSettlement ? formData.settlementTime ?? "" : "",
  whiteLabelAdminId: formData.isWhiteLabelAdmin
    ? formData.whiteLabelAdminId ?? ""
    : "",
  createdBy: localStorage.getItem("username") || "system",
});

export const transformFormToUpdateSubProductPayload = (
  formData: SubProductFormType
): UpdateSubProductPayload => ({
  ...formData,
  product: { id: String(formData.product) },
  settlementTime: formData.isSettlement ? formData.settlementTime ?? "" : "",
  whiteLabelAdminId: formData.isWhiteLabelAdmin
    ? formData.whiteLabelAdminId ?? ""
    : "",
  editedBy: localStorage.getItem("username") || "system",
});

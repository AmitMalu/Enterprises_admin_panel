import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";
import { formatDateTime, GenericTableHeader } from "../../Utils/utils";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const MASTER_KEY = "sub-products";
export const MASTER_URL = API_ENDPOINTS.MASTER.SUB_PRODUCT; // Replace with actual URL or API_ENDPOINTS.MASTER.PRODUCTS
export interface SubProductFormType {
  subProductTitle: string;
  subProductCode: string;
  productId: string; // or productId: string | number if you use ID
  walletType: string;
  isSettlement: boolean;
  isActive: boolean;
  enabled: boolean;
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
  createdBy: string;
}
export interface UpdateSubProductPayload extends SubProductFormType {
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
  productId: "",
  walletType: "",
  isSettlement: false,
  isActive: true,
  enabled: true,
};

export const validationSchema: Record<keyof SubProductFormType, Yup.AnySchema> =
  {
    subProductTitle: textField("Sub Product Title", 100, true),
    subProductCode: textField("Sub Product Code", 50, true),
    productId: textField("Product", 50, true),
    walletType: textField("Wallet Type", 50, true),
    isSettlement: Yup.boolean().required("Is Settlement is Required"),
    isActive: Yup.boolean().required("Is Active is required").default(true),
    enabled: Yup.boolean().required("Enabled is required"),
  };

export const headers: GenericTableHeader<SubProductTableType>[] = [
  { key: "id", label: "ID", filterType: "text" },
  { key: "subProductTitle", label: "Sub Product Title", filterType: "text" },
  { key: "subProductCode", label: "Sub Product Code", filterType: "text" },
  { key: "productName", label: "Product", filterType: "text" },
  { key: "walletType", label: "Wallet Type", filterType: "text" },
  { key: "isSettlement", label: "Is Settlement", filterType: "boolean" },
  { key: "isActive", label: "Is Active", filterType: "boolean" },
  { key: "enabled", label: "Enabled", filterType: "boolean" },
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
    productId: raw.productId ?? "",
    productName: raw.productName ?? "",
    walletType: raw.walletType ?? "",
    isSettlement: !!raw.isSettlement,
    isActive: !!raw.isActive,
    enabled: !!raw.enabled,
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
    productId: String(raw.productId), // assuming it's productId (you may need to adjust this)
    walletType: raw.walletType,
    isSettlement: raw.isSettlement,
    isActive: raw.isActive,
    enabled: raw.enabled,
  };
};

export const transformFormToCreateSubProductPayload = (
  formData: SubProductFormType
): CreateSubProductPayload => ({
  ...formData,
  createdBy: localStorage.getItem("username") || "system",
});

export const transformFormToUpdateSubProductPayload = (
  formData: SubProductFormType
): UpdateSubProductPayload => ({
  ...formData,
  editedBy: localStorage.getItem("username") || "system",
});

import { formatDateTime, GenericTableHeader } from "../../Utils/utils";
import { textField } from "../../Utils/ValidationUtils";
import * as Yup from "yup";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const MASTER_KEY = "operators";
export const MASTER_URL = API_ENDPOINTS.MASTER.OPERATOR; // Replace with actual URL or API_ENDPOINTS.MASTER.PRODUCTS
export interface OperatorFormType {
  operatorName: string;
  operatorCategory: "CARD" | "ONLINE";
  alias: string;
  productId: string | number;
  subProductId: string | number;
  isActive: boolean;
}

export interface OperatorTableType extends OperatorFormType {
  id: string;
  operatorCode: string;
  productCode: string;
  subProductCode: string;
  createdBy: string;
  createdOn?: string;
  editedBy?: string;
  editedOn?: string;
}

export interface CreateOperatorPayload extends OperatorFormType {
  createdBy: string;
}

export interface UpdateOperatorPayload extends OperatorFormType {
  editedBy: string;
}

export type FetchOperatorParams = {
  page: number;
  size: number;
  filter?: { key: string; value: string | boolean } | null;
};

export const initialValues: OperatorFormType = {
  operatorCategory: "CARD",
  operatorName: "",
  alias: "",
  productId: "",
  subProductId: "",
  isActive: true,
};

export const validationSchema: Record<keyof OperatorFormType, Yup.AnySchema> = {
  operatorCategory: Yup.string()
    .oneOf(["CARD", "ONLINE"], "Operator Category must be CARD or ONLINE")
    .required("Operator Category is required"),
  operatorName: textField("Operator Name", 50, true, true),
  alias: textField("Alias", 50, false, true),
  productId: textField("Product Id", 50, true),
  subProductId: textField("Sub Product Id", 50, true),
  isActive: Yup.boolean().required("Is Active is required"),
};

export const headers: GenericTableHeader<OperatorTableType>[] = [
  { key: "id", label: "Id", filterType: "number", searchable: true },
  { key: "operatorName", label: "Operator Name", filterType: "text" },
  { key: "operatorCode", label: "Operator Code", filterType: "text" },
  {
    key: "operatorCategory",
    label: "Operator Category",
    filterType: "boolean",
    filterOptions: [
      { label: "CARD", value: "CARD" },
      { label: "ONLINE", value: "ONLINE" },
    ],
  },
  { key: "productId", label: "Product ID", filterType: "text" },
  { key: "productCode", label: "Product Code", filterType: "text" },
  { key: "subProductId", label: "Sub Product ID", filterType: "text" },
  { key: "subProductCode", label: "Sub Product Code", filterType: "text" },
  { key: "alias", label: "Description", filterType: "text" },
  { key: "isActive", label: "Is Active", filterType: "boolean" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "createdOn", label: "Created On", filterType: "date" },
  { key: "editedBy", label: "Edited By", filterType: "text" },
  { key: "editedOn", label: "Edited On", filterType: "date" },
];

export const mapToOperatorTableType = (
  raw: Record<string, any>,
): OperatorTableType => {
  return {
    id: raw.id ?? "",
    operatorCategory: raw.operatorCategory ?? "",
    operatorCode: raw.operatorCode ?? "",
    operatorName: raw.operatorName ?? "",
    alias: raw.alias ?? "",
    productCode: raw.productCode ?? "",
    productId: raw.productId ?? "",
    subProductCode: raw.subProductCode ?? "",
    subProductId: raw.subProductId ?? "",
    isActive: !!raw.isActive,
    createdBy: raw.createdBy ?? "",
    createdOn: formatDateTime(raw.createdOn) ?? "",
    editedBy: raw.editedBy ?? "",
    editedOn: formatDateTime(raw.editedOn) ?? "",
  };
};

// Convert API response to Formik-compatible form data
export const transformOperatorToFormData = (
  raw: Record<string, any>,
): OperatorFormType => ({
  operatorName: raw.operatorName ?? "",
  operatorCategory: raw.operatorCategory ?? "",
  alias: raw.alias ?? "",
  productId: String(raw.productId),
  subProductId: String(raw.subProductId),
  isActive: !!raw.isActive,
});

// Transform form data to Create payload
export const transformFormToCreateOperatorPayload = (
  formData: OperatorFormType,
): CreateOperatorPayload => ({
  ...formData,
  createdBy: localStorage.getItem("username") || "system",
});

// Transform form data to Update payload
export const transformFormToUpdateOperatorPayload = (
  formData: OperatorFormType,
): UpdateOperatorPayload => ({
  ...formData,
  editedBy: localStorage.getItem("username") || "system",
});

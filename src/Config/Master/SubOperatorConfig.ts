import { formatDateTime, GenericTableHeader } from "../../Utils/utils";
import { textField } from "../../Utils/ValidationUtils";
import * as Yup from "yup";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const MASTER_KEY = "sub-operator";
export const MASTER_URL = API_ENDPOINTS.MASTER.SUB_OPERATOR; // Replace with actual URL or API_ENDPOINTS.MASTER.PRODUCTS
export interface SubOperatorFormType {
  subOperatorName: string;
  operatorCode: string | number;
  category: string;
  isBlocked: boolean;
}

export interface SubOperatorTableType extends SubOperatorFormType {
  id: string;
  operatorAlias: string;
  createdBy: string;
  createdOn?: string;
  editedBy?: string;
  editedOn?: string;
}
export interface CreateSubOperatorPayload extends SubOperatorFormType {
  createdBy: string;
}

export interface UpdateSubOperatorPayload extends SubOperatorFormType {
  editedBy: string;
}

export type FetchSubOperatorParams = {
  page: number;
  size: number;
  filter?: { key: string; value: string | boolean } | null;
};

export const initialValues: SubOperatorFormType = {
  subOperatorName: "",
  operatorCode: "",
  category: "",
  isBlocked: false,
};

export const validationSchema: Record<
  keyof SubOperatorFormType,
  Yup.AnySchema
> = {
  subOperatorName: textField("Sub Operator Name", 50, true, true),
  operatorCode: textField("Operator Code", 50, true, true),
  category: textField("Operator Category", 100, true, true),
  isBlocked: Yup.boolean().required("IsBlocked is required"),
};

export const headers: GenericTableHeader<SubOperatorTableType>[] = [
  { key: "id", label: "ID", filterType: "text" },
  { key: "subOperatorName", label: "Sub Operator Name", filterType: "text" },
  {
    key: "operatorCode",
    label: "Operator Code",
    filterType: "text",
  },
  { key: "operatorAlias", label: "Operator Alias", filterType: "text" },
  { key: "category", label: "Operator Name", filterType: "text" },
  { key: "isBlocked", label: "isBlocked", filterType: "boolean" },
  { key: "createdOn", label: "Created On", filterType: "date" },
  { key: "editedOn", label: "Edited On", filterType: "date" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "editedBy", label: "Edited By", filterType: "text" },
];

export const mapToSubOperatorTableType = (
  raw: Record<string, any>
): SubOperatorTableType => {
  return {
    id: raw.id ?? "",
    subOperatorName: raw.subOperatorName ?? "",
    operatorCode: raw.operatorCode ?? "",
    operatorAlias: raw.operatorAlias ?? "",
    category: raw.category ?? "",
    isBlocked: !!raw.isBlocked,
    createdBy: raw.createdBy ?? "",
    createdOn: formatDateTime(raw.createdOn) ?? "",
    editedBy: raw.editedBy ?? "",
    editedOn: formatDateTime(raw.editedOn) ?? "",
  };
};

// Convert API response to Formik-compatible form data
export const transformSubOperatorToFormData = (
  raw: Record<string, any>
): SubOperatorFormType => ({
  subOperatorName: raw.subOperatorName ?? "",
  operatorCode: raw.operatorCode ?? "",
  category: raw.category ?? "",
  isBlocked: raw.isBlocked ?? false,
});

// Transform form data to Create payload
export const transformFormToCreateSubOperatorPayload = (
  formData: SubOperatorFormType
): CreateSubOperatorPayload => ({
  ...formData,
  createdBy: localStorage.getItem("username") || "system",
});

// Transform form data to Update payload
export const transformFormToUpdateSubOperatorPayload = (
  formData: SubOperatorFormType
): UpdateSubOperatorPayload => ({
  ...formData,
  editedBy: localStorage.getItem("username") || "system",
});

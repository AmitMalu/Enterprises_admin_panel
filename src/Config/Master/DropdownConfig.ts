import { GenericTableHeader } from "../../Utils/utils";
import { textField } from "../../Utils/ValidationUtils";
import * as Yup from "yup";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const MASTER_KEY = "dropdowns";
export const MASTER_URL = API_ENDPOINTS.MASTER.DROPDOWN_MASTER;
export interface DropdownFormType {
  imMasterName: string;
  imSubMasterName: string;
}

export interface DropdownTableType extends DropdownFormType {
  imMasterId: string | number;
  imSubMasterId: string | number;
}

export interface CreateDropdownPayload extends DropdownFormType {
  createdBy: string;
}

export interface UpdateDropdownPayload extends DropdownFormType {
  editedBy: string;
}

export type FetchDropdownMasterListParams = {
  page: number;
  size: number;
  filter?: { key: string; value: string | boolean } | null;
};

export const initialValues: DropdownFormType = {
  imMasterName: "",
  imSubMasterName: "",
};

export const validationSchema: Record<keyof DropdownFormType, Yup.AnySchema> = {
  imMasterName: textField("Master Name", 50, true),
  imSubMasterName: textField("Sub Master Name", 50, true),
};

export const headers: GenericTableHeader<DropdownTableType>[] = [
  { key: "imMasterId", label: "Master Id", filterType: "text" },
  { key: "imSubMasterId", label: "Sub Master Id", filterType: "text" },
  { key: "imMasterName", label: "Master Name", filterType: "text" },
  { key: "imSubMasterName", label: "Sub Master Name", filterType: "text" },
];

export const mapToDropdownTableType = (
  raw: Record<string, any>
): DropdownTableType => {
  return {
    imMasterId: raw?.imMasterId ?? "",
    imSubMasterId: raw?.imSubMasterId ?? "",
    imMasterName: raw?.imMasterName ?? "",
    imSubMasterName: raw?.imSubMasterName ?? "",
  };
};

// Convert API response to Formik-compatible form data
export const transformDropdownListToFormData = (
  raw: Record<string, any>
): DropdownFormType => ({
  imMasterName: raw?.imMasterName ?? "",
  imSubMasterName: raw?.imSubMasterName ?? "",
});

// Transform form data to Create payload
export const transformFormToCreateDropdownPayload = (
  formData: DropdownFormType
): CreateDropdownPayload => ({
  ...formData,
  createdBy: localStorage.getItem("username") || "system",
});

// Transform form data to Update payload
export const transformFormToUpdateDropdownPayload = (
  formData: DropdownFormType
): UpdateDropdownPayload => ({
  ...formData,
  editedBy: localStorage.getItem("username") || "system",
});

import { GenericTableHeader } from "../../Utils/utils";
import { textField } from "../../Utils/ValidationUtils";
import * as Yup from "yup";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const MASTER_KEY = "sub-master";
export const MASTER_URL = API_ENDPOINTS.MASTER.MAIN_MASTER;

export interface SubMasterFormType {
  imMasterId: string;
  imSubMasterName: string;
}

export interface SubMasterTableType extends SubMasterFormType {
  imMasterName: string;
  imSubMasterId: string;
}

export interface CreateSubMasterPayload extends SubMasterFormType {
  createdBy: string;
}

export interface UpdateSubMasterPayload extends SubMasterFormType {
  editedBy: string;
}

export type FetchSubMasterListParams = {
  page: number;
  size: number;
  filter?: { key: string; value: string | boolean } | null;
};

export const initialValues: SubMasterFormType = {
  imMasterId: "",
  imSubMasterName: "",
};

export const validationSchema: Record<keyof SubMasterFormType, Yup.AnySchema> =
  {
    imMasterId: textField("Master", 50, true, true),
    imSubMasterName: textField("Sub Master Name", 50, true, true),
  };

export const headers: GenericTableHeader<SubMasterTableType>[] = [
  { key: "imMasterId", label: "Master Id", filterType: "number" },
  { key: "imMasterName", label: "Master Name", filterType: "text" },
  { key: "imSubMasterId", label: "Sub Master Id", filterType: "number" },
  { key: "imSubMasterName", label: "Sub Master Name", filterType: "text" },
];

// export const mapToDropdownTableType = (
//   raw: Record<string, any>
// ): DropdownTableType => {
//   return {
//     imMasterId: raw?.imMasterId ?? "",
//     imSubMasterId: raw?.imSubMasterId ?? "",
//     imMasterName: raw?.imMasterName ?? "",
//     imSubMasterName: raw?.imSubMasterName ?? "",
//   };
// };

// Convert API response to Formik-compatible form data
// export const transformDropdownListToFormData = (
//   raw: Record<string, any>
// ): DropdownFormType => ({
//   imMasterName: raw?.imMasterName ?? "",
//   imSubMasterName: raw?.imSubMasterName ?? "",
// });

// Transform form data to Create payload
export const transformFormToCreateSubMasterPayload = (
  formData: SubMasterFormType
): CreateSubMasterPayload => ({
  ...formData,
  createdBy: localStorage.getItem("username") || "system",
});

// Transform form data to Update payload
export const transformFormToUpdateSubMasterPayload = (
  formData: SubMasterFormType
): UpdateSubMasterPayload => ({
  ...formData,
  editedBy: localStorage.getItem("username") || "system",
});

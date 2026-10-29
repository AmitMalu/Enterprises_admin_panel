import { formatDateTime, GenericTableHeader } from "../../Utils/utils";
import { textField } from "../../Utils/ValidationUtils";
import * as Yup from "yup";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const MASTER_KEY = "sub-master";
export const MASTER_URL = API_ENDPOINTS.MASTER.MAIN_MASTER;

export interface SubMasterFormType {
  scsMasterId: string;
  scsSubMasterName: string;
}

export interface SubMasterTableType extends SubMasterFormType {
  scsMasterName: string;
  scsSubMasterId: string;
  createdOn?: string;
  createdBy?: string;
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
  scsMasterId: "",
  scsSubMasterName: "",
};

export const validationSchema: Record<keyof SubMasterFormType, Yup.AnySchema> =
  {
    scsMasterId: textField("Master", 50, true, true),
    scsSubMasterName: textField("Sub Master Name", 50, true, true),
  };

export const headers: GenericTableHeader<SubMasterTableType>[] = [
  { key: "scsMasterId", label: "Master Id", filterType: "number" },
  { key: "scsMasterName", label: "Master Name", filterType: "text" },
  { key: "scsSubMasterId", label: "Sub Master Id", filterType: "number" },
  { key: "scsSubMasterName", label: "Sub Master Name", filterType: "text" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "createdOn", label: "Created On", filterType: "date" },
];

export const mapToSubMasterTableType = (
  raw: Record<string, any>
): SubMasterTableType => {
  return {
    scsMasterId: raw?.scsMasterId ?? "",
    scsSubMasterId: raw?.scsSubMasterId ?? "",
    scsMasterName: raw?.scsMasterName ?? "",
    scsSubMasterName: raw?.scsSubMasterName ?? "",
    createdOn: formatDateTime(raw.createdOn) ?? "",
    createdBy: raw.createdBy ?? "",
  };
};

// Convert API response to Formik-compatible form data
// export const transformDropdownListToFormData = (
//   raw: Record<string, any>
// ): DropdownFormType => ({
//   scsMasterName: raw?.scsMasterName ?? "",
//   scsSubMasterName: raw?.scsSubMasterName ?? "",
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

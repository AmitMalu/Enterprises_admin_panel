import { formatDateTime, GenericTableHeader } from "../../Utils/utils";
import { textField } from "../../Utils/ValidationUtils";
import * as Yup from "yup";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const MASTER_KEY = "main-master";
export const MASTER_URL = API_ENDPOINTS.MASTER.MAIN_MASTER;

export interface MainMasterFormType {
  scsMasterName: string;
}

export interface MainMasterTableType extends MainMasterFormType {
  scsMasterId: string | number;
  scsMasterName: string;
  createdOn?: string;
  createdBy?: string;
  // editedOn?: string;
  // editedBy?: string;
}

export interface CreateMainMasterPayload extends MainMasterFormType {
  createdBy: string;
}

export interface UpdateMainMasterPayload extends MainMasterFormType {
  editedBy: string;
}

export type FetchMainMasterListParams = {
  page: number;
  size: number;
  filter?: { key: string; value: string | boolean } | null;
};

export const initialValues: MainMasterFormType = {
  scsMasterName: "",
};

export const validationSchema: Record<keyof MainMasterFormType, Yup.AnySchema> =
  {
    scsMasterName: textField("Master Name", 50, true, true),
  };

export const headers: GenericTableHeader<MainMasterTableType>[] = [
  { key: "scsMasterId", label: "Master Id", filterType: "number" },
  { key: "scsMasterName", label: "Master Name", filterType: "text" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "createdOn", label: "Created On", filterType: "date" },
  // { key: "editedBy", label: "Edited By", filterType: "text" },
  // { key: "editedOn", label: "Edited On", filterType: "date" },
];

export const mapToMainMasterTableType = (
  raw: Record<string, any>
): MainMasterTableType => {
  return {
    scsMasterName: raw?.scsMasterName ?? "",
    scsMasterId: raw?.scsMasterId ?? "",
    createdOn: formatDateTime(raw.createdOn) ?? "",
    createdBy: raw.createdBy ?? "",
    // editedOn: formatDateTime(raw.editedOn) ?? "",
    // editedBy: raw.editedBy ?? "",
  };
};

// Transform form data to Create payload
export const transformFormToCreateMainMasterPayload = (
  formData: MainMasterFormType
): CreateMainMasterPayload => ({
  ...formData,
  createdBy: localStorage.getItem("username") || "system",
});

// Transform form data to Update payload
export const transformFormToUpdateMainMasterPayload = (
  formData: MainMasterFormType
): UpdateMainMasterPayload => ({
  ...formData,
  editedBy: localStorage.getItem("username") || "system",
});

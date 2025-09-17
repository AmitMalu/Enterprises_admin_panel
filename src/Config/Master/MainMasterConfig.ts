import { GenericTableHeader } from "../../Utils/utils";
import { textField } from "../../Utils/ValidationUtils";
import * as Yup from "yup";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const MASTER_KEY = "main-master";
export const MASTER_URL = API_ENDPOINTS.MASTER.MAIN_MASTER;

export interface MainMasterFormType {
  imMasterName: string;
}

export interface MainMasterTableType extends MainMasterFormType {
  imMasterId: string | number;
  imMasterName: string;
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
  imMasterName: "",
};

export const validationSchema: Record<keyof MainMasterFormType, Yup.AnySchema> =
  {
    imMasterName: textField("Master Name", 50, true, true),
  };

export const headers: GenericTableHeader<MainMasterTableType>[] = [
  { key: "imMasterId", label: "Master Id", filterType: "number" },
  { key: "imMasterName", label: "Master Name", filterType: "text" },
];

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

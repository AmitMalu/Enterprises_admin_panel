import {
  GenericTableHeader,
} from "../../Utils/utils";
import { textField } from "../../Utils/ValidationUtils";
import * as Yup from "yup";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const MASTER_KEY = "district-master";
export const MASTER_URL = API_ENDPOINTS.MASTER.DISTRICT_MASTER;

export interface DistrictMasterFormType {
  countryId?: string | number;
  stateId?: string;
  districtName: string;
  districtCode: string;
  blocked: boolean;
}

export interface DistrictMasterTableType extends DistrictMasterFormType {
  id: string | number;
  stateName: string;
  countryName: string;
  createdBy: string;
  createdOn?: string;
  editedBy?: string;
  editedOn?: string;
}

export interface DistrictMasterCreatePayload extends DistrictMasterFormType {
  createdBy: string;
}

export interface DistrictMasterUpdatePayload extends DistrictMasterFormType {
  editedBy: string;
}

export type FetchDistrictMasterListParams = {
  page: number;
  size: number;
  filter?: { key: string; value: string | boolean } | null;
};

export const initialValues: DistrictMasterFormType = {
  countryId: "",
  stateId: "",
  districtName: "",
  districtCode: "",
  blocked: false,
};

export const validationSchema: Record<
  keyof DistrictMasterFormType,
  Yup.AnySchema
> = {
  countryId: textField("Country", 50, true, true),
  stateId: textField("State", 50, true, true),
  districtName: textField("District Name", 50, true, true),
  districtCode: textField("District Code", 50, true, true),
  blocked: Yup.boolean().default(false),
};

export const headers: GenericTableHeader<DistrictMasterTableType>[] = [
  { key: "id", label: "ID", filterType: "text" },
  { key: "districtName", label: "District Name", filterType: "text" },
  { key: "districtCode", label: "District Code", filterType: "text" },
  { key: "stateName", label: "State Name", filterType: "text" },
  { key: "countryName", label: "Country Name", filterType: "text" },
  { key: "blocked", label: "Blocked", filterType: "boolean" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "createdOn", label: "Created On", filterType: "date" },
  { key: "editedBy", label: "Edited By", filterType: "text" },
  { key: "editedOn", label: "Edited On", filterType: "date" },
];

export const transformToDistrictTableType = (
  raw: Record<string, any>
): DistrictMasterTableType => {
  return {
    id: raw.id ?? "",
    districtName: raw.districtName ?? "",
    districtCode: raw.districtCode ?? "",
    stateName: raw.stateName ?? "",
    countryName: raw.countryName ?? "",
    blocked: raw.ifscCode ?? "",
    createdBy: raw.createdBy ?? "",
    createdOn: raw.createdOn ?? "",
    editedBy: raw.editedBy ?? "",
    editedOn: raw.editedOn ?? "",
  };
};

// Convert API response to Formik-compatible form data
export const transformDistrictListToFormData = (
  raw: Record<string, any>
): DistrictMasterFormType => ({
  districtName: raw.districtName ?? "",
  districtCode: raw.districtCode ?? "",
  stateId: raw.stateId != null ? String(raw.stateId) : "",
  countryId: raw.countryId != null ? String(raw.countryId) : "",
  blocked: raw.blocked ?? false,
});

export const transformFormToCreateDistrictMasterPayload = (
  formData: DistrictMasterFormType
): DistrictMasterCreatePayload => {
  return {
    ...formData,
    createdBy: localStorage.getItem("username") || "system",
  };
};

export const transformFormToUpdateDistrictMasterPayload = (
  formData: DistrictMasterFormType
): DistrictMasterUpdatePayload => {
  return {
    ...formData,
    editedBy: localStorage.getItem("username") || "system",
  };
};

import { GenericTableHeader } from "../../Utils/utils";
import { textField } from "../../Utils/ValidationUtils";
import * as Yup from "yup";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const MASTER_KEY = "city-master";
export const MASTER_URL = API_ENDPOINTS.MASTER.CITY_MASTER;

export interface CityMasterFormType {
  countryId?: string | number;
  districtId?: string;
  stateId?: string;
  cityName: string;
  cityCode: string;
  blocked: boolean;
}

export interface CityMasterTableType extends CityMasterFormType {
  id: string | number;
  districtName: string;
  stateName: string;
  countryName: string;
  createdBy: string;
  createdOn?: string;
  editedBy?: string;
  editedOn?: string;
}

export interface CityMasterCreatePayload extends CityMasterFormType {
  createdBy: string;
}

export interface CityMasterUpdatePayload extends CityMasterFormType {
  editedBy: string;
}

export type FetchCityMasterListParams = {
  page: number;
  size: number;
  filter?: { key: string; value: string | boolean } | null;
};

export const initialValues: CityMasterFormType = {
  countryId: "",
  stateId: "",
  districtId: "",
  cityName: "",
  cityCode: "",
  blocked: false,
};

export const validationSchema: Record<keyof CityMasterFormType, Yup.AnySchema> =
  {
    countryId: textField("Country", 50, true, true),
    stateId: textField("State", 50, true, true),
    districtId: textField("District", 50, true, true),
    cityName: textField("City Name", 50, true, true),
    cityCode: textField("City Code", 50, true, true),
    blocked: Yup.boolean().default(false),
  };

export const headers: GenericTableHeader<CityMasterTableType>[] = [
  { key: "id", label: "Id", filterType: "number", searchable: true },
  { key: "cityName", label: "City Name", filterType: "text" },
  { key: "cityCode", label: "City Code", filterType: "text" },
  { key: "districtName", label: "District Name", filterType: "text" },
  { key: "stateName", label: "State Name", filterType: "text" },
  { key: "countryName", label: "Country Name", filterType: "text" },
  { key: "blocked", label: "Blocked", filterType: "boolean" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "createdOn", label: "Created On", filterType: "date" },
  { key: "editedBy", label: "Edited By", filterType: "text" },
  { key: "editedOn", label: "Edited On", filterType: "date" },
];

export const transformToCityTableType = (
  raw: Record<string, any>
): CityMasterTableType => {
  return {
    id: raw.id ?? "",
    cityName: raw.cityName ?? "",
    cityCode: raw.cityCode ?? "",
    districtName: raw.districtName ?? "",
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
export const transformCityListToFormData = (
  raw: Record<string, any>
): CityMasterFormType => ({
  cityName: raw.cityName ?? "",
  cityCode: raw.cityCode ?? "",
  districtId: raw.districtId != null ? String(raw.districtId) : "",
  stateId: raw.stateId != null ? String(raw.stateId) : "",
  countryId: raw.countryId != null ? String(raw.countryId) : "",
  blocked: raw.blocked ?? false,
});

export const transformFormToCreateCityMasterPayload = (
  formData: CityMasterFormType
): CityMasterCreatePayload => {
  return {
    ...formData,
    createdBy: localStorage.getItem("username") || "system",
  };
};

export const transformFormToUpdateCityMasterPayload = (
  formData: CityMasterFormType
): CityMasterUpdatePayload => {
  return {
    ...formData,
    editedBy: localStorage.getItem("username") || "system",
  };
};

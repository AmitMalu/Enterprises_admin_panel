import { GenericTableHeader } from "../../Utils/utils";
import { textField } from "../../Utils/ValidationUtils";
import * as Yup from "yup";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const MASTER_KEY = "pincode-master";
export const MASTER_URL = API_ENDPOINTS.MASTER.PINCODE_MASTER;

export interface PincodeMasterFormType {
  pinCode: string;
  countryId?: string | number;
  districtId?: string;
  stateId?: string;
  cityId?: string;
  blocked: boolean;
}

export interface PincodeMasterTableType extends PincodeMasterFormType {
  id: string | number;
  pinCode: string;
  cityName: string;
  districtName: string;
  stateName: string;
  countryName: string;
  createdBy: string;
  createdOn?: string;
  editedBy?: string;
  editedOn?: string;
}

export interface PincodeMasterCreatePayload extends PincodeMasterFormType {
  createdBy: string;
}

export interface PincodeMasterUpdatePayload extends PincodeMasterFormType {
  editedBy: string;
}

export type FetchPincodeMasterListParams = {
  page: number;
  size: number;
  filter?: { key: string; value: string | boolean } | null;
};

export const initialValues: PincodeMasterFormType = {
  pinCode: "",
  countryId: "",
  stateId: "",
  districtId: "",
  cityId: "",
  blocked: false,
};

export const validationSchema: Record<
  keyof PincodeMasterFormType,
  Yup.AnySchema
> = {
  pinCode: textField("Pincode", 6, true, false),
  countryId: textField("Country", 50, true, true),
  stateId: textField("State", 50, true, true),
  districtId: textField("District", 50, true, true),
  cityId: textField("City Name", 50, true, true),
  blocked: Yup.boolean().default(false),
};

export const headers: GenericTableHeader<PincodeMasterTableType>[] = [
  { key: "id", label: "ID", filterType: "text" },
  { key: "pinCode", label: "Pincode", filterType: "text" },
  { key: "cityName", label: "City Name", filterType: "text" },
  { key: "districtName", label: "District Name", filterType: "text" },
  { key: "stateName", label: "State Name", filterType: "text" },
  { key: "countryName", label: "Country Name", filterType: "text" },
  { key: "blocked", label: "Blocked", filterType: "boolean" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "createdOn", label: "Created On", filterType: "date" },
  { key: "editedBy", label: "Edited By", filterType: "text" },
  { key: "editedOn", label: "Edited On", filterType: "date" },
];

export const transformToPincodeTableType = (
  raw: Record<string, any>
): PincodeMasterTableType => {
  return {
    id: raw.id ?? "",
    pinCode: raw.pinCode ?? "",
    cityName: raw.cityName ?? "",
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
export const transformPincodeListToFormData = (
  raw: Record<string, any>
): PincodeMasterFormType => ({
  pinCode: raw.pinCode ?? "",
  cityId: raw.cityId != null ? String(raw.cityId) : "",
  districtId: raw.districtId != null ? String(raw.districtId) : "",
  stateId: raw.stateId != null ? String(raw.stateId) : "",
  countryId: raw.countryId != null ? String(raw.countryId) : "",
  blocked: raw.blocked ?? false,
});

export const transformFormToCreatePincodeMasterPayload = (
  formData: PincodeMasterFormType
): PincodeMasterCreatePayload => {
  return {
    ...formData,
    createdBy: localStorage.getItem("username") || "system",
  };
};

export const transformFormToUpdatePincodeMasterPayload = (
  formData: PincodeMasterFormType
): PincodeMasterUpdatePayload => {
  return {
    ...formData,
    editedBy: localStorage.getItem("username") || "system",
  };
};

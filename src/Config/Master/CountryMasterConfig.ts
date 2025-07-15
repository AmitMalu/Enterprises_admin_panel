import { GenericTableHeader } from "../../Utils/utils";
import { textField } from "../../Utils/ValidationUtils";
import * as Yup from "yup";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const MASTER_KEY = "country-master";
export const MASTER_URL = API_ENDPOINTS.MASTER.COUNTRY_MASTER;

export interface CountryMasterFormType {
  countryName: string;
  countryCode: string;
  blocked: boolean;
}

export interface CountryMasterTableType extends CountryMasterFormType {
  id: string | number;
  countryName: string;
  countryCode: string;
  blocked: boolean;
  createdBy: string;
  createdOn?: string;
  editedBy?: string;
  editedOn?: string;
}

export interface CountryMasterCreatePayload extends CountryMasterFormType {
  createdBy: string;
}

export interface CountryMasterUpdatePayload extends CountryMasterFormType {
  editedBy: string;
}

export type FetchCountryMasterListParams = {
  page: number;
  size: number;
  filter?: { key: string; value: string | boolean } | null;
};

export const initialValues: CountryMasterFormType = {
  countryName: "",
  countryCode: "",
  blocked: false,
};

export const validationSchema: Record<
  keyof CountryMasterFormType,
  Yup.AnySchema
> = {
  countryName: textField("Country Name", 50, true, true),
  countryCode: textField("Country Code", 50, true, true),
  blocked: Yup.boolean().default(false),
};

export const headers: GenericTableHeader<CountryMasterTableType>[] = [
  { key: "id", label: "ID", filterType: "text" },
  { key: "countryName", label: "Country Name", filterType: "text" },
  { key: "countryCode", label: "Country Code", filterType: "text" },
  { key: "blocked", label: "Blocked", filterType: "boolean" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "createdOn", label: "Created On", filterType: "text" },
  { key: "editedBy", label: "Edited By", filterType: "text" },
  { key: "editedOn", label: "Edited On", filterType: "text" },
];

// export const transformToCountryTableType = (
//   raw: Record<string, any>
// ): CountryMasterTableType => {
//   return {
//     id: raw.id ?? "",
//     countryName: raw.bankName ?? "",
//     countryCode: raw.accountNumber ?? "",
//     blocked: raw.ifscCode ?? "",
//     createdBy: raw.createdBy ?? "",
//     createdOn: raw.createdOn ?? "",
//     editedBy: raw.editedBy ?? "",
//     editedOn: raw.editedOn ?? "",
//   };
// };

// Convert API response to Formik-compatible form data
export const transformCountryListToFormData = (
  raw: Record<string, any>
): CountryMasterFormType => ({
  countryName: raw.countryName ?? "",
  countryCode: raw.countryCode ?? "",
  blocked: raw.blocked ?? "",
});

export const transformFormToCreateCountryMasterPayload = (
  formData: CountryMasterFormType
): CountryMasterCreatePayload => {
  return {
    ...formData,
    createdBy: localStorage.getItem("username") || "system",
  };
};

export const transformFormToUpdateCountryMasterPayload = (
  formData: CountryMasterFormType
): CountryMasterUpdatePayload => {
  return {
    ...formData,
    editedBy: localStorage.getItem("username") || "system",
  };
};

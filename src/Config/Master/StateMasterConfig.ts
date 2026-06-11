import {
  GenericTableHeader,
  SelectRegionTypeData,
  SelectZoneData,
} from "../../Utils/utils";
import { textField } from "../../Utils/ValidationUtils";
import * as Yup from "yup";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const MASTER_KEY = "state-master";
export const MASTER_URL = API_ENDPOINTS.MASTER.STATE_MASTER;

export interface StateMasterFormType {
  zone: string;
  stateName: string;
  stateCode: string;
  regionType: string;
  countryId?: string | number;
  blocked: boolean;
  isActive?: boolean;
}

export interface StateMasterTableType extends StateMasterFormType {
  id: string | number;
  stateName: string;
  stateCode: string;
  countryName: string;
  blocked: boolean;
  createdBy: string;
  createdOn?: string;
  editedBy?: string;
  editedOn?: string;
}

export interface StateMasterCreatePayload extends StateMasterFormType {
  createdBy: string;
}

export interface StateMasterUpdatePayload extends StateMasterFormType {
  editedBy: string;
}

export type FetchStateMasterListParams = {
  page: number;
  size: number;
  filter?: { key: string; value: string | boolean } | null;
};

export const initialValues: StateMasterFormType = {
  zone: "",
  regionType: "state",
  countryId: "",
  stateName: "",
  stateCode: "",
  blocked: false,
  isActive: true,
};

export const validationSchema: Record<
  keyof StateMasterFormType,
  Yup.AnySchema
> = {
  zone: textField("Zone", 50, true, true),
  regionType: textField("Region Type", 50, true, true),
  countryId: textField("Country", 50, true, true),
  stateName: textField("State Name", 50, true, true),
  stateCode: textField("State Code", 50, true, true),
  blocked: Yup.boolean().default(false),
  isActive: Yup.boolean().default(true),
};

export const headers: GenericTableHeader<StateMasterTableType>[] = [
  { key: "id", label: "Id", filterType: "number", searchable: true },
  { key: "stateName", label: "State Name", filterType: "text" },
  { key: "stateCode", label: "State Code", filterType: "text" },
  {
    key: "zone",
    label: "Zone",
    filterType: "boolean",
    filterOptions: SelectZoneData,
  },
  {
    key: "regionType",
    label: "Region Type",
    filterType: "boolean",
    filterOptions: SelectRegionTypeData,
  },
  { key: "countryName", label: "Country Name", filterType: "text" },
  { key: "blocked", label: "Blocked", filterType: "boolean" },
  { key: "isActive", label: "Active", filterType: "boolean" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "createdOn", label: "Created On", filterType: "date" },
  { key: "editedBy", label: "Edited By", filterType: "text" },
  { key: "editedOn", label: "Edited On", filterType: "date" },
];

export const transformToStateTableType = (
  raw: Record<string, any>
): StateMasterTableType => {
  return {
    id: raw.id ?? "",
    stateName: raw.stateName ?? "",
    stateCode: raw.stateCode ?? "",
    zone: raw.zone ?? "",
    regionType: raw.regionType ?? "",
    countryName: raw.countryName ?? "",
    blocked: !!raw.blocked,
    isActive: !!raw.isActive,
    createdBy: raw.createdBy ?? "",
    createdOn: raw.createdOn ?? "",
    editedBy: raw.editedBy ?? "",
    editedOn: raw.editedOn ?? "",
  };
};

// Convert API response to Formik-compatible form data
export const transformStateListToFormData = (
  raw: Record<string, any>
): StateMasterFormType => ({
  stateName: raw.stateName ?? "",
  stateCode: raw.stateCode ?? "",
  zone: raw.zone ?? "",
  regionType: raw.regionType ?? "",
  countryId: raw.countryId != null ? String(raw.countryId) : "",
  blocked: !!raw.blocked,
  isActive: !!raw.isActive,
});

export const transformFormToCreateStateMasterPayload = (
  formData: StateMasterFormType
): StateMasterCreatePayload => {
  return {
    ...formData,
    createdBy: localStorage.getItem("username") || "system",
  };
};

export const transformFormToUpdateStateMasterPayload = (
  formData: StateMasterFormType
): StateMasterUpdatePayload => {
  return {
    ...formData,
    editedBy: localStorage.getItem("username") || "system",
  };
};

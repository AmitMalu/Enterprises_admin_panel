import { GenericTableHeader } from "../../Utils/utils";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const KEY = "user-auth";
export const URL = API_ENDPOINTS.MANAGEMENT.USER_AUTH;

// 1. Union type of user types
export type UserType =
  | "RETAILER"
  | "ENTERPRISE"
  | "ADMIN"
  | "DISTRIBUTOR"
  | "PARTNER"
  | "SUPER_DISTRIBUTOR"
  | "WHITE_LABEL";

// 2. Filter options for a Select/Dropdown
export const userTypeFilterOptions: { label: string; value: UserType }[] = [
  { label: "Retailer", value: "RETAILER" },
  { label: "Enterprise", value: "ENTERPRISE" },
  { label: "Admin", value: "ADMIN" },
  { label: "Distributor", value: "DISTRIBUTOR" },
  { label: "Partner", value: "PARTNER" },
  { label: "Super Distributor", value: "SUPER_DISTRIBUTOR" },
  { label: "White Label", value: "WHITE_LABEL" },
];

export interface UserAuthFormType {
  id: string;
  parentAccount: string;
  type: string;
  emailId: string;
  name: string;
  mobileNumber: string;
  status: string;
  createdBy: string;
  createdOn: string;
}

export interface UserAuthTableType extends UserAuthFormType {}

export interface UserAuthUpdatePayload {
  hierarchyId: string;
  isApproved: boolean;
  editedBy: string;
}

export const initialValues: UserAuthFormType = {
  id: "",
  parentAccount: "",
  type: "",
  emailId: "",
  name: "",
  mobileNumber: "",
  status: "",
  createdBy: "",
  createdOn: "",
};

export const headers: GenericTableHeader<UserAuthTableType>[] = [
  { key: "id", label: "ID", filterType: "text" },
  { key: "parentAccount", label: "Parent Account", filterType: "text" },
  {
    key: "type",
    label: "User type",
    filterType: "boolean",
    filterOptions: userTypeFilterOptions,
  },
  { key: "emailId", label: "Email", filterType: "text" },
  { key: "name", label: "Name", filterType: "text" },
  { key: "mobileNumber", label: "Mobile Number", filterType: "text" },
  { key: "status", label: "Status", filterType: "text" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "createdOn", label: "Created On", filterType: "date" },
];

export const transformToUpdateUserAuthPayload = (
  raw: any
): UserAuthUpdatePayload => ({
  hierarchyId: raw.id,
  isApproved: raw.isApproved,
  editedBy: localStorage.getItem("username") || "system",
});

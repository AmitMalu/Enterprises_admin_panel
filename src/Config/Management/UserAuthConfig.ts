import { GenericTableHeader } from "../../Utils/utils";
import { API_ENDPOINTS } from "../Api/EndPoints";
import { UserType } from "../UserCreationConfig/UserConfig";

export const KEY = "user-auth";
export const URL = API_ENDPOINTS.MANAGEMENT.USER_AUTH;

export const USER_TYPE_KEBAB_CASE_MAP: Record<
  UserTypeUpperSnakeCase,
  UserType
> = {
  RETAILER: "retailer",
  DISTRIBUTOR: "distributor",
  PARTNER: "partner",
  SUPER_DISTRIBUTOR: "super-distributor",
  WHITE_LABEL: "white-label",
  ENTERPRISE: "enterprise",
  IM_ADMIN: "im-admin",
};

// 1. Union type of user types
export type UserTypeUpperSnakeCase =
  | "RETAILER"
  | "DISTRIBUTOR"
  | "PARTNER"
  | "SUPER_DISTRIBUTOR"
  | "ENTERPRISE"
  | "WHITE_LABEL"
  | "IM_ADMIN";

// 2. Filter options for a Select/Dropdown
export const userTypeFilterOptions: {
  label: string;
  value: UserTypeUpperSnakeCase;
}[] = [
    { label: "Retailer", value: "RETAILER" },
    { label: "Enterprise", value: "ENTERPRISE" },
    { label: "Admin", value: "IM_ADMIN" },
    { label: "Distributor", value: "DISTRIBUTOR" },
    { label: "Partner", value: "PARTNER" },
    { label: "Super Distributor", value: "SUPER_DISTRIBUTOR" },
    { label: "White Label", value: "WHITE_LABEL" },
  ];

export interface Address {
  outletName: string;
  companyType: string;
  companyName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface BankDetails {
  bankName: string;
  bankAccountNumber: string;
  bankHolderName: string;
  ifscCode: string;
  isVerified: boolean;
}

export interface UserAuthFormType {
  id?: string;
  parentAccount?: string;
  type?: string;
  emailId: string;
  name: string;
  mobileNumber: string;
  status?: string;
  createdBy?: string;
  createdOn?: string;
  remarks?: string;
  editedBy?: string;
  lastEditedOn?: string;
  approvedOn?: string;
  approvedBy?: string;
  // Additional fields for retailer/user edit
  title?: string;
  abbreviation?: string;
  dob?: string;
  aadhaarNumber?: string;
  panNumber?: string;
  shopNumber?: string;
  businessNumber?: string;
  address?: Address;
  outletAddress?: Address;
  bankDetails?: BankDetails;
  rejectionReason?: string;
}

export interface UserAuthTableType extends UserAuthFormType { }

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
  title: "",
  abbreviation: "",
  dob: "",
  aadhaarNumber: "",
  panNumber: "",
  shopNumber: "",
  businessNumber: "",
  address: {
    outletName: "",
    companyType: "",
    companyName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  },
  outletAddress: {
    outletName: "",
    companyType: "",
    companyName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  },
  bankDetails: {
    bankName: "",
    bankAccountNumber: "",
    bankHolderName: "",
    ifscCode: "",
    isVerified: false,
  },
  rejectionReason: "",
  editedBy: "",
  lastEditedOn: "",
};

export const headers: GenericTableHeader<UserAuthTableType>[] = [
  { key: "id", label: "Id", filterType: "text" },
  { key: "parentAccount", label: "Parent Account", filterType: "text" },
  {
    key: "type",
    label: "User type",
    filterType: "boolean",
    filterOptions: userTypeFilterOptions,
  },
  { key: "emailId", label: "Email", filterType: "text" },
  { key: "name", label: "Name", filterType: "text" },
  { key: "mobileNumber", label: "Mobile Number", filterType: "number" },
  { key: "status", label: "Status", filterType: "text" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "createdOn", label: "Created On", filterType: "date" },
];

export const onboardedHeaders: GenericTableHeader<UserAuthTableType>[] = [
  ...headers,
  { key: "editedBy", label: "Edited By", filterType: "text" },
  { key: "lastEditedOn", label: "Edited On", filterType: "date" },
  { key: "approvedBy", label: "Approved By", filterType: "text" },
  { key: "approvedOn", label: "Approved On", filterType: "date" },
];

export const RejectedUserHeaders: GenericTableHeader<UserAuthTableType>[] = [
  { key: "id", label: "Id", filterType: "text" },
  { key: "parentAccount", label: "Parent Account", filterType: "text" },
  {
    key: "type",
    label: "User type",
    filterType: "boolean",
    filterOptions: userTypeFilterOptions,
  },
  { key: "emailId", label: "Email", filterType: "text" },
  { key: "name", label: "Name", filterType: "text" },
  { key: "mobileNumber", label: "Mobile Number", filterType: "number" },
  { key: "status", label: "Status", filterType: "text" },
  { key: "remarks", label: "Remark", filterType: "text" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "createdOn", label: "Created On", filterType: "date" },
];

export const transformToUpdateUserAuthPayload = (
  raw: any,
): UserAuthUpdatePayload => ({
  hierarchyId: raw.id,
  isApproved: raw.isApproved,
  editedBy: localStorage.getItem("username") || "system",
});

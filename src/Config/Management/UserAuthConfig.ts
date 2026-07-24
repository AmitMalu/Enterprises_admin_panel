import { GenericTableHeader } from "../../Utils/utils";
import { API_ENDPOINTS } from "../Api/EndPoints";
import { UserType } from "../UserCreationConfig/UserConfig";
import * as Yup from "yup";
import {
  textField,
  emailValidation,
  mobileValidation,
  dobValidation,
  aadhaarValidation,
  panValidation,
  zipValidation,
  ifscValidation,
  accountNumberValidation,
  websiteValidation,
  fileValidation,
} from "../../Utils/ValidationUtils";

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
  rejectedBy?: string;
  rejectedOn?: string;
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

export const pendingHeaders: GenericTableHeader<UserAuthTableType>[] = [
  ...headers,
  { key: "editedBy", label: "Edited By", filterType: "text" },
  { key: "lastEditedOn", label: "Edited On", filterType: "date" },
];

export const onboardedHeaders: GenericTableHeader<UserAuthTableType>[] = [
  ...headers,
  { key: "editedBy", label: "Edited By", filterType: "text" },
  { key: "lastEditedOn", label: "Edited On", filterType: "date" },
  { key: "approvedBy", label: "Approved By", filterType: "text" },
  { key: "approvedOn", label: "Approved On", filterType: "date" },
];

export const RejectedUserHeaders: GenericTableHeader<UserAuthTableType>[] = [
  ...headers,
  { key: "remarks", label: "Remark", filterType: "text" },
  { key: "rejectedBy", label: "Rejected By", filterType: "text" },
  { key: "rejectedOn", label: "Rejected On", filterType: "date" },
];

export const transformToUpdateUserAuthPayload = (
  raw: any,
): UserAuthUpdatePayload => ({
  hierarchyId: raw.id,
  isApproved: raw.isApproved,
  editedBy: localStorage.getItem("username") || "system",
});

// ── Field Visibility Config ──────────────────────────────────────────────

export type FieldVisibilityConfig = {
  basic: string[];
  address: string[];
  outletAddress: string[];
  kyc: string[];
  bank: string[];
  other: string[];
};

export const FIELD_VISIBILITY_MAP: Record<UserType | "im-admin", FieldVisibilityConfig> = {
  "retailer": {
    basic: ["name", "title", "emailId", "mobileNumber", "dob", "aadhaarNumber", "panNumber", "shopNumber", "businessNumber"],
    address: ["address", "city", "state", "zipCode"],
    outletAddress: ["outletName", "address", "city", "state", "zipCode"],
    kyc: ["aadhaarNumber", "panNumber"],
    bank: ["bankName", "bankAccountNumber", "bankHolderName", "ifscCode"],
    other: ["longitude", "latitude"],
  },
  "distributor": {
    basic: ["name", "title", "emailId", "mobileNumber", "dob", "aadhaarNumber", "panNumber", "shopNumber", "businessNumber"],
    address: ["address", "city", "state", "zipCode"],
    outletAddress: ["outletName", "address", "city", "state", "zipCode"],
    kyc: ["aadhaarNumber", "panNumber"],
    bank: ["bankName", "bankAccountNumber", "bankHolderName", "ifscCode"],
    other: [],
  },
  "partner": {
    basic: ["name", "title", "emailId", "mobileNumber", "dob", "aadhaarNumber", "panNumber", "shopNumber", "businessNumber"],
    address: ["address", "city", "state", "zipCode"],
    outletAddress: ["outletName", "address", "city", "state", "zipCode"],
    kyc: ["aadhaarNumber", "panNumber"],
    bank: ["bankName", "bankAccountNumber", "bankHolderName", "ifscCode"],
    other: [],
  },
  "super-distributor": {
    basic: ["name", "title", "emailId", "mobileNumber", "dob", "aadhaarNumber", "panNumber", "shopNumber", "businessNumber"],
    address: ["address", "city", "state", "zipCode"],
    outletAddress: ["outletName", "address", "city", "state", "zipCode"],
    kyc: ["aadhaarNumber", "panNumber"],
    bank: ["bankName", "bankAccountNumber", "bankHolderName", "ifscCode"],
    other: [],
  },
  "enterprise": {
    basic: ["name", "title", "emailId", "mobileNumber", "dob", "aadhaarNumber", "panNumber"],
    address: ["address", "city", "state", "zipCode"],
    outletAddress: ["companyName", "companyType", "address", "city", "state", "zipCode"],
    kyc: ["aadhaarNumber", "panNumber"],
    bank: ["bankName", "bankAccountNumber", "bankHolderName", "ifscCode"],
    other: ["theme", "domainURL", "businessDesc"],
  },
  "white-label": {
    basic: ["name", "title", "emailId", "mobileNumber", "dob", "aadhaarNumber", "panNumber", "isAdmin"],
    address: ["address", "city", "state", "zipCode"],
    outletAddress: ["companyName", "companyType", "address", "city", "state", "zipCode"],
    kyc: ["aadhaarNumber", "panNumber"],
    bank: ["bankName", "bankAccountNumber", "bankHolderName", "ifscCode"],
    other: ["theme", "domainURL", "businessDesc"],
  },
  "im-admin": {
    basic: ["name", "userName", "emailId", "mobileNumber"],
    address: [],
    outletAddress: [],
    kyc: [],
    bank: [],
    other: [],
  },
};

// ── Validation Schema ────────────────────────────────────────────────────

const flatFieldValidators: Record<string, Yup.AnySchema> = {
  name: textField("Name", 50, true, false, 2),
  title: textField("Title", 50, true),
  emailId: emailValidation,
  mobileNumber: mobileValidation,
  dob: dobValidation,
  aadhaarNumber: aadhaarValidation,
  panNumber: panValidation,
  shopNumber: textField("Shop Number", 50, true),
  businessNumber: textField("Business Number", 50, true),
  isAdmin: Yup.boolean(),
  userName: textField("Username", 50, true),
  longitude: Yup.string()
    .matches(
      /^-?(180(\.0{1,6})?|1?[0-7]?\d(\.\d{1,6})?)$/,
      "Longitude must be between -180 and 180 with up to 6 decimal places"
    )
    .required("Longitude is required"),
  latitude: Yup.string()
    .matches(
      /^-?(90(\.0{1,6})?|[1-8]?\d(\.\d{1,6})?)$/,
      "Latitude must be between -90 and 90 with up to 6 decimal places"
    )
    .required("Latitude is required"),
  domainURL: websiteValidation.required("Login Domain URL is required"),
  businessDesc: textField("Business Description", 500, true, true),
};

const addressValidators: Record<string, Yup.AnySchema> = {
  address: textField("Address", 100, true, true, 15),
  zipCode: zipValidation,
  state: textField("State", 25, true),
  city: textField("City", 100, true),
};

const outletAddressValidators: Record<string, Yup.AnySchema> = {
  outletName: textField("Outlet Name", 50, true, false, 2),
  companyName: textField("Company Name", 100, true),
  companyType: textField("Company Type", 50, true),
  address: textField("Company Address", 100, true, true, 15),
  zipCode: zipValidation,
  state: textField("Outlet State", 25, true),
  city: textField("Outlet City", 100, true),
};

const bankValidators: Record<string, Yup.AnySchema> = {
  bankName: textField("Bank Name", 50, true),
  bankAccountNumber: accountNumberValidation,
  bankHolderName: textField("Bank Holder Name", 100, true),
  ifscCode: ifscValidation,
};

const documentValidators: Record<string, Yup.AnySchema> = {
  aadhaarCardFrontImage: fileValidation("Aadhaar Card Front Image"),
  aadhaarCardBackImage: fileValidation("Aadhaar Card Back Image"),
  shopImage: fileValidation("Shop Image"),
  panCardImage: fileValidation("PAN Card Image"),
  businessProofImage: fileValidation("Business Proof Image"),
};

export const getValidationSchema = (
  userType: UserType | "im-admin"
): Yup.ObjectSchema<any> => {
  const config = FIELD_VISIBILITY_MAP[userType];
  const shape: Record<string, any> = {};

  config.basic.forEach((field) => {
    if (flatFieldValidators[field]) {
      shape[field] = flatFieldValidators[field];
    }
  });

  if (config.address.length > 0) {
    const addressShape: Record<string, any> = {};
    config.address.forEach((field) => {
      if (addressValidators[field]) {
        addressShape[field] = addressValidators[field];
      }
    });
    shape.address = Yup.object().shape(addressShape);
  }

  if (config.outletAddress.length > 0) {
    const outletShape: Record<string, any> = {};
    config.outletAddress.forEach((field) => {
      if (outletAddressValidators[field]) {
        outletShape[field] = outletAddressValidators[field];
      }
    });
    shape.outletAddress = Yup.object().shape(outletShape);
  }

  if (config.bank.length > 0) {
    const bankShape: Record<string, any> = {};
    config.bank.forEach((field) => {
      if (bankValidators[field]) {
        bankShape[field] = bankValidators[field];
      }
    });
    shape.bankDetails = Yup.object().shape(bankShape);
  }

  config.other.forEach((field) => {
    if (flatFieldValidators[field]) {
      shape[field] = flatFieldValidators[field];
    }
  });

  Object.entries(documentValidators).forEach(([field, validator]) => {
    shape[field] = validator;
  });

  return Yup.object().shape(shape);
};

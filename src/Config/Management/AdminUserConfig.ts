import * as Yup from "yup";
import {
  dobValidation,
  emailValidation,
  mobileValidation,
  passwordValidation,
  textField,
  zipValidation,
} from "../../Utils/ValidationUtils";
import { API_ENDPOINTS } from "../Api/EndPoints";
import { buildPermissions, GenericTableHeader, getIpAddress } from "../../Utils/utils";

export const ADMIN_USER_KEY = "admin-user";
export const ADMIN_USER_URL = API_ENDPOINTS.MANAGEMENT.ADMIN_USER;

export interface AdminUserFormType {
  name: string;
  mobileNumber: string;
  username: string;
  password: string;
  emailId: string;
  emailVerified: boolean;
  dob: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  menus: string[];
  subMenus: string[];
}

export interface AdminUserTableType {
  parentAccount: string;
  id: string;
  name: string;
  mobileNumber: string;
  emailId: string;
  dob: string;
  createdOn?: string;
  createdBy?: string;
  lastEditedOn?: string;
  editedBy?: string;
}

export interface AdminUserCreatePayload {
  parentAccount: string;
  name: string;
  mobileNumber: string;
  username: string;
  password: string;
  emailId: string;
  emailVerified: boolean;
  dob: string;
  add: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  permissions: string[];
  createdBy: string;
  createdByIPAddress: string;
}

export interface AdminUserUpdatePayload {
  name: string;
  mobileNumber: string;
  username: string;
  password: string;
  emailId: string;
  emailVerified: boolean;
  dob: string;
  add: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  permissions: string[];
  editedBy: string;
}

export const initialValues: AdminUserFormType = {
  name: "",
  mobileNumber: "",
  username: "",
  password: "",
  emailId: "",
  emailVerified: false,
  dob: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  menus: [],
  subMenus: [],
};

export const validationSchema: Record<keyof AdminUserFormType, Yup.AnySchema> =
  {
    name: textField("Name", 50, true, true),
    mobileNumber: mobileValidation,
    username: textField("Username", 50, true, true),
    password: passwordValidation,
    emailId: emailValidation,
    emailVerified: Yup.boolean(),
    dob: dobValidation,
    address: textField("Address", 150, true, true),
    city: textField("City", 100, true),
    state: textField("State", 100, true),
    zipCode: zipValidation,
    menus: Yup.array()
      .of(Yup.string())
      .min(1, "At least one menu must be selected")
      .required("Menus are required"),
    subMenus: Yup.array().of(Yup.string()),
  };

export const headers: GenericTableHeader<AdminUserTableType>[] = [
  { key: "id", label: "ID", filterType: "text" },
  { key: "parentAccount", label: "Parent Account", filterType: "text" },
  { key: "name", label: "Name", filterType: "text" },
  { key: "emailId", label: "Email", filterType: "text" },
  { key: "mobileNumber", label: "Mobile", filterType: "text" },
  { key: "dob", label: "Date of Birth", filterType: "date" },
  { key: "createdOn", label: "Created On", filterType: "date" },
  { key: "lastEditedOn", label: "Edited On", filterType: "date" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "editedBy", label: "Edited By", filterType: "text" },
];

export const transformFormToCreateAdminUserPayload = async (
  formData: AdminUserFormType
): Promise<AdminUserCreatePayload> => {
  const ip = await getIpAddress();

  return {
    parentAccount:
      JSON.parse(localStorage.getItem("userInfo") || "{}")?.hierarchyId || "",
    name: formData.name,
    mobileNumber: formData.mobileNumber,
    username: formData.username,
    password: formData.password,
    emailId: formData.emailId,
    emailVerified: formData.emailVerified,
    dob: formData.dob,
    add: {
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
    },
    permissions: buildPermissions(formData.menus, formData.subMenus),
    createdBy: localStorage.getItem("username") || "system",
    createdByIPAddress: ip || "",
  };
};

export const transformFormToUpdateAdminUserPayload = (
  formData: AdminUserFormType
): AdminUserUpdatePayload => {
  return {
    name: formData.name,
    mobileNumber: formData.mobileNumber,
    username: formData.username,
    password: formData.password,
    emailId: formData.emailId,
    emailVerified: formData.emailVerified,
    dob: formData.dob,
    add: {
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
    },
    permissions: buildPermissions(formData.menus, formData.subMenus),
    editedBy: localStorage.getItem("username") || "system",
  };
};

export const transformResponseToFormData = (
  raw: Record<string, any>
): Omit<AdminUserFormType, "menus" | "subMenus"> => {
  return {
    name: raw.name || "",
    mobileNumber: raw.mobileNumber || "",
    username: raw.username || "",
    password: raw.password || "",
    emailId: raw.emailId || "",
    emailVerified: raw.emailVerified ?? false,
    dob: raw.dob || "",
    address: raw.add?.address || "",
    city: raw.add?.city || "",
    state: raw.add?.state || "",
    zipCode: raw.add?.zipCode || "",
  };
};

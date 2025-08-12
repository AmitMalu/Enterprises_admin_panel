import * as Yup from "yup";
import {
  emailValidation,
  mobileValidation,
  textField,
} from "../../Utils/ValidationUtils";
import { API_ENDPOINTS } from "../Api/EndPoints";
import { buildPermissions, GenericTableHeader } from "../../Utils/utils";

export const KEY = "user-config";
export const URL = API_ENDPOINTS.MANAGEMENT.USER_CONFIGURATION;

export interface UserConfigFormType {
  userRole: string;
  fullName: string;
  email: string;
  mobile: string;
  state: string;
  menus: string[];
  subMenus: string[];
}

export interface UserConfigTableType {
  id: string;
  userRole: string;
  fullName: string;
  email: string;
  mobile: string;
  state: string;
}

export interface UserConfigurationCreatePayload {
  userRole: string;
  fullName: string;
  email: string;
  mobile: string;
  state: string;
  permissions: string[];
  parentAccount: string;
  createdBy: string;
}

export interface UserConfigurationUpdatePayload {
  userRole: string;
  fullName: string;
  email: string;
  mobile: string;
  state: string;
  permissions: string[];
  parentAccount: string;
  editedBy: string;
}

export const initialValues: UserConfigFormType = {
  userRole: "",
  fullName: "",
  email: "",
  mobile: "",
  state: "",
  menus: [],
  subMenus: [],
};

export const validationSchema: Record<keyof UserConfigFormType, Yup.AnySchema> =
  {
    userRole: textField("User Role", 150, true, true),
    fullName: textField("Full Name", 150, true, true),
    email: emailValidation,
    mobile: mobileValidation,
    state: textField("State", 150, true, true),
    menus: Yup.array()
      .of(Yup.string())
      .min(1, "At least one menu must be selected")
      .required("Menus are required"),
    subMenus: Yup.array()
      .of(Yup.string())
      .min(1, "At least one submenu must be selected")
      .required("Submenus are required"),
  };

export const headers: GenericTableHeader<UserConfigTableType>[] = [
  { key: "id", label: "ID", filterType: "text" },
  { key: "userRole", label: "User Role", filterType: "text" },
  { key: "fullName", label: "Full Name", filterType: "text" },
  { key: "email", label: "Email", filterType: "text" },
  { key: "mobile", label: "Mobile", filterType: "text" },
  { key: "state", label: "State", filterType: "date" },
];

export const transformFormToCreateUserConfigPayload = (
  formData: UserConfigFormType
): UserConfigurationCreatePayload => ({
  userRole: formData.userRole,
  fullName: formData.fullName,
  email: formData.email,
  mobile: formData.mobile,
  state: formData.state,
  permissions: buildPermissions(formData.menus, formData.subMenus),
  parentAccount:
    JSON.parse(localStorage.getItem("userInfo") || "{}")?.hierarchyId || "",
  createdBy: localStorage.getItem("username") || "system",
});

// Transform form data to Update payload
export const transformFormToUpdateUserConfigPayload = (
  formData: UserConfigFormType
): UserConfigurationUpdatePayload => ({
  userRole: formData.userRole,
  fullName: formData.fullName,
  email: formData.email,
  mobile: formData.mobile,
  state: formData.state,
  permissions: buildPermissions(formData.menus, formData.subMenus),
  parentAccount:
    JSON.parse(localStorage.getItem("userInfo") || "{}")?.hierarchyId || "",
  editedBy: localStorage.getItem("username") || "system",
});

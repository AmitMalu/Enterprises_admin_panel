import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";
import { GenericTableHeader } from "../../Utils/utils";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const SMS_CREDENTIALS_KEY = "smsCredentials";
export const SMS_CREDENTIALS_URL = API_ENDPOINTS.NOTIFICATIONS.SMS_CREDENTIALS;
export const SMS_TYPE_URL = API_ENDPOINTS.NOTIFICATIONS.SMS_TYPE;

export interface SmsCredentialsFormType {
  whitelabelId: string;
  username: string;
  password: string;
  senderId: string;
  peId: string;
  dltTemplateId: string;
  route: string;
  type: string;
}

export interface SmsCredentialsTableType {
  id: string;
  whitelabelId: string;
  username: string;
  password: string;
  senderId: string;
  peId: string;
  dltTemplateId: string;
  route: string;
  type: string;
  createdOn?: string;
  createdBy?: string;
  editedOn?: string;
  editedBy?: string;
}

export interface SmsCredentialsCreatePayload extends SmsCredentialsFormType {
  createdBy: string;
}

export interface SmsCredentialsUpdatePayload extends SmsCredentialsFormType {
  editedBy: string;
}

export const initialValues: SmsCredentialsFormType = {
  whitelabelId: "",
  username: "",
  password: "",
  senderId: "",
  peId: "",
  dltTemplateId: "",
  route: "",
  type: "",
};

export const validationSchema: Record<keyof SmsCredentialsFormType, Yup.AnySchema> = {
  whitelabelId: Yup.string().required("White Label is required"),
  username: textField("Username", 255, true, true),
  password: textField("Password", 255, true, true),
  senderId: textField("Sender ID", 255, true, true),
  peId: textField("PE ID", 255, true, true),
  dltTemplateId: textField("DLT Template ID", 255, true, true),
  route: textField("Route", 255, true, true),
  type: Yup.string().required("Type is required"),
};

export const headers: GenericTableHeader<SmsCredentialsTableType>[] = [
  { key: "id", label: "Id", filterType: "number" },
  { key: "whitelabelId", label: "White Label", filterType: "text" },
  { key: "username", label: "Username", filterType: "text" },
  { key: "senderId", label: "Sender ID", filterType: "text" },
  { key: "peId", label: "PE ID", filterType: "text" },
  { key: "dltTemplateId", label: "DLT Template ID", filterType: "text" },
  { key: "route", label: "Route", filterType: "text" },
  { key: "type", label: "Type", filterType: "text" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "createdOn", label: "Created On", filterType: "date" },
  { key: "editedBy", label: "Edited By", filterType: "text" },
  { key: "editedOn", label: "Edited On", filterType: "date" },
];

export const transformFormToCreateSmsCredentialsPayload = (
  formData: SmsCredentialsFormType
): SmsCredentialsCreatePayload => {
  return {
    whitelabelId: formData.whitelabelId,
    username: formData.username,
    password: formData.password,
    senderId: formData.senderId,
    peId: formData.peId,
    dltTemplateId: formData.dltTemplateId,
    route: formData.route,
    type: formData.type,
    createdBy: localStorage.getItem("username") || "system",
  };
};

export const transformFormToUpdateSmsCredentialsPayload = (
  formData: SmsCredentialsFormType
): SmsCredentialsUpdatePayload => {
  return {
    whitelabelId: formData.whitelabelId,
    username: formData.username,
    password: formData.password,
    senderId: formData.senderId,
    peId: formData.peId,
    dltTemplateId: formData.dltTemplateId,
    route: formData.route,
    type: formData.type,
    editedBy: localStorage.getItem("username") || "system",
  };
};

export const transformSmsCredentialsToFormData = (
  data: SmsCredentialsTableType
): SmsCredentialsFormType => {
  return {
    whitelabelId: data.whitelabelId || "",
    username: data.username || "",
    password: data.password || "",
    senderId: data.senderId || "",
    peId: data.peId || "",
    dltTemplateId: data.dltTemplateId || "",
    route: data.route || "",
    type: data.type || "",
  };
};

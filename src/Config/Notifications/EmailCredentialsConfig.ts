import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";
import { GenericTableHeader } from "../../Utils/utils";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const EMAIL_CREDENTIALS_KEY = "emailCredentials";
export const EMAIL_CREDENTIALS_URL = API_ENDPOINTS.NOTIFICATIONS.EMAIL_CREDENTIALS;
export const EMAIL_CREDENTIALS_CREATE_URL = API_ENDPOINTS.NOTIFICATIONS.EMAIL_CREDENTIALS;

export interface EmailCredentialsFormType {
  whitelabelId: string;
  smtpHost: string;
  smtpPort: string;
  email: string;
  password: string;
}

export interface EmailCredentialsTableType {
  id: string;
  whitelabelId: string;
  smtpHost: string;
  smtpPort: string;
  email: string;
  password: string;
  createdOn?: string;
  createdBy?: string;
  editedOn?: string;
  editedBy?: string;
}


export interface EmailCredentialsCreatePayload extends EmailCredentialsFormType {
  createdBy: string;
}
export interface EmailCredentialsUpdatePayload extends EmailCredentialsFormType {
  editedBy: string;
}

export const initialValues: EmailCredentialsFormType = {
  whitelabelId: "",
  smtpHost: "",
  smtpPort: "",
  email: "",
  password: "",
};

export const validationSchema: Record<keyof EmailCredentialsFormType, Yup.AnySchema> = {
  whitelabelId: Yup.string().required("White Label is required"),
  smtpHost: textField("Host", 255, true, true),
  smtpPort: Yup.string()
    .required("Port is required")
    .matches(/^\d+$/, "Port must be a number")
    .test("range", "Port must be between 1 and 65535", (value) => {
      const port = parseInt(value);
      return !isNaN(port) && port >= 1 && port <= 65535;
    }),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: textField("Password", 255, true, true),
};

export const headers: GenericTableHeader<EmailCredentialsTableType>[] = [
  { key: "id", label: "Id", filterType: "number" },
  { key: "whitelabelId", label: "White Label", filterType: "text" },
  { key: "smtpHost", label: "Host", filterType: "text" },
  { key: "smtpPort", label: "Port", filterType: "text" },
  { key: "email", label: "Email", filterType: "text" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "createdOn", label: "Created On", filterType: "date" },
  { key: "editedBy", label: "Edited By", filterType: "text" },
  { key: "editedOn", label: "Edited On", filterType: "date" },
];

export const transformFormToCreateEmailCredentialsPayload = (
  formData: EmailCredentialsFormType
): EmailCredentialsCreatePayload => {
  return {
    whitelabelId: formData.whitelabelId,
    smtpHost: formData.smtpHost,
    smtpPort: formData.smtpPort,
    email: formData.email,
    password: formData.password,
    createdBy: localStorage.getItem("username") || "system",
  };
};

export const transformFormToUpdateEmailCredentialsPayload = (
  formData: EmailCredentialsFormType
): EmailCredentialsUpdatePayload => {
  return {
    whitelabelId: formData.whitelabelId,
    smtpHost: formData.smtpHost,
    smtpPort: formData.smtpPort,
    email: formData.email,
    password: formData.password,
    editedBy: localStorage.getItem("username") || "system",
  };
};

export const transformEmailCredentialsToFormData = (
  data: EmailCredentialsTableType
): EmailCredentialsFormType => {
  return {
    whitelabelId: data.whitelabelId || "",
    smtpHost: data.smtpHost || "",
    smtpPort: data.smtpPort || "",
    email: data.email || "",
    password: data.password || "",
  };
};

// export const mapToEmailCredentialsTableType = (
//   raw: Record<string, any>,
// ): EmailCredentialsTableType => {
//   return {
//     id: raw?.id ?? "",
//     whitelabelId: raw.whitelabelId ?? "",
//     smtpHost: raw.smtpHost ?? "",
//     smtpPort: raw.smtpPort ?? "",
//     email: raw.email ?? "",
//     password: raw.password ?? "",
//     createdOn: formatDateTime(raw.createdOn) ?? "",
//     createdBy: raw.createdBy ?? "",
//     editedOn: formatDateTime(raw.editedOn) ?? "",
//     editedBy: raw.editedBy ?? "",
//   };
// };
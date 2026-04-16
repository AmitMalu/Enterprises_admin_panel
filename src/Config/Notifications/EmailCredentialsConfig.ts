import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";
import { GenericTableHeader } from "../../Utils/utils";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const EMAIL_CREDENTIALS_KEY = "emailCredentials";
export const EMAIL_CREDENTIALS_URL = API_ENDPOINTS.NOTIFICATIONS.EMAIL_CREDENTIALS;
export const EMAIL_CREDENTIALS_CREATE_URL = API_ENDPOINTS.NOTIFICATIONS.EMAIL_CREDENTIALS;

export interface EmailCredentialsFormType {
  smtpHost: string;
  smtpPort: string;
  email: string;
  password: string;
}

export interface EmailCredentialsTableType {
  id: string;
  smtpHost: string;
  smtpPort: string;
  email: string;
  password: string;
  createdAt?: string;
}

export interface EmailCredentialsCreatePayload {
  smtpHost: string;
  smtpPort: string;
  email: string;
  password: string;
}

export const initialValues: EmailCredentialsFormType = {
  smtpHost: "",
  smtpPort: "",
  email: "",
  password: "",
};

export const validationSchema: Record<keyof EmailCredentialsFormType, Yup.AnySchema> = {
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
  { key: "smtpHost", label: "Host", filterType: "text" },
  { key: "smtpPort", label: "Port", filterType: "text" },
  { key: "email", label: "Email", filterType: "text" },
  { key: "createdAt", label: "Created At", filterType: "date" },
];

export const transformFormToCreateEmailCredentialsPayload = (
  formData: EmailCredentialsFormType
): EmailCredentialsCreatePayload => {
  return {
    smtpHost: formData.smtpHost,
    smtpPort: formData.smtpPort,
    email: formData.email,
    password: formData.password,
  };
};

export const transformEmailCredentialsToFormData = (
  data: EmailCredentialsTableType
): EmailCredentialsFormType => {
  return {
    smtpHost: data.smtpHost || "",
    smtpPort: data.smtpPort || "",
    email: data.email || "",
    password: data.password || "",
  };
};

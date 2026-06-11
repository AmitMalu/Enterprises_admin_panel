import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";
import { GenericTableHeader } from "../../Utils/utils";
import { API_ENDPOINTS } from "../Api/EndPoints";
import moment from "moment";

export const NOTIFICATIONS_KEY = "notifications";
export const NOTIFICATIONS_URL = API_ENDPOINTS.NOTIFICATIONS.LIST;
export const NOTIFICATION_DROPDOWNS_URL = API_ENDPOINTS.NOTIFICATIONS.DROPDOWNS;
export const NOTIFICATION_CREATE_URL = API_ENDPOINTS.NOTIFICATIONS.CREATE;

export interface NotificationFormType {
  alertType: string;
  product: string;
  title: string;
  body: string;
  deliveryChannel: string;
  audienceType: string;
  severity: string;
  sendMode: string;
  scheduleTime: Date | null; // 
}

export interface NotificationTableType {
  id: string;
  alertType: string;
  product: string;
  title: string;
  body: string;
  deliveryChannel: string;
  audienceType: string;
  severity: string;
  sendMode: string;
  scheduleTime?: string;
  createdAt?: string;
}

export interface NotificationCreatePayload {
  alertType: string;
  product: string;
  title: string;
  body: string;
  deliveryChannel: string;
  audienceType: string;
  severity: string;
  sendMode: string;
  scheduleTime?: string;
}

export interface NotificationDropdowns {
  alertTypes: string[];
  products: string[];
  audienceTypes: string[];
}

export const initialValues: NotificationFormType = {
  alertType: "",
  product: "",
  title: "",
  body: "",
  deliveryChannel: "",
  audienceType: "",
  severity: "",
  sendMode: "",
  scheduleTime: null,
};



export const validationSchema: Record<keyof NotificationFormType, Yup.AnySchema> = {
  alertType: Yup.string().required("Alert Type is required"),
  product: Yup.string().required("Product is required"),
  title: textField("Title", 200, true, true),
  body: textField("Body", 1000, true, true),
  deliveryChannel: Yup.string().required("Delivery Channel is required"),
  audienceType: Yup.string().required("Audience Type is required"),
  severity: Yup.string().required("Severity is required"),
  sendMode: Yup.string().required("Send Mode is required"),
  scheduleTime: Yup.date()
    .nullable()
    .when("sendMode", {
      is: "SCHEDULE",
      then: (schema) =>
        schema
          .required("Schedule Time is required")
          .min(new Date(), "Cannot select past time"), // extra safety
      otherwise: (schema) => schema.nullable().notRequired(),
    }),
};

export const headers: GenericTableHeader<NotificationTableType>[] = [
  { key: "id", label: "Id", filterType: "number" },
  { key: "alertType", label: "Alert Type", filterType: "text" },
  { key: "product", label: "Product", filterType: "text" },
  { key: "title", label: "Title", filterType: "text" },
  { key: "deliveryChannel", label: "Delivery Channel", filterType: "text" },
  { key: "audienceType", label: "Audience Type", filterType: "text" },
  { key: "severity", label: "Severity", filterType: "text" },
  { key: "sendMode", label: "Send Mode", filterType: "text" },
  { key: "scheduleTime", label: "Schedule Time", filterType: "date" },
  { key: "createdAt", label: "Created At", filterType: "date" },
];

export const transformFormToCreateNotificationPayload = (
  formData: NotificationFormType
): NotificationCreatePayload => {
  return {
    alertType: formData.alertType,
    product: formData.product,
    title: formData.title,
    body: formData.body,
    deliveryChannel: formData.deliveryChannel,
    audienceType: formData.audienceType,
    severity: formData.severity,
    sendMode: formData.sendMode,
    scheduleTime:
      formData.sendMode === "SCHEDULE"
        ? formData.scheduleTime
          ? moment(formData.scheduleTime).format("YYYY-MM-DDTHH:mm:ss")
          : ""
        : "",
  };
};

export const deliveryChannelOptions = [
  { value: "WEB", label: "Web" },
  { value: "APP", label: "App" },
  { value: "BOTH", label: "Both" },
];

export const severityOptions = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "CRITICAL", label: "Critical" },
];

export const sendModeOptions = [
  { value: "INSTANT", label: "Instant" },
  { value: "SCHEDULE", label: "Schedule" },
];

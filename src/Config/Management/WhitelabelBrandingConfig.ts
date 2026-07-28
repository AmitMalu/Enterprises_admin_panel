import * as Yup from "yup";
import { fileValidation } from "../../Utils/ValidationUtils";
import { GenericTableHeader, isFile } from "../../Utils/utils";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const TENANT_KEY = "tenant";
export const TENANT_URL = API_ENDPOINTS.MANAGEMENT.TENANT;

export interface WhitelabelBrandingFormType {
  whiteLabelId: string;
  domainName: string;
  tenantCode: string;
  portalTitle: string;
  welcomeText: string;
  companyName: string;
  primaryColor: string;
  secondaryColor: string;
  isActive?: number | string;
  logo?: string | File | null;
  faviconFile?: string | File | null;
  background?: string | File | null;
  loginArtwork?: string | File | null;
  terms?: string | File | null;
  privacy?: string | File | null;
  refund?: string | File | null;
}

export interface WhitelabelBrandingTableType {
  whiteLabelId: string;
  domainName: string;
  tenantCode: string;
  portalTitle: string;
  welcomeText: string;
  companyName: string;
  primaryColor: string;
  secondaryColor: string;
  isActive?: number | string;
  // createdOn?: string;
  // createdBy?: string;
  // editedOn?: string;
  // editedBy?: string;
}

export const initialValues: WhitelabelBrandingFormType = {
  whiteLabelId: "",
  domainName: "",
  tenantCode: "",
  portalTitle: "",
  welcomeText: "",
  companyName: "",
  primaryColor: "",
  secondaryColor: "",
  isActive: 1,
  logo: null,
  faviconFile: null,
  background: null,
  loginArtwork: null,
  terms: null,
  privacy: null,
  refund: null,
};

export const validationSchema: Record<
  keyof WhitelabelBrandingFormType,
  Yup.AnySchema
> = {
  whiteLabelId: Yup.string().required("White Label is required"),
  domainName: Yup.string()
    .required("Domain Name is required")
    .matches(
      /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+\.(com|in|co\.in)$/,
      "Enter a valid domain (e.g. portal.abc.com, portal.abc.in, portal.abc.co.in)"
    ),
  tenantCode: Yup.string()
    .required("Tenant Code is required")
    .min(3, "Minimum 3 characters")
    .max(10, "Maximum 10 characters")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "No spaces or special characters allowed"
    ),
  portalTitle: Yup.string()
    .max(15, "Maximum 15 characters")
    .matches(
      /^[a-zA-Z\s]*$/,
      "Only letters and spaces allowed, no numbers or special characters"
    ),
  welcomeText: Yup.string()
    .max(60, "Maximum 60 characters"),
  companyName: Yup.string()
    .min(2, "Minimum 2 characters")
    .max(20, "Maximum 20 characters")
    .matches(
      /^[a-zA-Z\s]*$/,
      "Only letters and spaces allowed, no special characters"
    ),
  primaryColor: Yup.string()
    .test("hexColor", "Enter a valid hex color (e.g. #FF0000)", (value) => {
      if (!value) return true;
      return /^#([0-9A-Fa-f]{3}){1,2}$/.test(value);
    }),
  secondaryColor: Yup.string()
    .test("hexColor", "Enter a valid hex color (e.g. #FFFFFF)", (value) => {
      if (!value) return true;
      return /^#([0-9A-Fa-f]{3}){1,2}$/.test(value);
    }),
  isActive: Yup.string().default("1"),
  logo: fileValidation(
    "Logo",
    ["image/png", "image/jpeg", "image/jpg"],
    5,
    false
  ),
  faviconFile: fileValidation(
    "Favicon",
    ["image/x-icon", "image/png", "image/jpeg", "image/jpg"],
    2,
    false
  ),
  background: fileValidation(
    "Background",
    ["image/png", "image/jpeg", "image/jpg"],
    5,
    false
  ),
  loginArtwork: fileValidation(
    "Login Artwork",
    ["image/png", "image/jpeg", "image/jpg"],
    5,
    false
  ),
  terms: fileValidation(
    "Terms & Conditions",
    ["application/pdf"],
    5,
    false
  ),
  privacy: fileValidation(
    "Privacy Policy",
    ["application/pdf"],
    5,
    false
  ),
  refund: fileValidation(
    "Refund Policy",
    ["application/pdf"],
    5,
    false
  ),
};

export const headers: GenericTableHeader<WhitelabelBrandingTableType>[] = [
  { key: "whiteLabelId", label: "White Label", filterType: "text" },
  { key: "domainName", label: "Domain Name", filterType: "text" },
  { key: "tenantCode", label: "Tenant Code", filterType: "text" },
  { key: "portalTitle", label: "Portal Title", filterType: "text" },
  { key: "companyName", label: "Company Name", filterType: "text" },
  // { key: "createdBy", label: "Created By", filterType: "text" },
  // { key: "createdOn", label: "Created On", filterType: "date" },
  // { key: "editedBy", label: "Edited By", filterType: "text" },
  // { key: "editedOn", label: "Edited On", filterType: "date" },
];

export const transformToFormData = (
  formData: WhitelabelBrandingFormType,
  mode: "add" | "edit"
): Record<string, any> => {
  const payload: Record<string, any> = {
    whiteLabelId: formData.whiteLabelId,
    domainName: formData.domainName,
    tenantCode: formData.tenantCode,
    [mode === "edit" ? "editedBy" : "createdBy"]:
      localStorage.getItem("username") || "system",
  };

  if (formData.portalTitle) payload.portalTitle = formData.portalTitle;
  if (formData.welcomeText) payload.welcomeText = formData.welcomeText;
  if (formData.companyName) payload.companyName = formData.companyName;
  if (formData.primaryColor) payload.primaryColor = formData.primaryColor;
  if (formData.secondaryColor) payload.secondaryColor = formData.secondaryColor;
  // if (formData.isActive !== undefined && formData.isActive !== null) {
  payload.isActive = 1;
  // }

  if (isFile(formData.logo)) payload.logo = formData.logo;
  if (isFile(formData.faviconFile)) payload.faviconFile = formData.faviconFile;
  if (isFile(formData.background)) payload.background = formData.background;
  if (isFile(formData.loginArtwork)) payload.loginArtwork = formData.loginArtwork;
  if (isFile(formData.terms)) payload.terms = formData.terms;
  if (isFile(formData.privacy)) payload.privacy = formData.privacy;
  if (isFile(formData.refund)) payload.refund = formData.refund;

  return payload;
};

export const transformFormToCreatePayload = (
  formData: WhitelabelBrandingFormType
): Record<string, any> => transformToFormData(formData, "add");

export const transformFormToUpdatePayload = (
  formData: WhitelabelBrandingFormType
): Record<string, any> => transformToFormData(formData, "edit");

export const transformToFormDataInit = (
  data: Record<string, any>
): WhitelabelBrandingFormType => {
  const domain = data.domainName ?? "";
  const tenantCode = data.tenantCode ?? "";
  const baseUrl = domain ? `https://${domain}/wl-assets/${tenantCode}/` : "";

  const buildUrl = (val: any): string | null => {
    if (!val || typeof val !== "string") return null;
    if (val.startsWith("http")) return val;
    return baseUrl ? `${baseUrl}${val}` : val;
  };

  return {
    whiteLabelId: data.whiteLabelId ?? "",
    domainName: domain,
    tenantCode: tenantCode,
    portalTitle: data.portalTitle ?? "",
    welcomeText: data.welcomeText ?? "",
    companyName: data.companyName ?? "",
    primaryColor: data.primaryColor ?? "",
    secondaryColor: data.secondaryColor ?? "",
    // isActive: data.isActive !== undefined && data.isActive !== null ? String(data.isActive) : "1",
    logo: buildUrl(data.logoPath),
    faviconFile: buildUrl(data.favicon),
    background: buildUrl(data.backgroundPath),
    loginArtwork: buildUrl(data.loginArtwork),
    terms: buildUrl(data.termsPath),
    privacy: buildUrl(data.privacyPath),
    refund: buildUrl(data.refundPath),
  };
};

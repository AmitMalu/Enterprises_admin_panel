import { API_ENDPOINTS } from "../Api/EndPoints";
import { GenericTableHeader } from "../../Utils/utils";

export const KYC_APPROVED_KEY = "approve-kyc";
export const KYC_APPROVED_URL = API_ENDPOINTS.MANAGEMENT.KYC;

export interface KycApprovedTableType {
  hierarchyId: string;
  name: string;
  mobileNumber: string;
  emailId: string;
  emailVerified: boolean;
  aadhaarCardFrontImage?: string;
  aadhaarCardBackImage?: string;
  isAadhaarVerified?: boolean;
  aadhaarNumber?: string;
  panCardImage?: string;
  panNumber?: string;
  panVerified?: boolean;
  aadhaarPanVerified?: boolean;
  shopImage?: string;
  shopNumber?: string;
  businessProofImage?: string;
  businessNumber?: string;
  gstNumberVerified?: boolean;
}

export const KycApprovedHeaders: GenericTableHeader<KycApprovedTableType>[] = [
  {
    key: "hierarchyId",
    label: "Hierarchy ID",
    filterType: "text",
    copyable: true,
  },
  { key: "name", label: "Name", filterType: "text" },
  { key: "mobileNumber", label: "Mobile Number", filterType: "text" },
  { key: "emailId", label: "Email", filterType: "text" },
  { key: "emailVerified", label: "Email Verified", filterType: "boolean" },
  { key: "aadhaarNumber", label: "Aadhaar Number", filterType: "text" },
  {
    key: "aadhaarCardFrontImage",
    label: "Aadhaar Front",
    filterType: "text",
    renderType: "link",
  },
  {
    key: "aadhaarCardBackImage",
    label: "Aadhaar Back",
    filterType: "text",
    renderType: "link",
  },
  {
    key: "isAadhaarVerified",
    label: "Aadhaar Verified",
    filterType: "boolean",
  },
  {
    key: "panCardImage",
    label: "PAN Card Image",
    filterType: "text",
    renderType: "link",
  },
  { key: "panNumber", label: "PAN Number", filterType: "text" },
  { key: "panVerified", label: "PAN Verified", filterType: "boolean" },
  {
    key: "aadhaarPanVerified",
    label: "Aadhaar-PAN Verified",
    filterType: "boolean",
  },
  {
    key: "shopImage",
    label: "Shop Image",
    filterType: "text",
    renderType: "link",
  },
  { key: "shopNumber", label: "Shop Number", filterType: "text" },
  {
    key: "businessProofImage",
    label: "Business Proof",
    filterType: "text",
    renderType: "link",
  },
  { key: "businessNumber", label: "Business Number", filterType: "text" },
  { key: "gstNumberVerified", label: "GST Verified", filterType: "boolean" },
];

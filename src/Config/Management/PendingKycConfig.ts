import { API_ENDPOINTS } from "../Api/EndPoints";
import * as Yup from "yup";
import { GenericTableHeader } from "../../Utils/utils";
import { fileValidation, textField } from "../../Utils/ValidationUtils";

export const PENDING_KYC_URL = API_ENDPOINTS.MANAGEMENT.KYC;
export const PENDING_KYC_KEY = "pending-kyc";
export const KYC_VIEW_KEY = "view-kyc";

interface PendingKycFormType {
  searchKeyword: string;
  hierarchyType: string;
}

export interface KycDetailsFormType {
  doc_name: string;
  doc_number: string;
  doc_image: null | string;
}
export interface PendingKycTableType {
  hierarchyId: string | number;
  name: string;
  mobileNumber: string | number;
  emailId: string;
}

export interface KycDetailsTableType {
  docName: string;
  docStatus: boolean;
  docNumber: string;
  docImage: string;
}

export const pendingKycInitialValues: PendingKycFormType = {
  searchKeyword: "",
  hierarchyType: "",
};

export const kycDetailsInitialValues: KycDetailsFormType = {
  doc_name: "",
  doc_number: "",
  doc_image: null,
};

// Yup schema
export const pendingKycSchema: Record<keyof PendingKycFormType, Yup.AnySchema> =
  {
    searchKeyword: textField("value", 50, false, true),
    hierarchyType: textField("Hierarchy Type", 50, false, true),
  };

export const kycDetailsSchema: Record<keyof KycDetailsFormType, Yup.AnySchema> =
  {
    doc_name: textField("Document Name", 50, true, true),
    doc_number: textField("Document Number", 50, true, true),
    doc_image: fileValidation(
      "Document Image",
      ["image/jpeg", "image/png"],
      1.5,
      false
    ),
  };

export const pendingKycHeaders: GenericTableHeader<PendingKycTableType>[] = [
  {
    key: "hierarchyId",
    label: "Hierarchy ID",
    filterType: "text",
    copyable: true,
  },
  {
    key: "name",
    label: "Name",
    filterType: "text",
  },
  {
    key: "mobileNumber",
    label: "Mobile Number",
    filterType: "text",
  },
  {
    key: "emailId",
    label: "Email",
    filterType: "text",
  },
];

export const kycDetailsHeaders: GenericTableHeader<KycDetailsTableType>[] = [
  {
    key: "docName",
    label: "Document Name",
    filterType: "text",
  },
  {
    key: "docNumber",
    label: "Document Number",
    filterType: "text",
  },
  {
    key: "docStatus",
    label: "is Verified",
    filterType: "boolean",
  },
  {
    key: "docImage",
    label: "Document Image",
    renderType: "link",
    filterType: "text",
  },
];

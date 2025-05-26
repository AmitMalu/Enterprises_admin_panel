import * as retailerForm from "../../Features/Management/Retailer";
import * as distributorForm from "../../Features/Management/Distributor";
import * as partnerForm from "../../Features/Management/Partner";
import * as superDistributorForm from "../../Features/Management/SuperDistributor";
import * as whiteLabelForm from "../../Features/Management/WhiteLabel";
import * as enterpriseForm from "../../Features/Management/Enterprise";
import * as imAdminForm from "../../Features/Management/IMAdmin";

import { FormikProps } from "formik";
import { FieldNames } from "./MasterFormConfig";

export type UserType =
  | "im-admin"
  | "distributor"
  | "white-label"
  | "partner"
  | "super-distributor"
  | "retailer"
  | "enterprise";

export const UserConfig: Record<
  UserType,
  {
    steps: string[];
    stepFieldMap: FieldNames[][];
    renderStepForm: (
      step: number,
      formik: FormikProps<any>
    ) => JSX.Element | null;
  }
> = {
  "im-admin": {
    steps: [
      "Personal Details",
      "Residentials Address",
      "Outlet Details",
      "Bank Details",
      "Upload Documents",
    ],
    stepFieldMap: [
      [
        "parentAccount",
        "parentTitle",
        "prefix",
        "name",
        "dob",
        "mobileNumber",
        "emailId",
      ], // Step 0
      ["address", "city", "state", "zipcode"], // Step 1
      ["outletName", "outletCity", "outletState", "outletZipcode"], // Step 2
      ["bankName", "accountNumber", "ifsc", "branchName"], // Step 3
      [
        "adhaarFront",
        "adhaarBack",
        "pancardPhoto",
        "shopPhoto",
        "businessProof",
      ], // Step 4
    ],
    renderStepForm: (step, formik) => {
      switch (step) {
        case 0:
          return <imAdminForm.PersonalDetails formik={formik} />;
        case 1:
          return <imAdminForm.ResidentialAddress formik={formik} />;
        case 2:
          return <imAdminForm.OutletDetails formik={formik} />;
        case 3:
          return <imAdminForm.BankDetails formik={formik} />;
        case 4:
          return <imAdminForm.UploadDocuments formik={formik} />;
        default:
          return null;
      }
    },
  },
  distributor: {
    steps: [
      "Personal Details",
      "Residentials Address",
      "Outlet Details",
      "Bank Details",
      "Upload Documents",
    ],
    stepFieldMap: [
      [
        "parentAccount",
        "parentTitle",
        "prefix",
        "name",
        "dob",
        "mobileNumber",
        "emailId",
      ], // Step 0
      ["address", "city", "state", "zipcode"], // Step 1
      ["outletName", "outletCity", "outletState", "outletZipcode"], // Step 2
      ["bankName", "accountNumber", "ifsc", "branchName"], // Step 3
      [
        "adhaarFront",
        "adhaarBack",
        "pancardPhoto",
        "shopPhoto",
        "businessProof",
      ], // Step 4
    ],
    renderStepForm: (step, formik) => {
      switch (step) {
        case 0:
          return <distributorForm.PersonalDetails formik={formik} />;
        case 1:
          return <distributorForm.ResidentialAddress formik={formik} />;
        case 2:
          return <distributorForm.OutletDetails formik={formik} />;
        case 3:
          return <distributorForm.BankDetails formik={formik} />;
        case 4:
          return <distributorForm.UploadDocuments formik={formik} />;
        default:
          return null;
      }
    },
  },
  "white-label": {
    steps: [
      "Personal Details",
      "Residentials Address",
      "Outlet Details",
      "Bank Details",
      "Upload Documents",
    ],
    stepFieldMap: [
      [
        "parentAccount",
        "parentTitle",
        "prefix",
        "name",
        "dob",
        "mobileNumber",
        "emailId",
      ], // Step 0
      ["address", "city", "state", "zipcode"], // Step 1
      ["outletName", "outletCity", "outletState", "outletZipcode"], // Step 2
      ["bankName", "accountNumber", "ifsc", "branchName"], // Step 3
      [
        "adhaarFront",
        "adhaarBack",
        "pancardPhoto",
        "shopPhoto",
        "businessProof",
      ], // Step 4
    ],
    renderStepForm: (step, formik) => {
      switch (step) {
        case 0:
          return <whiteLabelForm.PersonalDetails formik={formik} />;
        case 1:
          return <whiteLabelForm.ResidentialAddress formik={formik} />;
        case 2:
          return <whiteLabelForm.OutletDetails formik={formik} />;
        case 3:
          return <whiteLabelForm.BankDetails formik={formik} />;
        case 4:
          return <whiteLabelForm.UploadDocuments formik={formik} />;
        default:
          return null;
      }
    },
  },
  partner: {
    steps: [
      "Personal Details",
      "Residentials Address",
      "Outlet Details",
      "Bank Details",
      "Upload Documents",
    ],
    stepFieldMap: [
      [
        "parentAccount",
        "parentTitle",
        "prefix",
        "name",
        "dob",
        "mobileNumber",
        "emailId",
      ], // Step 0
      ["address", "city", "state", "zipcode"], // Step 1
      ["outletName", "outletCity", "outletState", "outletZipcode"], // Step 2
      ["bankName", "accountNumber", "ifsc", "branchName"], // Step 3
      [
        "adhaarFront",
        "adhaarBack",
        "pancardPhoto",
        "shopPhoto",
        "businessProof",
      ], // Step 4
    ],
    renderStepForm: (step, formik) => {
      switch (step) {
        case 0:
          return <partnerForm.PersonalDetails formik={formik} />;
        case 1:
          return <partnerForm.ResidentialAddress formik={formik} />;
        case 2:
          return <partnerForm.OutletDetails formik={formik} />;
        case 3:
          return <partnerForm.BankDetails formik={formik} />;
        case 4:
          return <partnerForm.UploadDocuments formik={formik} />;
        default:
          return null;
      }
    },
  },
  "super-distributor": {
    steps: [
      "Personal Details",
      "Residentials Address",
      "Outlet Details",
      "Bank Details",
      "Upload Documents",
    ],
    stepFieldMap: [
      [
        "parentAccount",
        "parentTitle",
        "prefix",
        "name",
        "dob",
        "mobileNumber",
        "emailId",
      ], // Step 0
      ["address", "city", "state", "zipcode"], // Step 1
      ["outletName", "outletCity", "outletState", "outletZipcode"], // Step 2
      ["bankName", "accountNumber", "ifsc", "branchName"], // Step 3
      [
        "adhaarFront",
        "adhaarBack",
        "pancardPhoto",
        "shopPhoto",
        "businessProof",
      ], // Step 4
    ],
    renderStepForm: (step, formik) => {
      switch (step) {
        case 0:
          return <superDistributorForm.PersonalDetails formik={formik} />;
        case 1:
          return <superDistributorForm.ResidentialAddress formik={formik} />;
        case 2:
          return <superDistributorForm.OutletDetails formik={formik} />;
        case 3:
          return <superDistributorForm.BankDetails formik={formik} />;
        case 4:
          return <superDistributorForm.UploadDocuments formik={formik} />;
        default:
          return null;
      }
    },
  },
  retailer: {
    steps: [
      "Personal Details",
      "Residentials Address",
      "Outlet Details",
      "Upload Documents",
    ],
    stepFieldMap: [
      [
        "parentAccount",
        "parentTitle",
        "prefix",
        "name",
        "dob",
        "mobileNumber",
        "emailId",
      ], // Step 0
      ["address", "city", "state", "zipcode"], // Step 1
      ["outletName", "outletCity", "outletState", "outletZipcode"], // Step 2
      [
        "adhaarFront",
        "adhaarBack",
        "pancardPhoto",
        "shopPhoto",
        "businessProof",
      ], // Step 3
    ],
    renderStepForm: (step, formik) => {
      switch (step) {
        case 0:
          return <retailerForm.PersonalDetails formik={formik} />;
        case 1:
          return <retailerForm.ResidentialAddress formik={formik} />;
        case 2:
          return <retailerForm.OutletDetails formik={formik} />;
        case 3:
          return <retailerForm.UploadDocuments formik={formik} />;
        default:
          return null;
      }
    },
  },
  enterprise: {
    steps: [
      "Personal Details",
      "Residentials Address",
      "Outlet Details",
      "Bank Details",
      "Upload Documents",
    ],
    stepFieldMap: [
      [
        "parentAccount",
        "parentTitle",
        "prefix",
        "name",
        "dob",
        "mobileNumber",
        "emailId",
      ], // Step 0
      ["address", "city", "state", "zipcode"], // Step 1
      ["outletName", "outletCity", "outletState", "outletZipcode"], // Step 2
      ["bankName", "accountNumber", "ifsc", "branchName"], // Step 3
      [
        "adhaarFront",
        "adhaarBack",
        "pancardPhoto",
        "shopPhoto",
        "businessProof",
      ], // Step 4
    ],
    renderStepForm: (step, formik) => {
      switch (step) {
        case 0:
          return <enterpriseForm.PersonalDetails formik={formik} />;
        case 1:
          return <enterpriseForm.ResidentialAddress formik={formik} />;
        case 2:
          return <enterpriseForm.OutletDetails formik={formik} />;
        case 3:
          return <enterpriseForm.BankDetails formik={formik} />;
        case 4:
          return <enterpriseForm.UploadDocuments formik={formik} />;
        default:
          return null;
      }
    },
  },
};

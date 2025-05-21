import UserCreation from "../../Features/Management/UserCreation";
import {
  BankDetails,
  OutletDetails,
  PersonalDetails,
  ResidentialAddress,
  UploadDocumens,
} from "../../Features/Management/Distributor";
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
    renderStepForm: (
      step: number,
      formik: FormikProps<any>
    ) => JSX.Element | null;
    stepFieldMap: FieldNames[][];
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
        "email",
      ], // Step 0
      ["address", "city", "state", "zipcode"], // Step 1
      ["outletName", "outletCity", "outletState", "outletZipcode"], // Step 2
      ["bankName", "accountNumber", "ifsc", "branchName"], // Step 3
      ["adhaarNumber", "pancardNumber", "shopPhoto", "businessProof"], // Step 4
    ],
    renderStepForm: (step, formik) => {
      switch (step) {
        case 0:
          return <PersonalDetails formik={formik} />;
        case 1:
          return <ResidentialAddress formik={formik} />;
        case 2:
          return <OutletDetails formik={formik} />;
        case 3:
          return <BankDetails formik={formik} />;
        case 4:
          return <UploadDocumens formik={formik} />;
        default:
          return null;
      }
    },
  },
  "distributor": {
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
        "email",
      ], // Step 0
      ["address", "city", "state", "zipcode"], // Step 1
      ["outletName", "outletCity", "outletState", "outletZipcode"], // Step 2
      ["bankName", "accountNumber", "ifsc", "branchName"], // Step 3
      ["adhaarNumber", "pancardNumber", "shopPhoto", "businessProof"], // Step 4
    ],
    renderStepForm: (step, formik) => {
      switch (step) {
        case 0:
          return <PersonalDetails formik={formik} />;
        case 1:
          return <ResidentialAddress formik={formik} />;
        case 2:
          return <OutletDetails formik={formik} />;
        case 3:
          return <BankDetails formik={formik} />;
        case 4:
          return <UploadDocumens formik={formik} />;
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
        "email",
      ], // Step 0
      ["address", "city", "state", "zipcode"], // Step 1
      ["outletName", "outletCity", "outletState", "outletZipcode"], // Step 2
      ["bankName", "accountNumber", "ifsc", "branchName"], // Step 3
      ["adhaarNumber", "pancardNumber", "shopPhoto", "businessProof"], // Step 4
    ],
    renderStepForm: (step, formik) => {
      switch (step) {
        case 0:
          return <PersonalDetails formik={formik} />;
        case 1:
          return <ResidentialAddress formik={formik} />;
        case 2:
          return <OutletDetails formik={formik} />;
        case 3:
          return <BankDetails formik={formik} />;
        case 4:
          return <UploadDocumens formik={formik} />;
        default:
          return null;
      }
    },
  },
  "partner": {
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
        "email",
      ], // Step 0
      ["address", "city", "state", "zipcode"], // Step 1
      ["outletName", "outletCity", "outletState", "outletZipcode"], // Step 2
      ["bankName", "accountNumber", "ifsc", "branchName"], // Step 3
      ["adhaarNumber", "pancardNumber", "shopPhoto", "businessProof"], // Step 4
    ],
    renderStepForm: (step, formik) => {
      switch (step) {
        case 0:
          return <PersonalDetails formik={formik} />;
        case 1:
          return <ResidentialAddress formik={formik} />;
        case 2:
          return <OutletDetails formik={formik} />;
        case 3:
          return <BankDetails formik={formik} />;
        case 4:
          return <UploadDocumens formik={formik} />;
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
        "email",
      ], // Step 0
      ["address", "city", "state", "zipcode"], // Step 1
      ["outletName", "outletCity", "outletState", "outletZipcode"], // Step 2
      ["bankName", "accountNumber", "ifsc", "branchName"], // Step 3
      ["adhaarNumber", "pancardNumber", "shopPhoto", "businessProof"], // Step 4
    ],
    renderStepForm: (step, formik) => {
      switch (step) {
        case 0:
          return <PersonalDetails formik={formik} />;
        case 1:
          return <ResidentialAddress formik={formik} />;
        case 2:
          return <OutletDetails formik={formik} />;
        case 3:
          return <BankDetails formik={formik} />;
        case 4:
          return <UploadDocumens formik={formik} />;
        default:
          return null;
      }
    },
  },
  "retailer": {
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
        "email",
      ], // Step 0
      ["address", "city", "state", "zipcode"], // Step 1
      ["outletName", "outletCity", "outletState", "outletZipcode"], // Step 2
      ["bankName", "accountNumber", "ifsc", "branchName"], // Step 3
      ["adhaarNumber", "pancardNumber", "shopPhoto", "businessProof"], // Step 4
    ],
    renderStepForm: (step, formik) => {
      switch (step) {
        case 0:
          return <PersonalDetails formik={formik} />;
        case 1:
          return <ResidentialAddress formik={formik} />;
        case 2:
          return <OutletDetails formik={formik} />;
        case 3:
          return <BankDetails formik={formik} />;
        case 4:
          return <UploadDocumens formik={formik} />;
        default:
          return null;
      }
    },
  },
  "enterprise": {
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
        "email",
      ], // Step 0
      ["address", "city", "state", "zipcode"], // Step 1
      ["outletName", "outletCity", "outletState", "outletZipcode"], // Step 2
      ["bankName", "accountNumber", "ifsc", "branchName"], // Step 3
      ["adhaarNumber", "pancardNumber", "shopPhoto", "businessProof"], // Step 4
    ],
    renderStepForm: (step, formik) => {
      switch (step) {
        case 0:
          return <PersonalDetails formik={formik} />;
        case 1:
          return <ResidentialAddress formik={formik} />;
        case 2:
          return <OutletDetails formik={formik} />;
        case 3:
          return <BankDetails formik={formik} />;
        case 4:
          return <UploadDocumens formik={formik} />;
        default:
          return null;
      }
    },
  },
};

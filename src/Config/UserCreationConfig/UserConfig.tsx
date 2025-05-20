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

export type UserType = "im-admin" | "distributor";

export const UserConfig: Record<
  UserType,
  {
    steps: string[];
    renderStepForm: (
      step: number,
      formik: FormikProps<any>
    ) => JSX.Element | null;
    stepFieldMap: FieldNames[][] ;
  }
> = {
  "im-admin": {
    steps: ["Basic Details", "Address", "Bank Details"],
    renderStepForm: (step, formik) => {
      switch (step) {
        case 0:
          return <UserCreation />;
        case 1:
          return <UserCreation />;
        default:
          return null;
      }
    },
    stepFieldMap: [
      ["name", "mobileNumber"], // Step 0
      ["address", "zipcode"], // Step 1
      ["outletName"], // Step 2
      ["bankName", "accountNumber"], // Step 3
      ["ifsc"], // Step 4
    ],
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

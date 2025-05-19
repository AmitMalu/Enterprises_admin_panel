import UserCreation from "../../Features/Management/UserCreation";
import {
  BankDetails,
  OutletDetails,
  PersonalDetails,
  ResidentialAddress,
  UploadDocumens,
} from "../../Features/Management/Distributor";

export type UserType = "im-admin" | "distributor"

export const UserConfig: Record<
  UserType,
  { steps: string[]; renderStepForm: (step: number) => JSX.Element | null }
> = {
  "im-admin": {
    steps: ["Basic Details", "Address", "Bank Details"],
    renderStepForm: (step: number) => {
      switch (step) {
        case 0:
          return <UserCreation />;
        case 1:
          return <UserCreation />;
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
    renderStepForm: (step: number) => {
      switch (step) {
        case 0:
          return <PersonalDetails />;
        case 1:
          return <ResidentialAddress />;
        case 2:
          return <OutletDetails />;
        case 3:
          return <BankDetails />;
        case 4:
          return <UploadDocumens />;
        default:
          return null;
      }
    },
  },
};

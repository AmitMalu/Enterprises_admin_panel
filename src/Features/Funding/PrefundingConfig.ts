import * as Yup from "yup";
import {
  fileValidation,
  mobileValidation,
  textField,
} from "../../Utils/ValidationUtils";

export type PrefundingType = {
  depositType: string;
  transactionId: string;
  amount: string;
  bankAccount: string;
  depositDate: string;
  depositSlip: File | null;
  partnerName: string;
  requestedBy: string;
  clientIp: string;
  partnerMobileNumber: string;
  requestStatus: string;
};

export const initialValues: PrefundingType = {
  depositType: "",
  transactionId: "",
  amount: "",
  bankAccount: "",
  depositDate: "",
  depositSlip: null,
  partnerName: "",
  requestedBy: "",
  clientIp: "",
  partnerMobileNumber: "",
  requestStatus: "",
};

export const validationSchema: Record<keyof PrefundingType, Yup.AnySchema> = {
  depositType: textField("Deposit Type", 50, true),
  transactionId: textField("Transaction Id", 50, true),
  amount: textField("Amount", 20, true),
  bankAccount: textField("Bank Account", 50, true),
  depositDate: Yup.date()
    .required("Deposit Date is required")
    .typeError("Invalid date format"),
  depositSlip: fileValidation("Deposit Slip", [
    "application/pdf",
    "image/jpeg",
    "image/png",
  ]),
  partnerName: textField("Partner Name", 50, true),
  requestedBy: textField("Request By", 50, true),
  clientIp: textField("Client IP", 50, true),
  partnerMobileNumber: mobileValidation,
  requestStatus: textField("Request Status", 50, true),
};

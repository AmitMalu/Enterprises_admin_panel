import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const CREDIT_DEBIT_KEY = "CREDIT_DEBIT";
export const CREDIT_DEBIT_URL = API_ENDPOINTS.FUNDING.PREFUNDING;

export interface CreditDebitFormType {
  type: string;
  accountNo: string;
  walletType: string;
  amount: string | number;
  confirmAmount: string | number;
  narrationType: string;
  remark: string | null;
}

export const initialValues: CreditDebitFormType = {
  type: "credit",
  accountNo: "",
  walletType: "PREPAID",
  amount: "0",
  confirmAmount: "0",
  narrationType: "",
  remark: "",
};

export const validationSchema: Record<
  keyof CreditDebitFormType,
  Yup.AnySchema
> = {
  type: Yup.string()
    .oneOf(["credit", "debit"], "Type must be Credit or Debit")
    .required("Type is required"),
  accountNo: textField("Account Number", 150, true, true),
  walletType: textField("Wallet Type", 150, true, true).default("PREPAID"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .required("Amount is required")
    .test(
      "decimal-places",
      "Amount can have at most 3 decimal places",
      (value) => value === undefined || /^\d+(\.\d{1,3})?$/.test(String(value))
    )
    .min(0.001, "Amount must be greater than 0"),
  confirmAmount: Yup.number()
    .typeError("Confirm Amount must be a number")
    .required("Confirm Amount is required")
    .test(
      "decimal-places",
      "Confirm Amount can have at most 3 decimal places",
      (value) => value === undefined || /^\d+(\.\d{1,3})?$/.test(String(value))
    )
    .test(
      "match-amount",
      "Confirm Amount and Amount must match",
      function (value) {
        const { amount } = this.parent;
        return String(value) === String(amount);
      }
    ),
  narrationType: textField("Narration", 150, true, true).default("other"),
  remark: textField("Partner Name", 150, false, true),
};

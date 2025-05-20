import * as Yup from "yup";
import {
  aadhaarValidation,
  accountNumberValidation,
  dobValidation,
  emailValidation,
  ifscValidation,
  mobileValidation,
  panValidation,
  prefixValidation,
  textField,
  zipValidation,
} from "../../Utils/ValidationUtils";

export const masterInitialValues = {
  parentAccount: "",
  parentTitle: "",
  prefix: "",
  name: "",
  dob: "",
  mobileNumber: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zipcode: "",
  outletName: "",
  outletCity: "",
  outletState: "",
  outletZipcode: "",
  bankName: "",
  accountNumber: "",
  ifsc: "",
  branchName: "",
  adhaarNumber: "",
  pancardNumber: "",
  shopPhoto: null,
  businessProof: null,
};

export type FieldNames = keyof typeof masterInitialValues;

export const masterValidationSchema: Record<FieldNames, Yup.AnySchema> = {
  parentAccount: textField("Parent Account", 50, true),
  parentTitle: textField("Parent Title", 50, true),
  prefix: prefixValidation,
  name: textField("Name", 50, true),
  dob: dobValidation,
  mobileNumber: mobileValidation,
  email: emailValidation,
  address: textField("Address", 150, true, true),
  city: textField("City", 50, true),
  state: textField("State", 50, true),
  zipcode: zipValidation,
  outletName: textField("Outlet Name", 50, true),
  outletCity: textField("Outlet City", 50, true),
  outletState: textField("Outlet State", 50, true),
  outletZipcode: zipValidation,
  bankName: textField("Bank Name", 50, true),
  accountNumber: accountNumberValidation,
  ifsc: ifscValidation,
  branchName: textField("Branch Name", 50, true),
  adhaarNumber: aadhaarValidation,
  pancardNumber: panValidation,
  shopPhoto: Yup.mixed()
    .required("Shop photo is required")
    .test(
      "fileType",
      "Only image files are allowed",
      (value) =>
        value instanceof File &&
        ["image/jpeg", "image/png"].includes(value.type)
    )
    .test(
      "fileSize",
      "File too large. Max 2MB.",
      (value) => value instanceof File && value.size <= 2 * 1024 * 1024
    ),
  businessProof: Yup.mixed()
    .required("Business proof document is required")
    .test(
      "fileType",
      "Only PDF or image files are allowed",
      (value) =>
        value instanceof File &&
        ["application/pdf", "image/jpeg", "image/png"].includes(value.type)
    )
    .test(
      "fileSize",
      "File too large. Max 2MB.",
      (value) => value instanceof File && value.size <= 2 * 1024 * 1024
    ),
};

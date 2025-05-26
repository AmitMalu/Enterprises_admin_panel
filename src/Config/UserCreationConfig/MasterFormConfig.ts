import * as Yup from "yup";
import {
  accountNumberValidation,
  dobValidation,
  emailValidation,
  fileValidation,
  gstValidation,
  ifscValidation,
  mobileValidation,
  panValidation,
  passwordValidation,
  prefixValidation,
  textField,
  usernamePhoneEmailValidation,
  websiteValidation,
  zipValidation,
} from "../../Utils/ValidationUtils";

export const masterInitialValues = {
  // Common fields
  parentAccount: "",
  parentTitle: "", // alias for 'title'
  prefix: "", // alias for 'abbreviation'
  name: "",
  dob: "",
  mobileNumber: "",
  emailId: "",
  address: "", // full address string
  city: "",
  state: "",
  zipcode: "",
  outletName: "",
  outletState: "",
  outletCity: "",
  outletZipcode: "",

  // Bank Info
  bankName: "",
  accountNumber: "",
  ifsc: "",
  branchName: "",

  // Documents
  adhaarFront: null,
  adhaarBack: null,
  pancardPhoto: null,
  shopPhoto: null,
  businessProof: null,

  // Enterprise-specific
  companyName: "",
  companyType: "",
  businessDesc: "",
  websiteURL: "",
  panCardNumber: "",
  GSTNumber: "",
  createdBy: "",

  // White label-specific
  imAccountMemberID: "",
  isServiceAllow: false,
  allowPrepaidCards: false,
  prepaidCardName: "",
  allowPostpaidCards: false,
  postpaidCardName: "",
  isAdmin: false,

  // Admin-only
  userName: "",
  password: "",
};

export type FieldNames = keyof typeof masterInitialValues;

export const masterValidationSchema: Record<FieldNames, Yup.AnySchema> = {
  //common fields
  parentAccount: textField("Parent Account", 50, true),
  parentTitle: textField("Parent Title", 50, true),
  prefix: prefixValidation,
  name: textField("Name", 50, true),
  dob: dobValidation,
  mobileNumber: mobileValidation,
  emailId: emailValidation,
  address: textField("Address", 150, true, true),
  city: textField("City", 100, true),
  state: textField("State", 100, true),
  zipcode: zipValidation,
  outletName: textField("Outlet Name", 50, true),
  outletState: textField("Outlet State", 100, true),
  outletCity: textField("Outlet City", 100, true),
  outletZipcode: zipValidation,

  // Bank Info
  bankName: textField("Bank Name", 50, true),
  accountNumber: accountNumberValidation,
  ifsc: ifscValidation,
  branchName: textField("Branch Name", 50, true, true),

  // Documents
  adhaarFront: fileValidation("Adhaar Front Photo"),
  adhaarBack: fileValidation("Adhaar Back Photo"),
  pancardPhoto: fileValidation("Pancard Photo"),
  shopPhoto: fileValidation("Shop Photo"),
  businessProof: fileValidation("Business Proof", [
    "application/pdf",
    "image/jpeg",
    "image/png",
  ]),

  // Enterprise-specific
  companyName: textField("Company Name", 100, true),
  companyType: textField("Company Type", 50, true),
  businessDesc: textField("Business Description", 500, false, true),
  websiteURL: websiteValidation,
  panCardNumber: panValidation,
  GSTNumber: gstValidation,
  createdBy: textField("Created By", 50, true),

  // White label-specific
  imAccountMemberID: textField("IM Account Member ID", 50, false),
  isServiceAllow: Yup.boolean(),
  allowPrepaidCards: Yup.boolean(),
  prepaidCardName: textField("Prepaid Card Name", 50, false),
  allowPostpaidCards: Yup.boolean(),
  postpaidCardName: textField("Postpaid Card Name", 50, false),
  isAdmin: Yup.boolean(),

  // Admin-only
  userName: usernamePhoneEmailValidation,
  password: passwordValidation,
};

export function transformUserCreationPayload(
  values: any,
  createdBy: string | null
) {
  return {
    parentAccount: values.parentAccount || "",
    title: values.parentTitle || "",
    abbreviation: values.prefix || "",
    name: values.name || "",
    mobileNumber: values.mobileNumber || "",
    emailId: values.emailId || "",
    dob: values.dob || "",
    outletName: values.outletName || "",
    companyType: values.companyType || "",
    competitor: values.competitor || "",
    address: {
      address: values.address || "",
      city: values.city || "",
      state: values.state || "",
      zipCode: values.zipcode || "",
    },
    outletAddress: {
      address: values.outletName || "",
      city: values.outletCity || "",
      state: values.outletState || "",
      zipCode: values.outletZipcode || "",
    },
    createdBy: createdBy || localStorage.getItem("username") || "",
  };
}

export function cleanPayload(obj: any) {
  if (typeof obj !== "object" || obj === null) return obj;

  const result: Record<string, any> = {};

  for (const key in obj) {
    const value = obj[key];

    if (value === undefined || value === null) continue;

    if (typeof value === "object") {
      const cleanedValue = cleanPayload(value);
      if (Object.keys(cleanedValue).length > 0) {
        result[key] = cleanedValue;
      }
    } else if (value !== "") {
      result[key] = value;
    }
  }

  return result;
}

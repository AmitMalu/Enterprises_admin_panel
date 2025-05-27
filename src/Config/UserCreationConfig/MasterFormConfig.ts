import * as Yup from "yup";
import {
  aadhaarValidation,
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
  title: "",
  prefix: "", // alias for 'abbreviation'
  name: "",
  dob: "",
  mobileNumber: "",
  emailId: "",
  // createdBy: "", // field is not required in the form, but can be set programmatically

  // Address details
  address: "",
  city: "",
  state: "",
  zipcode: "",

  // Outlet/company details
  outletName: "",
  outletAddress: "",
  outletState: "",
  outletCity: "",
  outletZipcode: "",
  companyType: "", // Enterprise-specific
  companyName: "", // Enterprise-specific

  // Bank Info
  bankName: "",
  accountNumber: "",
  ifsc: "",
  branchName: "",
  websiteURL: "", // Enterprise-specific
  businessDesc: "", // Enterprise-specific

  // Documents
  adhaarFront: null,
  adhaarBack: null,
  pancardPhoto: null,
  shopPhoto: null,
  businessProof: null,
  adhaarNumber: "",
  panNumber: "",
  shopNumber: "",
  businessNumber: "",

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
  title: textField("Title", 50, true),
  prefix: prefixValidation,
  name: textField("Name", 50, true),
  dob: dobValidation,
  mobileNumber: mobileValidation,
  emailId: emailValidation,
  // createdBy: textField("Created By", 50, true), // field is not required in the form, but can be set programmatically

  // Address details
  address: textField("Address", 150, true, true),
  city: textField("City", 100, true),
  state: textField("State", 100, true),
  zipcode: zipValidation,

  // Outlet/company details
  outletName: textField("Outlet Name", 50, true),
  outletAddress: textField("Outlet Address", 150, true, true),
  outletState: textField("Outlet State", 100, true),
  outletCity: textField("Outlet City", 100, true),
  outletZipcode: zipValidation,
  companyName: textField("Company Name", 100, true), // Enterprise-specific
  companyType: textField("Company Type", 50, true), // Enterprise-specific

  // Bank Info
  bankName: textField("Bank Name", 50, true),
  accountNumber: accountNumberValidation,
  ifsc: ifscValidation,
  branchName: textField("Branch Name", 50, true, true),
  websiteURL: websiteValidation,
  businessDesc: textField("Business Description", 500, true, true),

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
  adhaarNumber: aadhaarValidation,
  panNumber: panValidation,
  shopNumber: textField("Shop Number", 50, true),
  businessNumber: textField("Business Number", 50, true),

  // White label-specific
  imAccountMemberID: textField("IM Account Member ID", 50, true),
  isServiceAllow: Yup.boolean(),
  allowPrepaidCards: Yup.boolean(),
  prepaidCardName: textField("Prepaid Card Name", 50, true),
  allowPostpaidCards: Yup.boolean(),
  postpaidCardName: textField("Postpaid Card Name", 50, true),
  isAdmin: Yup.boolean(),

  // Admin-only
  userName: usernamePhoneEmailValidation,
  password: passwordValidation,
};

export function transformUserCreationPayload(
  values: any,
  createdBy?: string | null,
  ip?: string | null
) {
  return {
    parentAccount: values.parentAccount || "",
    title: values.title || "",
    abbreviation: values.prefix || "",
    name: values.name || "",
    dob: values.dob || "",
    mobileNumber: values.mobileNumber || "",
    emailId: values.emailId || "",
    createdBy: createdBy || localStorage.getItem("username") || "",
    createdByIPAddress: ip || "", // Assuming 'ip' is defined in the scope where this function is called

    address: {
      address: values.address || "",
      city: values.city || "",
      state: values.state || "",
      zipCode: values.zipcode || "",
    },

    outletAddress: {
      outletName: values.outletName || "",
      address: values.outletName || "",
      city: values.outletCity || "",
      state: values.outletState || "",
      zipCode: values.outletZipcode || "",
      companyName: values.companyName || "",
      companyType: values.companyType || "",
    },

    bankDetails: {
      bankName: values.bankName || "",
      bankAccountNumber: values.accountNumber || "",
      ifscCode: values.ifsc || "",
      branchName: values.branchName || "",
    },
    theme: {
      id: 1,
    },
    domainURL: values.websiteURL || "",
    businessDesc: values.businessDesc || "",
    aadhaarNumber: values.adhaarNumber || "",
    panNumber: values.panNumber || "",
    shopNumber: values.shopNumber || "",
    businessNumber: values.businessNumber || "",

    imAccountMemberID: values.imAccountMemberID || "",
    isServiceAllow: values.isServiceAllow || "",
    allowPrepaidCards: values.allowPrepaidCards || "",
    prepaidCardName: values.prepaidCardName || "",
    allowPostpaidCards: values.allowPostpaidCards || "",
    postpaidCardName: values.postpaidCardName || "",
    isAdmin: values.isAdmin ?? "",

    username: values.userName || "", //added for admin user creation
    password: values.password || "", // added for admin user creation
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
    } else if (
      typeof value === "boolean" || // keep booleans even if false
      (typeof value === "number" && !isNaN(value)) || // keep 0, etc.
      (typeof value === "string" && value.trim() !== "") // remove empty strings
    ) {
      result[key] = value;
    }
  }

  return result;
}

import * as Yup from "yup";
import {
  aadhaarValidation,
  accountNumberValidation,
  dobValidation,
  emailValidation,
  fileValidation,
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
  outletState: "",
  outletCity: "",
  outletZipcode: "",
  bankName: "",
  accountNumber: "",
  ifsc: "",
  branchName: "",
  adhaarFront: null,
  adhaarBack: null,
  pancardPhoto: null,
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
  city: textField("City", 100, true),
  state: textField("State", 100, true),
  zipcode: zipValidation,
  outletName: textField("Outlet Name", 50, true),
  outletState: textField("Outlet State", 100, true),
  outletCity: textField("Outlet City", 100, true),
  outletZipcode: zipValidation,
  bankName: textField("Bank Name", 50, true),
  accountNumber: accountNumberValidation,
  ifsc: ifscValidation,
  branchName: textField("Branch Name", 50, true, true),
  adhaarFront: fileValidation("Adhaar Front Photo"),
  adhaarBack: fileValidation("Adhaar Back Photo"),
  pancardPhoto: fileValidation("Pancard Photo"),
  shopPhoto: fileValidation("Shop Photo"),
  businessProof: fileValidation("Business Proof", [
    "application/pdf",
    "image/jpeg",
    "image/png",
  ]),
};

export function transformUserCreationPayload(values: any) {
  return {
    parentAccount: values.parentAccount || "",
    title: values.parentTitle || "",
    abbreviation: values.prefix || "",
    name: values.name || "",
    mobile: values.mobileNumber || "",
    email: values.email || "",
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

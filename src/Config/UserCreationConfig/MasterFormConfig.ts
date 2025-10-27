import * as Yup from "yup";
import {
  accountNumberValidation,
  dobValidation,
  emailValidation,
  fileValidation,
  ifscValidation,
  mobileValidation,
  passwordValidation,
  prefixValidation,
  textField,
  usernamePhoneEmailValidation,
  websiteValidation,
  zipValidation,
} from "../../Utils/ValidationUtils";
import { UserConfig, UserType } from "./UserConfig";
import { getIpAddress } from "../../Utils/utils";
import { createUser } from "../../Redux/Features/Management/Thunk";
import { toast } from "react-toastify";

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
  bankHolderName: "",
  ifsc: "",
  branchName: "",
  isBankVerified: false,
  websiteURL: "", // Enterprise-specific
  businessDesc: "", // Enterprise-specific

  // Documents
  adhaarFront: null,
  adhaarBack: null,
  pancardPhoto: null,
  shopPhoto: null,
  businessProof: null,
  aadhaarNumber: "",
  isAadhaarVerified: false,
  aadhaarPanVerified: false,
  lastVerifiedAadhaar: null, //field to track last verified Aadhaar number
  lastVerifiedPan: null, // field to track last verified PAN number
  panNumber: "",
  panVerified: false,
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
  parentAccount: textField("Parent Account", 50, true, true),
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
  branchName: textField("Branch Name", 50, false, true),
  bankHolderName: textField("Bank Holder Name", 100, true),
  isBankVerified: Yup.boolean(),
  websiteURL: websiteValidation.required("Website URL is required"),
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
  aadhaarNumber: Yup.string()
    .trim()
    .matches(/^\d{12}$/, "Aadhaar must be exactly 12 digits")
    .required("Aadhaar Number is required")
    .test(
      "aadhaar-verified",
      "Aadhaar Verification is required",
      function (value) {
        const { isAadhaarVerified } = this.parent;
        return !value || value.length !== 12 || isAadhaarVerified === true;
      }
    ),
  isAadhaarVerified: Yup.boolean(),
  aadhaarPanVerified: Yup.boolean(),
  lastVerifiedAadhaar: Yup.string().nullable(), // or stricter version
  lastVerifiedPan: Yup.string().nullable(),
  panNumber: Yup.string()
    .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Invalid PAN number format")
    .max(10, "PAN number must be exactly 10 characters")
    .required("PAN number is required")
    .test("pan-verified", "Pancard Verification is required", function (value) {
      const { panVerified } = this.parent;
      return !value || value.length !== 10 || panVerified === true;
    }),
  panVerified: Yup.boolean(),
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

export const getValidationSchema = (
  userType: UserType,
  step: number
): Yup.ObjectSchema<any> => {
  const fields = UserConfig[userType].stepFieldMap[step];
  const shape: Record<string, any> = {};

  fields.forEach((field) => {
    shape[field] =
      masterValidationSchema[field as keyof typeof masterValidationSchema];
  });

  return Yup.object().shape(shape);
};

export interface SubmitHandlerArgs {
  values: any;
  formikHelpers: import("formik").FormikHelpers<any>;
  userType: UserType;
  navigate: any;
  dispatch: any;
  setShowSuccessModal: (show: boolean) => void;
  setActiveStep: (step: number) => void;
}

export const handleFormSubmit = async ({
  values,
  formikHelpers,
  userType,
  navigate,
  dispatch,
  setShowSuccessModal,
  setActiveStep,
}: SubmitHandlerArgs) => {
  // 1. Transforming form values to the payload structure
  const ip = await getIpAddress();
  const payload = transformUserCreationPayload(userType, values, ip);
  console.log(payload, " Payload to be sent to the server");

  const formData = new FormData();
  formData.append("data", JSON.stringify(payload));

  // 3. Append Files if they exist
  const fileFields = {
    aadhaarCardFrontImage: values.adhaarFront,
    aadhaarCardBackImage: values.adhaarBack,
    shopImage: values.shopPhoto,
    panCardImage: values.pancardPhoto,
    businessProofImage: values.businessProof,
  };

  Object.entries(fileFields).forEach(([key, file]) => {
    if (file) formData.append(key, file);
  });

  try {
    const result = await dispatch(
      createUser({
        userType: userType as UserType,
        data: formData,
      })
    ).unwrap();

    toast.success(result.message || "User created successfully");
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/management/user/create");
    }, 2000);
    formikHelpers.resetForm();
    setActiveStep(0);
  } catch (err) {
    toast.error((err as string) || "Failed to Create User");
  }
};

export function transformUserCreationPayload(
  userType: UserType,
  values: any,
  ip?: string | null
) {
  // Base payload structure common to all user types except IM-Admin
  const basePayload = {
    parentAccount: values.parentAccount || "",
    title: values.title || "",
    abbreviation: values.prefix || "",
    name: values.name || "",
    dob: values.dob || "",
    mobileNumber: values.mobileNumber || "",
    emailId: values.emailId || "",
    createdBy: localStorage.getItem("username") || "",
    createdByIPAddress: ip || "",
    aadhaarNumber: values.aadhaarNumber || "",
    isAadhaarVerified: values.isAadhaarVerified || false,
    aadhaarPanVerified: values.aadhaarPanVerified || false,
    panNumber: values.panNumber || "",
    panVerified: values.panVerified || false,
    shopNumber: values.shopNumber || "",
    businessNumber: values.businessNumber || "",
  };

  const address = {
    address: values.address || "",
    city: values.city || "",
    state: values.state || "",
    zipCode: values.zipcode || "",
  };

  const outletAddress = {
    address: values.outletAddress || "",
    city: values.outletCity || "",
    state: values.outletState || "",
    zipCode: values.outletZipcode || "",
  };

  const bankDetails = {
    bankName: values.bankName || "",
    bankAccountNumber: values.accountNumber || "",
    ifscCode: values.ifsc || "",
    bankHolderName: values.bankHolderName || "",
    isVerified: values.isBankVerified || false,
    // branchName: values.branchName || "",
  };

  switch (userType) {
    case "partner":
    case "retailer":
    case "distributor":
    case "super-distributor":
      return {
        ...basePayload,
        address,
        outletAddress: {
          ...outletAddress,
          outletName: values.outletName || "",
        },
        bankDetails,
      };

    case "enterprise":
      return {
        ...basePayload,
        address,
        outletAddress: {
          ...outletAddress,
          companyName: values.companyName || "",
          companyType: values.companyType || "",
        },
        bankDetails,
        theme: { id: 1 },
        domainURL: values.websiteURL || "",
        businessDesc: values.businessDesc || "",
      };

    case "white-label":
      return {
        ...basePayload,
        isAdmin: values.isAdmin ?? false,
        address,
        outletAddress: {
          ...outletAddress,
          companyName: values.companyName || "",
          companyType: values.companyType || "",
        },
        bankDetails,
        theme: { id: 1 },
        domainURL: values.websiteURL || "",
        businessDesc: values.businessDesc || "",
      };

    case "im-admin":
      return {
        name: values.name || "",
        mobileNumber: values.mobileNumber || "",
        emailId: values.emailId || "",
        userName: values.userName || "",
        password: values.password || "",
        createdBy: localStorage.getItem("username") || "",
        createdByIPAddress: ip || "",
      };

    default:
      return basePayload;
  }
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

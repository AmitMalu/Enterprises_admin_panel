import * as Yup from "yup";
import moment from "moment";

// Common text field validation
export const textField = (
  field = "This field",
  max = 100,
  required = false,
  allowSpecialChars = false
) => {
  let schema = Yup.string().max(
    max,
    `${field} cannot exceed ${max} characters`
  );

  if (!allowSpecialChars) {
    schema = schema.matches(
      /^[A-Za-z0-9\s.-]*$/,
      `${field} should not contain special characters`
    );
  }

  if (required) {
    schema = schema.required(`${field} is required`);
  }

  return schema;
};

// GST Number: 15 characters (e.g., 22ABCDE1234F1Z5)
export const gstValidation = Yup.string()
  .matches(
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    "Invalid GST number format"
  )
  .max(15, "GST number must be 15 characters")
  .required("GST number is required");

// Email: standard format
export const emailValidation = Yup.string()
  .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email")
  .required("Email is required");

// Mobile Number: Indian format (10-digit, starts from 6-9)
export const mobileValidation = Yup.string()
  .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
  .required("Mobile Number is required");

// Password: strict secure policy
export const passwordValidation = Yup.string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters long")
  .max(50, "Password cannot be longer than 50 characters")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character"
  )
  .matches(/^\S*$/, "Password cannot contain spaces");

export const usernamePhoneEmailValidation = Yup.string()
  .required("Username is required")
  .max(50, "Username cannot be longer than 50 characters")
  .test(
    "is-valid-username",
    "Username must be a valid mobile number or email",
    function (value) {
      const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile numbers start from 6-9
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) return false;
      return phoneRegex.test(value) || emailRegex.test(value);
    }
  );
// Zipcode: exactly 6 digits
export const zipValidation = Yup.string()
  .matches(/^\d{6}$/, "Zipcode must be 6 digits")
  .required("Zipcode is required");

// Date of Birth: basic string check + optional length cap
export const dobValidation = Yup.string()
  .required("Date of Birth is required")
  .max(10, "DOB must be in format YYYY-MM-DD")
  .test("is-valid-date", "Invalid date format", (value) => {
    return moment(value, "YYYY-MM-DD", true).isValid();
  })
  .test("not-in-future", "Birth date cannot be in the future", (value) => {
    return moment(value).isSameOrBefore(moment());
  });

// Aadhaar Number: 12 digits only
export const aadhaarValidation = Yup.string()
  .matches(/^\d{12}$/, "Aadhaar must be 12 digits")
  .required("Aadhaar Number is required");

// PAN Card Number: 10 characters (e.g., ABCDE1234F)
export const panValidation = Yup.string()
  .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Invalid PAN number format")
  .max(10, "PAN number must be exactly 10 characters")
  .required("PAN number is required");

// IFSC Code: 4 uppercase letters, 0, then 6 digits
export const ifscValidation = Yup.string()
  .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code")
  .required("IFSC Code is required");

// Account Number: digits only (min 9, max 18 generally)
export const accountNumberValidation = Yup.string()
  .matches(/^\d{9,18}$/, "Account Number must be 9 to 18 digits")
  .required("Account Number is required");

export const prefixValidation = Yup.string()
  .matches(/^[a-zA-Z]{3}$/, "Prefix must be 3 digit alphabetic characters")
  .required("Prefix is required");

// Website URL
export const websiteValidation = Yup.string()
  .url("Must be a valid URL")
  .nullable();

// export const fileValidation = (
//   field: string,
//   allowedTypes: string[] = ["image/jpeg", "image/png"],
//   maxSizedMB = 1.5
// ) =>
//   Yup.mixed()
//     .required(`${field} is required`)
//     .test(
//       "fileType",
//       `Only ${allowedTypes.join(", ")} files are allowed`,
//       (value) =>
//         value instanceof File ? allowedTypes.includes(value.type) : false
//     )
//     .test(
//       "fileSize",
//       `File too large. Max ${maxSizedMB}MB`,
//       (value) => value instanceof File && value.size <= maxSizedMB * 1024 * 1024
//     );

export const fileValidation = (
  field: string,
  allowedTypes: string[] = ["image/png, image/jpeg"],
  maxSizedMB = 1.5
) =>
  Yup.mixed()
    .required(`${field} is required`)
    .test(
      "fileType",
      `Only ${allowedTypes.join(", ")} files are allowed`,
      (value) => {
        if (typeof value === "string") return true; // Allow URL (edit case)
        return value instanceof File
          ? allowedTypes.includes(value.type)
          : false;
      }
    )
    .test("fileSize", `File too large. Max ${maxSizedMB}MB`, (value) => {
      if (typeof value === "string") return true; // Allow URL (edit case)
      return value instanceof File && value.size <= maxSizedMB * 1024 * 1024;
    });

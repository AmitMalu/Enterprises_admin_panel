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

// PAN Card: 10-character alphanumeric (uppercase only)
export const panValidation = Yup.string()
  .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format")
  .required("PAN Card Number is required");

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

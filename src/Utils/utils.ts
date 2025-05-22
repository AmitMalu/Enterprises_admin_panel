export const persistOtpSession = (username: string, otpFor: string) => {
  sessionStorage.setItem("otp-username", username);
  sessionStorage.setItem("otpFor", otpFor);
};

export const capitalizeWords = (str: string) =>
  str
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word


import parsePhoneNumberFromString from "libphonenumber-js";

// Phone number validation
export const PhoneValidation = {
  required: "Phone number is required",
  validate: (value) => {
    if (!value || value === "+") return "Phone number is required";

    // Egypt-specific strict validation
    if (value.startsWith("+20")) {
      if (value.length !== 13) return "Egypt mobile must be 11 digits total";
      const validPrefixes = ["10", "11", "12", "15"];
      const prefix = value.substring(3, 5);
      if (!validPrefixes.includes(prefix))
        return "Invalid Egypt mobile provider";
      return true;
    }

    // Global validation for other countries
    try {
      const phoneNumber = parsePhoneNumberFromString(value);
      return (
        (phoneNumber && phoneNumber.isValid()) || "Invalid  number"
      );
    } catch {
      return "Invalid format";
    }
  },
};

// Password validation
export const PasswordValidation = {
  required: "Password is required",
  minLength: { value: 8, message: "Minimum 8 characters" },
  maxLength: { value: 20, message: "Maximum 20 characters" },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/,
    message: "Must include 1 uppercase letter and 1 number",
  },
};
// Confirm Password validation
export const confirmPasswordValidation = (password) => ({
  required: "Confirmation is required",
  validate: (value) =>
    value === password || "Passwords do not match",
});
// Email validation
export const validateEmail = (value) => {
  // 1. Required Check
  if (!value || !value.trim()) {
    return "Email is required";
  }

  // 2. No Spaces Check
  if (/\s/.test(value)) {
    return "Email cannot contain spaces";
  }

  // 3. Lowercase Check
  if (value !== value.toLowerCase()) {
    return "Email must be lowercase";
  }

  // 4. Max Length Check
  if (value.length > 100) {
    return "Email must be less than 100 characters";
  }

  // 5. Pattern Check
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!emailRegex.test(value)) {
    return "Please enter a valid email address";
  }

  // ✅ Valid
  return "";
};
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
    } catch (e) {
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
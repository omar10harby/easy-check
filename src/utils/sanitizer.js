export const SanitizePhoneNumber = (value) => {
  if (!value) return "";

  let cleaned = value.startsWith("+") ? value : `+${value}`;
  cleaned = cleaned.replace(/[^\d+]/g, "");

  // Fix Egypt +200 → +20
  if (cleaned.startsWith("+200")) {
    cleaned = cleaned.replace("+200", "+20");
  }

  return cleaned;
};
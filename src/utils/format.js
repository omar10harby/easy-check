
export function formatAmount(val){
    if (!val) return "";
    const numberValue = parseFloat(val);
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numberValue);
  };

  export const formatImeiOrSerial = (value, inputType) => {
  if (inputType === "imei") {
    return value.replace(/\D/g, ""); // أرقام فقط
  }
  return value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase(); // أرقام وحروف كبيرة
};
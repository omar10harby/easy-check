
export function formatAmount(val){
    if (!val) return "";
    const numberValue = parseFloat(val);
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numberValue);
  };
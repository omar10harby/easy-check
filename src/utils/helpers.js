
export function formatAmount(val) {
  if (!val) return "";
  const numberValue = parseFloat(val);
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numberValue);
}

export const formatImeiOrSerial = (value, inputType) => {
  if (inputType === "imei") {
    return value.replace(/\D/g, ""); // أرقام فقط
  }
  return value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase(); // أرقام وحروف كبيرة
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return {
    date: date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    time: date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};






export const getStatusInfo = (status) => {
  switch (status) {
    case 'COMPLETED':
      return {
        label: 'Success',
        headerBg: 'bg-emerald-500',
        iconName: 'Search',
        statusColor: 'text-emerald-600'
      };
    case 'PENDING':
      return {
        label: 'Processing',
        headerBg: 'bg-amber-500',
        iconName: 'RefreshCw',
        statusColor: 'text-amber-600'
      };
    case 'FAILED':
      return {
        label: 'Failed',
        headerBg: 'bg-rose-500',
        iconName: 'AlertCircle',
        statusColor: 'text-rose-600'
      };
    case 'REFUNDED':
      return {
        label: 'Refunded',
        headerBg: 'bg-blue-500',
        iconName: 'RefreshCw',
        statusColor: 'text-blue-600'
      };
    default:
      return {
        label: 'Unknown',
        headerBg: 'bg-gray-500',
        iconName: 'AlertCircle',
        statusColor: 'text-gray-600'
      };
  }
};

export const maskIdentifier = (identifier) => {
  if (!identifier || identifier === "N/A") return identifier;
  if (identifier.length < 8) return identifier;
  return `${identifier.slice(0, 4)}••••••${identifier.slice(-4)}`;
};


export const getTransactionInfo = (kind) => {
  switch (kind) {
    case 'TOPUP':
      return {
        label: 'Wallet Top Up',
        headerBg: 'bg-emerald-500',
        iconName: 'Wallet',
        amountColor: 'text-emerald-600'
      };
    case 'PURCHASE':
      return {
        label: 'Service Purchase',
        headerBg: 'bg-rose-500',
        iconName: 'ShoppingBag',
        amountColor: 'text-rose-600'
      };
    case 'REFUND':
      return {
        label: 'Refund Processed',
        headerBg: 'bg-blue-500',
        iconName: 'RefreshCw',
        amountColor: 'text-blue-600'
      };
    default:
      return {
        label: 'Transaction',
        headerBg: 'bg-gray-500',
        iconName: 'AlertCircle',
        amountColor: 'text-gray-600'
      };
  }
};


export const getDefaultNote = (kind) => {
  switch (kind) {
    case 'TOPUP':
      return 'Funds added to wallet';
    case 'PURCHASE':
      return 'Payment for service';
    case 'REFUND':
      return 'Amount returned to wallet';
    default:
      return 'Transaction processed';
  }
};

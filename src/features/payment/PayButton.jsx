import React from "react";
import { CreditCard } from "lucide-react";
import { formatAmount } from "../../utils/format";

function PayButton({ amount, loading, onPay }) {
  const disabled = loading || !amount || parseFloat(amount) < 5;

  return (
    <div className="pt-4">
      <button
        onClick={onPay}
        disabled={disabled}
        className="w-full flex items-center justify-center gap-3 px-6 py-5 bg-primary text-white disabled:bg-gray-300 disabled:cursor-not-allowed font-black text-lg rounded-2xl transition-all shadow-lg active:scale-95"
      >
        {loading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            <span>
              Pay {amount ? `${formatAmount(amount)} EGP` : ""}
            </span>
          </>
        )}
      </button>
    </div>
  );
}

export default PayButton;

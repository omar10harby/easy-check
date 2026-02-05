import { CreditCard } from "lucide-react";
import { formatAmount } from "../../utils/helpers";

function PayButton({ amount, loading, onPay }) {
  const disabled = loading || !amount || parseFloat(amount) < 10;
  const formattedAmount = amount ? `${formatAmount(amount)} EGP` : "";

  return (
    <div className="pt-4">
      <button
        onClick={onPay}
        disabled={disabled}
        aria-label={loading ? "Processing payment" : `Pay ${formattedAmount}`}
        aria-busy={loading}
        className="w-full flex items-center justify-center gap-3 px-6 py-5 bg-primary text-white disabled:bg-gray-300 disabled:cursor-not-allowed font-black text-lg rounded-2xl transition-all shadow-lg active:scale-95 "
      >
        {loading ? (
          <div
            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"
            aria-hidden="true"
          ></div>
        ) : (
          <>
            <CreditCard className="w-5 h-5" aria-hidden="true" />
            <span>Pay {formattedAmount}</span>
          </>
        )}
      </button>
    </div>
  );
}

export default PayButton;

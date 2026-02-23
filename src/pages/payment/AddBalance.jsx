import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createTopupPaymentThunk } from "../../features/payment/PaymentSlice";
import AmountInput from "../../features/payment/AmountInput";
import QuickAmounts from "../../features/payment/QuickAmounts";
import PayButton from "../../features/payment/PayButton";

function AddBalance() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.payment);
  const [amount, setAmount] = useState("");

  const quickAmounts = [10, 50, 100];

  // ✅ Handler بسيط جداً
  function handleAmountChange(e) {
    setAmount(e.target.value);
  }

  function handleQuickSelect(amt) {
    setAmount(amt.toString());
  }

  async function handleAddBalance() {
    const numericAmount = parseFloat(amount);

    if (!numericAmount || numericAmount < 10) {
      toast.error("Minimum deposit is 10 EGP");
      return;
    }

    try {
      const result = await dispatch(
        createTopupPaymentThunk({ amount: numericAmount.toString() })
      ).unwrap();

      if (result.paymentUrl) {
        toast.success("Redirecting to payment...");
        window.location.href = result.paymentUrl;
      } else {
        toast.error("Payment link unavailable");
      }
    } catch (error) {
      toast.error(error || "Failed to create payment");
    }
  }

  return (
    <section className="w-full max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8 ">
      <div className="bg-white rounded-3xl shadow-xl border border-light-gray p-6 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-primary mb-2">
            Top Up Balance
          </h1>
          <p className="text-primary/70 text-sm sm:text-base">
            Enter the amount or select a quick option to recharge.
          </p>
        </div>

        <div className="space-y-4">
          <AmountInput
            amount={amount}
            loading={loading}
            onChange={handleAmountChange}
          />

          <QuickAmounts
            amount={amount}
            quickAmounts={quickAmounts}
            onSelect={handleQuickSelect}
          />

          <PayButton
            amount={amount}
            loading={loading}
            onPay={handleAddBalance}
          />
        </div>
      </div>
    </section>
  );
}

export default AddBalance;
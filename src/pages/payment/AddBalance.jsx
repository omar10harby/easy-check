import React, { useState } from "react";
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

  const quickAmounts = [5, 10, 50];

  function handleAmountChange(e) {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (!rawValue) {
      setAmount("");
      return;
    }
    const numericValue = (parseFloat(rawValue) / 100).toFixed(2);
    setAmount(numericValue);
  }

  function handleQuickSelect(amt) {
    setAmount(amt.toFixed(2));
  }

  async function handleAddBalance() {
    const numericAmount = parseFloat(amount).toString();

    try {
      const result = await dispatch(
        createTopupPaymentThunk({ amount: numericAmount })
      ).unwrap();
      if (result.paymentUrl) window.location.href = result.paymentUrl;
    } catch (error) {
      toast.error(error || "Failed to create payment");
    }
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-light-gray p-8 sm:p-10">
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
      </div>
    </section>
  );
}

export default AddBalance;

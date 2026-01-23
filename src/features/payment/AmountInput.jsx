import React from "react";
import { formatAmount } from "../../utils/helpers";

function AmountInput({ amount, loading, onChange }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase text-dark-bg mb-3">
        Amount to Deposit
      </label>

      <div className="relative group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 font-bold group-focus-within:text-primary transition-colors">
          EGP
        </div>
        <input
          type="text"
          inputMode="decimal"
          value={formatAmount(amount)}
          onChange={onChange}
          placeholder="0.00"
          disabled={loading}
          className="w-full bg-light-gray text-primary border-2 border-medium-gray rounded-2xl py-5 pl-16 text-3xl font-black focus:outline-none focus:border-dark-bg focus:ring-4 focus:ring-primary/20 transition-all"
        />
      </div>

      {amount && parseFloat(amount) < 10 && (
        <p className="text-red-500 text-xs mt-2 ml-1 font-medium italic">
          ⚠️ Minimum deposit is 10.00 EGP
        </p>
      )}
    </div>
  );
}

export default AmountInput;

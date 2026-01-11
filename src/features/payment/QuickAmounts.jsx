import React from "react";

function QuickAmounts({ amount, quickAmounts, onSelect }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-bold text-dark-bg uppercase ml-1">
        Quick Select
      </p>
      <div className="grid grid-cols-3 gap-2">
        {quickAmounts.map((amt) => (
          <button
            key={amt}
            type="button"
            onClick={() => onSelect(amt)}
            className={`py-3 rounded-xl font-bold text-sm transition-all border-2 
              ${
                parseFloat(amount) === amt
                  ? "bg-primary border-primary text-white shadow-md scale-95"
                  : "bg-light-gray border-medium-gray text-primary hover:border-primary/50"
              }`}
          >
            +{amt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickAmounts;

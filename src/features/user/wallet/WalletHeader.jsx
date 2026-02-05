import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function WalletHeader({ onRefresh, loading, count }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between bg-light/5 border border-white/20 mb-6 sm:mb-8 lg:mb-10 p-4 sm:p-5 lg:p-6 rounded-2xl backdrop-blur-md shadow-2xl">
      <button 
        className="text-light p-2 bg-light/5 rounded-lg border border-white/10 backdrop-blur-xl shadow-2xl flex items-center gap-1 sm:gap-2" 
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
        <span className="text-sm sm:text-base font-semibold">Home</span>
      </button>
      <div className="text-right">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-light tracking-tight">
          Wallet History
        </h1>
        <p className="text-xs sm:text-sm text-medium-gray font-medium">
          {count || 0} transactions found
        </p>
      </div>
    </div>
  );
}

export default WalletHeader;
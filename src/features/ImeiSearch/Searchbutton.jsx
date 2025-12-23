import React from "react";
import { ChevronRight } from "lucide-react";

function SearchButton({ onClick, disabled, selectedServicePrice }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center justify-center gap-3 px-6 py-5 bg-main-green hover:bg-[#0a5428] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-black text-lg rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 disabled:hover:scale-100"
    >
      <span>Search Now</span>
      {selectedServicePrice && (
        <>
          <span className="text-lime-yellow">|</span>
          <span className="text-lime-yellow">
            {selectedServicePrice.toFixed(2)} EGP
          </span>
        </>
      )}
      <ChevronRight className="w-5 h-5" />{" "}
    </button>
  );
}

export default SearchButton;

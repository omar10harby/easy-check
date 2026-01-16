import React from "react";
import { ChevronRight } from "lucide-react";

function SearchButton({ onClick, disabled, selectedServicePrice }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center justify-center gap-3 px-6 py-5 bg-primary text-light hover:bg-primary/90 hover:text-light/90 disabled:bg-medium-gray disabled:text-light disabled:cursor-not-allowed  font-black text-lg rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 disabled:hover:scale-100">
      <span>Check Now</span>
      {selectedServicePrice && (
        <>
          <span className="text-light">|</span>
          <span className="text-light">
            {selectedServicePrice} EGP
          </span>
        </>
      )}
      <ChevronRight className="w-5 h-5" />{" "}
    </button>
  );
}

export default SearchButton;

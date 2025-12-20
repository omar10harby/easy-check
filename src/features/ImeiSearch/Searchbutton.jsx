import React from 'react';

function SearchButton({ 
  onClick, 
  disabled, 
  selectedServicePrice 
}) {
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
          <span className="text-lime-yellow">{selectedServicePrice.toFixed(2)} EGP</span>
        </>
      )}
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}

export default SearchButton;
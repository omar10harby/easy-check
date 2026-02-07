import { ChevronRight } from "lucide-react";

function SearchButton({ onClick, disabled, selectedServicePrice, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={loading ? "Processing..." : `Check device now${selectedServicePrice ? ` for ${selectedServicePrice} EGP` : ''}`}
      aria-busy={loading}
      className="w-full flex items-center justify-center gap-3 px-5 sm:px-6 py-4 sm:py-5 bg-primary text-light hover:bg-primary/90 hover:text-light/90 disabled:bg-medium-gray disabled:text-light disabled:cursor-not-allowed font-black text-lg rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 disabled:hover:scale-100"
    >
      {loading ? (
        <div
          className="w-6 h-6 border-2 border-light border-t-transparent rounded-full animate-spin"
          aria-hidden="true"
        ></div>
      ) : (
        <>
          <span>Check Now</span>
          {selectedServicePrice && (
            <>
              <span className="text-light" aria-hidden="true">|</span>
              <span className="text-light">
                {selectedServicePrice} EGP
              </span>
            </>
          )}
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </>
      )}
    </button>
  );
}

export default SearchButton;

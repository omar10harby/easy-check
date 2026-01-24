import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({
  page,
  totalPages,
  hasNext,
  hasPrev,
  onPrevious,
  onNext,
  loading,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 w-full max-w-md mx-auto bg-light/5 p-3 sm:p-4 mt-8 sm:mt-10 lg:mt-12 rounded-2xl border border-white/20 backdrop-blur-md shadow-2xl">
      {/* زر السابق */}
      <button
        onClick={onPrevious}
        disabled={!hasPrev || loading}
        className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl text-medium-gray hover:text-light hover:bg-light/10 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed group"
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* معلومات الصفحة */}
      <div className="flex items-center px-5 sm:px-6 py-2 sm:py-2.5 bg-light/5 rounded-lg border border-white/10">
        <span className="text-xs sm:text-sm text-light font-bold uppercase tracking-tight mr-2 sm:mr-3">
          Page
        </span>
        <div className="flex items-baseline gap-1">
          <span className="text-lg sm:text-xl font-black text-light tabular-nums">
            {page}
          </span>
          <span className="text-light font-medium">/</span>
          <span className="text-sm sm:text-base font-bold text-medium-gray tabular-nums">
            {totalPages}
          </span>
        </div>
      </div>

      {/* زر التالي */}
      <button
        onClick={onNext}
        disabled={!hasNext || loading}
        className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-light text-primary hover:bg-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed group"
        aria-label="Next Page"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
}

export default Pagination;
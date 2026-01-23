import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({
  page,
  totalPages,
  hasNext,
  hasPrev,
  onPrevious,
  onNext,
  loading,
  useMockData,
}) {
  if (totalPages <= 1) return null;

  return (
        <div className="flex items-center justify-between gap-3 w-fit mx-auto bg-light/5 p-2 mt-10  rounded-2xl border border-light/10 backdrop-blur-md shadow-2xl">
        {/* زر السابق - شفاف وهادي */}
        <button
          onClick={onPrevious}
          disabled={!hasPrev || loading || useMockData}
          className="flex items-center justify-center w-12 h-12 rounded-xl text-medium-gray hover:text-light hover:bg-light/10 transition-all duration-300 disabled:opacity-10 disabled:cursor-not-allowed group"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <div className="flex items-center px-4 py-2 bg-light/5 rounded-lg border border-light/5">
          <span className="text-xs text-light font-bold uppercase tracking-tighter mr-3">
            Page
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-light tabular-nums">
              {page}
            </span>
            <span className="text-light font-medium">/</span>
            <span className="text-sm font-bold text-medium-gray tabular-nums">
              {totalPages}
            </span>
          </div>
        </div>

        <button
          onClick={onNext}
          disabled={!hasNext || loading || useMockData}
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-light text-primary hover:bg-gray-200 shadow-lg shadow-light/5 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed group"
          aria-label="Next Page"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
  );
}

export default Pagination;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';

function SearchHeader({ onRefresh, loading, count, useMockData }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6 sm:mb-8 lg:mb-10 px-1 sm:px-2 lg:px-4">
      <div className="flex items-center gap-2 sm:gap-4 lg:gap-5">
        <button
          onClick={() => navigate('/')}
          className="p-2 sm:p-2.5 lg:p-3 bg-light hover:bg-light-gray text-primary rounded-lg sm:rounded-xl shadow-sm border border-light-gray transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-light tracking-tight">
            Search History
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-medium-gray font-medium">
            {count || 0} checks performed
          </p>
        </div>
      </div>
      <button
        onClick={onRefresh}
        disabled={loading || useMockData}
        className="p-2 sm:p-2.5 lg:p-3 bg-light hover:bg-light-gray text-primary rounded-lg sm:rounded-xl shadow-sm border border-light-gray transition-all active:scale-95 "
      >
        <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${loading ? 'animate-spin' : ''}`} />
      </button>
    </div>
  );
}

export default SearchHeader;
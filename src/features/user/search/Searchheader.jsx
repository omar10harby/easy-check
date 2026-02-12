import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';

function SearchHeader({ onRefresh, loading, count, useMockData }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6 sm:mb-8 px-1 sm:px-2">
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={() => navigate('/')}
          className="p-2 sm:p-2.5 bg-white hover:bg-gray-100 text-gray-700 rounded-lg sm:rounded-xl shadow-sm border border-gray-200 transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Search History
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            {count || 0} checks performed
          </p>
        </div>
      </div>
      <button
        onClick={onRefresh}
        disabled={loading || useMockData}
        className="p-2 sm:p-2.5 bg-white hover:bg-gray-100 text-gray-700 rounded-lg sm:rounded-xl shadow-sm border border-gray-200 transition-all active:scale-95 disabled:opacity-50"
      >
        <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 ${loading ? 'animate-spin' : ''}`} />
      </button>
    </div>
  );
}

export default SearchHeader;
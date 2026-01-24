import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';


function UserPagesHeader({ title, subtitle, onRefresh, loading, useMockData }) {
const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-8 px-1 sm:px-4">
      <div className="flex items-center gap-4 sm:gap-6">
        <button
          onClick={() => navigate('/')}
          className="p-2.5 sm:p-3 bg-light hover:bg-light-gray text-primary rounded-2xl shadow-sm transition-all active:scale-95 flex items-center justify-center border border-medium-gray/20"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-light tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-medium-gray font-medium mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      {/* زر التحديث */}
      <button
        onClick={onRefresh}
        disabled={loading || useMockData}
        className="p-2.5 sm:p-3 bg-light hover:bg-light-gray text-primary rounded-2xl shadow-sm transition-all disabled:opacity-50 active:rotate-180 border border-medium-gray/20"
      >
        <RefreshCw className={`w-5 h-5 sm:w-6 sm:h-6 ${loading ? 'animate-spin' : ''}`} />
      </button>
    </div>
  );
}

export default UserPagesHeader


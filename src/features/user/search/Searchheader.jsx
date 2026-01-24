import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';

function SearchHeader({ onRefresh, loading, count, useMockData }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between bg-light/5 border border-light/10  mb-6 sm:mb-8 lg:mb-10 p-3 sm:p-4 lg:p-6 rounded-2xl backdrop-blur-md shadow-2xl">
       <button className="text-light p-2  bg-light/5 rounded-lg border border-light/5 backdrop-blur-xl shadow-2xl flex items-center gap-0.5 sm:gap-1 " onClick={()=>navigate("/")}>
         <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 " />
         <span className="text-xs sm:text-base font-semibold">Home</span>
       </button>
       <div>
         <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-light tracking-tight">
           Search History
         </h1>
         <p className="text-xs sm:text-sm lg:text-base text-medium-gray font-medium">
           {count || 0} checks performed
         </p>
       </div>
     </div>
  );
}

export default SearchHeader;
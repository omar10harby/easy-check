import React from 'react';

function SearchLoading({ count  }) {
  return (
    <div className="space-y-5">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-light rounded-2xl lg:rounded-3xl shadow-md border border-gray-200 overflow-hidden animate-pulse"
        >
          {/* Header Skeleton */}
          <div className="bg-gray-300 p-5 sm:p-6 lg:p-7 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Icon Placeholder */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-gray-400 rounded-lg"></div>
              
              {/* Text Placeholders */}
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-400 rounded"></div>
                <div className="h-3 w-16 bg-gray-400 rounded"></div>
              </div>
            </div>
            
            {/* Date Placeholder */}
            <div className="text-right space-y-2">
              <div className="h-4 w-20 bg-gray-400 rounded ml-auto"></div>
              <div className="h-3 w-16 bg-gray-400 rounded ml-auto"></div>
            </div>
          </div>

          {/* Body Skeleton */}
          <div className="p-5 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
              {/* Service Name */}
              <div className="flex-1 text-center sm:text-left space-y-2">
                <div className="h-3 w-16 bg-gray-300 rounded mx-auto sm:mx-0"></div>
                <div className="h-5 w-32 bg-gray-300 rounded mx-auto sm:mx-0"></div>
              </div>

              {/* IMEI/Serial */}
              <div className="flex-1 sm:text-right space-y-2">
                <div className="h-3 w-24 bg-gray-300 rounded ml-auto"></div>
                <div className="h-5 w-36 bg-gray-300 rounded ml-auto"></div>
              </div>
            </div>

            {/* Action Button Placeholder */}
            <div className="pt-3 sm:pt-4 border-t border-gray-100">
              <div className="h-12 w-full bg-gray-300 rounded-xl"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchLoading;
import React from 'react';

function WalletHistorySkeleton({ count = 3 }) {
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
                <div className="h-4 w-28 bg-gray-400 rounded"></div>
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
            <div className="flex items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
              {/* Amount */}
              <div className="flex-1 text-left space-y-2">
                <div className="h-3 w-16 bg-gray-300 rounded"></div>
                <div className="h-8 w-32 bg-gray-300 rounded"></div>
              </div>

              {/* Balance After */}
              <div className="flex-1 text-right space-y-2">
                <div className="h-3 w-24 bg-gray-300 rounded ml-auto"></div>
                <div className="h-6 w-28 bg-gray-300 rounded ml-auto"></div>
              </div>
            </div>

            {/* Note Placeholder */}
            <div className="bg-light-gray rounded-xl p-4 border border-gray-100">
              <div className="h-3 w-12 bg-gray-300 rounded mb-2"></div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-300 rounded"></div>
                <div className="h-3 w-4/5 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WalletHistorySkeleton;
import React from 'react'

function ImeiCheckerLoading() {
  return (
    <section className="w-full max-w-2xl py-8 px-4">
         <div className="bg-light rounded-3xl shadow-2xl border border-light-gray p-6 sm:p-10">
          
          {/* Header Skeleton */}
          <div className="text-center mb-8 space-y-3">
            <div className="h-10 w-64 bg-gray-200 rounded-lg mx-auto animate-pulse"></div>
            <div className="h-4 w-80 max-w-full bg-gray-100 rounded mx-auto animate-pulse"></div>
          </div>

          <div className="space-y-4">
            
            {/* Service Selector Skeleton */}
            <div>
              <div className="h-3 w-16 bg-gray-200 rounded mb-3 animate-pulse"></div>
              <div className="h-16 w-full bg-light-gray border-2 border-medium-gray rounded-2xl animate-pulse"></div>
            </div>

         

            {/* IMEI Input Skeleton */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-3 w-28 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex gap-2 bg-light-gray p-1 rounded-xl border border-medium-gray">
                  <div className="h-7 w-16 bg-gray-300 rounded-lg animate-pulse"></div>
                  <div className="h-7 w-16 bg-gray-300 rounded-lg animate-pulse"></div>
                </div>
              </div>
              <div className="h-14 w-full bg-light-gray border-2 border-medium-gray rounded-2xl animate-pulse"></div>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-3 w-48 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Search Button Skeleton */}
            <div className="h-16 w-full bg-gray-300 rounded-2xl animate-pulse"></div>
            
          </div>
        </div>
    </section>
  );
}

export default ImeiCheckerLoading

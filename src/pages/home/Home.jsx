import React from 'react';
import { Search, Shield, Lock, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-white overflow-hidden flex flex-col">
      {/* Hero Section - Takes full height */}
      <section className="flex-1 relative px-4 sm:px-6 lg:px-8 overflow-hidden flex items-center">
        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#e5fb34] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-[#073e1d] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#e5fb34] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center w-full">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 sm:mb-8 bg-[#e5fb34]/10 border border-[#e5fb34]/30 rounded-full">
            <Shield className="w-4 h-4 text-[#073e1d]" />
            <span className="text-xs sm:text-sm font-semibold text-[#073e1d] tracking-wide">
              TRUSTED BY 10K+ REPAIR SHOPS
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-[#181818] mb-4 sm:mb-6 leading-tight px-4">
            Verify Device
            <br />
            <span className="text-[#073e1d]">Authenticity</span>{' '}
            <span className="relative text-[#073e1d] inline-block">
              Instantly
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-[#e5fb34]"
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6C50 2 150 2 198 6"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-12 leading-relaxed px-4">
            The most reliable tool to check blacklist status, warranty, carrier lock,
            and model details for any device. Fast, accurate, and secure analysis.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
              <div className="w-2 h-2 bg-[#073e1d] rounded-full"></div>
              <span className="text-xs sm:text-sm font-medium text-[#181818]">Global Blacklist</span>
            </div>
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
              <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-[#073e1d]" />
              <span className="text-xs sm:text-sm font-medium text-[#181818]">Carrier Lock</span>
            </div>
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
              <div className="w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#e5fb34] fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" fill="#ff9500"/>
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-medium text-[#181818]">iCloud Status</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => navigate('/imei-checker')}
            className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#e5fb34] text-[#181818] text-base sm:text-lg font-bold rounded-xl hover:bg-[#d4ea23] transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Go to IMEI Search Page</span>
            <span className="sm:hidden">Search IMEI</span>
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mt-8 sm:mt-12 text-xs sm:text-sm text-gray-500 px-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Official GSMA Data</span>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Brands Footer - Fixed at bottom */}
      <section className="border-t border-gray-100 py-4 sm:py-6 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-8 text-xs sm:text-sm text-gray-400">
            <span className="font-medium">© 2023 IMEI Check Inc.</span>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-[#181818] transition-colors">Privacy</a>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-[#181818] transition-colors">Terms</a>
            <span className="hidden sm:inline flex-grow"></span>
            <div className="flex items-center gap-3 sm:gap-6">
              <span className="font-medium text-gray-500">🍎 Apple</span>
              <span className="font-medium text-gray-500">📱 Samsung</span>
              <span className="font-medium text-gray-500">📲 Xiaomi</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
import { Search, ChevronRight } from "lucide-react";

function HeroSection({ onSearchClick }) {
  return (
    <>
      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-light mb-4 sm:mb-6 leading-tight px-6">
        Verify Device
        <br />
        <span className="text-light mt-2 space-x-2 block">
          <span>Authenticity</span>
          <span className="relative inline-block text-light">
            Instantly
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-light-gray"
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
        </span>
      </h1>

      {/* Description */}
      <p className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-medium-gray mb-8 sm:mb-12 leading-relaxed px-4">
        Check blacklist, warranty, and carrier lock status in seconds. Fast,
        accurate, and secure.
      </p>

      {/* CTA Button */}
      <button
        onClick={onSearchClick}
        className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-light text-primary text-base sm:text-lg font-bold rounded-xl hover:bg-light-gray transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
      >
        <Search className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Check Your Device Now</span>
        <span className="sm:hidden">Check Now</span>
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </>
  );
}

export default HeroSection;
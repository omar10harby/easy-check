import { Search, ChevronRight, Sparkles } from "lucide-react";

function HeroSection({ onSearchClick }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="inline-flex items-center gap-2 rounded-full border border-light/20 bg-light/10 px-3 py-1 text-[11px] sm:text-xs font-semibold text-light shadow-sm">
        <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
        Instant device intelligence
        <Sparkles className="w-4 h-4 text-amber-200" />
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-light leading-tight">
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
      <p className="max-w-2xl text-sm sm:text-base lg:text-lg text-light/80 leading-relaxed">
        Check blacklist, warranty, and carrier lock status in seconds. Get real-time results with a guided flow on any device.
      </p>

      {/* CTA Button */}
      <button
        onClick={onSearchClick}
        className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-light to-light-gray text-primary text-base sm:text-lg font-bold rounded-xl hover:-translate-y-0.5 transition-all shadow-xl hover:shadow-2xl active:scale-95"
      >
        <Search className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Check Your Device Now</span>
        <span className="sm:hidden">Check Now</span>
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}

export default HeroSection;

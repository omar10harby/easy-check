import { Mail, AlertCircle } from 'lucide-react';

function EmailInput({ value, onChange, error, disabled = false }) {
  return (
    <div>
      {/* Label */}
      <label className="block text-sm font-bold text-dark-bg mb-3">
        Email Address
      </label>

      {/* Input Field */}
      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 w-5 h-5" />
        <input
          type="email"
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder="your@email.com"
          className={`w-full pl-12 pr-5 py-4 bg-light-gray border-2 rounded-2xl text-base
            text-primary placeholder:text-primary/30 focus:outline-none transition-all
            disabled:bg-medium-gray disabled:cursor-not-allowed
            ${error 
              ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/20' 
              : 'border-medium-gray focus:border-dark-bg focus:ring-4 focus:ring-primary/30'
            }`}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 text-red-500 text-xs mt-2 font-bold">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Info Text */}
      <div className="flex items-center gap-2 mt-2 text-xs text-primary/60">
        <span>📧</span>
        <span>Results are usually ready instantly. If there's a delay, we'll email them to you once they're finalized.</span>
      </div>
    </div>
  );
}

export default EmailInput;
import { Mail, AlertCircle } from 'lucide-react';
import React from 'react';

function EmailInput({ value, onChange, error, disabled = false }) {
  return (
    <div>
      <label htmlFor="guest-email-input" className="block text-sm font-bold text-dark-bg mb-2">
        Email Address
      </label>

      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 w-5 h-5" aria-hidden="true" />
        <input
          id="guest-email-input"
          type="email"
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder="your@email.com"
          aria-describedby={error ? "email-error" : "email-hint"}
          aria-invalid={!!error}
          className={`w-full pl-12 pr-5 py-2.5 sm:py-4 bg-light-gray border-2 rounded-2xl text-base
            text-primary placeholder:text-primary/30 focus:outline-none transition-all
            disabled:bg-medium-gray disabled:cursor-not-allowed
            ${error
              ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/20'
              : 'border-medium-gray focus:border-dark-bg focus:ring-4 focus:ring-primary/30'
            }`}
        />
      </div>

      {error && (
        <div id="email-error" role="alert" className="flex items-center gap-2 text-red-500 text-xs mt-2 font-bold">
          <AlertCircle className="w-4 h-4" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      <div id="email-hint" className="flex items-center gap-2 mt-2 text-xs text-primary/60">
        <span aria-hidden="true">📧</span>
        <span>Results are usually ready instantly. If there's a delay, we'll email them to you once they're finalized.</span>
      </div>
    </div>
  );
}

export default React.memo(EmailInput);

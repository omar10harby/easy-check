import React from 'react';
import { Info } from 'lucide-react';

function ImeiInput({ value, onChange, maxLength = 15 }) {
  return (
    <div >
      <label className="block text-sm font-bold text-dark mb-3">
        IMEI Number
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="356938035664380"
          className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl font-mono text-lg tracking-widest text-gray-400 focus:text-dark focus:outline-none focus:border-lime-yellow focus:ring-4 focus:ring-lime-yellow/20 transition-all"
          maxLength={maxLength}
        />
        <span className="absolute right-4 bottom-4 text-xs font-semibold text-gray-400">
          {value.length}/{maxLength}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
        <Info className="w-4 h-4" />
        <span dir="rtl" className="text-right flex-1">للحصول علي imei اطلب #06#*</span>
      </div>
    </div>
  );
}

export default ImeiInput;
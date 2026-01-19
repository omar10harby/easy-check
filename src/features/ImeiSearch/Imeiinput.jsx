import React, { useState } from 'react';
import { Info } from 'lucide-react';

function ImeiInput({ value, onChange, maxLength, onTypeChange, disabled = false}) {
  const [inputType, setInputType] = useState('imei'); // 'imei' or 'serial'

  const handleTypeChange = (type) => {
    setInputType(type);
    onTypeChange(type);
  };

  return (
    <div>
      {/* Type Selector Buttons */}
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-bold text-dark-bg">
          Device Number
        </label>
        
        <div className="flex gap-2 bg-light-gray p-1 rounded-xl border border-medium-gray">
          <button
            type="button"
            onClick={() => handleTypeChange('imei')}
            className={`px-4 py-1.5 rounded-lg font-bold text-xs transition-all ${
              inputType === 'imei'
                ? 'bg-primary text-light shadow-md'
                : 'text-primary/60 hover:text-primary'
            }`}
          >
            IMEI
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange('serial')}
            className={`px-4 py-1.5 rounded-lg font-bold text-xs transition-all ${
              inputType === 'serial'
                ? 'bg-primary text-light shadow-md'
                : 'text-primary/60 hover:text-primary'
            }`}
          >
            Serial
          </button>
        </div>
      </div>

      {/* Input Field */}
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={inputType === 'imei' ? '356938035664380' : 'C02ABC12XYZ'}
          className="w-full px-5 py-4 bg-light-gray border-2 border-medium-gray rounded-2xl text-base disabled:bg-medium-gray disabled:cursor-not-allowed
           text-primary/50 placeholder:text-primary/30 focus:text-primary focus:outline-none focus:border-dark-bg focus:ring-4 focus:ring-primary/30 transition-all uppercase"
          maxLength={maxLength}
        />
        
        {/* Character Counter (Only for IMEI) */}
        {inputType === 'imei' && (
          <div className="absolute right-5 top-1/2 -translate-y-1/2">
            <span className="text-xs font-semibold text-primary/40">
              {value.length}/{maxLength}
            </span>
          </div>
        )}
      </div>

      {/* Info Text */}
      <div className="flex items-center gap-2 mt-2 text-xs text-primary/60">
        <Info className="w-4 h-4 flex-0" />
        <span dir="rtl" className="text-right flex-1">
          {inputType === 'imei' 
            ? 'للحصول علي IMEI اطلب #06#*' 
            : 'ابحث عن S/N في إعدادات الجهاز أو على العلبة'}
        </span>
      </div>
    </div>
  );
}

export default ImeiInput;
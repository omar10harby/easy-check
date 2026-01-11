import React, { useState } from 'react';
import { Info } from 'lucide-react';

function ImeiInput({ value, onChange, maxLength, onTypeChange }) {
  const [inputType, setInputType] = useState('imei'); // 'imei' or 'serial'

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setInputType(type);
    onTypeChange(type);
  };

  return (
    <div>
      <label className="block text-sm font-bold text-dark-bg mb-3">
        Device Number
      </label>
      <div className="relative">
        {/* Input Field */}
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={inputType === 'imei' ? '356938035664380' : 'C02ABC12XYZ'}
          className="w-full px-2 md:px-5 py-4 pr-32 bg-light-gray border-2 border-medium-gray rounded-2xl  text-lg 
           text-primary/50 placeholder:text-primary/30 focus:text-primary focus:outline-none  focus:border-dark-bg focus:ring-4 focus:ring-primary/30 transition-all uppercase"
          maxLength={maxLength}
        />
        
        {/* Type Selector - داخل الـ Input على اليمين */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {
            inputType === 'imei' &&(
                 <span className="text-xs font-semibold text-primary/40">
            {value.length}/{maxLength}
          </span>
            )
          }
          <div className="h-8 w-px bg-medium-gray"></div>
          <select
            value={inputType}
            onChange={handleTypeChange}
            className="px-3 py-1.5 bg-transparent border-none font-bold text-sm text-primary focus:outline-none cursor-pointer"
          >
            <option value="imei">IMEI</option>
            <option value="serial">Serial</option>
          </select>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2 text-xs text-primary/60">
        <Info className="w-4 h-4" />
        <span dir="rtl" className="text-right flex-1">
          {inputType === 'imei' 
            ? 'للحصول علي IMEI اطلب #06#*' 
            : 'Serial Number يحتوي على حروف وأرقام'}
        </span>
      </div>
    </div>
  );
}

export default ImeiInput;
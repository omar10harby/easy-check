import { useState } from "react";
import { Info } from "lucide-react";

function ImeiInput({
  value,
  onChange,
  maxLength,
  onTypeChange,
  disabled = false,
}) {
  const [inputType, setInputType] = useState(""); // 'imei' or 'serial'

  const handleTypeChange = (type) => {
    setInputType(type);
    onTypeChange(type);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor="device-number-input"
          className="block text-sm font-bold text-dark-bg"
        >
          Device Number
        </label>

        <div
          className="flex gap-2 bg-light-gray p-1 rounded-xl border border-medium-gray"
          role="group"
          aria-label="Select input type"
        >
          <button
            type="button"
            onClick={() => handleTypeChange("imei")}
            aria-pressed={inputType === "imei"}
            className={`px-4 py-1.5 rounded-lg font-bold text-xs transition-all  ${
              inputType === "imei"
                ? "bg-primary text-light shadow-md"
                : "text-primary/60 hover:text-primary"
            }`}
          >
            IMEI
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange("serial")}
            aria-pressed={inputType === "serial"}
            className={`px-4 py-1.5 rounded-lg font-bold text-xs transition-all  ${
              inputType === "serial"
                ? "bg-primary text-light shadow-md"
                : "text-primary/60 hover:text-primary"
            }`}
          >
            Serial
          </button>
        </div>
      </div>

      <div className="relative">
        <input
          id="device-number-input"
          type="text"
          value={value}
          onChange={onChange}
          disabled={disabled || inputType === ""}
          placeholder={
            inputType === ""
              ? "Select Serial or IMEI"
              : inputType === "imei"
                ? "356938035664380"
                : "C02ABC12XYZ"
          }
          aria-describedby="device-number-hint"
          aria-label={
            inputType === "imei" ? "Enter IMEI number" : "Enter Serial number"
          }
          className="w-full px-5 py-2.5 sm:py-4 bg-light-gray border-2 border-medium-gray rounded-2xl text-base disabled:bg-medium-gray disabled:cursor-not-allowed
           text-primary/50 placeholder:text-primary/30 disabled:placeholder:text-light disabled:placeholder:font-black focus:text-primary focus:outline-none focus:border-dark-bg focus:ring-4 focus:ring-primary/30 transition-all uppercase"
          maxLength={maxLength}
        />

        {inputType === "imei" && (
          <div
            className="absolute right-5 top-1/2 -translate-y-1/2"
            aria-hidden="true"
          >
            <span className="text-xs font-semibold text-primary/40">
              {value.length}/{maxLength}
            </span>
          </div>
        )}
      </div>

      {inputType && (
        <div
          id="device-number-hint"
          className="flex items-center gap-2 mt-2  text-xs text-primary/60"
        >
          <Info className="w-4 h-4" aria-hidden="true" />
          <span className="flex-1">
            {inputType === "imei"
              ? "Dial *#06# to get your IMEI"
              : "Find the S/N in device settings or on the box"}
          </span>
        </div>
      )}
    </div>
  );
}

export default ImeiInput;

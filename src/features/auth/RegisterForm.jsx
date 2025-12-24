import React from "react";
import { useForm } from "react-hook-form";
import { Lock, AlertCircle } from "lucide-react";
import PhoneInput from "./PhoneInput";
import { parsePhoneNumberFromString } from "libphonenumber-js";

function RegisterForm({ onSubmit, loading, error }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      phone_number: "",
      password: "",
      confirm_password: "",
    },
  });

  const phoneValue = watch("phone_number");
  const password = watch("password");

  const handlePhoneChange = (value) => {
    if (!value) {
      setValue("phone_number", "", { shouldValidate: true });
      return;
    }
    let cleaned = value.startsWith("+") ? value : `+${value}`;
    cleaned = cleaned.replace(/[^\d+]/g, "");

    if (cleaned.startsWith("+200")) {
      cleaned = cleaned.replace("+200", "+20");
    }
    setValue("phone_number", cleaned, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        type="hidden"
        {...register("phone_number", {
          required: "Phone number is required",
          validate: (value) => {
            if (!value || value === "+") return "Phone number is required";

            // Egypt-specific strict validation
            if (value.startsWith("+20")) {
              if (value.length !== 13) return "Egypt mobile must be 11 digits total";
              const validPrefixes = ["10", "11", "12", "15"];
              const prefix = value.substring(3, 5);
              if (!validPrefixes.includes(prefix)) return "Invalid Egypt mobile provider";
              return true;
            }

            // Global validation for other countries
            try {
              const phoneNumber = parsePhoneNumberFromString(value);
              return (phoneNumber && phoneNumber.isValid()) || "Invalid international number";
            } catch (e) {
              return "Invalid format";
            }
          },
        })}
      />

      <PhoneInput
        value={phoneValue}
        onChange={handlePhoneChange}
        error={errors.phone_number?.message}
        disabled={loading}
      />

      {/*  PASSWORD*/}
      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase text-main-green ml-1">Password</label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" size={18} />
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Minimum 8 characters" },
              maxLength: { value: 20, message: "Maximum 20 characters" },
              pattern: {
    
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/,
                message: "Must include 1 uppercase letter and 1 number",
              },
            })}
            className={`w-full bg-gray-50 border-2 ${errors.password ? "border-red-500" : "border-dark/10"} rounded-2xl py-4 pl-12 pr-4 font-bold outline-none transition-all`}
            placeholder="••••••••"
            disabled={loading}
          />
        </div>
        {errors.password && (
          <div className="flex items-center gap-2 text-red-500 text-xs mt-1 ml-1 font-bold">
            <AlertCircle size={12} />
            <span>{errors.password.message}</span>
          </div>
        )}
      </div>

      {/*CONFIRM PASSWORD */}
      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase text-main-green ml-1">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" size={18} />
          <input
            type="password"
            {...register("confirm_password", {
              required: "Confirmation is required",
              validate: (value) => value === password || "Passwords do not match",
            })}
            className={`w-full bg-gray-50 border-2 ${errors.confirm_password ? "border-red-500" : "border-dark/10"} rounded-2xl py-4 pl-12 pr-4 font-bold outline-none transition-all`}
            placeholder="••••••••"
            disabled={loading}
          />
        </div>
        {errors.confirm_password && (
          <div className="flex items-center gap-2 text-red-500 text-xs mt-1 ml-1 font-bold">
            <AlertCircle size={12} />
            <span>{errors.confirm_password.message}</span>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-dark hover:bg-main-green disabled:bg-gray-400 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all mt-6 shadow-xl"
      >
        {loading ? "Registering..." : "Create Account"}
      </button>
    </form>
  );
}

export default RegisterForm;
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import PhoneInput from "./PhoneInput";
import parsePhoneNumberFromString from "libphonenumber-js";

function LoginForm({ onSubmit, loading, error }) {
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
    },
  });

  const phoneValue = watch("phone_number");
  const [showPassword, setShowPassword] = useState(false);

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
      {/* Phone Number Field */}
      <input
        type="hidden"
        {...register("phone_number", {
          required: "Phone number is required",
          validate: (value) => {
            if (!value || value === "+") return "Phone number is required";

            // Egypt-specific strict validation
            if (value.startsWith("+20")) {
              if (value.length !== 13)
                return "Egypt mobile must be 11 digits total";
              const validPrefixes = ["10", "11", "12", "15"];
              const prefix = value.substring(3, 5);
              if (!validPrefixes.includes(prefix))
                return "Invalid Egypt mobile provider";
              return true;
            }

            // Global validation for other countries
            try {
              const phoneNumber = parsePhoneNumberFromString(value);
              return (
                (phoneNumber && phoneNumber.isValid()) ||
                "Invalid international number"
              );
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

      {/* Password Field */}
      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase text-dark-bg ml-1">
          Password
        </label>
        <div className="relative">
          <Lock
            className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-bg"
            size={18}
          />
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className={`w-full bg-light-gray border-2 ${
              errors.password ? "border-red-500" : "border-medium-gray"
            } rounded-2xl py-4 pl-12 pr-12 font-bold focus:bg-light focus:border-dark-bg focus:ring-4 focus:ring-primary/30 outline-none transition-all`}
            placeholder="••••••••"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-bg hover:text-dark-bg/70 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <div className="flex items-center gap-2 text-red-500 text-xs mt-1 ml-1">
            <AlertCircle size={12} />
            <span>{errors.password.message}</span>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary hover:bg-primary/80 disabled:bg-medium-gray disabled:cursor-not-allowed text-light py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all mt-6 shadow-xl shadow-gray-200"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-ligth border-t-light-gray rounded-full animate-spin"></div>
            <span>Logging...</span>
          </>
        ) : (
          <span>Login</span>
        )}
      </button>
    </form>
  );
}

export default LoginForm;

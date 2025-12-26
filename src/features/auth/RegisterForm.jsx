import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import PhoneInput from "./PhoneInput";
import { confirmPasswordValidation, PasswordValidation, PhoneValidation } from "../../utils/validations";
import { SanitizePhoneNumber } from "../../utils/sanitizer";

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
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePhoneChange = (value) => {
   const sanitized = SanitizePhoneNumber(value);
    setValue("phone_number", sanitized, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        type="hidden"
        {...register("phone_number", PhoneValidation)}
      />

      <PhoneInput
        value={phoneValue}
        onChange={handlePhoneChange}
        error={errors.phone_number?.message}
        disabled={loading}
      />

      {/* PASSWORD */}
      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase text-main-green ml-1">Password</label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", PasswordValidation)}
            className={`w-full bg-gray-50 border-2 ${errors.password ? "border-red-500" : "border-dark/10"} rounded-2xl py-4 pl-12 pr-12 font-bold outline-none transition-all focus:border-lime-yellow focus:ring-4 focus:ring-lime-yellow/20`}
            placeholder="••••••••"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/30 hover:text-dark/60 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <div className="flex items-center gap-2 text-red-500 text-xs mt-1 ml-1 font-bold">
            <AlertCircle size={12} />
            <span>{errors.password.message}</span>
          </div>
        )}
      </div>

      {/* CONFIRM PASSWORD */}
      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase text-main-green ml-1">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" size={18} />
          <input
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirm_password", confirmPasswordValidation(password))}
            className={`w-full bg-gray-50 border-2 ${errors.confirm_password ? "border-red-500" : "border-dark/10"} rounded-2xl py-4 pl-12 pr-12 font-bold outline-none transition-all focus:border-lime-yellow focus:ring-4 focus:ring-lime-yellow/20`}
            placeholder="••••••••"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/30 hover:text-dark/60 transition-colors"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirm_password && (
          <div className="flex items-center gap-2 text-red-500 text-xs mt-1 ml-1 font-bold">
            <AlertCircle size={12} />
            <span>{errors.confirm_password.message}</span>
          </div>
        )}
      </div>

      {/* Server Error */}
      {error && (
        <div className="flex items-center gap-2 text-red-500 text-sm p-3 bg-red-50 rounded-xl">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-dark hover:bg-main-green disabled:bg-gray-400 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all mt-6 shadow-xl"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Registering...</span>
          </>
        ) : (
          <span>Create Account</span>
        )}
      </button>
    </form>
  );
}

export default RegisterForm;
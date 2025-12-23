import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { X, Lock, AlertCircle, Phone } from "lucide-react";
import { 
  loginUserThunk, 
  registerUserThunk, 
  clearError,

} from "./authSlice";

function AuthModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [isLogin, setIsLogin] = useState(true);

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    watch,
    setValue
  } = useForm({
    mode: "onChange",
    defaultValues: {
      phone_number: "",
      password: "",
      confirmPassword: "",
    }
  });

  const password = watch("password");

  // Clear errors when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      dispatch(clearError());
      reset();
    }
  }, [isOpen, dispatch, reset]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        // Login
        await dispatch(loginUserThunk({
          phone_number: data.phone_number,
          password: data.password,
        })).unwrap();

        // Success
        toast.success('Login successful! Welcome back! 🎉');
        reset();
        onClose();
      } else {
        // Register
        await dispatch(registerUserThunk({
          phone_number: data.phone_number,
          password: data.password,
          confirm_password: data.confirm_password,
        })).unwrap();

        // Success
        toast.success('Registration successful! Please login. ✅');
        reset({ phone_number: data.phone_number, password: "", confirmPassword: "" });
        setIsLogin(true);
      }
    } catch (error) {
      // Error is handled by Redux and shown below form
      toast.error(error || 'An error occurred. Please try again.');
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    reset();
    dispatch(clearError());
  };

  // Handle ESC key
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-md bg-white rounded-4xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toggle Header */}
        <div className="flex bg-dark p-1 m-4 rounded-2xl">
          <button
            onClick={handleToggleMode}
            type="button"
            disabled={loading}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
              isLogin ? "bg-lime-yellow text-dark" : "text-white/60"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={handleToggleMode}
            type="button"
            disabled={loading}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
              !isLogin ? "bg-lime-yellow text-dark" : "text-white/60"
            }`}
          >
            Register
          </button>
        </div>

        <button
          onClick={onClose}
          type="button"
          className="absolute top-6 right-6 text-dark/40 hover:text-dark transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8 pt-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-dark uppercase tracking-tighter">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              {isLogin ? "Sign in to continue" : "Sign up to get started"}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Phone Number Field - International */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-main-green ml-1">
                Phone Number (International)
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" size={18} />
                <input
                  type="text"
                  {...register("phone_number", {
                    required: "Phone number is required",
                    minLength: {
                      value: 10,
                      message: "Phone number must be at least 10 digits"
                    },
                    maxLength: {
                      value: 15,
                      message: "Phone number must be maximum 15 digits"
                    },
                    pattern: {
                      value: /^\+?[0-9]{10,15}$/,
                      message: "Invalid phone format (use international format, e.g., +201234567890)"
                    },
                    onChange: (e) => {
                      // Allow + and numbers only
                      const value = e.target.value.replace(/[^\d+]/g, '');
                      setValue("phone", value);
                    }
                  })}
                  className={`w-full bg-gray-50 border-2 ${
                    errors.phone ? "border-red-500" : "border-dark/10"
                  } rounded-2xl py-4 pl-12 pr-4 font-bold focus:border-lime-yellow focus:ring-4 focus:ring-lime-yellow/20 outline-none transition-all`}
                  placeholder="+201234567890"
                  disabled={loading}
                />
              </div>
              {errors.phone && (
                <div className="flex items-center gap-2 text-red-500 text-xs mt-1 ml-1">
                  <AlertCircle size={12} />
                  <span>{errors.phone.message}</span>
                </div>
              )}
              <p className="text-xs text-gray-500 ml-1">
                Include country code (e.g., +20 for Egypt, +1 for USA)
              </p>
            </div>

            {/* Password Field - Enhanced Validation */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-main-green ml-1">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30"
                  size={18}
                />
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters"
                    },
                    maxLength: {
                      value: 20,
                      message: "Password must be maximum 20 characters"
                    },
                    validate: {
                      hasNumber: (value) => 
                        /\d/.test(value) || "Password must contain at least one number",
                      hasUpperCase: (value) =>
                        /[A-Z]/.test(value) || "Password must contain at least one uppercase letter"
                    }
                  })}
                  className={`w-full bg-gray-50 border-2 ${
                    errors.password ? "border-red-500" : "border-dark/10"
                  } rounded-2xl py-4 pl-12 pr-4 font-bold focus:border-lime-yellow focus:ring-4 focus:ring-lime-yellow/20 outline-none transition-all`}
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>
              {errors.password && (
                <div className="flex items-center gap-2 text-red-500 text-xs mt-1 ml-1">
                  <AlertCircle size={12} />
                  <span>{errors.password.message}</span>
                </div>
              )}
              {!isLogin && (
                <p className="text-xs text-gray-500 ml-1">
                  8-20 characters, 1 number, 1 uppercase letter
                </p>
              )}
            </div>

            {/* Confirm Password Field - Only for Register */}
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-main-green ml-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30"
                    size={18}
                  />
                  <input
                    type="password"
                    {...register("confirm_password", {
                      required: "Please confirm your password",
                      validate: (value) => 
                        value === password || "Passwords do not match"
                    })}
                    className={`w-full bg-gray-50 border-2 ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-dark/10"
                    } rounded-2xl py-4 pl-12 pr-4 font-bold focus:border-lime-yellow focus:ring-4 focus:ring-lime-yellow/20 outline-none transition-all`}
                    placeholder="••••••••"
                    disabled={loading}
                  />
                </div>
                {errors.confirmPassword && (
                  <div className="flex items-center gap-2 text-red-500 text-xs mt-1 ml-1">
                    <AlertCircle size={12} />
                    <span>{errors.confirmPassword.message}</span>
                  </div>
                )}
              </div>
            )}

            {/* Submit Error from Redux */}
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm p-3 bg-red-50 rounded-xl">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-dark hover:bg-main-green disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all mt-6 shadow-xl shadow-gray-200"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <span>{isLogin ? "Login Now" : "Create Account"}</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
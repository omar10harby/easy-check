import React, { useEffect, useState } from "react";
import { X, Lock, UserPlus, LogIn, AlertCircle, Phone } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (value, country) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));
    // Clear phone error when user types
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Phone validation
    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm Password validation (only for register)
    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement actual login/register logic with Redux
      console.log("Form submitted:", {
        phone: formData.phone,
        password: formData.password,
        isLogin,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success - close modal and reset form
      setFormData({ phone: "", password: "", confirmPassword: "" });
      setErrors({});
      onClose();
    } catch (error) {
      setErrors({ submit: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ phone: "", password: "", confirmPassword: "" });
    setErrors({});
  };

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      onClose();
    }
  }
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
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-md bg-white rounded-4xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toggle Header */}
        <div className="flex bg-dark p-1  m-4 rounded-2xl">
          <button
            onClick={handleToggleMode}
            type="button"
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
              isLogin ? "bg-lime-yellow text-dark" : "text-white/60"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={handleToggleMode}
            type="button"
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

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Phone Number Field with react-phone-input-2 */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-main-green ml-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" />
                <input
                  type="text"
                  className={`w-full bg-gray-50 border-2 ${
                    errors.password ? "border-red-500" : "border-dark/10"
                  } rounded-2xl py-4 pl-12 pr-4 font-bold focus:border-lime-yellow focus:ring-4 focus:ring-lime-yellow/20 outline-none transition-all`}
                  placeholder="01012345678"
                />
              </div>
              {errors.phone && (
                <div className="flex items-center gap-2 text-red-500 text-xs mt-1 ml-1">
                  <AlertCircle size={12} />
                  <span>{errors.phone}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full bg-gray-50 border-2 ${
                    errors.password ? "border-red-500" : "border-dark/10"
                  } rounded-2xl py-4 pl-12 pr-4 font-bold focus:border-lime-yellow focus:ring-4 focus:ring-lime-yellow/20 outline-none transition-all`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <div className="flex items-center gap-2 text-red-500 text-xs mt-1 ml-1">
                  <AlertCircle size={12} />
                  <span>{errors.password}</span>
                </div>
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
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full bg-gray-50 border-2 ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-dark/10"
                    } rounded-2xl py-4 pl-12 pr-4 font-bold focus:border-lime-yellow focus:ring-4 focus:ring-lime-yellow/20 outline-none transition-all`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && (
                  <div className="flex items-center gap-2 text-red-500 text-xs mt-1 ml-1">
                    <AlertCircle size={12} />
                    <span>{errors.confirmPassword}</span>
                  </div>
                )}
              </div>
            )}

            {/* Submit Error */}
            {errors.submit && (
              <div className="flex items-center gap-2 text-red-500 text-sm p-3 bg-red-50 rounded-xl">
                <AlertCircle size={16} />
                <span>{errors.submit}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-dark hover:bg-main-green disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all mt-6 shadow-xl shadow-gray-200"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : isLogin ? (
                <>
                  <LogIn size={18} />
                  Login Now
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  Create Account
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;

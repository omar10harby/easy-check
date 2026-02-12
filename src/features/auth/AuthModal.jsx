import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { clearError, loginThunk, registerThunk } from "./authSlice";

function AuthModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { actionLoading, error } = useSelector((state) => state.auth);

  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (isOpen) {
      dispatch(clearError());
    }
  }, [isOpen, dispatch]);

  // Handle ESC key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  async function handleLoginSubmit(data) {
    try {
      await dispatch(
        loginThunk({
          phone_number: data.phone_number,
          password: data.password,
        })
      ).unwrap();

      toast.success("Login successful! Welcome back! 🎉");
      onClose();
    } catch (error) {
      toast.error(error);
    }
  }

  async function handleRegisterSubmit(data) {
    try {
      await dispatch(
        registerThunk({
          phone_number: data.phone_number,
          password: data.password,
          confirm_password: data.confirm_password,
        })
      ).unwrap();

      toast.success("Registration successful! Please login. ✅");
      setIsLogin(true);
    } catch (error) {
      toast.error(error);
    }
  }

  function handleToggleMode() {
    setIsLogin(!isLogin);
    dispatch(clearError());
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-4xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <div className="flex bg-dark-bg p-1 m-4 rounded-2xl" role="tablist" aria-label="Authentication options">
          <button
            onClick={handleToggleMode}
            type="button"
            disabled={actionLoading}
            role="tab"
            aria-selected={isLogin}
            aria-controls="auth-form-panel"
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all  ${isLogin ? "bg-primary text-light" : "text-medium-gray"
              }`}
          >
            Sign In
          </button>
          <button
            onClick={handleToggleMode}
            type="button"
            disabled={actionLoading}
            role="tab"
            aria-selected={!isLogin}
            aria-controls="auth-form-panel"
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all  ${!isLogin ? "bg-primary text-light" : "text-medium-gray"
              }`}
          >
            Register
          </button>
        </div>

        <button
          onClick={onClose}
          type="button"
          aria-label="Close authentication modal"
          className="absolute top-6 right-6 text-dark-bg hover:text-dark-bg/70 transition-colors z-10 "
        >
          <X size={24} aria-hidden="true" />
        </button>

        <div className="p-5 md:p-8 pt-4" id="auth-form-panel" role="tabpanel">
          <div className="text-center mb-8">
            <h2 id="auth-modal-title" className="text-2xl sm:text-3xl font-black text-primary uppercase tracking-tighter">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-sm text-primary/70 mt-2">
              {isLogin ? "Sign in to continue" : "Sign up to get started"}
            </p>
          </div>

          {isLogin ? (
            <LoginForm
              onSubmit={handleLoginSubmit}
              loading={actionLoading}
              error={error}
            />
          ) : (
            <RegisterForm
              onSubmit={handleRegisterSubmit}
              loading={actionLoading}
              error={error}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;

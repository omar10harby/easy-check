import React, { useState } from 'react';
import { X, Mail, Lock, ArrowRight, UserPlus, LogIn } from 'lucide-react';

 function AuthModal  ({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#181818]/60 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border-[3px] border-[#181818] overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Toggle Header */}
        <div className="flex bg-[#181818] p-1 m-4 rounded-2xl">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${isLogin ? 'bg-[#e5fb34] text-[#181818]' : 'text-white/60'}`}
          >
            Sign In
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${!isLogin ? 'bg-[#e5fb34] text-[#181818]' : 'text-white/60'}`}
          >
            Register
          </button>
        </div>

        <button onClick={onClose} className="absolute top-6 right-6 text-[#181818]/40 hover:text-[#181818]">
          <X size={24} />
        </button>

        <div className="p-8 pt-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-[#181818] uppercase tracking-tighter">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
          </div>

          <form className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-[#073e1d] ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#181818]/30" size={18} />
                <input 
                  type="email" 
                  className="w-full bg-gray-50 border-2 border-[#181818]/10 rounded-2xl py-4 pl-12 pr-4 font-bold focus:border-[#e5fb34] focus:ring-4 focus:ring-[#e5fb34]/20 outline-none transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-[#073e1d] ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#181818]/30" size={18} />
                <input 
                  type="password" 
                  className="w-full bg-gray-50 border-2 border-[#181818]/10 rounded-2xl py-4 pl-12 pr-4 font-bold focus:border-[#e5fb34] focus:ring-4 focus:ring-[#e5fb34]/20 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button className="w-full bg-[#181818] hover:bg-[#073e1d] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all mt-6 shadow-xl shadow-gray-200">
              {isLogin ? <><LogIn size={18} /> Login Now</> : <><UserPlus size={18} /> Create Account</>}
            </button>
          </form>

          <p className="text-center mt-6 text-xs font-bold text-[#181818]/40">
            By continuing, you agree to our <span className="text-[#073e1d] underline">Terms of Service</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
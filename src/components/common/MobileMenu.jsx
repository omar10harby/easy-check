import React from "react";
import { Link } from "react-router-dom";
import { Search, CreditCard, Wallet, LogOut, X } from "lucide-react";
import Logo from "./Logo";

function MobileMenu({
  isOpen,
  onClose,
  isAuthenticated,
  user,
  onLogout,
  onLoginClick,
  loading,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 backdrop-blur-md">
      <div className="md:hidden fixed w-full z-50 ">
        {/* Mobile Header */}
        <div className="flex justify-between items-center px-4 sm:px-6 md:px-[8vw] py-3 bg-primary">
          <Logo />
          <button
            onClick={onClose}
            disabled={loading}
            className="p-2 text-light-gray"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="px-4 py-8 space-y-6 overflow-y-auto bg-primary shadow-md">     
          {/* Mobile: User View */}
          {isAuthenticated && (
            <>
              {/* Balance Card */}
              <div className="bg-light-gray rounded-lg p-4 border border-light-gray">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-light" />
                  </div>
                  <div>
                    <p className="text-xs text-primary/60 font-medium">
                      Your Balance
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {user.balance.toFixed(2)} EGP
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <Link
                  to="/search-history"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-primary bg-light-gray rounded-lg transition-colors border border-light-gray"
                  onClick={onClose}
                >
                  <Search className="w-5 h-5 text-primary" />
                  <span>Search History</span>
                </Link>

                <Link
                  to="/wallet-history"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-primary bg-light-gray rounded-lg transition-colors border border-light-gray"
                  onClick={onClose}
                >
                  <CreditCard className="w-5 h-5 text-primary" />
                  <span>wallet History</span>
                </Link>

                <Link
                  to="/add-balance"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-primary bg-light-gray rounded-lg transition-colors border border-light-gray"
                  onClick={onClose}
                >
                  <Wallet className="w-5 h-5 text-primary" />
                  <span>Add Balance</span>
                </Link>

                <button
                  onClick={onLogout}
                  disabled={loading}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 bg-light-gray disabled:bg-medium-gray  disabled:cursor-not-allowed rounded-lg transition-colors border border-red-200"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-medium-gray border-t-red-600 rounded-full animate-spin"></div>
                      <span>Logging out...</span>
                    </>
                  ) : (
                    <>
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;

import React from 'react';
import { Link } from 'react-router-dom';
import { Search, CreditCard, Wallet, LogOut, ChevronDown } from 'lucide-react';

function ProfileDropdown({ isOpen, onToggle, onClose, onLogout, loading }) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-1 bg-light hover:bg-medium-gray disabled:bg-light-gray disabled:cursor-not-allowed rounded-lg border border-light-gray transition-colors"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Wallet className="w-4 h-4 text-light" />
        </div>
        <span className="text-sm font-medium text-primary">Account</span>
        <ChevronDown className={`w-4 h-4 text-primary/60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={onClose}
          ></div>

          {/* Dropdown Content */}
          <div className="absolute right-0 mt-2 w-56 bg-light rounded-lg shadow-lg border border-light-gray py-2 z-20">
            <Link
              to="/search-history"
              className="flex items-center gap-3 px-4 py-2 text-sm text-primary hover:bg-light-gray transition-colors"
              onClick={onClose}
            >
              <Search className="w-4 h-4 text-primary" />
              <span>Search History</span>
            </Link>

            <Link
              to="/payment-history"
              className="flex items-center gap-3 px-4 py-2 text-sm text-primary hover:bg-light-gray transition-colors"
              onClick={onClose}
            >
              <CreditCard className="w-4 h-4 text-primary" />
              <span>Payment History</span>
            </Link>

            <Link
              to="/add-balance"
              className="flex items-center gap-3 px-4 py-2 text-sm text-primary hover:bg-light-gray transition-colors"
              onClick={onClose}
            >
              <Wallet className="w-4 h-4 text-primary" />
              <span>Add balance</span>
            </Link>

            <div className="my-2 border-t border-light-gray"></div>

            <button
              onClick={onLogout}
              disabled={loading}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:bg-light-gray disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-red-600 rounded-full animate-spin"></div>
                  <span>Logging out...</span>
                </>
              ) : (
                <>
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileDropdown;
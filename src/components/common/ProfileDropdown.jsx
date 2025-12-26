import React from 'react';
import { Link } from 'react-router-dom';
import { Search, CreditCard, Wallet, LogOut, ChevronDown } from 'lucide-react';

function ProfileDropdown({ isOpen, onToggle, onClose, onLogout, loading }) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-lg border border-gray-200 transition-colors"
      >
        <div className="w-8 h-8 bg-main-green rounded-full flex items-center justify-center">
          <Wallet className="w-4 h-4 text-lime-yellow" />
        </div>
        <span className="text-sm font-medium text-dark">Account</span>
        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={onClose}
          ></div>

          {/* Dropdown Content */}
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
            <Link
              to="/search-history"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              <Search className="w-4 h-4 text-main-green" />
              <span>Search History</span>
            </Link>

            <Link
              to="/payment-history"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              <CreditCard className="w-4 h-4 text-main-green" />
              <span>Payment History</span>
            </Link>

            <Link
              to="/add-balance"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              <Wallet className="w-4 h-4 text-main-green" />
              <span>Add balance</span>
            </Link>

            <div className="my-2 border-t border-gray-200"></div>

            <button
              onClick={onLogout}
              disabled={loading}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
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
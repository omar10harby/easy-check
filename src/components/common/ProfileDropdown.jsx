import React from 'react';
import { Wallet, LogOut, ChevronDown } from 'lucide-react';
import NavigationLinks from './Navigationlinks';

const ProfileDropdown = (({ isOpen, onToggle, onClose, onLogout, loading }) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        disabled={loading}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Account menu"
        className="flex items-center gap-2 px-4 py-1 bg-light hover:bg-medium-gray disabled:bg-light-gray disabled:cursor-not-allowed rounded-lg border border-light-gray transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center" aria-hidden="true">
          <Wallet className="w-4 h-4 text-light" />
        </div>
        <span className="text-sm font-medium text-primary">Account</span>
        <ChevronDown className={`w-4 h-4 text-primary/60 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={onClose}
          ></div>

          <div className="absolute right-0 mt-2 w-56 bg-light rounded-lg shadow-lg border border-light-gray py-2 z-20" role="menu" aria-label="Account options">
            <NavigationLinks onLinkClick={onClose} variant="dropdown" />

            <div className="my-2 border-t border-light-gray"></div>

            <button
              onClick={onLogout}
              disabled={loading}
              role="menuitem"
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:bg-red-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-light-400 border-t-red-600 rounded-full animate-spin"></div>
                  <span>Logging out...</span>
                </>
              ) : (
                <>
                  <LogOut className="w-4 h-4" aria-hidden="true" />
                  <span>Logout</span>
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
});

export default ProfileDropdown;
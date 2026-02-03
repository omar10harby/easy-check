import { memo } from "react";
import { LogOut, X } from "lucide-react";
import NavigationLinks from "./Navigationlinks";

const MobileSideBar = memo(({
  isOpen,
  onClose,
  isAuthenticated,
  user,
  onLogout,
  loading,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full rounded-l-3xl w-80 max-w-[85vw] bg-light z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation sidebar"
      >
        {/* Header */}
        <div className="flex items-center justify-end p-5 border-b border-light-gray">
          <button
            onClick={onClose}
            disabled={loading}
            aria-label="Close sidebar"
            className="p-2 rounded-xl hover:bg-light-gray transition-colors disabled:opacity-50"
          >
            <X className="w-6 h-6 text-primary" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[calc(100%-80px)] overflow-y-auto">
          {/* User Section */}
          {isAuthenticated && user && (
            <div className="p-5 border-b border-light-gray">
              {/* Balance Card */}
              <div className="bg-linear-to-br from-primary to-dark-bg rounded-2xl p-4 shadow-lg">
                <p className="text-xs text-light/70 font-medium mb-1">
                  Available Balance
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-black text-light">
                    {user.balance.toFixed(2)}
                  </p>
                  <p className="text-sm font-bold text-light/80">EGP</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          {isAuthenticated && (
            <nav className="flex-1 p-5 space-y-2" aria-label="Main navigation">
              <NavigationLinks onLinkClick={onClose} variant="sidebar" />
            </nav>
          )}

          {/* Logout Button */}
          {isAuthenticated && (
            <div className="p-5 border-t border-light-gray">
              <button
                onClick={onLogout}
                disabled={loading}
                className="flex items-center justify-center gap-3 w-full px-4 py-3.5 bg-red-50 hover:bg-red-100 disabled:bg-medium-gray disabled:cursor-not-allowed text-red-600 font-bold rounded-xl transition-all"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-red-300 border-t-red-600 rounded-full animate-spin"></div>
                    <span>Logging out...</span>
                  </>
                ) : (
                  <>
                    <LogOut className="w-5 h-5" aria-hidden="true" />
                    <span>Logout</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export default MobileSideBar;
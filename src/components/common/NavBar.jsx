import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import BalanceDisplay from "./BalanceDisplay";
import ProfileDropdown from "./ProfileDropdown";
import MobileMenu from "./MobileMenu";
import AuthModal from "../../features/auth/AuthModal";
import { logoutThunk } from "../../features/auth/authSlice";

function NavBar() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, actionLoading } = useSelector(
    (state) => state.auth
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
      toast.success("Logged out successfully! See you soon! 👋");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleLoginClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 px-4 sm:px-6 md:px-8 lg:px-12 py-3 bg-primary shadow-sm">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Logo />

          {!isAuthenticated && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleLoginClick}
                disabled={actionLoading}
                className=" px-4 sm:px-6 py-2 text-sm font-bold bg-light text-primary rounded-lg hover:bg-light/90  transition-all shadow-md hover:shadow-lg"
              >
                Login
              </button>
            </div>
          )}

          {/* Desktop: User View */}
          {isAuthenticated && user && (
            <div className="hidden md:flex items-center gap-4">
              {/* Balance Display */}
              <BalanceDisplay balance={user.balance} />

              {/* Profile Dropdown */}
              <ProfileDropdown
                isOpen={isDropdownOpen}
                onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
                onClose={() => setIsDropdownOpen(false)}
                onLogout={handleLogout}
                loading={actionLoading}
              />
            </div>
          )}

          {/* Mobile Menu Button */}
          {isAuthenticated && user && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              disabled={actionLoading}
              className="md:hidden p-2 text-light hover:bg-light-gray disabled:bg-light-gray disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
        onLoginClick={handleLoginClick}
        loading={actionLoading}
      />

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />
    </>
  );
}

export default NavBar;
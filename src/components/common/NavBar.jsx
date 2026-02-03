import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Menu } from "lucide-react";
import Logo from "./Logo";
import BalanceDisplay from "./BalanceDisplay";
import ProfileDropdown from "./ProfileDropdown";
import { logoutThunk } from "../../features/auth/authSlice";

function NavBar({ onToggleMobileSidebar, onLoginClick }) {
  const dispatch = useDispatch();
  const { user, isAuthenticated, actionLoading } = useSelector(
    (state) => state.auth
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      setIsDropdownOpen(false);
      toast.success("Logged out successfully! See you soon! 👋");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  }, [dispatch]);

  const handleToggleDropdown = useCallback(() => {
    setIsDropdownOpen(prev => !prev);
  }, []);

  const handleCloseDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  return (
    <nav className="sticky top-0 z-40 px-4 sm:px-6 md:px-8 lg:px-12 py-3 bg-primary shadow-sm" aria-label="Main navigation">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Logo />

        {!isAuthenticated && (
          <div className="flex items-center gap-3">
            <button
              onClick={onLoginClick}
              disabled={actionLoading}
              aria-label="Open login dialog"
              className="px-4 sm:px-6 py-2 text-sm font-bold bg-light text-primary rounded-lg hover:bg-light/90 transition-all shadow-md hover:shadow-lg "
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
              onToggle={handleToggleDropdown}
              onClose={handleCloseDropdown}
              onLogout={handleLogout}
              loading={actionLoading}
            />
          </div>
        )}

        {/* Mobile Menu Button */}
        {isAuthenticated && user && (
          <button
            onClick={onToggleMobileSidebar}
            disabled={actionLoading}
            aria-label="Open navigation sidebar"
            aria-controls="mobile-sidebar"
            className="md:hidden p-2 text-light"
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
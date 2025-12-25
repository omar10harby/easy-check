import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import BalanceDisplay from './BalanceDisplay';
import ProfileDropdown from './ProfileDropdown';
import MobileMenu from './MobileMenu';
import AuthModal from '../../features/auth/AuthModal';
import { 
  logoutThunk, 
} from '../../features/auth/authSlice';

function NavBar() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
      toast.success('Logged out successfully! See you soon! 👋');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
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
      <nav className="sticky top-0 z-40 px-4 sm:px-6 md:px-[8vw] py-3 bg-white border-b border-gray-200 shadow">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Logo />

          {/* Desktop: Guest View */}
          {!isAuthenticated && (
            <div className="hidden md:flex items-center gap-3">
              <button 
                onClick={handleLoginClick}
                className="px-6 py-2 text-sm font-bold bg-lime-yellow text-dark rounded-lg hover:bg-[#d4ea23] transition-all shadow-md hover:shadow-lg"
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
              />
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-dark hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
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
      />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={handleCloseAuthModal} 
      />
    </>
  );
}

export default NavBar;
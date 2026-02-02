import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import MobileMenu from "../components/common/MobileMenu";
import AuthModal from "../features/auth/AuthModal";
import { logoutThunk } from "../features/auth/authSlice";

function MainLayout() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, actionLoading } = useSelector(
    (state) => state.auth
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Auth Handlers
  const handleLoginClick = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  const handleCloseAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      setIsMobileMenuOpen(false); // Close menu on logout
      toast.success("Logged out successfully! See you soon! 👋");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  }, [dispatch]);

  // Mobile Menu Handlers
  const handleToggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleCloseMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar
        onToggleMobileMenu={handleToggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
        onLoginClick={handleLoginClick}
      />

      <main className="flex-1 bg-primary flex flex-col items-center justify-center ">
        <Outlet />
      </main>

      <Footer />

      {/* Global UI Elements */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={handleCloseMobileMenu}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
        onLoginClick={handleLoginClick}
        loading={actionLoading}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
      />
    </div>
  );
}

export default MainLayout;
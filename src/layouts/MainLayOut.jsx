import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import AuthModal from "../features/auth/AuthModal";
import { logoutThunk } from "../features/auth/authSlice";
import MobileSideBar from "../components/common/MobileSideBar";

function MainLayout() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, actionLoading } = useSelector(
    (state) => state.auth
  );

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleToggleMobileSidebar = () => {
    setIsMobileSidebarOpen((prev) => !prev);
  };

  const handleCloseMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      setIsMobileSidebarOpen(false);
      toast.success("Logged out successfully! See you soon! 👋");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar
        onToggleMobileSidebar={handleToggleMobileSidebar}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onLoginClick={handleLoginClick}
      />

      <main className="flex-1 bg-primary flex flex-col items-center justify-center ">
        <Outlet />
      </main>

      <Footer />

      {/* Global UI Elements */}
      <MobileSideBar
        isOpen={isMobileSidebarOpen}
        onClose={handleCloseMobileSidebar}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
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
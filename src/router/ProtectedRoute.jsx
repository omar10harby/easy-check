import { useSelector } from 'react-redux';
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const {isAuthenticated, loading} = useSelector((state)=>state.auth);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-main-green border-t-lime-yellow rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-dark font-bold">Checking access...</p>
        </div>
      </div>
    );
  }

  // Redirect to home if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Render protected content
  return <Outlet />;
}

export default ProtectedRoute;
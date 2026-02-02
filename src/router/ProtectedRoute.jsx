import { useSelector } from 'react-redux';
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const  isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


  // Redirect to home if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Render protected content
  return <Outlet />;
}

export default ProtectedRoute;
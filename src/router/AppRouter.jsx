import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayOut";

import ProtectedRoute from "../router/ProtectedRoute";

import Home from "../pages/home/Home";
import ImeiChecker from "../pages/ImeiSearch/ImeiChecker";
import CheckResult from "../pages/ImeiSearch/CheckResult";



import AddBalance from "../pages/payment/AddBalance";
import SearchHistory from "../pages/user/SearchHistory";
import WalletHistory from "../pages/user/WalletHistory";
export const router = createBrowserRouter([
  // 🌍 1. Public Routes with MainLayout
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/imei-checker", element: <ImeiChecker /> },

      // 🔐 Protected Routes (User must be logged in)
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/add-balance", element: <AddBalance /> },
          { path: "/search-history", element: <SearchHistory /> },
          { path: "/wallet-history", element: <WalletHistory /> }
        ],
      },
    ],
  },
  { path: "/result/:id", element: <CheckResult /> },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;

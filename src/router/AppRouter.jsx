import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

/* Layouts */
import AdminLayout from "../layouts/AdminLayout";
import MainLayout from "../layouts/MainLayOut";

/* Auth Guards */
import ProtectedRoute from "../router/ProtectedRoute";

/* Pages - Public */
import Home from "../pages/home/Home";
import ImeiChecker from "../pages/ImeiSearch/ImeiChecker";
import CheckResult from "../pages/ImeiSearch/CheckResult";

/* Pages - Payment (Standalone - بدون Layout) */
import CheckoutPage from "../pages/payment/CheckoutPage";
import PaymentSuccess from "../pages/payment/PaymentSuccess";
import PaymentFaild from "../pages/payment/PaymentFaild";
/* Pages - User Protected */
import AddCredit from "../pages/payment/AddCredit";
import SearchHistory from "../pages/user/SearchHistory";
import PaymentHistory from "../pages/user/PaymentHistory";

export const router = createBrowserRouter([
  // 🌍 1. Public Routes with MainLayout
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/imei-checker", element: <ImeiChecker /> },
      { path: "/result/:id", element: <CheckResult /> },

      // 🔐 Protected Routes (User must be logged in)
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/add-credit", element: <AddCredit /> },
          { path: "/search-history", element: <SearchHistory /> },
          { path: "/payment-history", element: <PaymentHistory /> },
        ],
      },
    ],
  },

  // 💳 2. Payment Routes (No Layout - Standalone Pages)

  {
    path: "/payment-success",
    element: <PaymentSuccess />,
  },
  {
    path: "/payment-failed",
    element: <PaymentFaild />,
  },


]);


function AppRouter() {
  return (
    <RouterProvider router={router} />
  )
}

export default AppRouter

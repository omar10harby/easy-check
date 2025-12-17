import { createBrowserRouter, Navigate } from "react-router-dom";

/* Layouts */
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

/* Auth Guards */
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminRoute from "../components/auth/AdminRoute";

/* Pages - Public */
import Home from "../pages/home/Home";
import ImeiChecker from "../pages/ImeiSearch/ImeiChecker";
import CheckResult from "../pages/ImeiSearch/CheckResult";

/* Pages - Payment (Standalone - بدون Layout) */
import CheckoutPage from "../pages/payment/CheckoutPage";
import PaymentSuccess from "../pages/payment/PaymentSuccess";
import PaymentFailed from "../pages/payment/PaymentFailed";

/* Pages - User Protected */
import AddCredit from "../pages/payment/AddCredit";
import SearchHistory from "../pages/user/SearchHistory";
import PaymentHistory from "../pages/user/PaymentHistory";

/* Pages - Admin */
import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import UserDetails from "../pages/admin/UserDetails";
import ServicesPricing from "../pages/admin/ServicesPricing";


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
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
  },
  {
    path: "/payment-failed",
    element: <PaymentFailed />,
  },

  // 👑 3. Admin Panel Routes
  {
    path: "/admin",
    element: <AdminRoute />, // ✅ صح (زي ProtectedRoute)
    children: [
      {
        element: <AdminLayout />, // AdminLayout جوا الـ children
        children: [
          { index: true, element: <AdminDashboard /> }, // /admin
          { path: "users", element: <Users /> }, // /admin/users
          { path: "users/:userId", element: <UserDetails /> }, // /admin/users/:id
          { path: "pricing", element: <ServicesPricing /> }, // /admin/pricing
        ],
      },
    ],
  },


]);
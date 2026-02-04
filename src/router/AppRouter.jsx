import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "../layouts/MainLayOut";
import ProtectedRoute from "../router/ProtectedRoute";
import NotFound from "../pages/NotFound";
import GlobalLoader from "../components/common/GlobalLoader";

// 🔄 Lazy Loading للصفحات
const Home = lazy(() => import("../pages/home/Home"));
const ImeiChecker = lazy(() => import("../pages/ImeiSearch/ImeiChecker"));
const CheckResult = lazy(() => import("../pages/ImeiSearch/CheckResult"));
const AddBalance = lazy(() => import("../pages/payment/AddBalance"));
const SearchHistory = lazy(() => import("../pages/user/SearchHistory"));
const WalletHistory = lazy(() => import("../pages/user/WalletHistory"));

// Lazy-loaded page components wrapped in Suspense
const SuspenseHome = () => <Suspense fallback={<GlobalLoader />}><Home /></Suspense>;
const SuspenseImeiChecker = () => <Suspense fallback={<GlobalLoader />}><ImeiChecker /></Suspense>;
const SuspenseCheckResult = () => <Suspense fallback={<GlobalLoader />}><CheckResult /></Suspense>;
const SuspenseAddBalance = () => <Suspense fallback={<GlobalLoader />}><AddBalance /></Suspense>;
const SuspenseSearchHistory = () => <Suspense fallback={<GlobalLoader />}><SearchHistory /></Suspense>;
const SuspenseWalletHistory = () => <Suspense fallback={<GlobalLoader />}><WalletHistory /></Suspense>;

const router = createBrowserRouter([
  // 🌍 Public Routes with MainLayout
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <SuspenseHome /> },
      { path: "/imei-checker", element: <SuspenseImeiChecker /> },

      // 🔐 Protected Routes
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/add-balance", element: <SuspenseAddBalance /> },
          { path: "/search-history", element: <SuspenseSearchHistory /> },
          { path: "/wallet-history", element: <SuspenseWalletHistory /> },
        ],
      },
    ],
  },
  // 📄 CheckResult page (outside MainLayout)
  { path: "/result/:id", element: <SuspenseCheckResult /> },
  { path: "*", element: <NotFound /> },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;

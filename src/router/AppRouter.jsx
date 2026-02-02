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

// Helper to wrap components in Suspense with GlobalLoader
const withSuspense = (Component) => (
  <Suspense fallback={<GlobalLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  // 🌍 Public Routes with MainLayout
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: withSuspense(Home) },
      { path: "/imei-checker", element: withSuspense(ImeiChecker) },

      // 🔐 Protected Routes
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/add-balance", element: withSuspense(AddBalance) },
          { path: "/search-history", element: withSuspense(SearchHistory) },
          { path: "/wallet-history", element: withSuspense(WalletHistory) },
        ],
      },
    ],
  },
  // 📄 CheckResult page (outside MainLayout)
  { path: "/result/:id", element: withSuspense(CheckResult) },
  { path: "*", element: <NotFound /> },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;

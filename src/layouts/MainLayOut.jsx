import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/common/NavBar";

function MainLayout() {
  return (
    <div className=" flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-gray-100 py-4 sm:py-6 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-8 text-xs sm:text-sm text-gray-400">
            <span className="font-medium">© 2023 IMEI Check Inc.</span>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-[#181818] transition-colors">
              Privacy
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-[#181818] transition-colors">
              Terms
            </a>
            <span className="hidden sm:inline flex-grow"></span>
            <div className="flex items-center gap-3 sm:gap-6">
              <span className="font-medium text-gray-500">🍎 Apple</span>
              <span className="font-medium text-gray-500">📱 Samsung</span>
              <span className="font-medium text-gray-500">📲 Xiaomi</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;

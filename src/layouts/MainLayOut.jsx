import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/common/NavBar';

function MainLayout() {
  return (
    <div className="relative min-h-screen bg-white">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
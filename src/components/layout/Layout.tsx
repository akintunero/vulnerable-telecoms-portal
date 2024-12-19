import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout; // January development 3 - Sat Jun 21 02:05:31 WAT 2025
// January development 8 - Sat Jun 21 02:05:33 WAT 2025
// January development 13 - Sat Jun 21 02:05:34 WAT 2025
// January development 18 - Sat Jun 21 02:05:35 WAT 2025
// January development 23 - Sat Jun 21 02:05:36 WAT 2025
// January development 28 - Sat Jun 21 02:05:36 WAT 2025
// January development 33 - Sat Jun 21 02:05:37 WAT 2025
// January development 38 - Sat Jun 21 02:05:38 WAT 2025
// January development 43 - Sat Jun 21 02:05:38 WAT 2025

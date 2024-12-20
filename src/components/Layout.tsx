import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  HomeIcon,
  CubeIcon,
  UsersIcon,
  TicketIcon,
  BellIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  GlobeAltIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ChartPieIcon,
  CodeBracketIcon,
  SignalIcon,
  ClockIcon,
  UserIcon,
  ArrowPathIcon,
  MapIcon,
  WifiIcon,
  ExclamationTriangleIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Inventory', href: '/inventory', icon: CubeIcon },
  { name: 'Customers', href: '/customers', icon: UsersIcon },
  { name: 'Tickets', href: '/tickets', icon: TicketIcon },
  { name: 'Alerts', href: '/alerts', icon: BellIcon },
  { name: 'Audit Logs', href: '/audit-logs', icon: ClipboardDocumentListIcon },
  { name: 'Customer Management', href: '/customer-management', icon: UserGroupIcon },
  { name: 'Network Management', href: '/network-management', icon: GlobeAltIcon },
  { name: 'Reporting', href: '/reporting', icon: ChartBarIcon },
  { name: 'Security', href: '/security', icon: ShieldCheckIcon },
  { name: 'Service Quality', href: '/service-quality', icon: ChartPieIcon },
  { name: 'API Integrations', href: '/api-integrations', icon: CodeBracketIcon },
  { name: 'Optical Power', href: '/optical-power', icon: SignalIcon },
  { name: 'SLA Monitoring', href: '/sla-monitoring', icon: ClockIcon },
  { name: 'Subscriber Management', href: '/subscriber-management', icon: UserIcon },
  { name: 'Change Management', href: '/change-management', icon: ArrowPathIcon }
];

const networkSubmenu = [
  { name: 'Network Map', href: '/network/map', icon: MapIcon },
  { name: 'Fiber Map', href: '/network/fiber', icon: WifiIcon },
  { name: 'BGP Status', href: '/network/bgp', icon: GlobeAltIcon },
  { name: 'MPLS Details', href: '/network/mpls', icon: SignalIcon },
  { name: 'Threat Map', href: '/network/threat', icon: ExclamationTriangleIcon }
];

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNetworkMenuOpen, setIsNetworkMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleNetworkMenu = () => {
    setIsNetworkMenuOpen(!isNetworkMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {!isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-gray-900/50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <WifiIcon className="h-5 w-5 text-white" />
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-900">TelcoAdmin</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-5 space-y-1 px-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                location.pathname === item.href
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                  location.pathname === item.href
                    ? 'text-indigo-600'
                    : 'text-gray-400 group-hover:text-gray-500'
                }`}
              />
              {item.name}
            </Link>
          ))}

          {/* Network Management Submenu */}
          <div>
            <button
              onClick={toggleNetworkMenu}
              className={`group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium ${
                location.pathname.startsWith('/network')
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <GlobeAltIcon
                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                  location.pathname.startsWith('/network')
                    ? 'text-indigo-600'
                    : 'text-gray-400 group-hover:text-gray-500'
                }`}
              />
              <span className="flex-1">Network</span>
              <ChevronDownIcon
                className={`h-5 w-5 transform transition-transform ${
                  isNetworkMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isNetworkMenuOpen && (
              <div className="mt-1 space-y-1 pl-4">
                {networkSubmenu.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                      location.pathname === item.href
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 flex-shrink-0 ${
                        location.pathname === item.href
                          ? 'text-indigo-600'
                          : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className={`lg:pl-64 ${isSidebarOpen ? 'pl-64' : 'pl-0'}`}>
        {/* Top navigation */}
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <button
            onClick={toggleSidebar}
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1">
              <h1 className="text-xl font-semibold text-gray-900 flex items-center">
                {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
              </h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative ml-3">
                <div className="flex items-center space-x-3">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user?.avatar || 'https://via.placeholder.com/40'}
                    alt=""
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name}
                  </span>
                  <button
                    onClick={logout}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout; 
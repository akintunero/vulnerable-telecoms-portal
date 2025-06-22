import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  HomeIcon,
  UsersIcon,
  CogIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  WifiIcon,
  PhoneIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  ChartPieIcon,
  BellIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [networkSubmenuOpen, setNetworkSubmenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Customer Management', href: '/customers', icon: UsersIcon },
    { name: 'Network Management', href: '#', icon: WifiIcon, hasSubmenu: true },
    { name: 'Service Management', href: '/services', icon: PhoneIcon },
    { name: 'Security', href: '/security', icon: ShieldCheckIcon },
    { name: 'Reports', href: '/reports', icon: ChartBarIcon },
    { name: 'Tickets', href: '/tickets', icon: DocumentTextIcon },
    { name: 'Alerts', href: '/alerts', icon: ExclamationTriangleIcon },
    { name: 'Change Management', href: '/change-management', icon: ClipboardDocumentListIcon },
    { name: 'Financial', href: '/financial', icon: CurrencyDollarIcon },
    { name: 'Compliance', href: '/compliance', icon: ChartPieIcon },
    { name: 'Settings', href: '/settings', icon: CogIcon },
  ];

  const networkSubmenu = [
    { name: 'Network Overview', href: '/network' },
    { name: 'Device Monitoring', href: '/network/devices' },
    { name: 'Bandwidth Utilization', href: '/network/bandwidth' },
    { name: 'Incident Logs', href: '/network/incidents' },
    { name: 'Network Map', href: '/network/map' },
  ];

  const isActive = (href: string) => {
    if (href === '#') return false;
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:hidden">
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
            <div className="flex h-16 items-center justify-between px-4">
              <h1 className="text-xl font-semibold text-gray-900">Telco Admin</h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.hasSubmenu ? (
                    <div>
                      <button
                        onClick={() => setNetworkSubmenuOpen(!networkSubmenuOpen)}
                        className={`group flex w-full items-center px-2 py-2 text-sm font-medium rounded-md ${
                          isActive(item.href)
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <item.icon className="mr-3 h-6 w-6" />
                        {item.name}
                        {networkSubmenuOpen ? (
                          <ChevronDownIcon className="ml-auto h-4 w-4" />
                        ) : (
                          <ChevronRightIcon className="ml-auto h-4 w-4" />
                        )}
                      </button>
                      {networkSubmenuOpen && (
                        <div className="ml-8 space-y-1">
                          {networkSubmenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className={`block px-2 py-2 text-sm rounded-md ${
                                isActive(subItem.href)
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive(item.href)
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon className="mr-3 h-6 w-6" />
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-xl font-semibold text-gray-900">Telco Admin</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.hasSubmenu ? (
                  <div>
                    <button
                      onClick={() => setNetworkSubmenuOpen(!networkSubmenuOpen)}
                      className={`group flex w-full items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive(item.href)
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon className="mr-3 h-6 w-6" />
                      {item.name}
                      {networkSubmenuOpen ? (
                        <ChevronDownIcon className="ml-auto h-4 w-4" />
                      ) : (
                        <ChevronRightIcon className="ml-auto h-4 w-4" />
                      )}
                    </button>
                    {networkSubmenuOpen && (
                      <div className="ml-8 space-y-1">
                        {networkSubmenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className={`block px-2 py-2 text-sm rounded-md ${
                              isActive(subItem.href)
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive(item.href)
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="mr-3 h-6 w-6" />
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className="lg:pl-64">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                <BellIcon className="h-6 w-6" />
              </button>
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
              <div className="flex items-center gap-x-4">
                <img
                  className="h-8 w-8 rounded-full bg-gray-50"
                  src={user?.avatar || 'https://via.placeholder.com/40'}
                  alt=""
                />
                <div className="hidden lg:flex lg:flex-col lg:items-end">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs leading-5 text-gray-500">{user?.role || 'User'}</p>
                </div>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout; 
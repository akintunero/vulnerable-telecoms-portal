import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Ticket,
  AlertTriangle,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
  User,
  LogOut,
  Network,
  Map,
  Activity,
  Shield,
  BarChart3,
  Database,
  Wrench,
  Key,
  Bell,
  Zap,
  Globe,
  Lock,
  Monitor,
  Server,
  Package,
  CreditCard,
  MessageSquare,
  TrendingUp,
  Building,
  Smartphone,
  Router,
  ShieldCheck,
  FileBarChart,
  Calendar,
  UserCheck,
  Cog
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface MenuItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  submenu?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />
  },
  {
    title: 'Network Management',
    path: '#',
    icon: <Network className="h-5 w-5" />,
    submenu: [
      {
        title: 'Fibre Map',
        path: '/network/fibre-map',
        icon: <Map className="h-5 w-5" />
      },
      {
        title: 'Optical Power',
        path: '/network/optical-power',
        icon: <Activity className="h-5 w-5" />
      },
      {
        title: 'Network Topology',
        path: '/network/topology',
        icon: <Network className="h-5 w-5" />
      },
      {
        title: 'Device Monitoring',
        path: '/network/device-monitoring',
        icon: <Monitor className="h-5 w-5" />
      },
      {
        title: 'Bandwidth Utilization',
        path: '/network/bandwidth',
        icon: <BarChart3 className="h-5 w-5" />
      },
      {
        title: 'Incident Logs',
        path: '/network/incidents',
        icon: <AlertTriangle className="h-5 w-5" />
      }
    ]
  },
  {
    title: 'Customer Management',
    path: '#',
    icon: <Users className="h-5 w-5" />,
    submenu: [
      {
        title: 'Sim Swaps',
        path: '/customers/sim-swaps',
        icon: <Smartphone className="h-5 w-5" />
      },
      {
        title: 'Enterprise Accounts',
        path: '/customers/enterprise',
        icon: <Building className="h-5 w-5" />
      },
      {
        title: 'Subscriber Management',
        path: '/customers/subscribers',
        icon: <User className="h-5 w-5" />
      },
      {
        title: 'Provisioning',
        path: '/customers/provisioning',
        icon: <Settings className="h-5 w-5" />
      }
    ]
  },
  {
    title: 'Services',
    path: '#',
    icon: <Server className="h-5 w-5" />,
    submenu: [
      {
        title: 'MPLS Management',
        path: '/services/mpls',
        icon: <Network className="h-5 w-5" />
      },
      {
        title: 'IP Access',
        path: '/services/ip-access',
        icon: <Globe className="h-5 w-5" />
      },
      {
        title: 'VPN Management',
        path: '/services/vpn',
        icon: <Lock className="h-5 w-5" />
      },
      {
        title: 'Security Solutions',
        path: '/services/security',
        icon: <Shield className="h-5 w-5" />
      }
    ]
  },
  {
    title: 'Service Quality & Support',
    path: '#',
    icon: <MessageSquare className="h-5 w-5" />,
    submenu: [
      {
        title: 'Ticketing System',
        path: '/support/tickets',
        icon: <Ticket className="h-5 w-5" />
      },
      {
        title: 'SLA Monitoring',
        path: '/support/sla',
        icon: <Activity className="h-5 w-5" />
      },
      {
        title: 'Customer Feedback',
        path: '/support/feedback',
        icon: <MessageSquare className="h-5 w-5" />
      }
    ]
  },
  {
    title: 'Security',
    path: '#',
    icon: <ShieldCheck className="h-5 w-5" />,
    submenu: [
      {
        title: 'Security Alerts',
        path: '/security/alerts',
        icon: <AlertTriangle className="h-5 w-5" />
      },
      {
        title: 'Firewall Monitoring',
        path: '/security/firewall',
        icon: <Shield className="h-5 w-5" />
      },
      {
        title: 'Compliance Reports',
        path: '/security/compliance',
        icon: <FileBarChart className="h-5 w-5" />
      }
    ]
  },
  {
    title: 'Reporting & Analytics',
    path: '#',
    icon: <BarChart3 className="h-5 w-5" />,
    submenu: [
      {
        title: 'Usage Reports',
        path: '/reports/usage',
        icon: <TrendingUp className="h-5 w-5" />
      },
      {
        title: 'Financial KPIs',
        path: '/reports/financial',
        icon: <CreditCard className="h-5 w-5" />
      },
      {
        title: 'Custom Report Builder',
        path: '/reports/custom',
        icon: <FileBarChart className="h-5 w-5" />
      }
    ]
  },
  {
    title: 'Inventory & Assets',
    path: '#',
    icon: <Package className="h-5 w-5" />,
    submenu: [
      {
        title: 'Device Inventory',
        path: '/inventory/devices',
        icon: <Server className="h-5 w-5" />
      },
      {
        title: 'SIM Management',
        path: '/inventory/sims',
        icon: <Smartphone className="h-5 w-5" />
      },
      {
        title: 'Asset Tracking',
        path: '/inventory/assets',
        icon: <Package className="h-5 w-5" />
      }
    ]
  },
  {
    title: 'Maintenance',
    path: '#',
    icon: <Wrench className="h-5 w-5" />,
    submenu: [
      {
        title: 'Scheduled Maintenance',
        path: '/maintenance/scheduled',
        icon: <Calendar className="h-5 w-5" />
      },
      {
        title: 'Change Management',
        path: '/maintenance/changes',
        icon: <Settings className="h-5 w-5" />
      }
    ]
  },
  {
    title: 'User & Access Control',
    path: '#',
    icon: <UserCheck className="h-5 w-5" />,
    submenu: [
      {
        title: 'User Management',
        path: '/users/management',
        icon: <Users className="h-5 w-5" />
      },
      {
        title: 'Role Settings',
        path: '/users/roles',
        icon: <Key className="h-5 w-5" />
      },
      {
        title: 'Audit Logs',
        path: '/users/audit',
        icon: <FileText className="h-5 w-5" />
      }
    ]
  },
  {
    title: 'Settings',
    path: '#',
    icon: <Cog className="h-5 w-5" />,
    submenu: [
      {
        title: 'System Settings',
        path: '/settings/system',
        icon: <Settings className="h-5 w-5" />
      },
      {
        title: 'Notification Preferences',
        path: '/settings/notifications',
        icon: <Bell className="h-5 w-5" />
      },
      {
        title: 'API Integrations',
        path: '/settings/api',
        icon: <Zap className="h-5 w-5" />
      }
    ]
  }
];

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (path: string) => {
    setExpandedSubmenu(expandedSubmenu === path ? null : path);
  };

  const isSubmenuExpanded = (path: string) => expandedSubmenu === path;

  const renderMenuItem = (item: MenuItem, isSubmenuItem = false) => {
    const isActive = window.location.pathname === item.path;
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = isSubmenuExpanded(item.path);

    return (
      <div key={item.path} className={isSubmenuItem ? 'ml-4' : ''}>
        {hasSubmenu ? (
          <button
            onClick={() => toggleSubmenu(item.path)}
            className={`flex w-full items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150
              ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-700'}
              ${isSubmenuItem ? 'pl-6' : ''}`}
          >
            <div className="flex items-center">
              {item.icon}
              <span className="ml-3 text-left">{item.title}</span>
            </div>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        ) : (
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150
                ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-700'}
                ${isSubmenuItem ? 'pl-6' : ''}`
            }
          >
            {item.icon}
            <span className="ml-3 text-left">{item.title}</span>
          </NavLink>
        )}

        {hasSubmenu && isExpanded && (
          <div className="mt-1 space-y-1 border-l-2 border-blue-100 ml-2 pl-2">
            {item.submenu?.map((subItem) => renderMenuItem(subItem, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-2 pb-4 pt-2">
        <div className="flex h-16 shrink-0 items-center justify-center mb-2">
          <h1 className="text-2xl font-bold text-blue-800 tracking-tight">Telco Admin</h1>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="space-y-1">
                {menuItems.map((item) => renderMenuItem(item))}
              </ul>
            </li>
            <li className="mt-auto">
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center gap-x-4 px-3 py-3">
                  {user?.avatar ? (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.avatar}
                      alt=""
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="flex w-full items-center gap-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-700 rounded-md"
                >
                  <LogOut className="h-5 w-5" />
                  Sign out
                </button>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
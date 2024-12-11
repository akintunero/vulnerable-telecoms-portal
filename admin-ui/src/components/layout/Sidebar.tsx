import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  HomeIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  WrenchIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

// Define NetworkIcon if it's not available in @heroicons/react
const NetworkIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
    />
  </svg>
);

const menuItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'Network Management',
    icon: NetworkIcon,
    subItems: [
      { name: 'Network Topology', href: '/network/topology' },
      { name: 'Device Monitoring', href: '/network/devices' },
      { name: 'Bandwidth Utilization', href: '/network/bandwidth' },
      { name: 'Outage & Incident Logs', href: '/network/incidents' },
    ],
  },
  {
    name: 'Customer Management',
    icon: UserGroupIcon,
    subItems: [
      { name: 'Enterprise Accounts', href: '/customers/enterprise' },
      { name: 'Subscriber Management', href: '/customers/subscribers' },
      { name: 'Provisioning & Activation', href: '/customers/provisioning' },
    ],
  },
  {
    name: 'Services',
    icon: WrenchScrewdriverIcon,
    subItems: [
      { name: 'MPLS Management', href: '/services/mpls' },
      { name: 'IP Access', href: '/services/ip-access' },
      { name: 'VPN Management', href: '/services/vpn' },
      { name: 'Security Solutions', href: '/services/security' },
    ],
  },
  {
    name: 'Service Quality & Support',
    icon: ShieldCheckIcon,
    subItems: [
      { name: 'Ticketing System', href: '/support/tickets' },
      { name: 'SLA Monitoring', href: '/support/sla' },
      { name: 'Customer Feedback', href: '/support/feedback' },
    ],
  },
  {
    name: 'Security',
    icon: ShieldCheckIcon,
    subItems: [
      { name: 'Security Alerts & Incidents', href: '/security/alerts' },
      { name: 'Firewall & Threat Monitoring', href: '/security/firewall' },
      { name: 'Compliance Reports', href: '/security/compliance' },
    ],
  },
  {
    name: 'Reporting & Analytics',
    icon: ChartBarIcon,
    subItems: [
      { name: 'Usage Reports', href: '/reports/usage' },
      { name: 'Financial KPIs', href: '/reports/financial' },
      { name: 'Custom Report Builder', href: '/reports/custom' },
    ],
  },
  {
    name: 'Inventory & Assets',
    icon: ClipboardDocumentListIcon,
    subItems: [
      { name: 'Device Inventory', href: '/inventory/devices' },
      { name: 'SIM Management', href: '/inventory/sims' },
      { name: 'Asset Tracking', href: '/inventory/assets' },
    ],
  },
  {
    name: 'Maintenance',
    icon: WrenchIcon,
    subItems: [
      { name: 'Scheduled Maintenance', href: '/maintenance/scheduled' },
      { name: 'Change Management', href: '/maintenance/changes' },
    ],
  },
  {
    name: 'User & Access Control',
    icon: UserCircleIcon,
    subItems: [
      { name: 'User Management', href: '/users/management' },
      { name: 'Role & Permission Settings', href: '/users/roles' },
      { name: 'Audit Logs', href: '/users/audit' },
    ],
  },
  {
    name: 'Settings',
    icon: Cog6ToothIcon,
    subItems: [
      { name: 'System Settings', href: '/settings/system' },
      { name: 'Notification Preferences', href: '/settings/notifications' },
      { name: 'API Integrations', href: '/settings/api' },
    ],
  },
];

export default function Sidebar() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['Dashboard']);
  const router = useRouter();

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionName)
        ? prev.filter(name => name !== sectionName)
        : [...prev, sectionName]
    );
  };

  return (
    <div className="w-64 bg-gray-900 text-white h-screen overflow-y-auto">
      <div className="p-4">
        <h1 className="text-xl font-bold">TelLeak ISP</h1>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <div key={item.name}>
            {item.subItems ? (
              <>
                <button
                  onClick={() => toggleSection(item.name)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-800 flex items-center justify-between ${
                    expandedSections.includes(item.name) ? 'bg-gray-800' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 mr-2" />
                    <span>{item.name}</span>
                  </div>
                  <svg
                    className={`h-4 w-4 transform ${
                      expandedSections.includes(item.name) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {expandedSections.includes(item.name) && (
                  <div className="pl-8">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={`block px-4 py-2 text-sm hover:bg-gray-800 ${
                          router.pathname === subItem.href ? 'bg-gray-800' : ''
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href}
                className={`flex items-center px-4 py-2 hover:bg-gray-800 ${
                  router.pathname === item.href ? 'bg-gray-800' : ''
                }`}
              >
                <item.icon className="h-5 w-5 mr-2" />
                <span>{item.name}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
} 
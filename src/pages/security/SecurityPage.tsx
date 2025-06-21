import React, { useState } from 'react';
import {
  Shield,
  AlertTriangle,
  Lock,
  Key,
  UserCheck,
  Activity,
  RefreshCw,
  Download,
  Filter,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { mockSecurityAlerts } from '../../services/mockData';

interface SecurityAlert {
  id: string;
  type: 'threat' | 'vulnerability' | 'access' | 'compliance';
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  timestamp: string;
  status: 'active' | 'resolved';
}

const mockAlerts: SecurityAlert[] = [
  {
    id: '1',
    type: 'threat',
    severity: 'high',
    title: 'Suspicious Login Attempt',
    description: 'Multiple failed login attempts detected from IP 192.168.1.100',
    timestamp: '2024-02-28 14:30:00',
    status: 'active'
  },
  {
    id: '2',
    type: 'vulnerability',
    severity: 'medium',
    title: 'Outdated SSL Certificate',
    description: 'SSL certificate for api.example.com expires in 7 days',
    timestamp: '2024-02-28 13:15:00',
    status: 'active'
  },
  {
    id: '3',
    type: 'access',
    severity: 'low',
    title: 'New Admin Access',
    description: 'New administrator account created: admin@example.com',
    timestamp: '2024-02-28 12:00:00',
    status: 'resolved'
  }
];

interface SecurityMetric {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
}

const securityMetrics: SecurityMetric[] = [
  {
    title: 'Active Threats',
    value: '3',
    change: -25,
    icon: <AlertTriangle className="h-6 w-6" />,
    color: 'bg-red-500'
  },
  {
    title: 'Security Score',
    value: '92%',
    change: 5,
    icon: <Shield className="h-6 w-6" />,
    color: 'bg-green-500'
  },
  {
    title: 'Vulnerabilities',
    value: '7',
    change: -12,
    icon: <Lock className="h-6 w-6" />,
    color: 'bg-yellow-500'
  },
  {
    title: 'Access Requests',
    value: '12',
    change: 8,
    icon: <Key className="h-6 w-6" />,
    color: 'bg-blue-500'
  }
];

const SecurityPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('24h');
  const [selectedSeverity, setSelectedSeverity] = useState<string[]>([]);

  const getSeverityColor = (severity: SecurityAlert['severity']) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: SecurityAlert['type']) => {
    switch (type) {
      case 'threat':
        return <AlertTriangle className="h-5 w-5" />;
      case 'vulnerability':
        return <Lock className="h-5 w-5" />;
      case 'access':
        return <Key className="h-5 w-5" />;
      case 'compliance':
        return <Shield className="h-5 w-5" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Security</h1>
        <p className="text-gray-600">Monitor security events and manage access controls</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Security Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Active Threats:</span>
              <span className="font-semibold text-red-600">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Failed Logins:</span>
              <span className="font-semibold text-yellow-600">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Security Score:</span>
              <span className="font-semibold text-green-600">95/100</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Access Control</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Active Users:</span>
              <span className="font-semibold">24</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Admin Users:</span>
              <span className="font-semibold text-blue-600">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Audit:</span>
              <span className="font-semibold">2 days ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">GDPR Status:</span>
              <span className="font-semibold text-green-600">Compliant</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ISO 27001:</span>
              <span className="font-semibold text-green-600">Certified</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Next Review:</span>
              <span className="font-semibold">30 days</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Security Events</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source IP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockSecurityAlerts.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {event.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.source_ip}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      event.severity_score >= 80 
                        ? 'bg-red-100 text-red-800' 
                        : event.severity_score >= 60 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {event.severity_score}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      event.status === 'investigating' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(event.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;

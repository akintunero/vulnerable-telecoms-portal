import React, { useState } from 'react';
import { Network, Activity, AlertTriangle, CheckCircle, MapPin, Users, Server, Globe, Shield } from 'lucide-react';

const MPLSManagementPage: React.FC = () => {
  const [selectedVPN, setSelectedVPN] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data for MPLS VPNs
  const mplsVPNs = [
    {
      id: 'VPN001',
      name: 'Enterprise VPN - TechCorp',
      customer: 'TechCorp Solutions',
      status: 'active',
      type: 'L3VPN',
      bandwidth: '100 Mbps',
      sites: 8,
      routes: 1250,
      uptime: '99.9%',
      lastActivity: '2025-06-01 15:30'
    },
    {
      id: 'VPN002',
      name: 'Business VPN - RetailChain',
      customer: 'RetailChain Inc',
      status: 'active',
      type: 'L3VPN',
      bandwidth: '50 Mbps',
      sites: 12,
      routes: 850,
      uptime: '99.8%',
      lastActivity: '2025-06-01 15:25'
    },
    {
      id: 'VPN003',
      name: 'Cloud VPN - DataCenter',
      customer: 'CloudTech Ltd',
      status: 'maintenance',
      type: 'L2VPN',
      bandwidth: '200 Mbps',
      sites: 3,
      routes: 450,
      uptime: '98.5%',
      lastActivity: '2025-06-01 14:45'
    },
    {
      id: 'VPN004',
      name: 'Branch VPN - FinanceCorp',
      customer: 'FinanceCorp',
      status: 'active',
      type: 'L3VPN',
      bandwidth: '75 Mbps',
      sites: 15,
      routes: 1100,
      uptime: '99.7%',
      lastActivity: '2025-06-01 15:20'
    }
  ];

  // Mock data for MPLS routes
  const mplsRoutes = [
    {
      id: 'ROUTE001',
      vpn: 'VPN001',
      prefix: '192.168.1.0/24',
      nextHop: '10.0.1.1',
      status: 'active',
      metric: 100,
      lastUpdate: '2025-06-01 15:30'
    },
    {
      id: 'ROUTE002',
      vpn: 'VPN001',
      prefix: '192.168.2.0/24',
      nextHop: '10.0.1.2',
      status: 'active',
      metric: 200,
      lastUpdate: '2025-06-01 15:28'
    },
    {
      id: 'ROUTE003',
      vpn: 'VPN002',
      prefix: '172.16.1.0/24',
      nextHop: '10.0.2.1',
      status: 'inactive',
      metric: 150,
      lastUpdate: '2025-06-01 15:25'
    }
  ];

  // Mock data for MPLS statistics
  const mplsStats = [
    {
      title: 'Total VPNs',
      value: mplsVPNs.length.toString(),
      change: '+2',
      changeType: 'positive' as const,
      icon: <Network className="h-6 w-6" />,
      color: 'blue'
    },
    {
      title: 'Active VPNs',
      value: mplsVPNs.filter(v => v.status === 'active').length.toString(),
      change: '+1',
      changeType: 'positive' as const,
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'green'
    },
    {
      title: 'Total Routes',
      value: mplsRoutes.length.toString(),
      change: '+15',
      changeType: 'positive' as const,
      icon: <Activity className="h-6 w-6" />,
      color: 'purple'
    },
    {
      title: 'Avg Uptime',
      value: '99.7%',
      change: '+0.2%',
      changeType: 'positive' as const,
      icon: <Activity className="h-6 w-6" />,
      color: 'yellow'
    }
  ];

  // Mock data for MPLS alerts
  const mplsAlerts = [
    {
      id: 1,
      vpn: 'VPN003',
      message: 'MPLS tunnel experiencing high latency',
      severity: 'warning',
      time: '5 minutes ago',
      status: 'active'
    },
    {
      id: 2,
      vpn: 'VPN002',
      message: 'Route flapping detected on prefix 172.16.1.0/24',
      severity: 'critical',
      time: '12 minutes ago',
      status: 'active'
    },
    {
      id: 3,
      vpn: 'VPN001',
      message: 'Bandwidth utilization above 80%',
      severity: 'info',
      time: '1 hour ago',
      status: 'resolved'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'inactive': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'maintenance': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'inactive': return <AlertTriangle className="h-4 w-4 text-gray-500" />;
      case 'maintenance': return <Activity className="h-4 w-4 text-blue-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  const filteredVPNs = mplsVPNs.filter(vpn => 
    filterStatus === 'all' || vpn.status === filterStatus
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">MPLS Management</h1>
          <p className="text-gray-600 mt-1">Manage MPLS VPNs, routes, and network connectivity</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
            Add VPN
          </button>
        </div>
      </div>

      {/* MPLS Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mplsStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                stat.color === 'green' ? 'bg-green-100 text-green-600' :
                stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                'bg-yellow-100 text-yellow-600'}`}>
                {stat.icon}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-xs ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MPLS VPNs */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">MPLS VPNs</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VPN</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bandwidth</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sites</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uptime</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVPNs.map((vpn) => (
                    <tr 
                      key={vpn.id} 
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedVPN === vpn.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedVPN(selectedVPN === vpn.id ? null : vpn.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Network className="h-5 w-5 text-blue-600 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{vpn.name}</div>
                            <div className="text-sm text-gray-500">{vpn.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vpn.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(vpn.status)}
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            vpn.status === 'active' ? 'bg-green-100 text-green-800' :
                            vpn.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {vpn.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vpn.bandwidth}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vpn.sites}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vpn.uptime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* MPLS Alerts */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">MPLS Alerts</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div className="space-y-3">
            {mplsAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                <div className={`p-1 rounded-full ${
                  alert.severity === 'critical' ? 'text-red-600 bg-red-50' :
                  alert.severity === 'warning' ? 'text-yellow-600 bg-yellow-50' :
                  'text-blue-600 bg-blue-50'
                }`}>
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{alert.time}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      alert.status === 'active' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {alert.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MPLS Routes */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">MPLS Routes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VPN</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prefix</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Hop</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Update</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mplsRoutes.map((route) => (
                <tr key={route.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{route.vpn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{route.prefix}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{route.nextHop}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      route.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {route.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{route.metric}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{route.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MPLSManagementPage; 
import React, { useState } from 'react';
import { Lock, Activity, AlertTriangle, CheckCircle, MapPin, Users, Server, Shield, Wifi } from 'lucide-react';

const VPNManagementPage: React.FC = () => {
  const [selectedVPN, setSelectedVPN] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data for VPN connections
  const vpnConnections = [
    {
      id: 'VPN001',
      name: 'Corporate VPN - Main',
      type: 'SSL VPN',
      status: 'active',
      users: 45,
      maxUsers: 100,
      bandwidth: '500 Mbps',
      uptime: '99.9%',
      lastActivity: '2025-06-01 15:30'
    },
    {
      id: 'VPN002',
      name: 'Remote Access VPN',
      type: 'IPSec VPN',
      status: 'active',
      users: 28,
      maxUsers: 50,
      bandwidth: '200 Mbps',
      uptime: '99.8%',
      lastActivity: '2025-06-01 15:25'
    },
    {
      id: 'VPN003',
      name: 'Site-to-Site VPN',
      type: 'IPSec VPN',
      status: 'maintenance',
      users: 12,
      maxUsers: 25,
      bandwidth: '100 Mbps',
      uptime: '98.5%',
      lastActivity: '2025-06-01 14:45'
    },
    {
      id: 'VPN004',
      name: 'Mobile VPN',
      type: 'SSL VPN',
      status: 'active',
      users: 35,
      maxUsers: 75,
      bandwidth: '150 Mbps',
      uptime: '99.7%',
      lastActivity: '2025-06-01 15:20'
    }
  ];

  // Mock data for VPN users
  const vpnUsers = [
    {
      id: 'USER001',
      username: 'john.smith',
      vpn: 'VPN001',
      status: 'connected',
      ipAddress: '192.168.100.105',
      location: 'New York',
      connectionTime: '2h 15m',
      bandwidth: '5.2 Mbps'
    },
    {
      id: 'USER002',
      username: 'sarah.johnson',
      vpn: 'VPN002',
      status: 'connected',
      ipAddress: '192.168.100.106',
      location: 'Los Angeles',
      connectionTime: '1h 45m',
      bandwidth: '3.8 Mbps'
    },
    {
      id: 'USER003',
      username: 'mike.wilson',
      vpn: 'VPN001',
      status: 'disconnected',
      ipAddress: '192.168.100.107',
      location: 'Chicago',
      connectionTime: '0m',
      bandwidth: '0 Mbps'
    }
  ];

  // Mock data for VPN statistics
  const vpnStats = [
    {
      title: 'Total VPNs',
      value: vpnConnections.length.toString(),
      change: '+1',
      changeType: 'positive' as const,
      icon: <Lock className="h-6 w-6" />,
      color: 'blue'
    },
    {
      title: 'Active VPNs',
      value: vpnConnections.filter(v => v.status === 'active').length.toString(),
      change: '+1',
      changeType: 'positive' as const,
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'green'
    },
    {
      title: 'Connected Users',
      value: vpnUsers.filter(u => u.status === 'connected').length.toString(),
      change: '+3',
      changeType: 'positive' as const,
      icon: <Users className="h-6 w-6" />,
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

  // Mock data for VPN alerts
  const vpnAlerts = [
    {
      id: 1,
      vpn: 'VPN001',
      message: 'High bandwidth utilization detected',
      severity: 'warning',
      time: '8 minutes ago',
      status: 'active'
    },
    {
      id: 2,
      vpn: 'VPN003',
      message: 'VPN tunnel experiencing latency issues',
      severity: 'critical',
      time: '15 minutes ago',
      status: 'active'
    },
    {
      id: 3,
      vpn: 'VPN002',
      message: 'New user connected from unknown location',
      severity: 'info',
      time: '1 hour ago',
      status: 'resolved'
    }
  ];

  // Mock data for VPN security events
  const securityEvents = [
    {
      id: 1,
      type: 'Failed Login',
      user: 'unknown.user',
      ipAddress: '203.0.113.45',
      time: '2025-06-01 15:25',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'Suspicious Activity',
      user: 'john.smith',
      ipAddress: '192.168.100.105',
      time: '2025-06-01 15:20',
      severity: 'low'
    },
    {
      id: 3,
      type: 'Multiple Login Attempts',
      user: 'guest.user',
      ipAddress: '198.51.100.67',
      time: '2025-06-01 15:15',
      severity: 'high'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'inactive': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'maintenance': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'connected': return 'text-green-600 bg-green-50 border-green-200';
      case 'disconnected': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'inactive': return <AlertTriangle className="h-4 w-4 text-gray-500" />;
      case 'maintenance': return <Activity className="h-4 w-4 text-blue-500" />;
      case 'connected': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'disconnected': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredVPNs = vpnConnections.filter(vpn => 
    filterStatus === 'all' || vpn.status === filterStatus
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">VPN Management</h1>
          <p className="text-gray-600 mt-1">Manage VPN connections, users, and security monitoring</p>
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

      {/* VPN Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {vpnStats.map((stat, index) => (
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
        {/* VPN Connections */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">VPN Connections</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VPN</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bandwidth</th>
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
                          <Lock className="h-5 w-5 text-blue-600 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{vpn.name}</div>
                            <div className="text-sm text-gray-500">{vpn.lastActivity}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          vpn.type === 'SSL VPN' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {vpn.type}
                        </span>
                      </td>
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{vpn.users}/{vpn.maxUsers}</div>
                        <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                          <div 
                            className={`h-1 rounded-full ${
                              (vpn.users / vpn.maxUsers) > 0.8 ? 'bg-red-500' :
                              (vpn.users / vpn.maxUsers) > 0.6 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${(vpn.users / vpn.maxUsers) * 100}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vpn.bandwidth}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vpn.uptime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* VPN Alerts */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">VPN Alerts</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div className="space-y-3">
            {vpnAlerts.map((alert) => (
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

      {/* VPN Users and Security Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* VPN Users */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Connected Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VPN</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Connection Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vpnUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.vpn}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{user.ipAddress}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.connectionTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security Events */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Events</h2>
          <div className="space-y-3">
            {securityEvents.map((event) => (
              <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100">
                <div className={`p-1 rounded-full ${getSeverityColor(event.severity)}`}>
                  <Shield className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{event.type}</p>
                  <p className="text-xs text-gray-500">User: {event.user}</p>
                  <p className="text-xs text-gray-500">IP: {event.ipAddress}</p>
                  <p className="text-xs text-gray-500 mt-1">{event.time}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(event.severity)}`}>
                  {event.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VPNManagementPage; 
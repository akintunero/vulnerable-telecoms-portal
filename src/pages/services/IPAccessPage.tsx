import React, { useState } from 'react';
import { Globe, Activity, AlertTriangle, CheckCircle, MapPin, Users, Server, Shield, Wifi } from 'lucide-react';

const IPAccessPage: React.FC = () => {
  const [selectedPool, setSelectedPool] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data for IP pools
  const ipPools = [
    {
      id: 'POOL001',
      name: 'Corporate Network Pool',
      network: '192.168.1.0/24',
      gateway: '192.168.1.1',
      dhcpRange: '192.168.1.100 - 192.168.1.200',
      status: 'active',
      usedIPs: 45,
      totalIPs: 254,
      lastActivity: '2025-06-01 15:30'
    },
    {
      id: 'POOL002',
      name: 'Guest Network Pool',
      network: '10.0.1.0/24',
      gateway: '10.0.1.1',
      dhcpRange: '10.0.1.50 - 10.0.1.150',
      status: 'active',
      usedIPs: 28,
      totalIPs: 254,
      lastActivity: '2025-06-01 15:25'
    },
    {
      id: 'POOL003',
      name: 'IoT Network Pool',
      network: '172.16.1.0/24',
      gateway: '172.16.1.1',
      dhcpRange: '172.16.1.10 - 172.16.1.100',
      status: 'maintenance',
      usedIPs: 15,
      totalIPs: 254,
      lastActivity: '2025-06-01 14:45'
    },
    {
      id: 'POOL004',
      name: 'DMZ Network Pool',
      network: '203.0.113.0/24',
      gateway: '203.0.113.1',
      dhcpRange: '203.0.113.10 - 203.0.113.50',
      status: 'active',
      usedIPs: 8,
      totalIPs: 254,
      lastActivity: '2025-06-01 15:20'
    }
  ];

  // Mock data for DHCP leases
  const dhcpLeases = [
    {
      id: 'LEASE001',
      ipAddress: '192.168.1.105',
      macAddress: '00:1B:44:11:3A:B7',
      hostname: 'laptop-john',
      status: 'active',
      leaseStart: '2025-06-01 10:30',
      leaseEnd: '2025-06-01 18:30',
      pool: 'POOL001'
    },
    {
      id: 'LEASE002',
      ipAddress: '10.0.1.75',
      macAddress: 'AA:BB:CC:DD:EE:FF',
      hostname: 'guest-phone',
      status: 'active',
      leaseStart: '2025-06-01 14:15',
      leaseEnd: '2025-06-01 16:15',
      pool: 'POOL002'
    },
    {
      id: 'LEASE003',
      ipAddress: '172.16.1.25',
      macAddress: '11:22:33:44:55:66',
      hostname: 'printer-office',
      status: 'expired',
      leaseStart: '2025-06-01 08:00',
      leaseEnd: '2025-06-01 12:00',
      pool: 'POOL003'
    }
  ];

  // Mock data for IP access statistics
  const ipStats = [
    {
      title: 'Total IP Pools',
      value: ipPools.length.toString(),
      change: '+1',
      changeType: 'positive' as const,
      icon: <Globe className="h-6 w-6" />,
      color: 'blue'
    },
    {
      title: 'Active Pools',
      value: ipPools.filter(p => p.status === 'active').length.toString(),
      change: '+1',
      changeType: 'positive' as const,
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'green'
    },
    {
      title: 'Total Leases',
      value: dhcpLeases.length.toString(),
      change: '+5',
      changeType: 'positive' as const,
      icon: <Activity className="h-6 w-6" />,
      color: 'purple'
    },
    {
      title: 'Utilization',
      value: '18.5%',
      change: '+2.3%',
      changeType: 'positive' as const,
      icon: <Activity className="h-6 w-6" />,
      color: 'yellow'
    }
  ];

  // Mock data for IP access alerts
  const ipAlerts = [
    {
      id: 1,
      pool: 'POOL001',
      message: 'IP pool utilization approaching 80%',
      severity: 'warning',
      time: '10 minutes ago',
      status: 'active'
    },
    {
      id: 2,
      pool: 'POOL003',
      message: 'DHCP lease conflict detected',
      severity: 'critical',
      time: '25 minutes ago',
      status: 'active'
    },
    {
      id: 3,
      pool: 'POOL002',
      message: 'New device connected to guest network',
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
      case 'expired': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'inactive': return <AlertTriangle className="h-4 w-4 text-gray-500" />;
      case 'maintenance': return <Activity className="h-4 w-4 text-blue-500" />;
      case 'expired': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getUtilizationPercentage = (used: number, total: number) => {
    return Math.round((used / total) * 100);
  };

  const filteredPools = ipPools.filter(pool => 
    filterStatus === 'all' || pool.status === filterStatus
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">IP Access Management</h1>
          <p className="text-gray-600 mt-1">Manage IP address pools, DHCP leases, and network access</p>
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
            Add IP Pool
          </button>
        </div>
      </div>

      {/* IP Access Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ipStats.map((stat, index) => (
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
        {/* IP Pools */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">IP Address Pools</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pool</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Network</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gateway</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPools.map((pool) => (
                    <tr 
                      key={pool.id} 
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedPool === pool.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedPool(selectedPool === pool.id ? null : pool.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Globe className="h-5 w-5 text-blue-600 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{pool.name}</div>
                            <div className="text-sm text-gray-500">{pool.dhcpRange}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{pool.network}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(pool.status)}
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            pool.status === 'active' ? 'bg-green-100 text-green-800' :
                            pool.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {pool.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className={`h-2 rounded-full ${
                                getUtilizationPercentage(pool.usedIPs, pool.totalIPs) > 80 ? 'bg-red-500' :
                                getUtilizationPercentage(pool.usedIPs, pool.totalIPs) > 60 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${getUtilizationPercentage(pool.usedIPs, pool.totalIPs)}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-500">{getUtilizationPercentage(pool.usedIPs, pool.totalIPs)}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{pool.gateway}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* IP Access Alerts */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">IP Access Alerts</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div className="space-y-3">
            {ipAlerts.map((alert) => (
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

      {/* DHCP Leases */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">DHCP Leases</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MAC Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostname</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lease End</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pool</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dhcpLeases.map((lease) => (
                <tr key={lease.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-mono">{lease.ipAddress}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{lease.macAddress}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lease.hostname}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      lease.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {lease.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lease.leaseEnd}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lease.pool}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IPAccessPage; 
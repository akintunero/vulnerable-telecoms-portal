import React, { useState } from 'react';
import { Activity, TrendingUp, TrendingDown, BarChart3, PieChart, Users, Server, Clock, Wifi } from 'lucide-react';

const UsageReportsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('month');
  const [selectedService, setSelectedService] = useState<string>('all');

  // Mock data for usage statistics
  const usageStats = [
    {
      title: 'Total Bandwidth Used',
      value: '2.4 TB',
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: <Wifi className="h-6 w-6" />,
      color: 'blue'
    },
    {
      title: 'Active Users',
      value: '1,247',
      change: '+8.7%',
      changeType: 'positive' as const,
      icon: <Users className="h-6 w-6" />,
      color: 'green'
    },
    {
      title: 'Peak Usage Time',
      value: '2:00 PM',
      change: '-30 min',
      changeType: 'positive' as const,
      icon: <Clock className="h-6 w-6" />,
      color: 'yellow'
    },
    {
      title: 'Avg Session Duration',
      value: '4.2h',
      change: '+12%',
      changeType: 'positive' as const,
      icon: <Activity className="h-6 w-6" />,
      color: 'purple'
    }
  ];

  // Mock data for service usage breakdown
  const serviceUsage = [
    {
      service: 'Internet Connectivity',
      usage: 850,
      percentage: 35.4,
      users: 892,
      trend: 'up'
    },
    {
      service: 'VPN Services',
      usage: 520,
      percentage: 21.7,
      users: 445,
      trend: 'up'
    },
    {
      service: 'Cloud Storage',
      usage: 380,
      percentage: 15.8,
      users: 234,
      trend: 'up'
    },
    {
      service: 'VoIP Services',
      usage: 280,
      percentage: 11.7,
      users: 156,
      trend: 'down'
    },
    {
      service: 'Backup Services',
      usage: 370,
      percentage: 15.4,
      users: 189,
      trend: 'up'
    }
  ];

  // Mock data for customer usage patterns
  const customerUsage = [
    {
      customer: 'TechCorp Solutions',
      service: 'Internet + VPN',
      usage: 125,
      limit: 150,
      status: 'normal',
      lastActivity: '2025-06-01 15:30'
    },
    {
      customer: 'RetailChain Inc',
      service: 'Internet + Cloud',
      usage: 95,
      limit: 100,
      status: 'near_limit',
      lastActivity: '2025-06-01 15:25'
    },
    {
      customer: 'CloudTech Ltd',
      service: 'All Services',
      usage: 180,
      limit: 200,
      status: 'normal',
      lastActivity: '2025-06-01 15:20'
    },
    {
      customer: 'FinanceCorp',
      service: 'Internet + VoIP',
      usage: 110,
      limit: 120,
      status: 'normal',
      lastActivity: '2025-06-01 15:15'
    }
  ];

  // Mock data for hourly usage patterns
  const hourlyUsage = [
    { hour: '00:00', usage: 45, users: 120 },
    { hour: '04:00', usage: 35, users: 85 },
    { hour: '08:00', usage: 85, users: 320 },
    { hour: '12:00', usage: 120, users: 580 },
    { hour: '16:00', usage: 140, users: 650 },
    { hour: '20:00', usage: 95, users: 420 },
    { hour: '24:00', usage: 55, users: 150 }
  ];

  // Mock data for bandwidth consumption by location
  const locationUsage = [
    { location: 'New York', usage: 450, percentage: 18.8, users: 245 },
    { location: 'Los Angeles', usage: 380, percentage: 15.8, users: 198 },
    { location: 'Chicago', usage: 320, percentage: 13.3, users: 167 },
    { location: 'Houston', usage: 280, percentage: 11.7, users: 145 },
    { location: 'Phoenix', usage: 250, percentage: 10.4, users: 128 }
  ];

  // Mock data for usage alerts
  const usageAlerts = [
    {
      id: 1,
      customer: 'RetailChain Inc',
      message: 'Bandwidth usage approaching 95% of limit',
      severity: 'warning',
      time: '10 minutes ago',
      status: 'active'
    },
    {
      id: 2,
      customer: 'CloudTech Ltd',
      message: 'Unusual spike in VPN usage detected',
      severity: 'info',
      time: '1 hour ago',
      status: 'resolved'
    },
    {
      id: 3,
      customer: 'FinanceCorp',
      message: 'VoIP service usage below normal levels',
      severity: 'low',
      time: '2 hours ago',
      status: 'active'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-50 border-green-200';
      case 'near_limit': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'over_limit': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <Activity className="h-4 w-4 text-green-500" />;
      case 'near_limit': return <TrendingUp className="h-4 w-4 text-yellow-500" />;
      case 'over_limit': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'info': return 'text-blue-600 bg-blue-50';
      case 'low': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="h-4 w-4 text-green-500" /> : 
      <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  const formatUsage = (usage: number) => {
    if (usage >= 1000) {
      return `${(usage / 1000).toFixed(1)} TB`;
    }
    return `${usage} GB`;
  };

  const getUsagePercentage = (usage: number, limit: number) => {
    return Math.round((usage / limit) * 100);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Usage Reports</h1>
          <p className="text-gray-600 mt-1">Monitor bandwidth usage, service utilization, and consumption patterns</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Services</option>
            <option value="internet">Internet</option>
            <option value="vpn">VPN</option>
            <option value="cloud">Cloud</option>
            <option value="voip">VoIP</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
            Export Report
          </button>
        </div>
      </div>

      {/* Usage Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {usageStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                stat.color === 'green' ? 'bg-green-100 text-green-600' :
                stat.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                'bg-purple-100 text-purple-600'}`}>
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

      {/* Service Usage and Customer Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Usage Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Service Usage Breakdown</h2>
            <PieChart className="h-5 w-5 text-blue-600" />
          </div>
          <div className="space-y-4">
            {serviceUsage.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    index === 0 ? 'bg-blue-500' :
                    index === 1 ? 'bg-green-500' :
                    index === 2 ? 'bg-purple-500' :
                    index === 3 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{service.service}</p>
                    <p className="text-xs text-gray-500">{service.users} users</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(service.trend)}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{formatUsage(service.usage)}</p>
                      <p className="text-xs text-gray-500">{service.percentage}%</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Usage Patterns */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Customer Usage Patterns</h2>
            <Users className="h-5 w-5 text-green-600" />
          </div>
          <div className="space-y-4">
            {customerUsage.map((customer, index) => (
              <div key={index} className="p-3 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{customer.customer}</p>
                    <p className="text-xs text-gray-500">{customer.service}</p>
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon(customer.status)}
                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      customer.status === 'normal' ? 'bg-green-100 text-green-800' :
                      customer.status === 'near_limit' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {customer.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className={`h-2 rounded-full ${
                          getUsagePercentage(customer.usage, customer.limit) > 90 ? 'bg-red-500' :
                          getUsagePercentage(customer.usage, customer.limit) > 75 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${getUsagePercentage(customer.usage, customer.limit)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">{getUsagePercentage(customer.usage, customer.limit)}%</span>
                  </div>
                  <span className="text-sm text-gray-500">{formatUsage(customer.usage)} / {formatUsage(customer.limit)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hourly Usage and Location Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Usage Patterns */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Hourly Usage Patterns</h2>
          <div className="space-y-3">
            {hourlyUsage.map((hour, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-blue-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">{hour.hour}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{formatUsage(hour.usage)}</p>
                  <p className="text-xs text-gray-500">{hour.users} users</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Usage by Location */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Usage by Location</h2>
          <div className="space-y-3">
            {locationUsage.map((location, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    index === 0 ? 'bg-blue-500' :
                    index === 1 ? 'bg-green-500' :
                    index === 2 ? 'bg-purple-500' :
                    index === 3 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{location.location}</p>
                    <p className="text-xs text-gray-500">{location.users} users</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{formatUsage(location.usage)}</p>
                  <p className="text-xs text-gray-500">{location.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Usage Alerts */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Usage Alerts</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
        </div>
        <div className="space-y-3">
          {usageAlerts.map((alert) => (
            <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
              <div className={`p-1 rounded-full ${getSeverityColor(alert.severity)}`}>
                <Activity className="h-4 w-4" />
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
  );
};

export default UsageReportsPage; 
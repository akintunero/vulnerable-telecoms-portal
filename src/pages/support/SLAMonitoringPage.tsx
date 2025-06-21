import React, { useState } from 'react';
import { Clock, Activity, AlertTriangle, CheckCircle, MapPin, Users, Server, Target, TrendingUp } from 'lucide-react';

const SLAMonitoringPage: React.FC = () => {
  const [selectedSLA, setSelectedSLA] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data for SLA agreements
  const slaAgreements = [
    {
      id: 'SLA001',
      name: 'Network Uptime SLA',
      customer: 'TechCorp Solutions',
      service: 'Internet Connectivity',
      target: '99.9%',
      current: '99.95%',
      status: 'compliant',
      priority: 'high',
      lastUpdated: '2025-06-01 15:30'
    },
    {
      id: 'SLA002',
      name: 'Response Time SLA',
      customer: 'RetailChain Inc',
      service: 'Support Response',
      target: '4 hours',
      current: '2.5 hours',
      status: 'compliant',
      priority: 'medium',
      lastUpdated: '2025-06-01 15:25'
    },
    {
      id: 'SLA003',
      name: 'Resolution Time SLA',
      customer: 'CloudTech Ltd',
      service: 'Issue Resolution',
      target: '24 hours',
      current: '28 hours',
      status: 'breach',
      priority: 'high',
      lastUpdated: '2025-06-01 14:45'
    },
    {
      id: 'SLA004',
      name: 'Bandwidth SLA',
      customer: 'FinanceCorp',
      service: 'Data Transfer',
      target: '100 Mbps',
      current: '95 Mbps',
      status: 'warning',
      priority: 'medium',
      lastUpdated: '2025-06-01 15:20'
    }
  ];

  // Mock data for SLA performance metrics
  const slaMetrics = [
    {
      id: 'METRIC001',
      sla: 'SLA001',
      metric: 'Uptime',
      target: '99.9%',
      actual: '99.95%',
      trend: 'up',
      period: 'Last 30 days'
    },
    {
      id: 'METRIC002',
      sla: 'SLA002',
      metric: 'Response Time',
      target: '4 hours',
      actual: '2.5 hours',
      trend: 'up',
      period: 'Last 30 days'
    },
    {
      id: 'METRIC003',
      sla: 'SLA003',
      metric: 'Resolution Time',
      target: '24 hours',
      actual: '28 hours',
      trend: 'down',
      period: 'Last 30 days'
    }
  ];

  // Mock data for SLA statistics
  const slaStats = [
    {
      title: 'Total SLAs',
      value: slaAgreements.length.toString(),
      change: '+2',
      changeType: 'positive' as const,
      icon: <Target className="h-6 w-6" />,
      color: 'blue'
    },
    {
      title: 'Compliant SLAs',
      value: slaAgreements.filter(s => s.status === 'compliant').length.toString(),
      change: '+1',
      changeType: 'positive' as const,
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'green'
    },
    {
      title: 'SLA Breaches',
      value: slaAgreements.filter(s => s.status === 'breach').length.toString(),
      change: '-1',
      changeType: 'positive' as const,
      icon: <AlertTriangle className="h-6 w-6" />,
      color: 'red'
    },
    {
      title: 'Avg Compliance',
      value: '94.5%',
      change: '+2.3%',
      changeType: 'positive' as const,
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'yellow'
    }
  ];

  // Mock data for SLA alerts
  const slaAlerts = [
    {
      id: 1,
      sla: 'SLA003',
      message: 'Resolution time SLA breached - 28 hours vs 24 hour target',
      severity: 'critical',
      time: '2 hours ago',
      status: 'active'
    },
    {
      id: 2,
      sla: 'SLA004',
      message: 'Bandwidth performance approaching SLA threshold',
      severity: 'warning',
      time: '4 hours ago',
      status: 'active'
    },
    {
      id: 3,
      sla: 'SLA001',
      message: 'Network uptime SLA exceeded target - 99.95% vs 99.9%',
      severity: 'info',
      time: '1 day ago',
      status: 'resolved'
    }
  ];

  // Mock data for SLA trends
  const slaTrends = [
    {
      month: 'Jan',
      compliance: 92,
      breaches: 3
    },
    {
      month: 'Feb',
      compliance: 94,
      breaches: 2
    },
    {
      month: 'Mar',
      compliance: 96,
      breaches: 1
    },
    {
      month: 'Apr',
      compliance: 93,
      breaches: 2
    },
    {
      month: 'May',
      compliance: 95,
      breaches: 1
    },
    {
      month: 'Jun',
      compliance: 94.5,
      breaches: 1
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'breach': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'breach': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'info': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="h-4 w-4 text-green-500" /> : 
      <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />;
  };

  const filteredSLAs = slaAgreements.filter(sla => 
    filterStatus === 'all' || sla.status === filterStatus
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">SLA Monitoring</h1>
          <p className="text-gray-600 mt-1">Monitor service level agreements and compliance</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="compliant">Compliant</option>
            <option value="warning">Warning</option>
            <option value="breach">Breach</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
            Add SLA
          </button>
        </div>
      </div>

      {/* SLA Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {slaStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                stat.color === 'green' ? 'bg-green-100 text-green-600' :
                stat.color === 'red' ? 'bg-red-100 text-red-600' :
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
        {/* SLA Agreements */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">SLA Agreements</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SLA</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSLAs.map((sla) => (
                    <tr 
                      key={sla.id} 
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedSLA === sla.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedSLA(selectedSLA === sla.id ? null : sla.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Target className="h-5 w-5 text-blue-600 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{sla.name}</div>
                            <div className="text-sm text-gray-500">{sla.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sla.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sla.service}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(sla.status)}
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            sla.status === 'compliant' ? 'bg-green-100 text-green-800' :
                            sla.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {sla.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sla.target}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sla.current}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SLA Alerts */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">SLA Alerts</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div className="space-y-3">
            {slaAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                <div className={`p-1 rounded-full ${getSeverityColor(alert.severity)}`}>
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

      {/* SLA Performance Metrics and Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SLA Performance Metrics */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h2>
          <div className="space-y-4">
            {slaMetrics.map((metric) => (
              <div key={metric.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{metric.metric}</p>
                    <p className="text-xs text-gray-500">SLA: {metric.sla}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(metric.trend)}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{metric.actual}</p>
                      <p className="text-xs text-gray-500">Target: {metric.target}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{metric.period}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SLA Trends Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">SLA Compliance Trends</h2>
          <div className="space-y-4">
            {slaTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                    {trend.month}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{trend.compliance}% Compliance</p>
                    <p className="text-xs text-gray-500">{trend.breaches} breaches</p>
                  </div>
                </div>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      trend.compliance >= 95 ? 'bg-green-500' :
                      trend.compliance >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${trend.compliance}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SLA Details (when selected) */}
      {selectedSLA && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">SLA Details</h2>
          {(() => {
            const sla = slaAgreements.find(s => s.id === selectedSLA);
            if (!sla) return null;
            
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-2">SLA Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">ID:</span>
                      <span className="text-sm font-medium text-gray-900">{sla.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Name:</span>
                      <span className="text-sm font-medium text-gray-900">{sla.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Customer:</span>
                      <span className="text-sm font-medium text-gray-900">{sla.customer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Service:</span>
                      <span className="text-sm font-medium text-gray-900">{sla.service}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-2">Performance Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Status:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        sla.status === 'compliant' ? 'bg-green-100 text-green-800' :
                        sla.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {sla.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Target:</span>
                      <span className="text-sm font-medium text-gray-900">{sla.target}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Current:</span>
                      <span className="text-sm font-medium text-gray-900">{sla.current}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Priority:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(sla.priority)}`}>
                        {sla.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default SLAMonitoringPage; 
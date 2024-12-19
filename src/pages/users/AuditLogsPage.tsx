import React, { useState } from 'react';
import { FileSearch, Search, Filter, Download, Eye, User, Shield, Database, Clock, AlertTriangle, CheckCircle, XCircle, Activity, Calendar, Users } from 'lucide-react';

const AuditLogsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('7days');

  // Mock data for audit logs
  const auditLogs = [
    {
      id: 1,
      timestamp: '2025-06-01 15:30:45',
      user: 'admin@telco.com',
      action: 'User Login',
      level: 'INFO',
      category: 'Authentication',
      details: 'Successful login from IP 192.168.1.100',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/120.0.0.0',
      sessionId: 'sess_abc123',
      status: 'success'
    },
    {
      id: 2,
      timestamp: '2025-06-01 15:25:30',
      user: 'john.smith@telco.com',
      action: 'Customer Data Access',
      level: 'INFO',
      category: 'Data Access',
      details: 'Viewed customer profile for TechCorp Solutions',
      ipAddress: '192.168.1.101',
      userAgent: 'Firefox/119.0.0.0',
      sessionId: 'sess_def456',
      status: 'success'
    },
    {
      id: 3,
      timestamp: '2025-06-01 15:20:15',
      user: 'sarah.johnson@telco.com',
      action: 'Configuration Change',
      level: 'WARNING',
      category: 'System',
      details: 'Modified network configuration settings',
      ipAddress: '192.168.1.102',
      userAgent: 'Safari/17.0.0.0',
      sessionId: 'sess_ghi789',
      status: 'success'
    },
    {
      id: 4,
      timestamp: '2025-06-01 15:15:00',
      user: 'unknown',
      action: 'Failed Login Attempt',
      level: 'WARNING',
      category: 'Security',
      details: 'Failed login attempt for admin@telco.com',
      ipAddress: '203.0.113.45',
      userAgent: 'Unknown',
      sessionId: null,
      status: 'failed'
    },
    {
      id: 5,
      timestamp: '2025-06-01 15:10:30',
      user: 'david.wilson@telco.com',
      action: 'API Access',
      level: 'INFO',
      category: 'API',
      details: 'API call to /api/v1/customers endpoint',
      ipAddress: '192.168.1.103',
      userAgent: 'API Client/1.0',
      sessionId: 'sess_jkl012',
      status: 'success'
    },
    {
      id: 6,
      timestamp: '2025-06-01 15:05:15',
      user: 'system',
      action: 'Backup Completed',
      level: 'INFO',
      category: 'System',
      details: 'Automated database backup completed successfully',
      ipAddress: '127.0.0.1',
      userAgent: 'System Service',
      sessionId: null,
      status: 'success'
    },
    {
      id: 7,
      timestamp: '2025-06-01 15:00:00',
      user: 'lisa.brown@telco.com',
      action: 'Data Export',
      level: 'INFO',
      category: 'Data Export',
      details: 'Exported customer report to CSV format',
      ipAddress: '192.168.1.104',
      userAgent: 'Chrome/120.0.0.0',
      sessionId: 'sess_mno345',
      status: 'success'
    },
    {
      id: 8,
      timestamp: '2025-06-01 14:55:45',
      user: 'unknown',
      action: 'Suspicious Activity',
      level: 'ERROR',
      category: 'Security',
      details: 'Multiple failed login attempts detected',
      ipAddress: '198.51.100.67',
      userAgent: 'Unknown',
      sessionId: null,
      status: 'blocked'
    }
  ];

  // Mock data for audit statistics
  const auditStats = [
    {
      metric: 'Total Logs',
      value: '12,450',
      change: '+8.5%',
      changeType: 'positive' as const,
      period: 'Last 24 hours'
    },
    {
      metric: 'Security Events',
      value: '23',
      change: '-12%',
      changeType: 'positive' as const,
      period: 'Last 24 hours'
    },
    {
      metric: 'Failed Logins',
      value: '8',
      change: '+25%',
      changeType: 'negative' as const,
      period: 'Last 24 hours'
    },
    {
      metric: 'Data Access',
      value: '1,234',
      change: '+15%',
      changeType: 'positive' as const,
      period: 'Last 24 hours'
    }
  ];

  // Mock data for user activity summary
  const userActivity = [
    {
      user: 'admin@telco.com',
      actions: 45,
      lastActivity: '2025-06-01 15:30',
      status: 'active',
      riskLevel: 'low'
    },
    {
      user: 'john.smith@telco.com',
      actions: 32,
      lastActivity: '2025-06-01 15:25',
      status: 'active',
      riskLevel: 'low'
    },
    {
      user: 'sarah.johnson@telco.com',
      actions: 28,
      lastActivity: '2025-06-01 15:20',
      status: 'active',
      riskLevel: 'medium'
    },
    {
      user: 'david.wilson@telco.com',
      actions: 15,
      lastActivity: '2025-06-01 15:10',
      status: 'active',
      riskLevel: 'low'
    }
  ];

  // Mock data for security alerts
  const securityAlerts = [
    {
      id: 1,
      type: 'Failed Login',
      severity: 'medium',
      description: 'Multiple failed login attempts from IP 203.0.113.45',
      timestamp: '2025-06-01 15:15:00',
      status: 'investigating'
    },
    {
      id: 2,
      type: 'Suspicious Activity',
      severity: 'high',
      description: 'Unusual data access pattern detected',
      timestamp: '2025-06-01 14:55:45',
      status: 'resolved'
    },
    {
      id: 3,
      type: 'Configuration Change',
      severity: 'low',
      description: 'Network settings modified by unauthorized user',
      timestamp: '2025-06-01 14:30:20',
      status: 'investigating'
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR': return 'bg-red-100 text-red-800';
      case 'WARNING': return 'bg-yellow-100 text-yellow-800';
      case 'INFO': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'failed': return 'text-red-600 bg-red-50 border-red-200';
      case 'blocked': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'blocked': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || log.level === selectedLevel;
    const matchesUser = selectedUser === 'all' || log.user === selectedUser;
    return matchesSearch && matchesLevel && matchesUser;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-600 mt-1">Monitor user activities, system events, and security logs</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50">
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search logs by action, user, or details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Levels</option>
            <option value="INFO">Info</option>
            <option value="WARNING">Warning</option>
            <option value="ERROR">Error</option>
          </select>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Users</option>
            <option value="admin@telco.com">Admin</option>
            <option value="john.smith@telco.com">John Smith</option>
            <option value="sarah.johnson@telco.com">Sarah Johnson</option>
          </select>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1hour">Last Hour</option>
            <option value="24hours">Last 24 Hours</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Audit Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {auditStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mr-3">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.metric}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-xs ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Audit Logs Table and Security Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Audit Logs Table */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Audit Logs</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{log.user}</div>
                        <div className="text-xs text-gray-500">{log.ipAddress}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{log.action}</div>
                        <div className="text-xs text-gray-500">{log.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(log.level)}`}>
                          {log.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(log.status)}
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            log.status === 'success' ? 'bg-green-100 text-green-800' :
                            log.status === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {log.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Security Alerts */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Alerts</h2>
          <div className="space-y-3">
            {securityAlerts.map((alert) => (
              <div key={alert.id} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    alert.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {alert.status}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">{alert.type}</h3>
                <p className="text-xs text-gray-500 mb-2">{alert.description}</p>
                <p className="text-xs text-gray-400">{alert.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Activity Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">User Activity Summary</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userActivity.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-blue-600 mr-2" />
                      <div className="text-sm font-medium text-gray-900">{user.user}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.actions}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastActivity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskLevelColor(user.riskLevel)}`}>
                      {user.riskLevel}
                    </span>
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

export default AuditLogsPage; 
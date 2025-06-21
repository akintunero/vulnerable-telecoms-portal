import React, { useState } from 'react';
import { AlertTriangle, Shield, Activity, Clock, Users, Globe, Zap, Eye, CheckCircle, XCircle, AlertCircle, TrendingUp, MapPin, Server } from 'lucide-react';

const SecurityAlertsPage: React.FC = () => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Mock data for security alerts
  const securityAlerts = [
    {
      id: 1,
      title: 'Suspicious Login Attempt',
      description: 'Multiple failed login attempts detected from unknown IP address',
      severity: 'high',
      status: 'investigating',
      type: 'authentication',
      timestamp: '2025-06-01 15:30:45',
      source: '192.168.1.100',
      affectedUsers: 1,
      location: 'New York',
      assignedTo: 'David Wilson',
      priority: 'critical'
    },
    {
      id: 2,
      title: 'DDoS Attack Detected',
      description: 'Distributed denial of service attack targeting network infrastructure',
      severity: 'critical',
      status: 'active',
      type: 'network',
      timestamp: '2025-06-01 15:25:30',
      source: 'Multiple IPs',
      affectedUsers: 1250,
      location: 'Global',
      assignedTo: 'Network Team',
      priority: 'critical'
    },
    {
      id: 3,
      title: 'Data Breach Attempt',
      description: 'Unauthorized access attempt to customer database',
      severity: 'high',
      status: 'resolved',
      type: 'data_access',
      timestamp: '2025-06-01 15:20:15',
      source: '203.0.113.45',
      affectedUsers: 0,
      location: 'Los Angeles',
      assignedTo: 'Sarah Johnson',
      priority: 'high'
    },
    {
      id: 4,
      title: 'Malware Detection',
      description: 'Suspicious file detected on employee workstation',
      severity: 'medium',
      status: 'investigating',
      type: 'malware',
      timestamp: '2025-06-01 15:15:00',
      source: '192.168.1.105',
      affectedUsers: 1,
      location: 'Chicago',
      assignedTo: 'IT Security',
      priority: 'medium'
    },
    {
      id: 5,
      title: 'Configuration Change',
      description: 'Unauthorized change to firewall rules detected',
      severity: 'medium',
      status: 'resolved',
      type: 'configuration',
      timestamp: '2025-06-01 15:10:30',
      source: '192.168.1.102',
      affectedUsers: 0,
      location: 'Houston',
      assignedTo: 'System Admin',
      priority: 'medium'
    },
    {
      id: 6,
      title: 'API Rate Limit Exceeded',
      description: 'Unusual API usage pattern detected',
      severity: 'low',
      status: 'monitoring',
      type: 'api_abuse',
      timestamp: '2025-06-01 15:05:15',
      source: '198.51.100.67',
      affectedUsers: 0,
      location: 'Phoenix',
      assignedTo: 'API Team',
      priority: 'low'
    }
  ];

  // Mock data for security statistics
  const securityStats = [
    {
      metric: 'Active Alerts',
      value: '8',
      change: '+2',
      changeType: 'negative' as const,
      icon: <AlertTriangle className="h-6 w-6" />,
      color: 'red'
    },
    {
      metric: 'Threats Blocked',
      value: '1,247',
      change: '+15%',
      changeType: 'positive' as const,
      icon: <Shield className="h-6 w-6" />,
      color: 'green'
    },
    {
      metric: 'Incidents Resolved',
      value: '23',
      change: '+8',
      changeType: 'positive' as const,
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'blue'
    },
    {
      metric: 'Response Time',
      value: '4.2 min',
      change: '-12%',
      changeType: 'positive' as const,
      icon: <Clock className="h-6 w-6" />,
      color: 'purple'
    }
  ];

  // Mock data for threat intelligence
  const threatIntelligence = [
    {
      id: 1,
      threat: 'Ransomware Campaign',
      severity: 'high',
      description: 'New ransomware variant targeting telco infrastructure',
      indicators: ['malware_hash_abc123', 'domain_xyz.com'],
      affectedSectors: ['Telecommunications', 'Finance'],
      lastSeen: '2025-06-01 14:30',
      status: 'active'
    },
    {
      id: 2,
      threat: 'Phishing Campaign',
      severity: 'medium',
      description: 'Targeted phishing emails impersonating telco support',
      indicators: ['email_pattern', 'fake_domain.com'],
      affectedSectors: ['Telecommunications'],
      lastSeen: '2025-06-01 13:45',
      status: 'monitoring'
    },
    {
      id: 3,
      threat: 'DDoS Botnet',
      severity: 'critical',
      description: 'Large-scale DDoS attacks using IoT devices',
      indicators: ['botnet_c2', 'attack_pattern'],
      affectedSectors: ['All Sectors'],
      lastSeen: '2025-06-01 15:25',
      status: 'active'
    }
  ];

  // Mock data for incident timeline
  const incidentTimeline = [
    {
      id: 1,
      time: '15:30:45',
      event: 'Alert Triggered',
      description: 'Suspicious login attempt detected',
      user: 'System',
      status: 'info'
    },
    {
      id: 2,
      time: '15:31:00',
      event: 'Investigation Started',
      description: 'Security team notified and investigation initiated',
      user: 'David Wilson',
      status: 'warning'
    },
    {
      id: 3,
      time: '15:32:15',
      event: 'IP Blocked',
      description: 'Suspicious IP address blocked at firewall',
      user: 'Network Team',
      status: 'success'
    },
    {
      id: 4,
      time: '15:33:30',
      event: 'Incident Resolved',
      description: 'Threat contained and incident closed',
      user: 'David Wilson',
      status: 'success'
    }
  ];

  // Mock data for security metrics
  const securityMetrics = [
    {
      category: 'Authentication',
      total: 45,
      resolved: 42,
      pending: 3,
      percentage: 93.3
    },
    {
      category: 'Network Security',
      total: 28,
      resolved: 25,
      pending: 3,
      percentage: 89.3
    },
    {
      category: 'Data Protection',
      total: 15,
      resolved: 14,
      pending: 1,
      percentage: 93.3
    },
    {
      category: 'Malware',
      total: 8,
      resolved: 7,
      pending: 1,
      percentage: 87.5
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'monitoring': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'investigating': return <Activity className="h-4 w-4 text-yellow-500" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'monitoring': return <Eye className="h-4 w-4 text-blue-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAlerts = securityAlerts.filter(alert => {
    const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'all' || alert.status === selectedStatus;
    const matchesType = selectedType === 'all' || alert.type === selectedType;
    return matchesSeverity && matchesStatus && matchesType;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Security Alerts & Incidents</h1>
          <p className="text-gray-600 mt-1">Monitor and respond to security threats and incidents</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Report Incident
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50">
            <Shield className="h-4 w-4 mr-2" />
            Security Report
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
            <option value="monitoring">Monitoring</option>
          </select>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="authentication">Authentication</option>
            <option value="network">Network</option>
            <option value="data_access">Data Access</option>
            <option value="malware">Malware</option>
            <option value="configuration">Configuration</option>
            <option value="api_abuse">API Abuse</option>
          </select>
        </div>
      </div>

      {/* Security Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {securityStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg mr-3 ${
                stat.color === 'red' ? 'bg-red-100 text-red-600' :
                stat.color === 'green' ? 'bg-green-100 text-green-600' :
                stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                'bg-purple-100 text-purple-600'
              }`}>
                {stat.icon}
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

      {/* Security Alerts and Threat Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Alerts */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Security Alerts</h2>
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <div key={alert.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-sm font-medium text-gray-900">{alert.title}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                          {alert.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Source: {alert.source}</span>
                        <span>Location: {alert.location}</span>
                        <span>Affected: {alert.affectedUsers} users</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(alert.status)}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Assigned to: {alert.assignedTo}</span>
                    <span>{alert.timestamp}</span>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-xs">View Details</button>
                    <button className="text-green-600 hover:text-green-800 text-xs">Resolve</button>
                    <button className="text-purple-600 hover:text-purple-800 text-xs">Escalate</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Threat Intelligence */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Threat Intelligence</h2>
          <div className="space-y-3">
            {threatIntelligence.map((threat) => (
              <div key={threat.id} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900">{threat.threat}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(threat.severity)}`}>
                    {threat.severity}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{threat.description}</p>
                <div className="text-xs text-gray-500 mb-2">
                  <div>Indicators: {threat.indicators.join(', ')}</div>
                  <div>Affected: {threat.affectedSectors.join(', ')}</div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Last seen: {threat.lastSeen}</span>
                  <span className={`px-2 py-1 rounded-full ${
                    threat.status === 'active' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {threat.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Metrics and Incident Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Metrics */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Metrics</h2>
          <div className="space-y-4">
            {securityMetrics.map((metric, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900">{metric.category}</h3>
                  <span className="text-sm font-medium text-gray-900">{metric.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${metric.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Total: {metric.total}</span>
                  <span>Resolved: {metric.resolved}</span>
                  <span>Pending: {metric.pending}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incident Timeline */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Incident Timeline</h2>
          <div className="space-y-3">
            {incidentTimeline.map((event) => (
              <div key={event.id} className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                  event.status === 'success' ? 'bg-green-500' :
                  event.status === 'warning' ? 'bg-yellow-500' :
                  event.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{event.event}</p>
                    <span className="text-xs text-gray-500">{event.time}</span>
                  </div>
                  <p className="text-xs text-gray-500">{event.description}</p>
                  <p className="text-xs text-gray-400">By: {event.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityAlertsPage; 
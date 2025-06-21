import React, { useState } from 'react';
import { Shield, Activity, AlertTriangle, CheckCircle, MapPin, Users, Server, Lock, Eye } from 'lucide-react';

const SecuritySolutionsPage: React.FC = () => {
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data for security policies
  const securityPolicies = [
    {
      id: 'POL001',
      name: 'Corporate Firewall Policy',
      type: 'Firewall',
      status: 'active',
      priority: 'high',
      rules: 45,
      lastUpdated: '2025-06-01 15:30',
      description: 'Main corporate network security policy'
    },
    {
      id: 'POL002',
      name: 'Guest Network Policy',
      type: 'Access Control',
      status: 'active',
      priority: 'medium',
      rules: 12,
      lastUpdated: '2025-06-01 15:25',
      description: 'Restricted access for guest users'
    },
    {
      id: 'POL003',
      name: 'DMZ Security Policy',
      type: 'Firewall',
      status: 'maintenance',
      priority: 'high',
      rules: 28,
      lastUpdated: '2025-06-01 14:45',
      description: 'Demilitarized zone security rules'
    },
    {
      id: 'POL004',
      name: 'IoT Device Policy',
      type: 'Access Control',
      status: 'active',
      priority: 'low',
      rules: 8,
      lastUpdated: '2025-06-01 15:20',
      description: 'Internet of Things device restrictions'
    }
  ];

  // Mock data for firewall rules
  const firewallRules = [
    {
      id: 'RULE001',
      policy: 'POL001',
      name: 'Allow HTTP Traffic',
      action: 'allow',
      source: 'any',
      destination: 'web-servers',
      protocol: 'TCP',
      port: '80',
      status: 'active'
    },
    {
      id: 'RULE002',
      policy: 'POL001',
      name: 'Block Malicious IPs',
      action: 'deny',
      source: 'blacklist',
      destination: 'any',
      protocol: 'any',
      port: 'any',
      status: 'active'
    },
    {
      id: 'RULE003',
      policy: 'POL002',
      name: 'Guest Internet Access',
      action: 'allow',
      source: 'guest-network',
      destination: 'internet',
      protocol: 'TCP',
      port: '80,443',
      status: 'active'
    }
  ];

  // Mock data for security statistics
  const securityStats = [
    {
      title: 'Active Policies',
      value: securityPolicies.filter(p => p.status === 'active').length.toString(),
      change: '+2',
      changeType: 'positive' as const,
      icon: <Shield className="h-6 w-6" />,
      color: 'blue'
    },
    {
      title: 'Firewall Rules',
      value: firewallRules.length.toString(),
      change: '+5',
      changeType: 'positive' as const,
      icon: <Lock className="h-6 w-6" />,
      color: 'green'
    },
    {
      title: 'Threats Blocked',
      value: '1,247',
      change: '+23',
      changeType: 'positive' as const,
      icon: <AlertTriangle className="h-6 w-6" />,
      color: 'red'
    },
    {
      title: 'Security Score',
      value: '94%',
      change: '+2%',
      changeType: 'positive' as const,
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'yellow'
    }
  ];

  // Mock data for security alerts
  const securityAlerts = [
    {
      id: 1,
      policy: 'POL001',
      message: 'Suspicious traffic detected from external IP',
      severity: 'high',
      time: '5 minutes ago',
      status: 'active'
    },
    {
      id: 2,
      policy: 'POL003',
      message: 'Firewall rule conflict detected',
      severity: 'medium',
      time: '12 minutes ago',
      status: 'active'
    },
    {
      id: 3,
      policy: 'POL002',
      message: 'Guest user attempting unauthorized access',
      severity: 'low',
      time: '1 hour ago',
      status: 'resolved'
    }
  ];

  // Mock data for threat intelligence
  const threatIntelligence = [
    {
      id: 1,
      type: 'Malware Detection',
      source: '203.0.113.45',
      target: 'web-server-01',
      severity: 'high',
      time: '2025-06-01 15:25',
      status: 'blocked'
    },
    {
      id: 2,
      type: 'DDoS Attack',
      source: 'Multiple IPs',
      target: 'mail-server',
      severity: 'critical',
      time: '2025-06-01 15:20',
      status: 'mitigated'
    },
    {
      id: 3,
      type: 'Port Scan',
      source: '198.51.100.67',
      target: 'firewall-01',
      severity: 'medium',
      time: '2025-06-01 15:15',
      status: 'monitoring'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'inactive': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'maintenance': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'blocked': return 'text-red-600 bg-red-50 border-red-200';
      case 'mitigated': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'monitoring': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'inactive': return <AlertTriangle className="h-4 w-4 text-gray-500" />;
      case 'maintenance': return <Activity className="h-4 w-4 text-blue-500" />;
      case 'blocked': return <Shield className="h-4 w-4 text-red-500" />;
      case 'mitigated': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'monitoring': return <Eye className="h-4 w-4 text-blue-500" />;
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
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredPolicies = securityPolicies.filter(policy => 
    filterStatus === 'all' || policy.status === filterStatus
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Security Solutions</h1>
          <p className="text-gray-600 mt-1">Manage security policies, firewall rules, and threat detection</p>
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
            Add Policy
          </button>
        </div>
      </div>

      {/* Security Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {securityStats.map((stat, index) => (
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
        {/* Security Policies */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Security Policies</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rules</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPolicies.map((policy) => (
                    <tr 
                      key={policy.id} 
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedPolicy === policy.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedPolicy(selectedPolicy === policy.id ? null : policy.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 text-blue-600 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{policy.name}</div>
                            <div className="text-sm text-gray-500">{policy.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          policy.type === 'Firewall' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {policy.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(policy.status)}
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            policy.status === 'active' ? 'bg-green-100 text-green-800' :
                            policy.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {policy.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(policy.priority)}`}>
                          {policy.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{policy.rules}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{policy.lastUpdated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Security Alerts */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Security Alerts</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div className="space-y-3">
            {securityAlerts.map((alert) => (
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

      {/* Firewall Rules and Threat Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Firewall Rules */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Firewall Rules</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rule</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {firewallRules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rule.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        rule.action === 'allow' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {rule.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.source}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.destination}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        rule.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {rule.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Threat Intelligence */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Threat Intelligence</h2>
          <div className="space-y-3">
            {threatIntelligence.map((threat) => (
              <div key={threat.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100">
                <div className={`p-1 rounded-full ${getSeverityColor(threat.severity)}`}>
                  <Shield className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{threat.type}</p>
                  <p className="text-xs text-gray-500">Source: {threat.source}</p>
                  <p className="text-xs text-gray-500">Target: {threat.target}</p>
                  <p className="text-xs text-gray-500 mt-1">{threat.time}</p>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(threat.severity)}`}>
                    {threat.severity}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    threat.status === 'blocked' ? 'bg-red-100 text-red-700' :
                    threat.status === 'mitigated' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {threat.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySolutionsPage; 
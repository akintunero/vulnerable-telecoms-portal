import React, { useState } from 'react';
import { Shield, Activity, AlertTriangle, CheckCircle, XCircle, Server, Globe, Settings, Eye, Download, Filter, Search } from 'lucide-react';

const FirewallMonitoringPage: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Mock data for firewall status
  const firewallStatus = [
    { metric: 'Active Firewalls', value: 8, status: 'healthy' },
    { metric: 'Blocked Threats (24h)', value: 124, status: 'success' },
    { metric: 'Config Changes (7d)', value: 5, status: 'warning' },
    { metric: 'Alerts (24h)', value: 3, status: 'error' }
  ];

  // Mock data for firewall rules
  const firewallRules = [
    { id: 1, name: 'Allow Web Traffic', source: '0.0.0.0/0', dest: '10.0.0.0/24', port: '80,443', action: 'allow', status: 'active', lastChanged: '2025-06-01 10:00' },
    { id: 2, name: 'Block SSH', source: '0.0.0.0/0', dest: '10.0.0.0/24', port: '22', action: 'block', status: 'active', lastChanged: '2025-05-30 09:00' },
    { id: 3, name: 'Allow VPN', source: '192.168.1.0/24', dest: '10.0.0.0/24', port: '1194', action: 'allow', status: 'active', lastChanged: '2025-05-28 08:00' },
    { id: 4, name: 'Block SMTP', source: '0.0.0.0/0', dest: '10.0.0.0/24', port: '25', action: 'block', status: 'inactive', lastChanged: '2025-05-25 07:00' }
  ];

  // Mock data for recent firewall events
  const firewallEvents = [
    { id: 1, time: '15:30:45', event: 'Blocked Port Scan', source: '203.0.113.45', dest: '10.0.0.5', action: 'blocked', severity: 'high', status: 'success' },
    { id: 2, time: '15:25:30', event: 'Allowed Web Traffic', source: '198.51.100.67', dest: '10.0.0.10', action: 'allowed', severity: 'low', status: 'success' },
    { id: 3, time: '15:20:15', event: 'Blocked SSH Attempt', source: '192.0.2.123', dest: '10.0.0.8', action: 'blocked', severity: 'medium', status: 'success' },
    { id: 4, time: '15:15:00', event: 'Config Change', source: 'admin@telco.com', dest: '-', action: 'changed', severity: 'info', status: 'warning' }
  ];

  // Mock data for threat detections
  const threatDetections = [
    { id: 1, threat: 'DDoS Attack', detected: '2025-06-01 14:00', status: 'mitigated', severity: 'critical', source: 'Multiple IPs' },
    { id: 2, threat: 'Malware Traffic', detected: '2025-05-31 18:30', status: 'blocked', severity: 'high', source: '203.0.113.45' },
    { id: 3, threat: 'Port Scan', detected: '2025-05-30 09:15', status: 'blocked', severity: 'medium', source: '198.51.100.67' }
  ];

  // Mock data for configuration changes
  const configChanges = [
    { id: 1, user: 'admin@telco.com', change: 'Added rule: Block SSH', time: '2025-05-30 09:00', status: 'success' },
    { id: 2, user: 'john.smith@telco.com', change: 'Modified rule: Allow Web Traffic', time: '2025-05-28 08:00', status: 'success' },
    { id: 3, user: 'system', change: 'Scheduled backup', time: '2025-05-25 07:00', status: 'info' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-50 border-green-200';
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'mitigated': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'blocked': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRules = firewallRules.filter(rule => {
    const matchesStatus = selectedStatus === 'all' || rule.status === selectedStatus;
    const matchesSearch = rule.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Firewall Monitoring</h1>
          <p className="text-gray-600 mt-1">Monitor firewall status, rules, and security events</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Add Rule
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </button>
        </div>
      </div>

      {/* Firewall Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {firewallStatus.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg mr-3 ${
                stat.status === 'healthy' ? 'bg-green-100 text-green-600' :
                stat.status === 'success' ? 'bg-blue-100 text-blue-600' :
                stat.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                'bg-red-100 text-red-600'
              }`}>
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.metric}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Firewall Rules and Recent Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Firewall Rules */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Firewall Rules</h2>
            <Filter className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex mb-4 gap-2">
            <input
              type="text"
              placeholder="Search rules..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rule Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Port</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Changed</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rule.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.source}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.dest}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.port}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        rule.action === 'allow' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {rule.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        rule.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {rule.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.lastChanged}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Firewall Events */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Firewall Events</h2>
          <div className="space-y-3">
            {firewallEvents.map((event) => (
              <div key={event.id} className="flex items-start space-x-3 p-3 border border-gray-100 rounded-lg">
                <div className={`p-2 rounded-full ${getSeverityColor(event.severity)}`}>
                  <Activity className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{event.event}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>Source: {event.source}</span>
                    <span className="mx-2">→</span>
                    <span>Dest: {event.dest}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <span>Action: {event.action}</span>
                    <span className="mx-2">|</span>
                    <span>Status: {event.status}</span>
                  </div>
                  <span className="text-xs text-gray-500">{event.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Threat Detections and Config Changes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Detections */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Threat Detections</h2>
          <div className="space-y-3">
            {threatDetections.map((threat) => (
              <div key={threat.id} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900">{threat.threat}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(threat.severity)}`}>
                    {threat.severity}
                  </span>
                </div>
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <span>Detected: {threat.detected}</span>
                  <span className="mx-2">|</span>
                  <span>Source: {threat.source}</span>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(threat.status)}`}>
                  {threat.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Configuration Changes */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Configuration Changes</h2>
          <div className="space-y-3">
            {configChanges.map((change) => (
              <div key={change.id} className="flex items-start space-x-3 p-3 border border-gray-100 rounded-lg">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <Settings className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{change.change}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>User: {change.user}</span>
                    <span className="mx-2">|</span>
                    <span>Time: {change.time}</span>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(change.status)}`}>
                    {change.status}
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

export default FirewallMonitoringPage; 
import React, { useState } from 'react';
import { Code, Plus, Settings, Activity, Shield, Database, Globe, Zap, Clock, CheckCircle, XCircle, AlertTriangle, Copy, ExternalLink, Key, Eye, EyeOff } from 'lucide-react';

const APIIntegrationsPage: React.FC = () => {
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>('production');
  const [showApiKey, setShowApiKey] = useState<boolean>(false);

  // Mock data for API endpoints
  const apiEndpoints = [
    {
      id: 'endpoint1',
      name: 'Customer Management API',
      endpoint: '/api/v1/customers',
      method: 'GET',
      status: 'active',
      rateLimit: '1000/hour',
      lastUsed: '2025-06-01 15:30',
      documentation: 'https://docs.telco.com/api/customers'
    },
    {
      id: 'endpoint2',
      name: 'Network Status API',
      endpoint: '/api/v1/network/status',
      method: 'GET',
      status: 'active',
      rateLimit: '500/hour',
      lastUsed: '2025-06-01 15:25',
      documentation: 'https://docs.telco.com/api/network'
    },
    {
      id: 'endpoint3',
      name: 'Usage Analytics API',
      endpoint: '/api/v1/analytics/usage',
      method: 'POST',
      status: 'active',
      rateLimit: '200/hour',
      lastUsed: '2025-06-01 15:20',
      documentation: 'https://docs.telco.com/api/analytics'
    },
    {
      id: 'endpoint4',
      name: 'Billing API',
      endpoint: '/api/v1/billing',
      method: 'GET',
      status: 'maintenance',
      rateLimit: '300/hour',
      lastUsed: '2025-06-01 14:45',
      documentation: 'https://docs.telco.com/api/billing'
    },
    {
      id: 'endpoint5',
      name: 'Security Events API',
      endpoint: '/api/v1/security/events',
      method: 'POST',
      status: 'active',
      rateLimit: '100/hour',
      lastUsed: '2025-06-01 15:15',
      documentation: 'https://docs.telco.com/api/security'
    }
  ];

  // Mock data for integrations
  const integrations = [
    {
      id: 'integration1',
      name: 'Salesforce CRM',
      type: 'CRM',
      status: 'connected',
      lastSync: '2025-06-01 15:00',
      syncFrequency: 'Real-time',
      dataFlow: 'Bidirectional',
      apiCalls: 1250,
      errors: 0
    },
    {
      id: 'integration2',
      name: 'Zendesk Support',
      type: 'Support',
      status: 'connected',
      lastSync: '2025-06-01 14:30',
      syncFrequency: '5 minutes',
      dataFlow: 'Bidirectional',
      apiCalls: 890,
      errors: 2
    },
    {
      id: 'integration3',
      name: 'QuickBooks Accounting',
      type: 'Accounting',
      status: 'disconnected',
      lastSync: '2025-05-30 09:15',
      syncFrequency: 'Daily',
      dataFlow: 'Unidirectional',
      apiCalls: 0,
      errors: 0
    },
    {
      id: 'integration4',
      name: 'Slack Notifications',
      type: 'Communication',
      status: 'connected',
      lastSync: '2025-06-01 15:30',
      syncFrequency: 'Real-time',
      dataFlow: 'Outbound',
      apiCalls: 2340,
      errors: 1
    },
    {
      id: 'integration5',
      name: 'AWS CloudWatch',
      type: 'Monitoring',
      status: 'connected',
      lastSync: '2025-06-01 15:25',
      syncFrequency: '1 minute',
      dataFlow: 'Inbound',
      apiCalls: 5670,
      errors: 0
    }
  ];

  // Mock data for API keys
  const apiKeys = [
    {
      id: 'key1',
      name: 'Production API Key',
      key: 'sk_live_1234567890abcdef',
      environment: 'production',
      status: 'active',
      created: '2024-01-15',
      lastUsed: '2025-06-01 15:30',
      permissions: ['read', 'write']
    },
    {
      id: 'key2',
      name: 'Development API Key',
      key: 'sk_test_abcdef1234567890',
      environment: 'development',
      status: 'active',
      created: '2024-03-20',
      lastUsed: '2025-06-01 14:45',
      permissions: ['read']
    },
    {
      id: 'key3',
      name: 'Webhook Key',
      key: 'whk_9876543210fedcba',
      environment: 'production',
      status: 'inactive',
      created: '2024-02-10',
      lastUsed: '2025-05-28 10:20',
      permissions: ['webhook']
    }
  ];

  // Mock data for webhooks
  const webhooks = [
    {
      id: 'webhook1',
      name: 'Customer Created',
      url: 'https://webhook.site/abc123',
      events: ['customer.created'],
      status: 'active',
      lastTriggered: '2025-06-01 15:30',
      successRate: 98.5,
      retryCount: 3
    },
    {
      id: 'webhook2',
      name: 'Network Alert',
      url: 'https://api.company.com/webhooks/network',
      events: ['network.alert', 'network.down'],
      status: 'active',
      lastTriggered: '2025-06-01 15:25',
      successRate: 99.2,
      retryCount: 5
    },
    {
      id: 'webhook3',
      name: 'Billing Update',
      url: 'https://billing.company.com/webhook',
      events: ['billing.updated', 'payment.received'],
      status: 'inactive',
      lastTriggered: '2025-05-30 14:20',
      successRate: 95.8,
      retryCount: 3
    }
  ];

  // Mock data for API usage statistics
  const apiStats = [
    {
      metric: 'Total API Calls',
      value: '45,230',
      change: '+12.5%',
      changeType: 'positive' as const,
      period: 'Last 24 hours'
    },
    {
      metric: 'Success Rate',
      value: '99.2%',
      change: '+0.3%',
      changeType: 'positive' as const,
      period: 'Last 24 hours'
    },
    {
      metric: 'Average Response Time',
      value: '245ms',
      change: '-15ms',
      changeType: 'positive' as const,
      period: 'Last 24 hours'
    },
    {
      metric: 'Active Integrations',
      value: '8',
      change: '+1',
      changeType: 'positive' as const,
      period: 'This month'
    }
  ];

  // Mock data for recent API calls
  const recentApiCalls = [
    {
      id: 1,
      endpoint: '/api/v1/customers',
      method: 'GET',
      status: 200,
      responseTime: 180,
      timestamp: '2025-06-01 15:30:45',
      ip: '192.168.1.100'
    },
    {
      id: 2,
      endpoint: '/api/v1/network/status',
      method: 'GET',
      status: 200,
      responseTime: 95,
      timestamp: '2025-06-01 15:30:30',
      ip: '192.168.1.101'
    },
    {
      id: 3,
      endpoint: '/api/v1/analytics/usage',
      method: 'POST',
      status: 201,
      responseTime: 320,
      timestamp: '2025-06-01 15:30:15',
      ip: '192.168.1.102'
    },
    {
      id: 4,
      endpoint: '/api/v1/billing',
      method: 'GET',
      status: 503,
      responseTime: 1500,
      timestamp: '2025-06-01 15:30:00',
      ip: '192.168.1.103'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'inactive': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'maintenance': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'connected': return 'text-green-600 bg-green-50 border-green-200';
      case 'disconnected': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'connected': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'inactive':
      case 'disconnected': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'maintenance': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800';
      case 'POST': return 'bg-blue-100 text-blue-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusCodeColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600';
    if (status >= 400 && status < 500) return 'text-yellow-600';
    if (status >= 500) return 'text-red-600';
    return 'text-gray-600';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">API Integrations</h1>
          <p className="text-gray-600 mt-1">Manage API endpoints, integrations, and webhooks</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <select
            value={selectedEnvironment}
            onChange={(e) => setSelectedEnvironment(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="production">Production</option>
            <option value="staging">Staging</option>
            <option value="development">Development</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            New Integration
          </button>
        </div>
      </div>

      {/* API Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {apiStats.map((stat, index) => (
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

      {/* API Endpoints and Integrations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Endpoints */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">API Endpoints</h2>
            <Code className="h-5 w-5 text-blue-600" />
          </div>
          <div className="space-y-3">
            {apiEndpoints.map((endpoint) => (
              <div key={endpoint.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMethodColor(endpoint.method)}`}>
                      {endpoint.method}
                    </span>
                    <span className="ml-2 text-sm font-medium text-gray-900">{endpoint.name}</span>
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon(endpoint.status)}
                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      endpoint.status === 'active' ? 'bg-green-100 text-green-800' :
                      endpoint.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {endpoint.status}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">{endpoint.endpoint}</div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Rate Limit: {endpoint.rateLimit}</span>
                  <span>Last Used: {endpoint.lastUsed}</span>
                </div>
                <div className="mt-2 flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-xs flex items-center">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Docs
                  </button>
                  <button className="text-green-600 hover:text-green-800 text-xs flex items-center">
                    <Activity className="h-3 w-3 mr-1" />
                    Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integrations */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Integrations</h2>
            <Globe className="h-5 w-5 text-green-600" />
          </div>
          <div className="space-y-3">
            {integrations.map((integration) => (
              <div key={integration.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="p-1 bg-blue-100 text-blue-600 rounded mr-2">
                      <Database className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{integration.name}</h3>
                      <p className="text-xs text-gray-500">{integration.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon(integration.status)}
                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      integration.status === 'connected' ? 'bg-green-100 text-green-800' :
                      integration.status === 'disconnected' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {integration.status}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-2">
                  <div>Sync: {integration.syncFrequency}</div>
                  <div>Flow: {integration.dataFlow}</div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>API Calls: {integration.apiCalls}</span>
                  <span className={integration.errors > 0 ? 'text-red-600' : 'text-green-600'}>
                    Errors: {integration.errors}
                  </span>
                </div>
                <div className="mt-2 flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-xs">Configure</button>
                  <button className="text-green-600 hover:text-green-800 text-xs">Sync Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* API Keys and Webhooks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Keys */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">API Keys</h2>
            <Key className="h-5 w-5 text-yellow-600" />
          </div>
          <div className="space-y-3">
            {apiKeys.map((key) => (
              <div key={key.id} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{key.name}</h3>
                    <p className="text-xs text-gray-500">{key.environment}</p>
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon(key.status)}
                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      key.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {key.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded flex-1">
                    {showApiKey ? key.key : '••••••••••••••••••••••••••••••••'}
                  </code>
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => copyToClipboard(key.key)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Created: {key.created}</span>
                  <span>Last Used: {key.lastUsed}</span>
                </div>
                <div className="mt-2 flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-xs">Regenerate</button>
                  <button className="text-red-600 hover:text-red-800 text-xs">Revoke</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Webhooks */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Webhooks</h2>
            <Zap className="h-5 w-5 text-purple-600" />
          </div>
          <div className="space-y-3">
            {webhooks.map((webhook) => (
              <div key={webhook.id} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{webhook.name}</h3>
                    <p className="text-xs text-gray-500">{webhook.url}</p>
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon(webhook.status)}
                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      webhook.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {webhook.status}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  Events: {webhook.events.join(', ')}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-2">
                  <div>Success Rate: {webhook.successRate}%</div>
                  <div>Retries: {webhook.retryCount}</div>
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  Last Triggered: {webhook.lastTriggered}
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-xs">Edit</button>
                  <button className="text-green-600 hover:text-green-800 text-xs">Test</button>
                  <button className="text-red-600 hover:text-red-800 text-xs">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent API Calls */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent API Calls</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endpoint</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentApiCalls.map((call) => (
                <tr key={call.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{call.endpoint}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMethodColor(call.method)}`}>
                      {call.method}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getStatusCodeColor(call.status)}`}>
                      {call.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{call.responseTime}ms</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{call.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{call.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default APIIntegrationsPage; 
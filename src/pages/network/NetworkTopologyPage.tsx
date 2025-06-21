import React, { useState } from 'react';
import { Network, Server, Wifi, Router, Activity, AlertTriangle, CheckCircle, MapPin, Users } from 'lucide-react';

const NetworkTopologyPage: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<string>('physical');

  // Mock data for network topology
  const networkNodes = [
    {
      id: 'CORE001',
      name: 'Core Router - Main',
      type: 'core-router',
      status: 'operational',
      location: 'Data Center A',
      ipAddress: '192.168.1.1',
      connections: 8,
      bandwidth: '100 Gbps',
      cpu: 45,
      memory: 62,
      temperature: 42
    },
    {
      id: 'DIST001',
      name: 'Distribution Switch 1',
      type: 'distribution-switch',
      status: 'operational',
      location: 'Floor 1',
      ipAddress: '192.168.2.1',
      connections: 24,
      bandwidth: '40 Gbps',
      cpu: 28,
      memory: 45,
      temperature: 38
    },
    {
      id: 'DIST002',
      name: 'Distribution Switch 2',
      type: 'distribution-switch',
      status: 'degraded',
      location: 'Floor 2',
      ipAddress: '192.168.2.2',
      connections: 18,
      bandwidth: '40 Gbps',
      cpu: 78,
      memory: 85,
      temperature: 52
    },
    {
      id: 'ACCESS001',
      name: 'Access Switch - Building A',
      type: 'access-switch',
      status: 'operational',
      location: 'Building A',
      ipAddress: '192.168.3.1',
      connections: 48,
      bandwidth: '10 Gbps',
      cpu: 35,
      memory: 58,
      temperature: 41
    },
    {
      id: 'ACCESS002',
      name: 'Access Switch - Building B',
      type: 'access-switch',
      status: 'operational',
      location: 'Building B',
      ipAddress: '192.168.3.2',
      connections: 36,
      bandwidth: '10 Gbps',
      cpu: 42,
      memory: 65,
      temperature: 44
    },
    {
      id: 'WIFI001',
      name: 'WiFi Controller - Main',
      type: 'wifi-controller',
      status: 'operational',
      location: 'Floor 1',
      ipAddress: '192.168.4.1',
      connections: 12,
      bandwidth: '1 Gbps',
      cpu: 25,
      memory: 38,
      temperature: 36
    }
  ];

  // Mock data for network links
  const networkLinks = [
    {
      id: 'LINK001',
      source: 'CORE001',
      target: 'DIST001',
      type: 'fiber',
      status: 'operational',
      bandwidth: '100 Gbps',
      utilization: 65,
      latency: 2.5
    },
    {
      id: 'LINK002',
      source: 'CORE001',
      target: 'DIST002',
      type: 'fiber',
      status: 'degraded',
      bandwidth: '100 Gbps',
      utilization: 92,
      latency: 8.5
    },
    {
      id: 'LINK003',
      source: 'DIST001',
      target: 'ACCESS001',
      type: 'copper',
      status: 'operational',
      bandwidth: '10 Gbps',
      utilization: 45,
      latency: 1.2
    },
    {
      id: 'LINK004',
      source: 'DIST002',
      target: 'ACCESS002',
      type: 'copper',
      status: 'operational',
      bandwidth: '10 Gbps',
      utilization: 58,
      latency: 1.8
    },
    {
      id: 'LINK005',
      source: 'DIST001',
      target: 'WIFI001',
      type: 'copper',
      status: 'operational',
      bandwidth: '1 Gbps',
      utilization: 35,
      latency: 0.8
    }
  ];

  // Mock data for network statistics
  const networkStats = [
    {
      title: 'Total Nodes',
      value: networkNodes.length.toString(),
      change: '+2',
      changeType: 'positive' as const,
      icon: <Network className="h-6 w-6" />,
      color: 'blue'
    },
    {
      title: 'Operational',
      value: networkNodes.filter(n => n.status === 'operational').length.toString(),
      change: '-1',
      changeType: 'negative' as const,
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'green'
    },
    {
      title: 'Total Links',
      value: networkLinks.length.toString(),
      change: '+3',
      changeType: 'positive' as const,
      icon: <Activity className="h-6 w-6" />,
      color: 'purple'
    },
    {
      title: 'Avg Latency',
      value: '2.8ms',
      change: '+0.3ms',
      changeType: 'negative' as const,
      icon: <Activity className="h-6 w-6" />,
      color: 'yellow'
    }
  ];

  // Mock data for network alerts
  const networkAlerts = [
    {
      id: 1,
      node: 'DIST002',
      message: 'High CPU utilization detected (78%)',
      severity: 'warning',
      time: '5 minutes ago',
      status: 'active'
    },
    {
      id: 2,
      node: 'LINK002',
      message: 'Link utilization above threshold (92%)',
      severity: 'warning',
      time: '12 minutes ago',
      status: 'active'
    },
    {
      id: 3,
      node: 'ACCESS001',
      message: 'Temperature above normal (41°C)',
      severity: 'info',
      time: '1 hour ago',
      status: 'resolved'
    }
  ];

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'core-router': return <Router className="h-6 w-6" />;
      case 'distribution-switch': return <Network className="h-6 w-6" />;
      case 'access-switch': return <Network className="h-6 w-6" />;
      case 'wifi-controller': return <Wifi className="h-6 w-6" />;
      default: return <Server className="h-6 w-6" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-600 bg-green-50 border-green-200';
      case 'degraded': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'down': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'degraded': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'down': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization > 90) return 'text-red-600';
    if (utilization > 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Network Topology</h1>
          <p className="text-gray-600 mt-1">Visual representation of network infrastructure and connections</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="physical">Physical View</option>
            <option value="logical">Logical View</option>
            <option value="3d">3D View</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
            Refresh Topology
          </button>
        </div>
      </div>

      {/* Network Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {networkStats.map((stat, index) => (
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
        {/* Network Topology Visualization */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Network Topology Map</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md">Auto Layout</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Manual</button>
              </div>
            </div>
            <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center relative">
              {/* Mock Topology Visualization */}
              <div className="absolute inset-0 p-4">
                {networkNodes.map((node, index) => (
                  <div
                    key={node.id}
                    className={`absolute cursor-pointer p-3 rounded-lg border-2 ${getStatusColor(node.status)} hover:scale-110 transition-transform`}
                    style={{
                      left: `${15 + (index * 12)}%`,
                      top: `${20 + (index * 8)}%`
                    }}
                    onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                  >
                    {getNodeIcon(node.type)}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Network className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Interactive Network Topology</p>
                <p className="text-sm text-gray-400">Click on nodes to view details</p>
              </div>
            </div>
          </div>
        </div>

        {/* Network Alerts */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Network Alerts</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div className="space-y-3">
            {networkAlerts.map((alert) => (
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

      {/* Network Nodes Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Network Devices</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Memory</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Connections</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {networkNodes.map((node) => (
                <tr 
                  key={node.id} 
                  className={`hover:bg-gray-50 cursor-pointer ${
                    selectedNode === node.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getNodeIcon(node.type)}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{node.name}</div>
                        <div className="text-sm text-gray-500">{node.ipAddress}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{node.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(node.status)}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        node.status === 'operational' ? 'bg-green-100 text-green-800' :
                        node.status === 'degraded' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {node.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            node.cpu > 80 ? 'bg-red-500' :
                            node.cpu > 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${node.cpu}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">{node.cpu}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            node.memory > 80 ? 'bg-red-500' :
                            node.memory > 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${node.memory}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">{node.memory}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      node.temperature > 50 ? 'text-red-600' :
                      node.temperature > 40 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {node.temperature}°C
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{node.connections}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Network Links */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Network Links</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bandwidth</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latency</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {networkLinks.map((link) => (
                <tr key={link.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {link.source} → {link.target}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      link.type === 'fiber' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {link.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(link.status)}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        link.status === 'operational' ? 'bg-green-100 text-green-800' :
                        link.status === 'degraded' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {link.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{link.bandwidth}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${getUtilizationColor(link.utilization)}`}
                          style={{ width: `${link.utilization}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${getUtilizationColor(link.utilization)}`}>
                        {link.utilization}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{link.latency}ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NetworkTopologyPage;

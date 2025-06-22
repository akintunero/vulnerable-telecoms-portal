import React, { useState } from 'react';
import { MapPin, Activity, AlertTriangle, CheckCircle, Wifi, Server, Building, Home, Cable, Zap, Users } from 'lucide-react';

const FibreMapPage: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data for fibre network nodes
  const networkNodes = [
    {
      id: 'NODE001',
      name: 'Central Hub - Downtown',
      type: 'hub',
      status: 'operational',
      location: { lat: 40.7128, lng: -74.0060 },
      connections: 45,
      bandwidth: '100 Gbps',
      customers: 1250,
      lastMaintenance: '2025-05-15',
      fibreType: 'Single Mode',
      wavelength: '1550nm',
      powerLevel: -12.5
    },
    {
      id: 'NODE002',
      name: 'Distribution Point - Midtown',
      type: 'distribution',
      status: 'operational',
      location: { lat: 40.7589, lng: -73.9851 },
      connections: 28,
      bandwidth: '40 Gbps',
      customers: 850,
      lastMaintenance: '2025-05-20',
      fibreType: 'Single Mode',
      wavelength: '1310nm',
      powerLevel: -15.2
    },
    {
      id: 'NODE003',
      name: 'Access Point - Uptown',
      type: 'access',
      status: 'degraded',
      location: { lat: 40.7505, lng: -73.9934 },
      connections: 15,
      bandwidth: '10 Gbps',
      customers: 420,
      lastMaintenance: '2025-05-10',
      fibreType: 'Single Mode',
      wavelength: '1550nm',
      powerLevel: -18.5
    },
    {
      id: 'NODE004',
      name: 'Edge Router - Brooklyn',
      type: 'edge',
      status: 'operational',
      location: { lat: 40.6782, lng: -73.9442 },
      connections: 32,
      bandwidth: '25 Gbps',
      customers: 680,
      lastMaintenance: '2025-05-18',
      fibreType: 'Single Mode',
      wavelength: '1310nm',
      powerLevel: -14.8
    },
    {
      id: 'NODE005',
      name: 'Backbone Switch - Queens',
      type: 'backbone',
      status: 'maintenance',
      location: { lat: 40.7282, lng: -73.7949 },
      connections: 55,
      bandwidth: '100 Gbps',
      customers: 2100,
      lastMaintenance: '2025-06-01',
      fibreType: 'Single Mode',
      wavelength: '1550nm',
      powerLevel: -11.3
    }
  ];

  // Mock data for fibre routes
  const fibreRoutes = [
    {
      id: 'ROUTE001',
      name: 'Main Backbone - Downtown to Midtown',
      startNode: 'NODE001',
      endNode: 'NODE002',
      status: 'operational',
      length: '2.5 km',
      capacity: '100 Gbps',
      utilization: 78,
      fibreCount: 144,
      cableType: 'Underground',
      splicePoints: 3,
      attenuation: 0.2
    },
    {
      id: 'ROUTE002',
      name: 'Distribution Link - Midtown to Uptown',
      startNode: 'NODE002',
      endNode: 'NODE003',
      status: 'degraded',
      length: '1.8 km',
      capacity: '40 Gbps',
      utilization: 92,
      fibreCount: 72,
      cableType: 'Aerial',
      splicePoints: 2,
      attenuation: 0.3
    },
    {
      id: 'ROUTE003',
      name: 'Cross-Borough Link - Downtown to Brooklyn',
      startNode: 'NODE001',
      endNode: 'NODE004',
      status: 'operational',
      length: '4.2 km',
      capacity: '100 Gbps',
      utilization: 65,
      fibreCount: 144,
      cableType: 'Underground',
      splicePoints: 5,
      attenuation: 0.4
    }
  ];

  // Mock data for fibre infrastructure
  const fibreInfrastructure = [
    {
      id: 'MANHOLE001',
      name: 'Manhole - 5th Avenue & 42nd St',
      type: 'manhole',
      status: 'operational',
      location: { lat: 40.7589, lng: -73.9851 },
      depth: '2.5m',
      fibreCables: 8,
      lastInspection: '2025-05-15',
      condition: 'Good'
    },
    {
      id: 'SPLICE001',
      name: 'Splice Point - Central Park West',
      type: 'splice',
      status: 'operational',
      location: { lat: 40.7505, lng: -73.9934 },
      spliceType: 'Fusion',
      fibreCount: 24,
      lastMaintenance: '2025-04-20',
      loss: '0.1dB'
    },
    {
      id: 'CABINET001',
      name: 'Street Cabinet - Times Square',
      type: 'cabinet',
      status: 'operational',
      location: { lat: 40.7128, lng: -74.0060 },
      equipment: 'OLT',
      ports: 16,
      lastInspection: '2025-05-10',
      temperature: 25
    },
    {
      id: 'POLE001',
      name: 'Utility Pole - Upper West Side',
      type: 'pole',
      status: 'operational',
      location: { lat: 40.7505, lng: -73.9934 },
      height: '12m',
      fibreCables: 4,
      lastInspection: '2025-05-05',
      condition: 'Good'
    }
  ];

  // Mock data for customer locations
  const customerLocations = [
    {
      id: 'CUST001',
      name: 'TechCorp Headquarters',
      type: 'enterprise',
      location: { lat: 40.7589, lng: -73.9851 },
      status: 'active',
      plan: 'Premium 10Gbps',
      lastActivity: '2025-06-01 14:30',
      fibreType: 'Single Mode',
      wavelength: '1550nm',
      powerLevel: -16.2
    },
    {
      id: 'CUST002',
      name: 'Residential Complex A',
      type: 'residential',
      location: { lat: 40.7505, lng: -73.9934 },
      status: 'active',
      plan: 'Standard 1Gbps',
      lastActivity: '2025-06-01 15:45',
      fibreType: 'Single Mode',
      wavelength: '1310nm',
      powerLevel: -18.5
    },
    {
      id: 'CUST003',
      name: 'Small Business Center',
      type: 'business',
      location: { lat: 40.7282, lng: -73.7949 },
      status: 'active',
      plan: 'Business 5Gbps',
      lastActivity: '2025-06-01 13:20',
      fibreType: 'Single Mode',
      wavelength: '1550nm',
      powerLevel: -17.8
    }
  ];

  // Mock data for fibre cables
  const fibreCables = [
    {
      id: 'CABLE001',
      name: 'Main Backbone Cable',
      type: 'Underground',
      status: 'operational',
      fibreCount: 144,
      length: '2.5 km',
      manufacturer: 'Corning',
      model: 'SMF-28',
      installationDate: '2020-03-15',
      lastInspection: '2025-05-15',
      attenuation: '0.2 dB/km'
    },
    {
      id: 'CABLE002',
      name: 'Distribution Cable A',
      type: 'Aerial',
      status: 'operational',
      fibreCount: 72,
      length: '1.8 km',
      manufacturer: 'Prysmian',
      model: 'SMF-28e+',
      installationDate: '2021-06-20',
      lastInspection: '2025-05-10',
      attenuation: '0.3 dB/km'
    },
    {
      id: 'CABLE003',
      name: 'Access Cable B',
      type: 'Underground',
      status: 'degraded',
      fibreCount: 24,
      length: '0.8 km',
      manufacturer: 'Fujikura',
      model: 'FutureGuide',
      installationDate: '2022-09-10',
      lastInspection: '2025-05-05',
      attenuation: '0.4 dB/km'
    }
  ];

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'hub': return <Server className="h-6 w-6" />;
      case 'distribution': return <Wifi className="h-6 w-6" />;
      case 'access': return <Activity className="h-6 w-6" />;
      case 'edge': return <Building className="h-6 w-6" />;
      case 'backbone': return <Server className="h-6 w-6" />;
      default: return <MapPin className="h-6 w-6" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-600 bg-green-50 border-green-200';
      case 'degraded': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'maintenance': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'down': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'degraded': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'maintenance': return <Activity className="h-4 w-4 text-blue-500" />;
      case 'down': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredNodes = networkNodes.filter(node => 
    filterStatus === 'all' || node.status === filterStatus
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Fibre Network Map</h1>
          <p className="text-gray-600 mt-1">Real-time monitoring of fibre optic network infrastructure</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="operational">Operational</option>
            <option value="degraded">Degraded</option>
            <option value="maintenance">Maintenance</option>
            <option value="down">Down</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
            Refresh Map
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <Server className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Nodes</p>
              <p className="text-2xl font-bold text-gray-900">{networkNodes.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Operational</p>
              <p className="text-2xl font-bold text-gray-900">
                {networkNodes.filter(n => n.status === 'operational').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <Wifi className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Routes</p>
              <p className="text-2xl font-bold text-gray-900">{fibreRoutes.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Connected Customers</p>
              <p className="text-2xl font-bold text-gray-900">
                {networkNodes.reduce((sum, node) => sum + node.customers, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Visualization */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Network Topology</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md">2D</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">3D</button>
              </div>
            </div>
            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center relative">
              {/* Mock Map Visualization */}
              <div className="absolute inset-0 p-4">
                {filteredNodes.map((node, index) => (
                  <div
                    key={node.id}
                    className={`absolute cursor-pointer p-2 rounded-lg border-2 ${getStatusColor(node.status)} hover:scale-110 transition-transform`}
                    style={{
                      left: `${20 + (index * 15)}%`,
                      top: `${30 + (index * 10)}%`
                    }}
                    onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                  >
                    {getNodeIcon(node.type)}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Interactive Network Map</p>
                <p className="text-sm text-gray-400">Click on nodes to view details</p>
              </div>
            </div>
          </div>
        </div>

        {/* Network Nodes List */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Network Nodes</h2>
          <div className="space-y-3">
            {filteredNodes.map((node) => (
              <div
                key={node.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedNode === node.id ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {getNodeIcon(node.type)}
                    <span className="ml-2 font-medium text-gray-900">{node.name}</span>
                  </div>
                  {getStatusIcon(node.status)}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div>Connections: {node.connections}</div>
                  <div>Bandwidth: {node.bandwidth}</div>
                  <div>Customers: {node.customers.toLocaleString()}</div>
                  <div>Status: {node.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fibre Routes */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Fibre Routes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Length</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fibre Count</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fibreRoutes.map((route) => (
                <tr key={route.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{route.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      route.status === 'operational' ? 'bg-green-100 text-green-800' :
                      route.status === 'degraded' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {route.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{route.length}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{route.capacity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{route.fibreCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            route.utilization > 90 ? 'bg-red-500' :
                            route.utilization > 70 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${route.utilization}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">{route.utilization}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fibre Infrastructure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fibre Cables */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Cable className="h-5 w-5 mr-2" />
            Fibre Cables
          </h2>
          <div className="space-y-3">
            {fibreCables.map((cable) => (
              <div key={cable.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Cable className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="font-medium text-gray-900">{cable.name}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    cable.status === 'operational' ? 'bg-green-100 text-green-800' :
                    cable.status === 'degraded' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {cable.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>Type: {cable.type}</div>
                  <div>Fibres: {cable.fibreCount}</div>
                  <div>Length: {cable.length}</div>
                  <div>Attenuation: {cable.attenuation}</div>
                  <div>Manufacturer: {cable.manufacturer}</div>
                  <div>Model: {cable.model}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure Components */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Infrastructure
          </h2>
          <div className="space-y-3">
            {fibreInfrastructure.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-purple-500 mr-2" />
                    <span className="font-medium text-gray-900">{item.name}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'operational' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>Type: {item.type}</div>
                  {item.depth && <div>Depth: {item.depth}</div>}
                  {item.fibreCables && <div>Cables: {item.fibreCables}</div>}
                  {item.spliceType && <div>Splice: {item.spliceType}</div>}
                  {item.fibreCount && <div>Fibres: {item.fibreCount}</div>}
                  {item.loss && <div>Loss: {item.loss}</div>}
                  {item.equipment && <div>Equipment: {item.equipment}</div>}
                  {item.ports && <div>Ports: {item.ports}</div>}
                  {item.height && <div>Height: {item.height}</div>}
                  <div>Condition: {item.condition}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Locations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Locations</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fibre Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wavelength</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Power Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customerLocations.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.plan}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.fibreType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.wavelength}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.powerLevel} dBm</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {customer.status}
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

export default FibreMapPage; 
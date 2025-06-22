import React from 'react';
import { Map, FiberManualRecord, AlertTriangle, CheckCircle, XCircle, Activity, Search, Layers, Cable, Zap } from 'lucide-react';

const mockRoutes = [
  { id: 'R-001', name: 'Downtown Loop', status: 'active', length: '12.5 km', nodes: 8, outages: 0, fibreCount: 144, cableType: 'Underground', attenuation: '0.2 dB/km' },
  { id: 'R-002', name: 'Airport Express', status: 'degraded', length: '18.2 km', nodes: 12, outages: 1, fibreCount: 72, cableType: 'Aerial', attenuation: '0.3 dB/km' },
  { id: 'R-003', name: 'Industrial Ring', status: 'active', length: '9.7 km', nodes: 6, outages: 0, fibreCount: 96, cableType: 'Underground', attenuation: '0.25 dB/km' },
  { id: 'R-004', name: 'Suburban Link', status: 'down', length: '15.3 km', nodes: 10, outages: 2, fibreCount: 48, cableType: 'Aerial', attenuation: '0.4 dB/km' },
  { id: 'R-005', name: 'University Spur', status: 'active', length: '7.1 km', nodes: 4, outages: 0, fibreCount: 24, cableType: 'Underground', attenuation: '0.2 dB/km' }
];

const mockInfrastructure = [
  { id: 'MH-001', name: 'Manhole - Central Station', type: 'manhole', status: 'operational', depth: '3.2m', fibreCables: 12, lastInspection: '2025-05-15' },
  { id: 'SP-001', name: 'Splice Point - Downtown', type: 'splice', status: 'operational', spliceType: 'Fusion', fibreCount: 48, loss: '0.1dB', lastMaintenance: '2025-04-20' },
  { id: 'CB-001', name: 'Street Cabinet - Main St', type: 'cabinet', status: 'operational', equipment: 'OLT', ports: 24, temperature: 22, lastInspection: '2025-05-10' },
  { id: 'PL-001', name: 'Utility Pole - West End', type: 'pole', status: 'operational', height: '15m', fibreCables: 6, condition: 'Good', lastInspection: '2025-05-05' }
];

const mockCables = [
  { id: 'CBL-001', name: 'Backbone Cable A', type: 'Underground', status: 'operational', fibreCount: 144, length: '12.5 km', manufacturer: 'Corning', model: 'SMF-28', attenuation: '0.2 dB/km' },
  { id: 'CBL-002', name: 'Distribution Cable B', type: 'Aerial', status: 'operational', fibreCount: 72, length: '8.3 km', manufacturer: 'Prysmian', model: 'SMF-28e+', attenuation: '0.3 dB/km' },
  { id: 'CBL-003', name: 'Access Cable C', type: 'Underground', status: 'degraded', fibreCount: 24, length: '3.2 km', manufacturer: 'Fujikura', model: 'FutureGuide', attenuation: '0.4 dB/km' }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="h-4 w-4 mr-1" />Active</span>;
    case 'degraded': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><AlertTriangle className="h-4 w-4 mr-1" />Degraded</span>;
    case 'down': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle className="h-4 w-4 mr-1" />Down</span>;
    default: return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Unknown</span>;
  }
};

const FibreMapPage: React.FC = () => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Fibre Map</h1>
          <p className="text-gray-600 mt-1">Visualize fiber routes, node status, and outages</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center">
            <Layers className="h-4 w-4 mr-2" />
            Map Layers
          </button>
        </div>
      </div>

      {/* Map Visualization (Mock) */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Network Map Overview</h2>
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search routes..."
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        {/* Static mock map visualization */}
        <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-300 rounded-lg flex items-center justify-center mb-4 relative">
          {/* Mock fiber lines and nodes */}
          <svg width="90%" height="90%" viewBox="0 0 400 200" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* Fiber lines */}
            <line x1="40" y1="40" x2="360" y2="40" stroke="#2563eb" strokeWidth="4" />
            <line x1="40" y1="100" x2="360" y2="100" stroke="#f59e42" strokeWidth="4" />
            <line x1="40" y1="160" x2="360" y2="160" stroke="#dc2626" strokeWidth="4" />
            {/* Nodes */}
            <circle cx="40" cy="40" r="10" fill="#22c55e" />
            <circle cx="200" cy="40" r="10" fill="#22c55e" />
            <circle cx="360" cy="40" r="10" fill="#22c55e" />
            <circle cx="40" cy="100" r="10" fill="#facc15" />
            <circle cx="200" cy="100" r="10" fill="#facc15" />
            <circle cx="360" cy="100" r="10" fill="#facc15" />
            <circle cx="40" cy="160" r="10" fill="#ef4444" />
            <circle cx="200" cy="160" r="10" fill="#ef4444" />
            <circle cx="360" cy="160" r="10" fill="#ef4444" />
          </svg>
          <span className="text-gray-500 text-lg">(Mock Fiber Map Visualization)</span>
        </div>
      </div>

      {/* Fiber Routes Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Fiber Routes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Length</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nodes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fibre Count</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outages</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockRoutes.map((route) => (
                <tr key={route.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{route.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(route.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{route.length}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{route.nodes}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{route.fibreCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{route.outages}</td>
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
            {mockCables.map((cable) => (
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
            {mockInfrastructure.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <FiberManualRecord className="h-4 w-4 text-purple-500 mr-2" />
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
                  {item.condition && <div>Condition: {item.condition}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FibreMapPage; 
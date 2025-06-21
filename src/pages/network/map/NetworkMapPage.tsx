import React, { useState } from 'react';
import {
  Search,
  RefreshCw,
  Download,
  Filter,
  MoreVertical,
  Map,
  ZoomIn,
  ZoomOut,
  Layers,
  Maximize2,
  Minimize2,
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'lucide-react';

interface NetworkNode {
  id: string;
  name: string;
  type: 'router' | 'switch' | 'firewall' | 'load-balancer';
  status: 'up' | 'down' | 'degraded' | 'warning';
  location: string;
  ipAddress: string;
  connections: string[];
  coordinates: { x: number; y: number };
}

interface NetworkLink {
  id: string;
  source: string;
  target: string;
  type: 'fiber' | 'copper' | 'wireless' | 'backbone' | 'distribution' | 'access';
  bandwidth: string;
  status: 'up' | 'down' | 'degraded' | 'warning';
  utilization: number;
}

const mockNodes: NetworkNode[] = [
  {
    id: 'R1',
    name: 'Core Router 1',
    type: 'router',
    status: 'up',
    location: 'New York',
    ipAddress: '10.0.1.1',
    connections: ['R2', 'R3', 'S1'],
    coordinates: { x: 100, y: 100 }
  },
  {
    id: 'R2',
    name: 'Core Router 2',
    type: 'router',
    status: 'up',
    location: 'Chicago',
    ipAddress: '10.0.1.2',
    connections: ['R1', 'R4', 'S2'],
    coordinates: { x: 300, y: 100 }
  },
  {
    id: 'R3',
    name: 'Edge Router 1',
    type: 'router',
    status: 'degraded',
    location: 'Los Angeles',
    ipAddress: '10.0.1.3',
    connections: ['R1', 'F1'],
    coordinates: { x: 100, y: 300 }
  },
  {
    id: 'R4',
    name: 'Edge Router 2',
    type: 'router',
    status: 'up',
    location: 'Miami',
    ipAddress: '10.0.1.4',
    connections: ['R2', 'F2'],
    coordinates: { x: 300, y: 300 }
  },
  {
    id: 'S1',
    name: 'Core Switch 1',
    type: 'switch',
    status: 'up',
    location: 'New York',
    ipAddress: '10.0.2.1',
    connections: ['R1', 'F1'],
    coordinates: { x: 100, y: 200 }
  },
  {
    id: 'S2',
    name: 'Core Switch 2',
    type: 'switch',
    status: 'up',
    location: 'Chicago',
    ipAddress: '10.0.2.2',
    connections: ['R2', 'F2'],
    coordinates: { x: 300, y: 200 }
  },
  {
    id: 'F1',
    name: 'Firewall 1',
    type: 'firewall',
    status: 'up',
    location: 'Los Angeles',
    ipAddress: '10.0.3.1',
    connections: ['R3', 'S1'],
    coordinates: { x: 200, y: 300 }
  },
  {
    id: 'F2',
    name: 'Firewall 2',
    type: 'firewall',
    status: 'up',
    location: 'Miami',
    ipAddress: '10.0.3.2',
    connections: ['R4', 'S2'],
    coordinates: { x: 200, y: 400 }
  }
];

const mockLinks: NetworkLink[] = [
  {
    id: 'L1',
    source: 'R1',
    target: 'R2',
    type: 'fiber',
    bandwidth: '100 Gbps',
    status: 'up',
    utilization: 65
  },
  {
    id: 'L2',
    source: 'R1',
    target: 'R3',
    type: 'fiber',
    bandwidth: '40 Gbps',
    status: 'up',
    utilization: 45
  },
  {
    id: 'L3',
    source: 'R2',
    target: 'R4',
    type: 'fiber',
    bandwidth: '40 Gbps',
    status: 'up',
    utilization: 30
  },
  {
    id: 'L4',
    source: 'R3',
    target: 'F1',
    type: 'copper',
    bandwidth: '10 Gbps',
    status: 'degraded',
    utilization: 85
  },
  {
    id: 'L5',
    source: 'R4',
    target: 'F2',
    type: 'copper',
    bandwidth: '10 Gbps',
    status: 'up',
    utilization: 25
  }
];

const networkPerformanceData = [
  { time: '00:00', bandwidth: 65, latency: 4, packets: 1200 },
  { time: '04:00', bandwidth: 70, latency: 5, packets: 1500 },
  { time: '08:00', bandwidth: 85, latency: 6, packets: 1800 },
  { time: '12:00', bandwidth: 90, latency: 7, packets: 2000 },
  { time: '16:00', bandwidth: 75, latency: 5, packets: 1600 },
  { time: '20:00', bandwidth: 60, latency: 4, packets: 1300 }
];

const deviceTypes = [
  { name: 'Routers', value: 8 },
  { name: 'Switches', value: 12 },
  { name: 'Firewalls', value: 4 }
];

const linkTypes = [
  { name: 'Backbone', value: 5 },
  { name: 'Distribution', value: 8 },
  { name: 'Access', value: 15 }
];

const COLORS = ['#3B82F6', '#10B981', '#EF4444'];

const NetworkMapPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [zoom, setZoom] = useState(1);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'up':
        return 'bg-green-100 text-green-800';
      case 'down':
        return 'bg-red-100 text-red-800';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800';
      case 'warning':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getNodeColor = (type: NetworkNode['type']) => {
    switch (type) {
      case 'router':
        return 'bg-blue-500';
      case 'switch':
        return 'bg-purple-500';
      case 'firewall':
        return 'bg-red-500';
      case 'load-balancer':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredNodes = mockNodes.filter(node =>
    node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.ipAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Network Map</h1>
          <p className="mt-2 text-sm text-gray-700">
            Interactive visualization of network topology and connections.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:flex sm:gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <RefreshCw className="-ml-0.5 h-5 w-5" />
            Refresh
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Download className="-ml-0.5 h-5 w-5" />
            Export
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            placeholder="Search nodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <Layers className="-ml-0.5 h-5 w-5" />
            Layers
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
            >
              <ZoomOut className="-ml-0.5 h-5 w-5" />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => setZoom(Math.min(2, zoom + 0.1))}
            >
              <ZoomIn className="-ml-0.5 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Network Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={networkPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="bandwidth" name="Bandwidth %" stroke="#3B82F6" fill="#93C5FD" />
                <Line yAxisId="right" type="monotone" dataKey="latency" name="Latency (ms)" stroke="#8B5CF6" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Device Types</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {deviceTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Link Types</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={linkTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {linkTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="relative h-[600px] bg-gray-50 rounded-lg overflow-hidden">
          {/* Network Map Visualization */}
          <div
            className="absolute inset-0"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center center'
            }}
          >
            {/* Links */}
            {mockLinks.map((link) => (
              <svg
                key={link.id}
                className="absolute inset-0"
                style={{ pointerEvents: 'none' }}
              >
                <line
                  x1={mockNodes.find(n => n.id === link.source)?.coordinates.x}
                  y1={mockNodes.find(n => n.id === link.source)?.coordinates.y}
                  x2={mockNodes.find(n => n.id === link.target)?.coordinates.x}
                  y2={mockNodes.find(n => n.id === link.target)?.coordinates.y}
                  stroke={link.status === 'up' ? '#10B981' : link.status === 'degraded' ? '#F59E0B' : '#EF4444'}
                  strokeWidth="2"
                  strokeDasharray={link.type === 'wireless' ? '5,5' : 'none'}
                />
              </svg>
            ))}

            {/* Nodes */}
            {filteredNodes.map((node) => (
              <div
                key={node.id}
                className={`absolute w-8 h-8 rounded-full ${getNodeColor(node.type)} cursor-pointer transform -translate-x-1/2 -translate-y-1/2`}
                style={{
                  left: node.coordinates.x,
                  top: node.coordinates.y
                }}
                onClick={() => setSelectedNode(node)}
              >
                <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
                  {node.id}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Node Details Panel */}
      {selectedNode && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              {selectedNode.name}
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={() => setSelectedNode(null)}
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Type</dt>
              <dd className="mt-1 text-sm text-gray-900">{selectedNode.type}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1">
                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getStatusColor(selectedNode.status)}`}>
                  {selectedNode.status}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Location</dt>
              <dd className="mt-1 text-sm text-gray-900">{selectedNode.location}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">IP Address</dt>
              <dd className="mt-1 text-sm text-gray-900">{selectedNode.ipAddress}</dd>
            </div>
          </dl>
          <div className="mt-4">
            <dt className="text-sm font-medium text-gray-500">Connections</dt>
            <dd className="mt-1">
              <div className="flex flex-wrap gap-2">
                {selectedNode.connections.map((connId) => {
                  const connectedNode = mockNodes.find(n => n.id === connId);
                  return (
                    <span
                      key={connId}
                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getNodeColor(connectedNode?.type || 'router')} text-white`}
                    >
                      {connId}
                    </span>
                  );
                })}
              </div>
            </dd>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkMapPage; 
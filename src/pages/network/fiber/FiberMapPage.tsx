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
  Wifi,
  Cable,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
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

interface FiberNode {
  id: string;
  name: string;
  type: 'pop' | 'hub' | 'customer' | 'junction' | 'olt' | 'onu' | 'splitter';
  status: 'active' | 'maintenance' | 'inactive' | 'up' | 'down' | 'warning';
  location: string;
  coordinates: { x: number; y: number };
  capacity: string;
  utilization: number;
  connections: string[];
  powerLevel: number;
  distance: number;
}

interface FiberLink {
  id: string;
  source: string;
  target: string;
  type: 'backbone' | 'distribution' | 'access';
  status: 'active' | 'maintenance' | 'inactive' | 'up' | 'down' | 'warning';
  length: string;
  capacity: string;
  utilization: number;
  wavelength: string;
  attenuation: number;
}

const mockNodes: FiberNode[] = [
  {
    id: 'POP1',
    name: 'Point of Presence 1',
    type: 'pop',
    status: 'active',
    location: 'New York',
    coordinates: { x: 100, y: 100 },
    capacity: '100 Gbps',
    utilization: 75,
    connections: ['HUB1', 'HUB2'],
    powerLevel: -15,
    distance: 0
  },
  {
    id: 'POP2',
    name: 'Point of Presence 2',
    type: 'pop',
    status: 'active',
    location: 'Chicago',
    coordinates: { x: 300, y: 100 },
    capacity: '100 Gbps',
    utilization: 65,
    connections: ['HUB1', 'HUB3'],
    powerLevel: -15,
    distance: 0
  },
  {
    id: 'HUB1',
    name: 'Hub 1',
    type: 'hub',
    status: 'active',
    location: 'Boston',
    coordinates: { x: 100, y: 200 },
    capacity: '40 Gbps',
    utilization: 45,
    connections: ['POP1', 'POP2', 'CUST1'],
    powerLevel: -15,
    distance: 0
  },
  {
    id: 'HUB2',
    name: 'Hub 2',
    type: 'hub',
    status: 'maintenance',
    location: 'Philadelphia',
    coordinates: { x: 200, y: 200 },
    capacity: '40 Gbps',
    utilization: 30,
    connections: ['POP1', 'CUST2'],
    powerLevel: -15,
    distance: 0
  },
  {
    id: 'HUB3',
    name: 'Hub 3',
    type: 'hub',
    status: 'active',
    location: 'Detroit',
    coordinates: { x: 300, y: 200 },
    capacity: '40 Gbps',
    utilization: 55,
    connections: ['POP2', 'CUST3'],
    powerLevel: -15,
    distance: 0
  },
  {
    id: 'CUST1',
    name: 'Enterprise Customer 1',
    type: 'customer',
    status: 'active',
    location: 'Boston',
    coordinates: { x: 100, y: 300 },
    capacity: '10 Gbps',
    utilization: 85,
    connections: ['HUB1'],
    powerLevel: -15,
    distance: 0
  },
  {
    id: 'CUST2',
    name: 'Enterprise Customer 2',
    type: 'customer',
    status: 'active',
    location: 'Philadelphia',
    coordinates: { x: 200, y: 300 },
    capacity: '10 Gbps',
    utilization: 60,
    connections: ['HUB2'],
    powerLevel: -15,
    distance: 0
  },
  {
    id: 'CUST3',
    name: 'Enterprise Customer 3',
    type: 'customer',
    status: 'inactive',
    location: 'Detroit',
    coordinates: { x: 300, y: 300 },
    capacity: '10 Gbps',
    utilization: 0,
    connections: ['HUB3'],
    powerLevel: -15,
    distance: 0
  },
  {
    id: 'OLT1',
    name: 'OLT 1',
    type: 'olt',
    status: 'up',
    location: 'Data Center 1',
    coordinates: { x: 100, y: 100 },
    capacity: '100 Gbps',
    utilization: 75,
    connections: ['SPL1'],
    powerLevel: -15,
    distance: 0
  },
  {
    id: 'SPL1',
    name: 'Splitter 1',
    type: 'splitter',
    status: 'warning',
    location: 'Manhole 1',
    coordinates: { x: 300, y: 200 },
    capacity: '100 Gbps',
    utilization: 65,
    connections: ['OLT1', 'ONU1'],
    powerLevel: -18,
    distance: 2
  },
  {
    id: 'ONU1',
    name: 'ONU 1',
    type: 'onu',
    status: 'up',
    location: 'Building 1',
    coordinates: { x: 500, y: 300 },
    capacity: '10 Gbps',
    utilization: 85,
    connections: ['SPL1'],
    powerLevel: -22,
    distance: 5
  }
];

const mockLinks: FiberLink[] = [
  {
    id: 'L1',
    source: 'POP1',
    target: 'HUB1',
    type: 'backbone',
    status: 'active',
    length: '50 km',
    capacity: '100 Gbps',
    utilization: 75,
    wavelength: '1550 nm',
    attenuation: 0.5
  },
  {
    id: 'L2',
    source: 'POP1',
    target: 'HUB2',
    type: 'backbone',
    status: 'active',
    length: '100 km',
    capacity: '100 Gbps',
    utilization: 65,
    wavelength: '1550 nm',
    attenuation: 0.5
  },
  {
    id: 'L3',
    source: 'POP2',
    target: 'HUB1',
    type: 'backbone',
    status: 'active',
    length: '150 km',
    capacity: '100 Gbps',
    utilization: 45,
    wavelength: '1550 nm',
    attenuation: 0.5
  },
  {
    id: 'L4',
    source: 'POP2',
    target: 'HUB3',
    type: 'backbone',
    status: 'active',
    length: '75 km',
    capacity: '100 Gbps',
    utilization: 55,
    wavelength: '1550 nm',
    attenuation: 0.5
  },
  {
    id: 'L5',
    source: 'HUB1',
    target: 'CUST1',
    type: 'distribution',
    status: 'active',
    length: '25 km',
    capacity: '40 Gbps',
    utilization: 85,
    wavelength: '1310 nm',
    attenuation: 1.2
  },
  {
    id: 'L6',
    source: 'HUB2',
    target: 'CUST2',
    type: 'distribution',
    status: 'maintenance',
    length: '30 km',
    capacity: '40 Gbps',
    utilization: 60,
    wavelength: '1310 nm',
    attenuation: 1.2
  },
  {
    id: 'L7',
    source: 'HUB3',
    target: 'CUST3',
    type: 'distribution',
    status: 'inactive',
    length: '20 km',
    capacity: '40 Gbps',
    utilization: 0,
    wavelength: '1310 nm',
    attenuation: 1.2
  }
];

const powerLevelData = [
  { time: '00:00', olt: -15, splitter: -18, onu: -22 },
  { time: '04:00', olt: -15, splitter: -19, onu: -23 },
  { time: '08:00', olt: -16, splitter: -20, onu: -24 },
  { time: '12:00', olt: -15, splitter: -18, onu: -22 },
  { time: '16:00', olt: -14, splitter: -17, onu: -21 },
  { time: '20:00', olt: -15, splitter: -18, onu: -22 }
];

const attenuationData = [
  { type: 'Backbone', value: 0.5 },
  { type: 'Distribution', value: 1.2 },
  { type: 'Access', value: 2.0 }
];

const fiberTypeData = [
  { name: 'Single Mode', value: 70 },
  { name: 'Multi Mode', value: 20 },
  { name: 'PON', value: 10 }
];

const COLORS = ['#3B82F6', '#10B981', '#EF4444'];

const FiberMapPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNode, setSelectedNode] = useState<FiberNode | null>(null);
  const [zoom, setZoom] = useState(1);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'up':
        return 'bg-green-100 text-green-800';
      case 'down':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getNodeColor = (type: FiberNode['type']) => {
    switch (type) {
      case 'pop':
        return 'bg-blue-500';
      case 'hub':
        return 'bg-purple-500';
      case 'customer':
        return 'bg-green-500';
      case 'junction':
        return 'bg-gray-500';
      case 'olt':
        return 'bg-teal-500';
      case 'onu':
        return 'bg-indigo-500';
      case 'splitter':
        return 'bg-pink-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getLinkColor = (type: FiberLink['type']) => {
    switch (type) {
      case 'backbone':
        return '#3B82F6'; // blue-500
      case 'distribution':
        return '#8B5CF6'; // purple-500
      case 'access':
        return '#10B981'; // green-500
      default:
        return '#6B7280'; // gray-500
    }
  };

  const filteredNodes = mockNodes.filter(node =>
    node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Fiber Network Map</h1>
          <p className="mt-2 text-sm text-gray-700">
            Interactive visualization of fiber network infrastructure and connections.
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
          <h3 className="text-lg font-medium text-gray-900 mb-4">Power Levels</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={powerLevelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="olt" name="OLT" stroke="#3B82F6" />
                <Line type="monotone" dataKey="splitter" name="Splitter" stroke="#10B981" />
                <Line type="monotone" dataKey="onu" name="ONU" stroke="#8B5CF6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Attenuation by Type</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attenuationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Attenuation (dB/km)" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Fiber Types</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fiberTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {fiberTypeData.map((entry, index) => (
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
          {/* Fiber Network Map Visualization */}
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
                  stroke={getLinkColor(link.type)}
                  strokeWidth="2"
                  strokeDasharray={link.status === 'maintenance' ? '5,5' : 'none'}
                  opacity={link.status === 'inactive' ? 0.3 : 1}
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
              <dd className="mt-1 text-sm text-gray-900">{selectedNode.type.toUpperCase()}</dd>
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
              <dt className="text-sm font-medium text-gray-500">Capacity</dt>
              <dd className="mt-1 text-sm text-gray-900">{selectedNode.capacity}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Utilization</dt>
              <dd className="mt-1">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${selectedNode.utilization}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 mt-1">{selectedNode.utilization}%</span>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Power Level</dt>
              <dd className="mt-1 text-sm text-gray-900">{selectedNode.powerLevel} dBm</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Distance</dt>
              <dd className="mt-1 text-sm text-gray-900">{selectedNode.distance} km</dd>
            </div>
          </dl>
          <div className="mt-4">
            <dt className="text-sm font-medium text-gray-500">Connections</dt>
            <dd className="mt-1">
              <div className="flex flex-wrap gap-2">
                {selectedNode.connections.map((connId) => {
                  const connectedNode = mockNodes.find(n => n.id === connId);
                  const link = mockLinks.find(l => 
                    (l.source === selectedNode.id && l.target === connId) ||
                    (l.source === connId && l.target === selectedNode.id)
                  );
                  return (
                    <div key={connId} className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getNodeColor(connectedNode?.type || 'junction')} text-white`}
                      >
                        {connId}
                      </span>
                      {link && (
                        <span className="text-xs text-gray-500">
                          ({link.type}, {link.capacity})
                        </span>
                      )}
                    </div>
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

export default FiberMapPage; 
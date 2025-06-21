import React, { useState } from 'react';
import {
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
  Area
} from 'recharts';
import {
  RefreshCw,
  Download,
  Search,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

interface BGPPeer {
  id: string;
  peerIP: string;
  asn: string;
  description: string;
  status: 'up' | 'down' | 'warning';
  uptime: string;
  prefixCount: number;
  lastError: string;
  location: string;
  lastUpdate: string;
}

const bgpPeers: BGPPeer[] = [
  {
    id: 'P1',
    peerIP: '192.168.1.1',
    asn: 'AS65001',
    description: 'Core Router 1',
    status: 'up',
    uptime: '15d 23h 45m',
    prefixCount: 12500,
    lastError: 'None',
    location: 'Data Center 1',
    lastUpdate: '2024-02-28 14:30:00'
  },
  {
    id: 'P2',
    peerIP: '192.168.1.2',
    asn: 'AS65002',
    description: 'Edge Router 1',
    status: 'warning',
    uptime: '2d 5h 30m',
    prefixCount: 8500,
    lastError: 'Hold timer expired',
    location: 'POP 1',
    lastUpdate: '2024-02-28 14:25:00'
  },
  {
    id: 'P3',
    peerIP: '192.168.1.3',
    asn: 'AS65003',
    description: 'Backbone Router 1',
    status: 'down',
    uptime: '0d 0h 0m',
    prefixCount: 0,
    lastError: 'Connection refused',
    location: 'Data Center 2',
    lastUpdate: '2024-02-28 14:20:00'
  }
];

const performanceMetrics = [
  { time: '00:00', prefixes: 12000, updates: 150, withdraws: 10 },
  { time: '04:00', prefixes: 12200, updates: 180, withdraws: 15 },
  { time: '08:00', prefixes: 12100, updates: 200, withdraws: 20 },
  { time: '12:00', prefixes: 12300, updates: 220, withdraws: 25 },
  { time: '16:00', prefixes: 12400, updates: 250, withdraws: 30 },
  { time: '20:00', prefixes: 12500, updates: 280, withdraws: 35 }
];

const routeChanges = [
  { time: '00:00', added: 120, removed: 80 },
  { time: '04:00', added: 150, removed: 100 },
  { time: '08:00', added: 180, removed: 120 },
  { time: '12:00', added: 200, removed: 150 },
  { time: '16:00', added: 220, removed: 180 },
  { time: '20:00', added: 250, removed: 200 }
];

const convergenceTime = [
  { timestamp: '00:00', value: 2.5 },
  { timestamp: '04:00', value: 2.8 },
  { timestamp: '08:00', value: 3.0 },
  { timestamp: '12:00', value: 2.7 },
  { timestamp: '16:00', value: 2.9 },
  { timestamp: '20:00', value: 2.6 }
];

const BGPStatusPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPeers = bgpPeers.filter(peer =>
    peer.peerIP.toLowerCase().includes(searchTerm.toLowerCase()) ||
    peer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    peer.asn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">BGP Status</h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor and manage BGP peer connections and routing information
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Prefix Count Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="prefixes" stroke="#3B82F6" fill="#93C5FD" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Route Changes</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={routeChanges}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="added" name="Added Routes" fill="#10B981" />
                <Bar dataKey="removed" name="Removed Routes" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Convergence Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={convergenceTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" name="Convergence Time (s)" stroke="#8B5CF6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Search and Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search peers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Peer Information
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uptime
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prefix Count
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Error
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Update
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPeers.map((peer) => (
                <tr key={peer.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{peer.description}</div>
                    <div className="text-sm text-gray-500">{peer.peerIP}</div>
                    <div className="text-sm text-gray-500">{peer.asn}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      peer.status === 'up'
                        ? 'bg-green-100 text-green-800'
                        : peer.status === 'warning'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {peer.status === 'up' ? (
                        <CheckCircle className="h-4 w-4 mr-1" />
                      ) : peer.status === 'warning' ? (
                        <AlertCircle className="h-4 w-4 mr-1" />
                      ) : (
                        <XCircle className="h-4 w-4 mr-1" />
                      )}
                      {peer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {peer.uptime}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {peer.prefixCount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {peer.lastError}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {peer.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {peer.lastUpdate}
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

export default BGPStatusPage; 
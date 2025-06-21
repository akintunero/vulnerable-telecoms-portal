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
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  RefreshCw,
  Download,
  Search,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Activity
} from 'lucide-react';

interface LSP {
  id: string;
  name: string;
  source: string;
  destination: string;
  status: 'up' | 'down' | 'warning';
  bandwidth: string;
  utilization: number;
  latency: number;
  hops: number;
  lastUpdate: string;
}

interface VPN {
  id: string;
  name: string;
  type: 'L2' | 'L3';
  customer: string;
  sites: number;
  status: 'up' | 'down' | 'warning';
  lastUpdate: string;
}

// Mock data for LSPs
const mockLSPs: LSP[] = [
  {
    id: 'L1',
    name: 'LSP-CORE-1',
    source: 'POP1',
    destination: 'POP2',
    status: 'up',
    bandwidth: '10 Gbps',
    utilization: 75,
    latency: 5,
    hops: 3,
    lastUpdate: '2024-02-28 14:30:00'
  },
  {
    id: 'L2',
    name: 'LSP-EDGE-1',
    source: 'POP2',
    destination: 'POP3',
    status: 'warning',
    bandwidth: '5 Gbps',
    utilization: 90,
    latency: 8,
    hops: 4,
    lastUpdate: '2024-02-28 14:25:00'
  },
  {
    id: 'L3',
    name: 'LSP-BACKBONE-1',
    source: 'POP1',
    destination: 'POP3',
    status: 'down',
    bandwidth: '20 Gbps',
    utilization: 0,
    latency: 0,
    hops: 0,
    lastUpdate: '2024-02-28 14:20:00'
  }
];

// Mock data for VPNs
const mockVPNs: VPN[] = [
  {
    id: 'V1',
    name: 'VPN-CORP-1',
    type: 'L3',
    customer: 'Enterprise Corp',
    sites: 5,
    status: 'up',
    lastUpdate: '2024-02-28 14:30:00'
  },
  {
    id: 'V2',
    name: 'VPN-BANK-1',
    type: 'L2',
    customer: 'Global Bank',
    sites: 3,
    status: 'warning',
    lastUpdate: '2024-02-28 14:25:00'
  },
  {
    id: 'V3',
    name: 'VPN-GOV-1',
    type: 'L3',
    customer: 'Government Agency',
    sites: 8,
    status: 'up',
    lastUpdate: '2024-02-28 14:20:00'
  }
];

// Mock data for bandwidth utilization
const bandwidthData = [
  { time: '00:00', utilization: 65, latency: 4 },
  { time: '04:00', utilization: 70, latency: 5 },
  { time: '08:00', utilization: 85, latency: 6 },
  { time: '12:00', utilization: 90, latency: 7 },
  { time: '16:00', utilization: 75, latency: 5 },
  { time: '20:00', utilization: 60, latency: 4 }
];

// Mock data for LSP status distribution
const lspStatusData = [
  { name: 'Up', value: 15 },
  { name: 'Warning', value: 3 },
  { name: 'Down', value: 2 }
];

// Mock data for VPN types
const vpnTypeData = [
  { name: 'L3 VPN', value: 12 },
  { name: 'L2 VPN', value: 8 }
];

const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

const MPLSDetailsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLSPs = mockLSPs.filter(lsp =>
    lsp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lsp.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lsp.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">MPLS Details</h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor and manage MPLS LSPs and VPNs
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
          <h3 className="text-lg font-medium text-gray-900 mb-4">Bandwidth Utilization & Latency</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bandwidthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="utilization" name="Utilization %" stroke="#3B82F6" fill="#93C5FD" />
                <Line yAxisId="right" type="monotone" dataKey="latency" name="Latency (ms)" stroke="#8B5CF6" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">LSP Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={lspStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {lspStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">VPN Type Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vpnTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {vpnTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* LSP Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Label Switched Paths (LSPs)</h2>
          <div className="mt-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search LSPs..."
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
                  LSP Information
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bandwidth
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilization
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Latency
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hops
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Update
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLSPs.map((lsp) => (
                <tr key={lsp.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{lsp.name}</div>
                    <div className="text-sm text-gray-500">{lsp.source} → {lsp.destination}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      lsp.status === 'up'
                        ? 'bg-green-100 text-green-800'
                        : lsp.status === 'warning'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {lsp.status === 'up' ? (
                        <CheckCircle className="h-4 w-4 mr-1" />
                      ) : lsp.status === 'warning' ? (
                        <AlertCircle className="h-4 w-4 mr-1" />
                      ) : (
                        <XCircle className="h-4 w-4 mr-1" />
                      )}
                      {lsp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lsp.bandwidth}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            lsp.utilization > 90
                              ? 'bg-red-600'
                              : lsp.utilization > 75
                              ? 'bg-yellow-500'
                              : 'bg-green-600'
                          }`}
                          style={{ width: `${lsp.utilization}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-500">{lsp.utilization}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lsp.latency} ms
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lsp.hops}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lsp.lastUpdate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* VPN Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Virtual Private Networks (VPNs)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  VPN Information
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sites
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Update
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockVPNs.map((vpn) => (
                <tr key={vpn.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{vpn.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vpn.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vpn.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vpn.sites}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      vpn.status === 'up'
                        ? 'bg-green-100 text-green-800'
                        : vpn.status === 'warning'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {vpn.status === 'up' ? (
                        <CheckCircle className="h-4 w-4 mr-1" />
                      ) : vpn.status === 'warning' ? (
                        <AlertCircle className="h-4 w-4 mr-1" />
                      ) : (
                        <XCircle className="h-4 w-4 mr-1" />
                      )}
                      {vpn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vpn.lastUpdate}
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

export default MPLSDetailsPage; 
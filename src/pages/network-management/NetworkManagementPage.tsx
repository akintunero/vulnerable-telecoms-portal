import React from 'react';
import { mockNetworkNodes } from '../../lib/mockData';

const NetworkManagementPage: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'offline':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Network Management</h1>
        <p className="text-gray-600">Monitor and manage network infrastructure</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Network Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Nodes:</span>
              <span className="font-semibold">24</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Online Nodes:</span>
              <span className="font-semibold text-green-600">22</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg. Uptime:</span>
              <span className="font-semibold text-blue-600">99.9%</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Avg. Bandwidth:</span>
              <span className="font-semibold">85.5 Mbps</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg. Latency:</span>
              <span className="font-semibold">12ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Packet Loss:</span>
              <span className="font-semibold text-green-600">0.01%</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Alerts</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Critical:</span>
              <span className="font-semibold text-red-600">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Warning:</span>
              <span className="font-semibold text-yellow-600">2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Info:</span>
              <span className="font-semibold text-blue-600">5</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Network Nodes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Node ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Load
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uptime
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockNetworkNodes.map((node) => (
                <tr key={node.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {node.node_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {node.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(node.status)}`}>
                      {node.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {node.load_percentage}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {node.uptime_percentage}%
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

export default NetworkManagementPage; 
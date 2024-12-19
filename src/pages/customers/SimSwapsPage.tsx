import React from 'react';
import { Smartphone, Clock, CheckCircle, AlertTriangle, User, Calendar } from 'lucide-react';

const SimSwapsPage: React.FC = () => {
  const simSwaps = [
    {
      id: 'SWAP001',
      customerName: 'John Smith',
      customerId: 'CUST001',
      phoneNumber: '+234 801 234 5678',
      oldSim: '89014103211118510720',
      newSim: '89014103211118510721',
      reason: 'Lost/Stolen',
      status: 'completed',
      requestDate: '2025-05-28',
      completedDate: '2025-05-29',
      priority: 'high'
    },
    {
      id: 'SWAP002',
      customerName: 'Sarah Johnson',
      customerId: 'CUST002',
      phoneNumber: '+234 802 345 6789',
      oldSim: '89014103211118510722',
      newSim: '89014103211118510723',
      reason: 'Damaged',
      status: 'in_progress',
      requestDate: '2025-05-30',
      completedDate: null,
      priority: 'medium'
    },
    {
      id: 'SWAP003',
      customerName: 'Michael Brown',
      customerId: 'CUST003',
      phoneNumber: '+234 803 456 7890',
      oldSim: '89014103211118510724',
      newSim: '89014103211118510725',
      reason: 'Upgrade',
      status: 'pending',
      requestDate: '2025-06-01',
      completedDate: null,
      priority: 'low'
    },
    {
      id: 'SWAP004',
      customerName: 'Emily Davis',
      customerId: 'CUST004',
      phoneNumber: '+234 804 567 8901',
      oldSim: '89014103211118510726',
      newSim: '89014103211118510727',
      reason: 'Lost/Stolen',
      status: 'completed',
      requestDate: '2025-05-27',
      completedDate: '2025-05-28',
      priority: 'high'
    },
    {
      id: 'SWAP005',
      customerName: 'David Wilson',
      customerId: 'CUST005',
      phoneNumber: '+234 805 678 9012',
      oldSim: '89014103211118510728',
      newSim: '89014103211118510729',
      reason: 'Damaged',
      status: 'pending',
      requestDate: '2025-06-01',
      completedDate: null,
      priority: 'medium'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'in_progress':
        return 'text-blue-600 bg-blue-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-red-600 bg-red-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">SIM Swap Management</h1>
        <p className="text-gray-600">Track and manage SIM card swap requests</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Smartphone className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">{simSwaps.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {simSwaps.filter(s => s.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {simSwaps.filter(s => s.status === 'in_progress').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {simSwaps.filter(s => s.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SIM Swap Requests Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">SIM Swap Requests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {simSwaps.map((swap) => (
                <tr key={swap.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{swap.customerName}</div>
                        <div className="text-sm text-gray-500">ID: {swap.customerId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {swap.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {swap.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(swap.status)}
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(swap.status)}`}>
                        {getStatusText(swap.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(swap.priority)}`}>
                      {swap.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                      {swap.requestDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    {swap.status === 'pending' && (
                      <button className="text-green-600 hover:text-green-900">Process</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SIM Details Modal Placeholder */}
      <div className="mt-6 bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">SIM Details</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-3">Old SIM Information</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div><span className="font-medium">ICCID:</span> 89014103211118510720</div>
                <div><span className="font-medium">Status:</span> <span className="text-red-600">Deactivated</span></div>
                <div><span className="font-medium">Last Used:</span> 2025-05-28 14:30:00</div>
              </div>
            </div>
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-3">New SIM Information</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div><span className="font-medium">ICCID:</span> 89014103211118510721</div>
                <div><span className="font-medium">Status:</span> <span className="text-green-600">Active</span></div>
                <div><span className="font-medium">Activated:</span> 2025-05-29 09:15:00</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-6 bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">SIM Swap Statistics</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">24h</div>
              <div className="text-sm text-gray-600">Average Processing Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">98.5%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">15</div>
              <div className="text-sm text-gray-600">This Month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-sm text-gray-600">High Priority Pending</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimSwapsPage; 
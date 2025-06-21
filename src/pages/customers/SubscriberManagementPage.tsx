import React from 'react';
import { User, Smartphone, CheckCircle, AlertTriangle, Activity, Calendar } from 'lucide-react';

const SubscriberManagementPage: React.FC = () => {
  const subscribers = [
    {
      id: 'SUB001',
      name: 'John Smith',
      phoneNumber: '+234 801 234 5678',
      email: 'john.smith@email.com',
      status: 'active',
      plan: 'Premium 10GB',
      simNumber: '89014103211118510720',
      dataUsage: 7.2,
      dataLimit: 10,
      lastActivity: '2025-06-01 14:30:00',
      registrationDate: '2024-03-15'
    },
    {
      id: 'SUB002',
      name: 'Sarah Johnson',
      phoneNumber: '+234 802 345 6789',
      email: 'sarah.johnson@email.com',
      status: 'active',
      plan: 'Standard 5GB',
      simNumber: '89014103211118510721',
      dataUsage: 4.8,
      dataLimit: 5,
      lastActivity: '2025-06-01 13:45:00',
      registrationDate: '2024-05-20'
    },
    {
      id: 'SUB003',
      name: 'Michael Brown',
      phoneNumber: '+234 803 456 7890',
      email: 'michael.brown@email.com',
      status: 'suspended',
      plan: 'Basic 2GB',
      simNumber: '89014103211118510722',
      dataUsage: 1.9,
      dataLimit: 2,
      lastActivity: '2025-05-28 09:15:00',
      registrationDate: '2024-07-10'
    },
    {
      id: 'SUB004',
      name: 'Emily Davis',
      phoneNumber: '+234 804 567 8901',
      email: 'emily.davis@email.com',
      status: 'active',
      plan: 'Premium 10GB',
      simNumber: '89014103211118510723',
      dataUsage: 9.8,
      dataLimit: 10,
      lastActivity: '2025-06-01 15:20:00',
      registrationDate: '2024-02-08'
    },
    {
      id: 'SUB005',
      name: 'David Wilson',
      phoneNumber: '+234 805 678 9012',
      email: 'david.wilson@email.com',
      status: 'inactive',
      plan: 'Standard 5GB',
      simNumber: '89014103211118510724',
      dataUsage: 0.5,
      dataLimit: 5,
      lastActivity: '2025-05-25 11:30:00',
      registrationDate: '2024-08-12'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'suspended':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'inactive':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'suspended':
        return 'text-yellow-600 bg-yellow-50';
      case 'inactive':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getDataUsageColor = (usage: number, limit: number) => {
    const percentage = (usage / limit) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Subscriber Management</h1>
        <p className="text-gray-600">Manage individual subscribers and their service details</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <User className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Subscribers</p>
              <p className="text-2xl font-bold text-gray-900">{subscribers.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {subscribers.filter(s => s.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Suspended</p>
              <p className="text-2xl font-bold text-gray-900">
                {subscribers.filter(s => s.status === 'suspended').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Smartphone className="h-8 w-8 text-purple-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Data Used</p>
              <p className="text-2xl font-bold text-gray-900">
                {subscribers.reduce((acc, s) => acc + s.dataUsage, 0).toFixed(1)} GB
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Subscribers</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscriber
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SIM Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{subscriber.name}</div>
                        <div className="text-sm text-gray-500">{subscriber.phoneNumber}</div>
                        <div className="text-xs text-gray-400">{subscriber.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(subscriber.status)}
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subscriber.status)}`}>
                        {subscriber.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {subscriber.plan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            (subscriber.dataUsage / subscriber.dataLimit) > 0.9 ? 'bg-red-500' : 
                            (subscriber.dataUsage / subscriber.dataLimit) > 0.75 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(subscriber.dataUsage / subscriber.dataLimit) * 100}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm ${getDataUsageColor(subscriber.dataUsage, subscriber.dataLimit)}`}>
                        {subscriber.dataUsage}/{subscriber.dataLimit} GB
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {subscriber.simNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {subscriber.lastActivity}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subscriber Details */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Subscriber Details</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-2">John Smith</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><span className="font-medium">Phone:</span> +234 801 234 5678</p>
                  <p><span className="font-medium">Email:</span> john.smith@email.com</p>
                  <p><span className="font-medium">Plan:</span> Premium 10GB</p>
                  <p><span className="font-medium">Registration:</span> March 15, 2024</p>
                  <p><span className="font-medium">Status:</span> Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Usage Statistics</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">23.8 GB</div>
                <div className="text-sm text-gray-600">Total Data Used</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">3</div>
                <div className="text-sm text-gray-600">Active Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">72%</div>
                <div className="text-sm text-gray-600">Average Data Usage</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriberManagementPage; 
import React from 'react';
import { Settings, Clock, CheckCircle, AlertTriangle, User, Calendar } from 'lucide-react';

const ProvisioningPage: React.FC = () => {
  const provisioningRequests = [
    {
      id: 'PROV001',
      customerName: 'John Smith',
      service: 'IP Access',
      status: 'completed',
      requestDate: '2025-05-30',
      completedDate: '2025-05-31',
      technician: 'Mike Wilson',
      priority: 'high'
    },
    {
      id: 'PROV002',
      customerName: 'Sarah Johnson',
      service: 'MPLS',
      status: 'in_progress',
      requestDate: '2025-06-01',
      completedDate: null,
      technician: 'Emily Davis',
      priority: 'medium'
    },
    {
      id: 'PROV003',
      customerName: 'TechCorp Solutions',
      service: 'VPN',
      status: 'pending',
      requestDate: '2025-06-01',
      completedDate: null,
      technician: 'David Brown',
      priority: 'low'
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

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Service Provisioning</h1>
        <p className="text-gray-600">Manage service activation and provisioning requests</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Provisioning Requests</h2>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {provisioningRequests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="font-medium text-gray-900">{request.customerName}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div><span className="font-medium">Service:</span> {request.service}</div>
                  <div><span className="font-medium">Technician:</span> {request.technician}</div>
                  <div><span className="font-medium">Request Date:</span> {request.requestDate}</div>
                  <div><span className="font-medium">Priority:</span> {request.priority}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProvisioningPage; 
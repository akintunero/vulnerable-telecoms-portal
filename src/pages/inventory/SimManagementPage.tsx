import React from 'react';
import { Smartphone, CheckCircle, AlertTriangle, Package, Activity } from 'lucide-react';

const SimManagementPage: React.FC = () => {
  const simCards = [
    {
      id: 'SIM001',
      iccid: '89014103211118510720',
      status: 'active',
      customer: 'John Smith',
      plan: 'Premium 10GB',
      activationDate: '2024-03-15'
    },
    {
      id: 'SIM002',
      iccid: '89014103211118510721',
      status: 'inactive',
      customer: null,
      plan: null,
      activationDate: null
    },
    {
      id: 'SIM003',
      iccid: '89014103211118510722',
      status: 'active',
      customer: 'Sarah Johnson',
      plan: 'Standard 5GB',
      activationDate: '2024-05-20'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'inactive':
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'inactive':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-red-600 bg-red-50';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">SIM Management</h1>
        <p className="text-gray-600">Manage SIM card inventory and assignments</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">SIM Cards</h2>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {simCards.map((sim) => (
              <div key={sim.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Smartphone className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="font-medium text-gray-900">{sim.iccid}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sim.status)}`}>
                    {sim.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div><span className="font-medium">Customer:</span> {sim.customer || 'Unassigned'}</div>
                  <div><span className="font-medium">Plan:</span> {sim.plan || 'None'}</div>
                  <div><span className="font-medium">Activation Date:</span> {sim.activationDate || 'Not activated'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimManagementPage; 
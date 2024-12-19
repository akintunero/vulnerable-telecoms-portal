import React from 'react';
import { Package, CheckCircle, AlertTriangle, MapPin, Calendar } from 'lucide-react';

const AssetTrackingPage: React.FC = () => {
  const assets = [
    {
      id: 'AST001',
      name: 'Laptop - Dell XPS 13',
      type: 'Hardware',
      location: 'Office Floor 2',
      status: 'in_use',
      assignedTo: 'John Smith',
      purchaseDate: '2024-01-10',
      lastAudit: '2025-05-15'
    },
    {
      id: 'AST002',
      name: 'Network Cable - Cat6',
      type: 'Cable',
      location: 'Storage Room',
      status: 'available',
      assignedTo: null,
      purchaseDate: '2024-02-20',
      lastAudit: '2025-05-10'
    },
    {
      id: 'AST003',
      name: 'Monitor - 27" Dell',
      type: 'Hardware',
      location: 'Data Center',
      status: 'maintenance',
      assignedTo: 'Sarah Johnson',
      purchaseDate: '2024-03-05',
      lastAudit: '2025-05-20'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_use':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'available':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'maintenance':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_use':
        return 'text-green-600 bg-green-50';
      case 'available':
        return 'text-blue-600 bg-blue-50';
      case 'maintenance':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-red-600 bg-red-50';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Asset Tracking</h1>
        <p className="text-gray-600">Track and manage company assets and equipment</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Assets</h2>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {assets.map((asset) => (
              <div key={asset.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="font-medium text-gray-900">{asset.name}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                    {asset.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div><span className="font-medium">Type:</span> {asset.type}</div>
                  <div><span className="font-medium">Location:</span> {asset.location}</div>
                  <div><span className="font-medium">Assigned To:</span> {asset.assignedTo || 'Unassigned'}</div>
                  <div><span className="font-medium">Last Audit:</span> {asset.lastAudit}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetTrackingPage; 
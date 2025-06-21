import React from 'react';
import { Server, CheckCircle, AlertTriangle, Package, Activity } from 'lucide-react';

const DeviceInventoryPage: React.FC = () => {
  const devices = [
    {
      id: 'DEV001',
      name: 'Core Router - Main',
      type: 'Router',
      location: 'Data Center',
      status: 'active',
      serialNumber: 'CR-2024-001',
      purchaseDate: '2024-01-15',
      warranty: '2027-01-15'
    },
    {
      id: 'DEV002',
      name: 'Distribution Switch 1',
      type: 'Switch',
      location: 'Floor 1',
      status: 'active',
      serialNumber: 'DS-2024-001',
      purchaseDate: '2024-02-20',
      warranty: '2027-02-20'
    },
    {
      id: 'DEV003',
      name: 'Access Point - Lobby',
      type: 'Access Point',
      location: 'Lobby',
      status: 'maintenance',
      serialNumber: 'AP-2024-001',
      purchaseDate: '2024-03-10',
      warranty: '2027-03-10'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'maintenance':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'maintenance':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-red-600 bg-red-50';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Device Inventory</h1>
        <p className="text-gray-600">Manage network devices and equipment inventory</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Network Devices</h2>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {devices.map((device) => (
              <div key={device.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Server className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="font-medium text-gray-900">{device.name}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
                    {device.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div><span className="font-medium">Type:</span> {device.type}</div>
                  <div><span className="font-medium">Location:</span> {device.location}</div>
                  <div><span className="font-medium">Serial Number:</span> {device.serialNumber}</div>
                  <div><span className="font-medium">Warranty:</span> {device.warranty}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceInventoryPage; 
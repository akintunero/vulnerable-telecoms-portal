import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { mockApi } from '../../services/mockData';
import type { NetworkDevice } from '../../services/mockData';

interface AssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (asset: Omit<NetworkDevice, 'id'>) => void;
  asset?: NetworkDevice;
}

const AssetModal: React.FC<AssetModalProps> = ({ isOpen, onClose, onSubmit, asset }) => {
  const [formData, setFormData] = useState<Omit<NetworkDevice, 'id'>>({
    name: '',
    type: 'router',
    status: 'online',
    location: '',
    ipAddress: '',
    lastMaintenance: new Date().toISOString().split('T')[0],
    health: 100
  });

  useEffect(() => {
    if (asset) {
      setFormData({
        name: asset.name,
        type: asset.type,
        status: asset.status,
        location: asset.location,
        ipAddress: asset.ipAddress,
        lastMaintenance: asset.lastMaintenance,
        health: asset.health
      });
    }
  }, [asset]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{asset ? 'Edit Asset' : 'Add New Asset'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as NetworkDevice['type'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="router">Router</option>
              <option value="switch">Switch</option>
              <option value="firewall">Firewall</option>
              <option value="access-point">Access Point</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as NetworkDevice['status'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">IP Address</label>
            <input
              type="text"
              value={formData.ipAddress}
              onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Maintenance</label>
            <input
              type="date"
              value={formData.lastMaintenance}
              onChange={(e) => setFormData({ ...formData, lastMaintenance: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Health Score</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.health}
              onChange={(e) => setFormData({ ...formData, health: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              {asset ? 'Update' : 'Add'} Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InventoryPage: React.FC = () => {
  const [assets, setAssets] = useState<NetworkDevice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<NetworkDevice | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      const data = await mockApi.getDevices();
      setAssets(data);
    } catch (error) {
      console.error('Error loading assets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAsset = async (asset: Omit<NetworkDevice, 'id'>) => {
    // In a real app, this would be an API call
    const newAsset: NetworkDevice = {
      ...asset,
      id: String(assets.length + 1)
    };
    setAssets([...assets, newAsset]);
  };

  const handleEditAsset = async (asset: Omit<NetworkDevice, 'id'>) => {
    if (!selectedAsset) return;
    // In a real app, this would be an API call
    const updatedAssets = assets.map(a =>
      a.id === selectedAsset.id ? { ...asset, id: a.id } : a
    );
    setAssets(updatedAssets);
  };

  const handleDeleteAsset = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      // In a real app, this would be an API call
      setAssets(assets.filter(a => a.id !== id));
    }
  };

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: NetworkDevice['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800';
      case 'offline':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: NetworkDevice['type']) => {
    switch (type) {
      case 'router':
        return 'bg-blue-100 text-blue-800';
      case 'switch':
        return 'bg-purple-100 text-purple-800';
      case 'firewall':
        return 'bg-orange-100 text-orange-800';
      case 'access-point':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-600';
    if (health >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
        <p className="text-gray-600">Track and manage network equipment and assets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Equipment Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Devices:</span>
              <span className="font-semibold">1,456</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active Devices:</span>
              <span className="font-semibold text-green-600">1,432</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Under Maintenance:</span>
              <span className="font-semibold text-yellow-600">24</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Device Types</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Routers:</span>
              <span className="font-semibold">234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Switches:</span>
              <span className="font-semibold">567</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Servers:</span>
              <span className="font-semibold">89</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Asset Value</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Value:</span>
              <span className="font-semibold text-green-600">$2.4M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Depreciation:</span>
              <span className="font-semibold text-red-600">$180K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Warranty Coverage:</span>
              <span className="font-semibold text-blue-600">85%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Inventory Updates</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Device ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  DEV-001
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Router
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Data Center A
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2024-03-15
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  DEV-002
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Switch
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Data Center B
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Maintenance
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2024-03-14
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  DEV-003
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Server
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Data Center A
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2024-03-13
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
        <button
          onClick={() => {
            setSelectedAsset(undefined);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Asset
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Health
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Maintenance
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssets.map((asset) => (
                <tr key={asset.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(asset.type)}`}>
                      {asset.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(asset.status)}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asset.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`text-sm font-medium ${getHealthColor(asset.health)}`}>
                        {asset.health}%
                      </span>
                      {asset.health < 70 && (
                        <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(asset.lastMaintenance).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedAsset(asset);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteAsset(asset.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AssetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={selectedAsset ? handleEditAsset : handleAddAsset}
        asset={selectedAsset}
      />
    </div>
  );
};

export default InventoryPage; 
import React from 'react';

const CustomerManagementPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
        <p className="text-gray-600">Manage customer accounts, services, and billing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Customers:</span>
              <span className="font-semibold">1,234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active Customers:</span>
              <span className="font-semibold text-green-600">1,198</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">New This Month:</span>
              <span className="font-semibold text-blue-600">45</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Service Plans</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Premium:</span>
              <span className="font-semibold">456</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Standard:</span>
              <span className="font-semibold">678</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Basic:</span>
              <span className="font-semibold">100</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Revenue:</span>
              <span className="font-semibold text-green-600">$45.2K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg. Revenue/Customer:</span>
              <span className="font-semibold">$36.70</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Growth Rate:</span>
              <span className="font-semibold text-green-600">+12%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerManagementPage; 
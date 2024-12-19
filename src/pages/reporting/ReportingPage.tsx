import React from 'react';

const ReportingPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reporting</h1>
        <p className="text-gray-600">Generate and view business reports and analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Reports</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Revenue:</span>
              <span className="font-semibold text-green-600">$45.2K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Growth Rate:</span>
              <span className="font-semibold text-green-600">+15%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Churn Rate:</span>
              <span className="font-semibold text-red-600">2.1%</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Reports</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Customers:</span>
              <span className="font-semibold">1,234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">New Customers:</span>
              <span className="font-semibold text-blue-600">45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg. Satisfaction:</span>
              <span className="font-semibold text-green-600">4.8/5</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Network Reports</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Uptime:</span>
              <span className="font-semibold text-green-600">99.9%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg. Response Time:</span>
              <span className="font-semibold">12ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active Incidents:</span>
              <span className="font-semibold text-yellow-600">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportingPage; 
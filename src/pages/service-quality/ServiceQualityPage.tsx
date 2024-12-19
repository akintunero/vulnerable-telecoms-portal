import React from 'react';

const ServiceQualityPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Service Quality</h1>
        <p className="text-gray-600">Monitor service quality metrics and SLA compliance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">SLA Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Uptime SLA:</span>
              <span className="font-semibold text-green-600">99.9%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Response Time SLA:</span>
              <span className="font-semibold text-green-600">12ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Resolution Time:</span>
              <span className="font-semibold text-blue-600">2.5h</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Satisfaction</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Overall Score:</span>
              <span className="font-semibold text-green-600">4.8/5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Support Quality:</span>
              <span className="font-semibold text-green-600">4.9/5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Network Quality:</span>
              <span className="font-semibold text-green-600">4.7/5</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Packet Loss:</span>
              <span className="font-semibold text-green-600">0.01%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Jitter:</span>
              <span className="font-semibold text-green-600">2ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bandwidth Utilization:</span>
              <span className="font-semibold text-yellow-600">85%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quality Metrics Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">99.9%</div>
            <div className="text-sm text-gray-600">Network Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">12ms</div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">4.8/5</div>
            <div className="text-sm text-gray-600">Customer Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">98%</div>
            <div className="text-sm text-gray-600">SLA Compliance</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceQualityPage; 
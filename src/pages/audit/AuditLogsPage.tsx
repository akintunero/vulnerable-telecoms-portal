import React from 'react';

const AuditLogsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
        <p className="text-gray-600">View system audit logs and activity history</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="text-sm text-gray-600">User login - admin@telco.com</p>
            <p className="text-xs text-gray-500">2024-03-15 10:30:00</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <p className="text-sm text-gray-600">Customer data updated - CUST001</p>
            <p className="text-xs text-gray-500">2024-03-15 09:15:00</p>
          </div>
          <div className="border-l-4 border-yellow-500 pl-4">
            <p className="text-sm text-gray-600">System configuration changed</p>
            <p className="text-xs text-gray-500">2024-03-15 08:45:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogsPage; 
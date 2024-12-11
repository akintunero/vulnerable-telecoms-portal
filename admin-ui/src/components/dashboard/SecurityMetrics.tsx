import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AuditLog {
  id: number;
  action: string;
  user: string;
  timestamp: string;
  details: string;
  formattedTime: string;
}

const mockData = {
  securityAlerts: [
    { id: 1, type: 'DDoS', severity: 'high', status: 'active', timestamp: '2024-03-09T10:30:00Z' },
    { id: 2, type: 'Intrusion Attempt', severity: 'medium', status: 'investigating', timestamp: '2024-03-09T09:15:00Z' },
    { id: 3, type: 'Unauthorized Access', severity: 'low', status: 'resolved', timestamp: '2024-03-09T08:45:00Z' }
  ],
  vpnStatus: {
    total: 500,
    active: 485,
    degraded: 10,
    failed: 5
  },
  mplsStatus: {
    total: 200,
    active: 195,
    degraded: 3,
    failed: 2
  },
  auditLogs: [
    { id: 1, action: 'Configuration Change', user: 'admin', timestamp: '2024-03-09T10:00:00Z', details: 'Updated firewall rules', formattedTime: '10:00 AM' },
    { id: 2, action: 'User Access', user: 'tech_support', timestamp: '2024-03-09T09:30:00Z', details: 'Viewed customer data', formattedTime: '9:30 AM' },
    { id: 3, action: 'System Update', user: 'system', timestamp: '2024-03-09T09:00:00Z', details: 'Applied security patches', formattedTime: '9:00 AM' }
  ],
  complianceStatus: {
    gdpr: 'compliant',
    iso27001: 'compliant',
    pci: 'compliant',
    hipaa: 'in_progress'
  },
  historicalData: [
    { date: '2024-03-03', alerts: 5, incidents: 2 },
    { date: '2024-03-04', alerts: 3, incidents: 1 },
    { date: '2024-03-05', alerts: 4, incidents: 2 },
    { date: '2024-03-06', alerts: 2, incidents: 0 },
    { date: '2024-03-07', alerts: 6, incidents: 3 },
    { date: '2024-03-08', alerts: 4, incidents: 1 },
    { date: '2024-03-09', alerts: 3, incidents: 2 }
  ]
};

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

export default function SecurityMetrics() {
  const [formattedLogs, setFormattedLogs] = useState(mockData.auditLogs);

  useEffect(() => {
    setFormattedLogs(mockData.auditLogs.map(log => ({
      ...log,
      formattedTime: formatTimestamp(log.timestamp)
    })));
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Security & Compliance</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-red-600">Active Security Alerts</h3>
          <p className="text-2xl font-bold text-red-700">
            {mockData.securityAlerts.filter(a => a.status === 'active').length}
          </p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-600">VPN Tunnels</h3>
          <p className="text-2xl font-bold text-green-700">
            {mockData.vpnStatus.active}/{mockData.vpnStatus.total}
          </p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-600">MPLS Connections</h3>
          <p className="text-2xl font-bold text-blue-700">
            {mockData.mplsStatus.active}/{mockData.mplsStatus.total}
          </p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-purple-600">Compliance Status</h3>
          <p className="text-2xl font-bold text-purple-700">
            {Object.values(mockData.complianceStatus).filter(s => s === 'compliant').length}/4
          </p>
        </div>
      </div>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData.historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="alerts" stackId="1" stroke="#EF4444" fill="#FEE2E2" name="Security Alerts" />
            <Area type="monotone" dataKey="incidents" stackId="1" stroke="#3B82F6" fill="#DBEAFE" name="Incidents" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Recent Security Alerts</h3>
          <div className="space-y-3">
            {mockData.securityAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                    alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                    alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {alert.severity.toUpperCase()}
                  </span>
                  <p className="mt-1 text-gray-700">{alert.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="text-lg font-semibold text-gray-900 capitalize">{alert.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Recent Audit Logs</h3>
          <div className="space-y-3">
            {formattedLogs.map((log) => (
              <div key={log.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{log.action}</p>
                    <p className="text-sm text-gray-500">{log.details}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {log.formattedTime}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">By: {log.user}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
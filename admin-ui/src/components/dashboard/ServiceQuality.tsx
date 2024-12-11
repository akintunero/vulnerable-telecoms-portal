import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = {
  csat: 4.5,
  nps: 75,
  ticketResolution: {
    average: 2.5,
    target: 4,
    unit: 'hours'
  },
  installationTime: {
    average: 3,
    target: 5,
    unit: 'days'
  },
  churnRate: {
    current: 2.1,
    target: 3,
    unit: '%'
  },
  activeIncidents: [
    { id: 1, severity: 'high', description: 'Network congestion in North Region', affected: 150 },
    { id: 2, severity: 'medium', description: 'VPN tunnel degradation', affected: 45 },
    { id: 3, severity: 'low', description: 'DNS resolution delay', affected: 12 }
  ],
  monthlyTrends: [
    { month: 'Jan', csat: 4.2, nps: 65, tickets: 120 },
    { month: 'Feb', csat: 4.3, nps: 68, tickets: 115 },
    { month: 'Mar', csat: 4.4, nps: 70, tickets: 110 },
    { month: 'Apr', csat: 4.5, nps: 72, tickets: 105 },
    { month: 'May', csat: 4.5, nps: 75, tickets: 100 }
  ]
};

export default function ServiceQuality() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Service Quality & Customer Experience</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-indigo-600">CSAT Score</h3>
          <p className="text-2xl font-bold text-indigo-700">{mockData.csat}/5</p>
        </div>
        
        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-pink-600">NPS Score</h3>
          <p className="text-2xl font-bold text-pink-700">{mockData.nps}</p>
        </div>
        
        <div className="bg-teal-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-teal-600">Avg. Ticket Resolution</h3>
          <p className="text-2xl font-bold text-teal-700">
            {mockData.ticketResolution.average} {mockData.ticketResolution.unit}
          </p>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-amber-600">Churn Rate</h3>
          <p className="text-2xl font-bold text-amber-700">
            {mockData.churnRate.current}{mockData.churnRate.unit}
          </p>
        </div>
      </div>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockData.monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Bar yAxisId="left" dataKey="csat" fill="#6366F1" name="CSAT" />
            <Bar yAxisId="right" dataKey="tickets" fill="#14B8A6" name="Tickets" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Active Incidents</h3>
        <div className="space-y-3">
          {mockData.activeIncidents.map((incident) => (
            <div key={incident.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                  incident.severity === 'high' ? 'bg-red-100 text-red-800' :
                  incident.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {incident.severity.toUpperCase()}
                </span>
                <p className="mt-1 text-gray-700">{incident.description}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Affected Users</p>
                <p className="text-lg font-semibold text-gray-900">{incident.affected}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
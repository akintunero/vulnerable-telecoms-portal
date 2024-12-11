import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = {
  inventory: {
    total: 2500,
    inUse: 2100,
    spare: 350,
    pending: 50
  },
  maintenance: [
    { id: 1, type: 'Scheduled', description: 'Core router firmware update', date: '2024-03-15', duration: '2h', impact: 'Low' },
    { id: 2, type: 'Emergency', description: 'UPS battery replacement', date: '2024-03-10', duration: '1h', impact: 'Medium' },
    { id: 3, type: 'Planned', description: 'Network capacity upgrade', date: '2024-03-20', duration: '4h', impact: 'High' }
  ],
  tickets: {
    total: 45,
    byPriority: [
      { priority: 'Critical', count: 5 },
      { priority: 'High', count: 12 },
      { priority: 'Medium', count: 18 },
      { priority: 'Low', count: 10 }
    ],
    byTeam: [
      { team: 'Network', count: 20 },
      { team: 'Security', count: 8 },
      { team: 'Support', count: 12 },
      { team: 'Infrastructure', count: 5 }
    ]
  },
  sla: {
    uptime: 99.99,
    responseTime: 15,
    resolutionTime: 4,
    compliance: 98.5
  },
  monthlyTrends: [
    { month: 'Jan', tickets: 120, resolved: 115 },
    { month: 'Feb', tickets: 110, resolved: 108 },
    { month: 'Mar', tickets: 95, resolved: 92 },
    { month: 'Apr', tickets: 85, resolved: 82 },
    { month: 'May', tickets: 75, resolved: 73 }
  ]
};

export default function OperationalMetrics() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Operational Insights</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-600">SLA Compliance</h3>
          <p className="text-2xl font-bold text-blue-700">
            {mockData.sla.compliance}%
          </p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-600">Network Uptime</h3>
          <p className="text-2xl font-bold text-green-700">
            {mockData.sla.uptime}%
          </p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-purple-600">Open Tickets</h3>
          <p className="text-2xl font-bold text-purple-700">
            {mockData.tickets.total}
          </p>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-orange-600">Inventory Status</h3>
          <p className="text-2xl font-bold text-orange-700">
            {mockData.inventory.inUse}/{mockData.inventory.total}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Tickets by Priority</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.tickets.byPriority}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="priority" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Tickets by Team</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.tickets.byTeam}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="team" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#14B8A6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Scheduled Maintenance</h3>
          <div className="space-y-3">
            {mockData.maintenance.map((item) => (
              <div key={item.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                      item.type === 'Emergency' ? 'bg-red-100 text-red-800' :
                      item.type === 'Planned' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.type}
                    </span>
                    <p className="mt-1 text-gray-700">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Impact</p>
                    <p className="text-lg font-semibold text-gray-900">{item.impact}</p>
                  </div>
                </div>
                <div className="mt-2 flex justify-between text-sm text-gray-500">
                  <span>Date: {new Date(item.date).toLocaleDateString()}</span>
                  <span>Duration: {item.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Monthly Ticket Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tickets" fill="#6366F1" name="Total Tickets" />
                <Bar dataKey="resolved" fill="#14B8A6" name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
} 
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const mockData = {
  arpu: {
    mobile: 45,
    mpls: 120,
    vpn: 85,
    internet: 65
  },
  users: {
    total: 15000,
    enterprise: 250,
    smb: 1250,
    residential: 13500
  },
  revenue: {
    total: 1250000,
    breakdown: [
      { name: 'Mobile', value: 450000 },
      { name: 'MPLS', value: 300000 },
      { name: 'VPN', value: 250000 },
      { name: 'Internet', value: 250000 }
    ]
  },
  clv: {
    mobile: 540,
    mpls: 1440,
    vpn: 1020,
    internet: 780
  },
  customers: {
    new: 150,
    churned: 45,
    netGrowth: 105
  }
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function FinancialMetrics() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Financial & Business KPIs</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-600">Total Revenue</h3>
          <p className="text-2xl font-bold text-blue-700">
            ${(mockData.revenue.total / 1000000).toFixed(1)}M
          </p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-600">Total Users</h3>
          <p className="text-2xl font-bold text-green-700">
            {mockData.users.total.toLocaleString()}
          </p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-purple-600">Enterprise Accounts</h3>
          <p className="text-2xl font-bold text-purple-700">
            {mockData.users.enterprise}
          </p>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-orange-600">Net Growth</h3>
          <p className="text-2xl font-bold text-orange-700">
            +{mockData.customers.netGrowth}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Revenue Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockData.revenue.breakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {mockData.revenue.breakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${(Number(value) / 1000).toFixed(0)}K`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">ARPU by Service</h3>
          <div className="space-y-4">
            {Object.entries(mockData.arpu).map(([service, value]) => (
              <div key={service} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700 capitalize">{service}</span>
                <span className="text-lg font-semibold text-gray-900">${value}/month</span>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-medium mt-6 mb-3">Customer Lifetime Value</h3>
          <div className="space-y-4">
            {Object.entries(mockData.clv).map(([service, value]) => (
              <div key={service} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700 capitalize">{service}</span>
                <span className="text-lg font-semibold text-gray-900">${value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
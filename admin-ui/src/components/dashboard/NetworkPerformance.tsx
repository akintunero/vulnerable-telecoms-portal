import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = {
  uptime: 99.98,
  latency: 45,
  bandwidth: {
    used: 75,
    total: 100,
    unit: 'Gbps'
  },
  traffic: [
    { name: 'VPN', value: 35 },
    { name: 'MPLS', value: 25 },
    { name: 'Internet', value: 40 }
  ],
  deviceStatus: {
    total: 150,
    up: 145,
    down: 5
  },
  historicalData: [
    { time: '00:00', latency: 42, bandwidth: 65 },
    { time: '04:00', latency: 38, bandwidth: 70 },
    { time: '08:00', latency: 45, bandwidth: 75 },
    { time: '12:00', latency: 50, bandwidth: 80 },
    { time: '16:00', latency: 48, bandwidth: 78 },
    { time: '20:00', latency: 45, bandwidth: 75 }
  ]
};

export default function NetworkPerformance() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Network Performance</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-600">Network Uptime</h3>
          <p className="text-2xl font-bold text-blue-700">{mockData.uptime}%</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-600">Average Latency</h3>
          <p className="text-2xl font-bold text-green-700">{mockData.latency}ms</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-purple-600">Bandwidth Usage</h3>
          <p className="text-2xl font-bold text-purple-700">
            {mockData.bandwidth.used}/{mockData.bandwidth.total} {mockData.bandwidth.unit}
          </p>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-orange-600">Device Status</h3>
          <p className="text-2xl font-bold text-orange-700">
            {mockData.deviceStatus.up}/{mockData.deviceStatus.total} Up
          </p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData.historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Line yAxisId="left" type="monotone" dataKey="latency" stroke="#3B82F6" name="Latency (ms)" />
            <Line yAxisId="right" type="monotone" dataKey="bandwidth" stroke="#10B981" name="Bandwidth (%)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Traffic Distribution</h3>
        <div className="grid grid-cols-3 gap-4">
          {mockData.traffic.map((item) => (
            <div key={item.name} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600">{item.name}</h4>
              <p className="text-xl font-bold text-gray-700">{item.value}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
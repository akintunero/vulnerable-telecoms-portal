import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, Activity, Wifi, Server } from 'lucide-react';

const BandwidthUtilizationPage: React.FC = () => {
  const bandwidthData = [
    {
      id: 'BW001',
      interface: 'Core Router - WAN1',
      location: 'Data Center',
      currentUsage: 850,
      maxCapacity: 1000,
      utilization: 85,
      status: 'normal',
      trend: 'stable'
    },
    {
      id: 'BW002',
      interface: 'Distribution Switch - Port 1',
      location: 'Floor 1',
      currentUsage: 920,
      maxCapacity: 1000,
      utilization: 92,
      status: 'warning',
      trend: 'increasing'
    },
    {
      id: 'BW003',
      interface: 'Access Point - Lobby',
      location: 'Lobby',
      currentUsage: 450,
      maxCapacity: 500,
      utilization: 90,
      status: 'warning',
      trend: 'stable'
    },
    {
      id: 'BW004',
      interface: 'Firewall - External',
      location: 'DMZ',
      currentUsage: 750,
      maxCapacity: 1000,
      utilization: 75,
      status: 'normal',
      trend: 'decreasing'
    }
  ];

  const hourlyData = [
    { hour: '00:00', usage: 65 },
    { hour: '04:00', usage: 45 },
    { hour: '08:00', usage: 85 },
    { hour: '12:00', usage: 95 },
    { hour: '16:00', usage: 90 },
    { hour: '20:00', usage: 75 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-green-600 bg-green-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'critical':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'decreasing':
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      case 'stable':
        return <Activity className="h-4 w-4 text-blue-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Bandwidth Utilization</h1>
        <p className="text-gray-600">Monitor network bandwidth usage and traffic patterns</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Interfaces</p>
              <p className="text-2xl font-bold text-gray-900">{bandwidthData.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Average Utilization</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(bandwidthData.reduce((acc, item) => acc + item.utilization, 0) / bandwidthData.length)}%
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-yellow-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Peak Usage</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.max(...bandwidthData.map(item => item.utilization))}%
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Wifi className="h-8 w-8 text-purple-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Traffic</p>
              <p className="text-2xl font-bold text-gray-900">
                {bandwidthData.reduce((acc, item) => acc + item.currentUsage, 0)} Mbps
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bandwidth Utilization Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Interface Utilization</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {bandwidthData.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Server className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="font-medium text-gray-900">{item.interface}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(item.trend)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                    <div>
                      <span className="font-medium">Location:</span> {item.location}
                    </div>
                    <div>
                      <span className="font-medium">Current:</span> {item.currentUsage} Mbps
                    </div>
                    <div>
                      <span className="font-medium">Capacity:</span> {item.maxCapacity} Mbps
                    </div>
                    <div>
                      <span className="font-medium">Utilization:</span> {item.utilization}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        item.utilization > 90 ? 'bg-red-500' : 
                        item.utilization > 75 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${item.utilization}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 24-Hour Usage Chart */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">24-Hour Usage Trend</h2>
          </div>
          <div className="p-4">
            <div className="h-64 flex items-end justify-between space-x-2">
              {hourlyData.map((data, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-1">{data.hour}</div>
                  <div 
                    className="bg-blue-500 rounded-t w-8"
                    style={{ 
                      height: `${data.usage * 2}px`,
                      minHeight: '20px'
                    }}
                  ></div>
                  <div className="text-xs text-gray-600 mt-1">{data.usage}%</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p><strong>Peak Hour:</strong> 12:00 (95% utilization)</p>
              <p><strong>Lowest Hour:</strong> 04:00 (45% utilization)</p>
              <p><strong>Average:</strong> 75.8% utilization</p>
            </div>
          </div>
        </div>
      </div>

      {/* Traffic Analysis */}
      <div className="mt-6 bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Traffic Analysis</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2.97 Gbps</div>
              <div className="text-sm text-gray-600">Total Bandwidth Used</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">85.5%</div>
              <div className="text-sm text-gray-600">Efficiency Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">12:00</div>
              <div className="text-sm text-gray-600">Peak Usage Time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BandwidthUtilizationPage; 
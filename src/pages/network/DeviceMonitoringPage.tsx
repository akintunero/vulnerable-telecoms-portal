import React from 'react';
import { Monitor, Server, Router, Wifi, CheckCircle, AlertTriangle, Clock, Activity } from 'lucide-react';

const DeviceMonitoringPage: React.FC = () => {
  const devices = [
    {
      id: 'DEV001',
      name: 'Core Router - Main',
      type: 'Router',
      location: 'Data Center',
      status: 'online',
      ip: '192.168.1.1',
      uptime: '99.9%',
      cpu: 45,
      memory: 62,
      temperature: 42,
      lastSeen: '2025-06-01 14:30:00'
    },
    {
      id: 'DEV002',
      name: 'Distribution Switch 1',
      type: 'Switch',
      location: 'Floor 1',
      status: 'online',
      ip: '192.168.1.10',
      uptime: '99.8%',
      cpu: 28,
      memory: 45,
      temperature: 38,
      lastSeen: '2025-06-01 14:30:00'
    },
    {
      id: 'DEV003',
      name: 'Access Point - Lobby',
      type: 'Access Point',
      location: 'Lobby',
      status: 'warning',
      ip: '192.168.1.20',
      uptime: '95.2%',
      cpu: 78,
      memory: 85,
      temperature: 52,
      lastSeen: '2025-06-01 14:25:00'
    },
    {
      id: 'DEV004',
      name: 'Firewall - Perimeter',
      type: 'Firewall',
      location: 'DMZ',
      status: 'online',
      ip: '10.0.0.1',
      uptime: '99.9%',
      cpu: 35,
      memory: 58,
      temperature: 41,
      lastSeen: '2025-06-01 14:30:00'
    },
    {
      id: 'DEV005',
      name: 'Web Server',
      type: 'Server',
      location: 'Server Room',
      status: 'maintenance',
      ip: '192.168.1.100',
      uptime: '85.1%',
      cpu: 92,
      memory: 95,
      temperature: 65,
      lastSeen: '2025-06-01 14:20:00'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'maintenance':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'offline':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-green-600 bg-green-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'maintenance':
        return 'text-blue-600 bg-blue-50';
      case 'offline':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'Router':
        return <Router className="h-6 w-6 text-blue-500" />;
      case 'Switch':
        return <Monitor className="h-6 w-6 text-green-500" />;
      case 'Access Point':
        return <Wifi className="h-6 w-6 text-purple-500" />;
      case 'Firewall':
        return <Server className="h-6 w-6 text-red-500" />;
      case 'Server':
        return <Server className="h-6 w-6 text-gray-500" />;
      default:
        return <Monitor className="h-6 w-6 text-gray-500" />;
    }
  };

  const getMetricColor = (value: number, threshold: number) => {
    if (value >= threshold) return 'text-red-600';
    if (value >= threshold * 0.8) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Device Monitoring</h1>
        <p className="text-gray-600">Real-time monitoring of network devices and performance metrics</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Monitor className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Devices</p>
              <p className="text-2xl font-bold text-gray-900">{devices.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Online</p>
              <p className="text-2xl font-bold text-gray-900">
                {devices.filter(d => d.status === 'online').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Warnings</p>
              <p className="text-2xl font-bold text-gray-900">
                {devices.filter(d => d.status === 'warning').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Maintenance</p>
              <p className="text-2xl font-bold text-gray-900">
                {devices.filter(d => d.status === 'maintenance').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Device Monitoring Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Device Status</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Device
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CPU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Memory
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Temperature
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uptime
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Seen
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {devices.map((device) => (
                <tr key={device.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getDeviceIcon(device.type)}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{device.name}</div>
                        <div className="text-sm text-gray-500">{device.ip}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(device.status)}
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
                        {device.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            device.cpu > 90 ? 'bg-red-500' : 
                            device.cpu > 75 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${device.cpu}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm ${getMetricColor(device.cpu, 90)}`}>
                        {device.cpu}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            device.memory > 90 ? 'bg-red-500' : 
                            device.memory > 75 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${device.memory}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm ${getMetricColor(device.memory, 90)}`}>
                        {device.memory}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm ${getMetricColor(device.temperature, 60)}`}>
                      {device.temperature}°C
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {device.uptime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {device.lastSeen}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">CPU Utilization Trend</h2>
          </div>
          <div className="p-4">
            <div className="h-64 flex items-end justify-between space-x-2">
              {devices.map((device, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-1">{device.name.split(' ')[0]}</div>
                  <div 
                    className={`w-8 rounded-t ${
                      device.cpu > 90 ? 'bg-red-500' : 
                      device.cpu > 75 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ height: `${device.cpu * 2}px` }}
                  ></div>
                  <div className="text-xs text-gray-600 mt-1">{device.cpu}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Memory Usage Trend</h2>
          </div>
          <div className="p-4">
            <div className="h-64 flex items-end justify-between space-x-2">
              {devices.map((device, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-1">{device.name.split(' ')[0]}</div>
                  <div 
                    className={`w-8 rounded-t ${
                      device.memory > 90 ? 'bg-red-500' : 
                      device.memory > 75 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ height: `${device.memory * 2}px` }}
                  ></div>
                  <div className="text-xs text-gray-600 mt-1">{device.memory}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alerts and Notifications */}
      <div className="mt-6 bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
              <div>
                <div className="text-sm font-medium text-red-800">High CPU Usage Alert</div>
                <div className="text-sm text-red-600">Web Server CPU usage at 92%</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3" />
              <div>
                <div className="text-sm font-medium text-yellow-800">Temperature Warning</div>
                <div className="text-sm text-yellow-600">Access Point temperature at 52°C</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Clock className="h-5 w-5 text-blue-500 mr-3" />
              <div>
                <div className="text-sm font-medium text-blue-800">Maintenance Mode</div>
                <div className="text-sm text-blue-600">Web Server under scheduled maintenance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceMonitoringPage; 
import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Download,
  Filter,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  XCircle,
  Clock,
  CheckCircle,
  Zap,
  Eye,
  Gauge
} from 'lucide-react';

interface OpticalMeasurement {
  id: string;
  location: string;
  wavelength: string;
  power: number;
  status: 'normal' | 'warning' | 'critical';
  timestamp: string;
  trend: number;
}

const mockMeasurements: OpticalMeasurement[] = [
  {
    id: '1',
    location: 'Node A',
    wavelength: '1550nm',
    power: -15.2,
    status: 'normal',
    timestamp: '2024-02-28 14:30:00',
    trend: -0.2
  },
  {
    id: '2',
    location: 'Node B',
    wavelength: '1550nm',
    power: -18.5,
    status: 'warning',
    timestamp: '2024-02-28 14:25:00',
    trend: -1.5
  },
  {
    id: '3',
    location: 'Node C',
    wavelength: '1550nm',
    power: -25.3,
    status: 'critical',
    timestamp: '2024-02-28 14:20:00',
    trend: -2.3
  }
];

interface PowerThreshold {
  location: string;
  min: number;
  max: number;
  current: number;
  status: 'normal' | 'warning' | 'critical';
}

const mockThresholds: PowerThreshold[] = [
  {
    location: 'Node A',
    min: -20,
    max: -10,
    current: -15.2,
    status: 'normal'
  },
  {
    location: 'Node B',
    min: -20,
    max: -10,
    current: -18.5,
    status: 'warning'
  },
  {
    location: 'Node C',
    min: -20,
    max: -10,
    current: -25.3,
    status: 'critical'
  }
];

const OpticalPowerPage: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<string>('24h');

  // Mock data for optical power readings
  const opticalDevices = [
    {
      id: 'OPT001',
      name: 'Core Router - Main Hub',
      location: 'Data Center A',
      status: 'operational',
      currentPower: -12.5,
      threshold: -15.0,
      wavelength: '1550nm',
      lastReading: '2025-06-01 15:30:45',
      trend: 'stable',
      history: [
        { time: '14:00', power: -12.3 },
        { time: '14:30', power: -12.4 },
        { time: '15:00', power: -12.5 },
        { time: '15:30', power: -12.5 }
      ]
    },
    {
      id: 'OPT002',
      name: 'Distribution Switch - Floor 1',
      location: 'Floor 1 Server Room',
      status: 'warning',
      currentPower: -18.2,
      threshold: -15.0,
      wavelength: '1310nm',
      lastReading: '2025-06-01 15:30:42',
      trend: 'decreasing',
      history: [
        { time: '14:00', power: -16.8 },
        { time: '14:30', power: -17.2 },
        { time: '15:00', power: -17.8 },
        { time: '15:30', power: -18.2 }
      ]
    },
    {
      id: 'OPT003',
      name: 'Access Point - Building B',
      location: 'Building B - Level 2',
      status: 'operational',
      currentPower: -14.1,
      threshold: -15.0,
      wavelength: '1550nm',
      lastReading: '2025-06-01 15:30:38',
      trend: 'stable',
      history: [
        { time: '14:00', power: -14.0 },
        { time: '14:30', power: -14.1 },
        { time: '15:00', power: -14.1 },
        { time: '15:30', power: -14.1 }
      ]
    },
    {
      id: 'OPT004',
      name: 'Edge Router - Remote Site',
      location: 'Remote Office',
      status: 'critical',
      currentPower: -22.5,
      threshold: -15.0,
      wavelength: '1310nm',
      lastReading: '2025-06-01 15:30:35',
      trend: 'decreasing',
      history: [
        { time: '14:00', power: -19.5 },
        { time: '14:30', power: -20.8 },
        { time: '15:00', power: -21.6 },
        { time: '15:30', power: -22.5 }
      ]
    },
    {
      id: 'OPT005',
      name: 'Backbone Switch - Core',
      location: 'Main Data Center',
      status: 'operational',
      currentPower: -11.8,
      threshold: -15.0,
      wavelength: '1550nm',
      lastReading: '2025-06-01 15:30:40',
      trend: 'stable',
      history: [
        { time: '14:00', power: -11.7 },
        { time: '14:30', power: -11.8 },
        { time: '15:00', power: -11.8 },
        { time: '15:30', power: -11.8 }
      ]
    }
  ];

  // Mock data for power alerts
  const powerAlerts = [
    {
      id: 1,
      device: 'OPT002',
      message: 'Optical power below threshold (-18.2 dBm)',
      severity: 'warning',
      time: '2 minutes ago',
      status: 'active'
    },
    {
      id: 2,
      device: 'OPT004',
      message: 'Critical optical power level detected (-22.5 dBm)',
      severity: 'critical',
      time: '15 minutes ago',
      status: 'active'
    },
    {
      id: 3,
      device: 'OPT001',
      message: 'Optical power fluctuation detected',
      severity: 'info',
      time: '1 hour ago',
      status: 'resolved'
    }
  ];

  // Mock data for power statistics
  const powerStats = [
    {
      title: 'Average Power',
      value: '-14.2 dBm',
      change: '-0.3 dBm',
      changeType: 'negative' as const,
      icon: <Gauge className="h-6 w-6" />,
      color: 'blue'
    },
    {
      title: 'Devices Operational',
      value: '3/5',
      change: '-2',
      changeType: 'negative' as const,
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'green'
    },
    {
      title: 'Power Range',
      value: '-22.5 to -11.8',
      change: 'Widening',
      changeType: 'negative' as const,
      icon: <Activity className="h-6 w-6" />,
      color: 'yellow'
    },
    {
      title: 'Alerts Active',
      value: '2',
      change: '+1',
      changeType: 'negative' as const,
      icon: <AlertTriangle className="h-6 w-6" />,
      color: 'red'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'decreasing': return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'stable': return <Activity className="h-4 w-4 text-blue-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPowerColor = (power: number, threshold: number) => {
    if (power >= threshold) return 'text-green-600';
    if (power >= threshold - 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Optical Power Monitoring</h1>
          <p className="text-gray-600 mt-1">Real-time monitoring of optical power levels across network infrastructure</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
            Refresh Data
          </button>
        </div>
      </div>

      {/* Power Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {powerStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                stat.color === 'green' ? 'bg-green-100 text-green-600' :
                stat.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                'bg-red-100 text-red-600'}`}>
                {stat.icon}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-xs ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Power Monitoring Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Optical Power Trends</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md">Live</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Historical</button>
              </div>
            </div>
            <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Optical Power Chart</p>
                <p className="text-sm text-gray-400">Real-time power level visualization</p>
              </div>
            </div>
          </div>
        </div>

        {/* Power Alerts */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Power Alerts</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div className="space-y-3">
            {powerAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                <div className={`p-1 rounded-full ${
                  alert.severity === 'critical' ? 'text-red-600 bg-red-50' :
                  alert.severity === 'warning' ? 'text-yellow-600 bg-yellow-50' :
                  'text-blue-600 bg-blue-50'
                }`}>
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{alert.time}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      alert.status === 'active' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {alert.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Optical Devices Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Optical Power Readings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Power Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Reading</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {opticalDevices.map((device) => (
                <tr 
                  key={device.id} 
                  className={`hover:bg-gray-50 cursor-pointer ${
                    selectedDevice === device.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedDevice(selectedDevice === device.id ? null : device.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Zap className="h-5 w-5 text-blue-600 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{device.name}</div>
                        <div className="text-sm text-gray-500">{device.wavelength}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getPowerColor(device.currentPower, device.threshold)}`}>
                      {device.currentPower} dBm
                    </span>
                    <div className="text-xs text-gray-500">Threshold: {device.threshold} dBm</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(device.status)}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        device.status === 'operational' ? 'bg-green-100 text-green-800' :
                        device.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {device.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTrendIcon(device.trend)}
                      <span className="ml-1 text-sm text-gray-500 capitalize">{device.trend}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.lastReading}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OpticalPowerPage; 
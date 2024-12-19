import React from 'react';
import { Activity, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

const OpticalPowerPage: React.FC = () => {
  const opticalMeasurements = [
    {
      id: 'OPT001',
      location: 'Central Hub - Port 1',
      wavelength: '1550nm',
      power: -12.5,
      threshold: -15.0,
      status: 'normal',
      timestamp: '2025-06-01 14:30:00',
      trend: 'stable'
    },
    {
      id: 'OPT002',
      location: 'North Exchange - Port 3',
      wavelength: '1310nm',
      power: -18.2,
      threshold: -20.0,
      status: 'warning',
      timestamp: '2025-06-01 14:30:00',
      trend: 'declining'
    },
    {
      id: 'OPT003',
      location: 'South Distribution - Port 2',
      wavelength: '1550nm',
      power: -14.8,
      threshold: -15.0,
      status: 'normal',
      timestamp: '2025-06-01 14:30:00',
      trend: 'stable'
    },
    {
      id: 'OPT004',
      location: 'East Gateway - Port 1',
      wavelength: '1310nm',
      power: -22.1,
      threshold: -20.0,
      status: 'critical',
      timestamp: '2025-06-01 14:30:00',
      trend: 'declining'
    },
    {
      id: 'OPT005',
      location: 'West Terminal - Port 4',
      wavelength: '1550nm',
      power: -11.3,
      threshold: -15.0,
      status: 'normal',
      timestamp: '2025-06-01 14:30:00',
      trend: 'improving'
    }
  ];

  const historicalData = [
    { time: '00:00', power: -12.5 },
    { time: '04:00', power: -12.8 },
    { time: '08:00', power: -13.1 },
    { time: '12:00', power: -12.9 },
    { time: '16:00', power: -12.5 },
    { time: '20:00', power: -12.3 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-green-600 bg-green-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'critical':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-green-600 bg-green-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'declining':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'stable':
        return <Activity className="h-4 w-4 text-blue-500" />;
      default:
        return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  const getPowerColor = (power: number, threshold: number) => {
    if (power >= threshold) return 'text-green-600';
    if (power >= threshold - 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Optical Power Monitoring</h1>
        <p className="text-gray-600">Real-time optical power measurements and signal strength analysis</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Measurements</p>
              <p className="text-2xl font-bold text-gray-900">{opticalMeasurements.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Normal</p>
              <p className="text-2xl font-bold text-gray-900">
                {opticalMeasurements.filter(m => m.status === 'normal').length}
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
                {opticalMeasurements.filter(m => m.status === 'warning').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Critical</p>
              <p className="text-2xl font-bold text-gray-900">
                {opticalMeasurements.filter(m => m.status === 'critical').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Measurements */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Current Measurements</h2>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {opticalMeasurements.map((measurement) => (
                <div key={measurement.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {getStatusIcon(measurement.status)}
                      <span className="ml-2 font-medium text-gray-900">{measurement.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(measurement.trend)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(measurement.status)}`}>
                        {measurement.status}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Wavelength:</span> {measurement.wavelength}
                    </div>
                    <div>
                      <span className="font-medium">Power:</span> 
                      <span className={`ml-1 ${getPowerColor(measurement.power, measurement.threshold)}`}>
                        {measurement.power} dBm
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Threshold:</span> {measurement.threshold} dBm
                    </div>
                    <div>
                      <span className="font-medium">Trend:</span> {measurement.trend}
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Last updated: {measurement.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Historical Chart */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">24-Hour Power Trend</h2>
          </div>
          <div className="p-4">
            <div className="h-64 flex items-end justify-between space-x-2">
              {historicalData.map((data, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-1">{data.time}</div>
                  <div 
                    className="bg-blue-500 rounded-t w-8"
                    style={{ 
                      height: `${Math.abs(data.power) * 2}px`,
                      minHeight: '20px'
                    }}
                  ></div>
                  <div className="text-xs text-gray-600 mt-1">{data.power} dBm</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p><strong>Average Power:</strong> -12.7 dBm</p>
              <p><strong>Peak Power:</strong> -11.3 dBm</p>
              <p><strong>Min Power:</strong> -13.1 dBm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mt-6 bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Performance Metrics</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">98.5%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">-12.7 dBm</div>
              <div className="text-sm text-gray-600">Average Power</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">0.3 dB</div>
              <div className="text-sm text-gray-600">Power Variation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpticalPowerPage; 
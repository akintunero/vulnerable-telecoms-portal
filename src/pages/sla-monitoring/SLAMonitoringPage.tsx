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
  Users,
  Wifi,
  Server
} from 'lucide-react';

interface SLA {
  id: string;
  service: string;
  metric: string;
  target: string;
  current: string;
  status: 'met' | 'warning' | 'breached';
  trend: number;
}

const mockSLAs: SLA[] = [
  {
    id: '1',
    service: 'Internet Service',
    metric: 'Uptime',
    target: '99.9%',
    current: '99.95%',
    status: 'met',
    trend: 0.05
  },
  {
    id: '2',
    service: 'Voice Service',
    metric: 'Packet Loss',
    target: '< 0.1%',
    current: '0.15%',
    status: 'warning',
    trend: -0.05
  },
  {
    id: '3',
    service: 'Video Service',
    metric: 'Latency',
    target: '< 50ms',
    current: '65ms',
    status: 'breached',
    trend: -15
  }
];

interface ServiceHealth {
  service: string;
  metrics: {
    name: string;
    value: string;
    status: 'healthy' | 'degraded' | 'critical';
  }[];
}

const mockServiceHealth: ServiceHealth[] = [
  {
    service: 'Internet Service',
    metrics: [
      { name: 'Uptime', value: '99.95%', status: 'healthy' },
      { name: 'Latency', value: '25ms', status: 'healthy' },
      { name: 'Packet Loss', value: '0.05%', status: 'healthy' }
    ]
  },
  {
    service: 'Voice Service',
    metrics: [
      { name: 'Uptime', value: '99.8%', status: 'healthy' },
      { name: 'Latency', value: '45ms', status: 'degraded' },
      { name: 'Packet Loss', value: '0.15%', status: 'degraded' }
    ]
  },
  {
    service: 'Video Service',
    metrics: [
      { name: 'Uptime', value: '99.5%', status: 'degraded' },
      { name: 'Latency', value: '65ms', status: 'critical' },
      { name: 'Packet Loss', value: '0.3%', status: 'critical' }
    ]
  }
];

const SLAMonitoringPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('24h');
  const [selectedService, setSelectedService] = useState<string[]>([]);

  const getStatusColor = (status: SLA['status']) => {
    switch (status) {
      case 'met':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'breached':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthStatusColor = (status: ServiceHealth['metrics'][0]['status']) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">SLA Monitoring</h1>
          <p className="mt-2 text-sm text-gray-700">
            Monitor and analyze service level agreements across all services.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:flex sm:gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <RefreshCw className="-ml-0.5 h-5 w-5" />
            Refresh
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Download className="-ml-0.5 h-5 w-5" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              SLA Compliance
            </h3>
            <div className="mt-6 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                        >
                          Service
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Metric
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Target
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Current
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {mockSLAs.map((sla) => (
                        <tr key={sla.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                            <div className="font-medium text-gray-900">
                              {sla.service}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {sla.metric}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {sla.target}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {sla.current}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span
                              className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getStatusColor(
                                sla.status
                              )}`}
                            >
                              {sla.status === 'met' ? (
                                <CheckCircle2 className="mr-1 h-4 w-4" />
                              ) : sla.status === 'warning' ? (
                                <AlertTriangle className="mr-1 h-4 w-4" />
                              ) : (
                                <XCircle className="mr-1 h-4 w-4" />
                              )}
                              {sla.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Service Health
            </h3>
            <div className="mt-6 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                        >
                          Service
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Metrics
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {mockServiceHealth.map((service) => (
                        <tr key={service.service}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                            <div className="font-medium text-gray-900">
                              {service.service}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="space-y-1">
                              {service.metrics.map((metric) => (
                                <div key={metric.name} className="flex items-center">
                                  <span className="mr-2">{metric.name}:</span>
                                  <span>{metric.value}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <div className="space-y-1">
                              {service.metrics.map((metric) => (
                                <span
                                  key={metric.name}
                                  className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getHealthStatusColor(
                                    metric.status
                                  )}`}
                                >
                                  {metric.status === 'healthy' ? (
                                    <CheckCircle2 className="mr-1 h-4 w-4" />
                                  ) : metric.status === 'degraded' ? (
                                    <AlertTriangle className="mr-1 h-4 w-4" />
                                  ) : (
                                    <XCircle className="mr-1 h-4 w-4" />
                                  )}
                                  {metric.status}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            SLA Performance Trends
          </h3>
          <div className="mt-6">
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">SLA Performance Chart</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SLAMonitoringPage; 
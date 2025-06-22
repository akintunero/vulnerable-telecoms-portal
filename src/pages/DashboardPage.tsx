import React from 'react';
import {
  UsersIcon,
  WifiIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { Chart } from '../components/ui/Chart';
import { MetricCard } from '../components/ui/MetricCard';

const DashboardPage: React.FC = () => {
  const metrics = [
    {
      name: 'Total Customers',
      value: '12,847',
      change: '+12%',
      changeType: 'positive',
      icon: UsersIcon
    },
    {
      name: 'Active Services',
      value: '11,234',
      change: '+8%',
      changeType: 'positive',
      icon: WifiIcon
    },
    {
      name: 'Open Tickets',
      value: '156',
      change: '-5%',
      changeType: 'negative',
      icon: ExclamationTriangleIcon
    },
    {
      name: 'System Uptime',
      value: '99.9%',
      change: '+0.1%',
      changeType: 'positive',
      icon: CheckCircleIcon
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      title: 'High CPU Usage on Node NY-01',
      severity: 'warning',
      time: '2 minutes ago',
      description: 'CPU usage has exceeded 85% for the last 10 minutes'
    },
    {
      id: 2,
      title: 'Failed Login Attempts',
      severity: 'error',
      time: '15 minutes ago',
      description: 'Multiple failed login attempts detected from IP 192.168.1.100'
    },
    {
      id: 3,
      title: 'Backup Completed Successfully',
      severity: 'info',
      time: '1 hour ago',
      description: 'Daily system backup completed successfully'
    }
  ];

  const serviceStatus = [
    { name: 'Internet Services', status: 'operational', uptime: '99.9%' },
    { name: 'Voice Services', status: 'operational', uptime: '99.8%' },
    { name: 'Mobile Services', status: 'degraded', uptime: '95.2%' },
    { name: 'Cloud Services', status: 'operational', uptime: '99.7%' }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'New customer registered',
      user: 'John Doe',
      time: '5 minutes ago',
      details: 'Customer ID: CUST-2024-001'
    },
    {
      id: 2,
      action: 'Service ticket resolved',
      user: 'Jane Smith',
      time: '1 hour ago',
      details: 'Ticket #TKT-2024-156 resolved'
    },
    {
      id: 3,
      action: 'Network maintenance completed',
      user: 'Mike Johnson',
      time: '2 hours ago',
      details: 'Scheduled maintenance on NY-01 node'
    }
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)'
      },
      {
        label: 'Customers',
        data: [1000, 1200, 1100, 1400, 1300, 1600],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 bg-green-100';
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100';
      case 'outage':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error':
        return 'text-red-600 bg-red-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'info':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">Last updated: 2 minutes ago</span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.name} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue & Customer Growth</h2>
          <Chart data={chartData} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h2>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="border-l-4 border-gray-200 pl-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{alert.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Status</h2>
          <div className="space-y-4">
            {serviceStatus.map((service) => (
              <div key={service.name} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{service.name}</p>
                  <p className="text-xs text-gray-500">Uptime: {service.uptime}</p>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                  {service.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.details}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    by {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 
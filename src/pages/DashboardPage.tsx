import React from 'react';
import { 
  Users, 
  Activity, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Wifi,
  Shield,
  Server,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  MapPin,
  Phone,
  Globe,
  Database
} from 'lucide-react';
import { Chart } from '../components/ui/Chart';
import { MetricCard } from '../components/ui/MetricCard';

const DashboardPage: React.FC = () => {
  // Mock data for metrics
  const metrics = [
    {
      title: 'Total Customers',
      value: '12,847',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: <Users className="h-6 w-6" />,
      color: 'blue'
    },
    {
      title: 'Active Services',
      value: '8,234',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: <Activity className="h-6 w-6" />,
      color: 'green'
    },
    {
      title: 'Network Uptime',
      value: '99.8%',
      change: '+0.2%',
      changeType: 'positive' as const,
      icon: <Wifi className="h-6 w-6" />,
      color: 'purple'
    },
    {
      title: 'Revenue (Monthly)',
      value: '$2.4M',
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'yellow'
    }
  ];

  // Mock data for recent alerts
  const recentAlerts = [
    {
      id: 1,
      type: 'Network',
      message: 'High bandwidth utilization detected on Core Router 1',
      severity: 'medium',
      time: '2 minutes ago',
      status: 'active'
    },
    {
      id: 2,
      type: 'Security',
      message: 'Suspicious login attempt detected from unknown IP',
      severity: 'high',
      time: '15 minutes ago',
      status: 'resolved'
    },
    {
      id: 3,
      type: 'Service',
      message: 'Customer service ticket #1234 requires attention',
      severity: 'low',
      time: '1 hour ago',
      status: 'active'
    },
    {
      id: 4,
      type: 'System',
      message: 'Database backup completed successfully',
      severity: 'info',
      time: '2 hours ago',
      status: 'resolved'
    }
  ];

  // Mock data for service status
  const serviceStatus = [
    { name: 'Internet Services', status: 'operational', uptime: '99.9%' },
    { name: 'Voice Services', status: 'operational', uptime: '99.8%' },
    { name: 'Data Center', status: 'operational', uptime: '99.9%' },
    { name: 'Cloud Services', status: 'degraded', uptime: '98.5%' },
    { name: 'VPN Services', status: 'operational', uptime: '99.7%' }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      action: 'New customer registered',
      details: 'John Smith - Premium Plan',
      time: '5 minutes ago',
      type: 'customer'
    },
    {
      id: 2,
      action: 'Service upgrade completed',
      details: 'Sarah Johnson - Upgraded to Business Plan',
      time: '12 minutes ago',
      type: 'service'
    },
    {
      id: 3,
      action: 'Network maintenance scheduled',
      details: 'Core Router maintenance - June 15, 2025',
      time: '1 hour ago',
      type: 'maintenance'
    },
    {
      id: 4,
      action: 'Security alert resolved',
      details: 'Firewall rule updated successfully',
      time: '2 hours ago',
      type: 'security'
    }
  ];

  // Mock chart data
  const chartData = [
    { name: 'Jan', revenue: 1200000, customers: 8500 },
    { name: 'Feb', revenue: 1350000, customers: 9200 },
    { name: 'Mar', revenue: 1420000, customers: 9800 },
    { name: 'Apr', revenue: 1580000, customers: 10500 },
    { name: 'May', revenue: 1650000, customers: 11200 },
    { name: 'Jun', revenue: 2400000, customers: 12847 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'degraded': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'down': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your network today.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
            icon={metric.icon}
            color={metric.color}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Revenue & Growth</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md">6M</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">1Y</button>
              </div>
            </div>
            <div className="h-64">
              <Chart type="area" data={chartData} dataKey="revenue" height={256} />
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                <div className={`p-1 rounded-full ${getSeverityColor(alert.severity)}`}>
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

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Status</h2>
          <div className="space-y-3">
            {serviceStatus.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(service.status)}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{service.name}</p>
                    <p className="text-xs text-gray-500">Uptime: {service.uptime}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  service.status === 'operational' ? 'bg-green-100 text-green-700' :
                  service.status === 'degraded' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {service.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100">
                <div className="p-1 rounded-full bg-blue-100">
                  <Activity className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-600">{activity.details}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
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
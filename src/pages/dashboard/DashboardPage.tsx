import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  UsersIcon,
  TicketIcon,
  SignalIcon,
  CurrencyDollarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const networkPerformanceData = [
  { time: '00:00', bandwidth: 85, latency: 12, uptime: 99.9 },
  { time: '04:00', bandwidth: 78, latency: 15, uptime: 99.8 },
  { time: '08:00', bandwidth: 92, latency: 8, uptime: 99.9 },
  { time: '12:00', bandwidth: 88, latency: 10, uptime: 99.9 },
  { time: '16:00', bandwidth: 95, latency: 6, uptime: 99.9 },
  { time: '20:00', bandwidth: 82, latency: 14, uptime: 99.8 }
];

const customerGrowthData = [
  { month: 'Jan', new: 120, churn: 15, total: 1200 },
  { month: 'Feb', new: 135, churn: 12, total: 1323 },
  { month: 'Mar', new: 150, churn: 18, total: 1455 },
  { month: 'Apr', new: 165, churn: 14, total: 1606 },
  { month: 'May', new: 180, churn: 16, total: 1770 },
  { month: 'Jun', new: 195, churn: 13, total: 1952 }
];

const ticketStatusData = [
  { status: 'Open', count: 45, color: '#EF4444' },
  { status: 'In Progress', count: 23, color: '#F59E0B' },
  { status: 'Resolved', count: 156, color: '#10B981' },
  { status: 'Closed', count: 89, color: '#6B7280' }
];

const revenueData = [
  { month: 'Jan', revenue: 45000, growth: 5.2 },
  { month: 'Feb', revenue: 48000, growth: 6.7 },
  { month: 'Mar', revenue: 52000, growth: 8.3 },
  { month: 'Apr', revenue: 49000, growth: -5.8 },
  { month: 'May', revenue: 55000, growth: 12.2 },
  { month: 'Jun', revenue: 58000, growth: 5.5 }
];

const recentAlerts = [
  { id: 1, type: 'Network', severity: 'High', message: 'Bandwidth utilization exceeded 90%', time: '2 min ago' },
  { id: 2, type: 'Security', severity: 'Medium', message: 'Suspicious login attempt detected', time: '15 min ago' },
  { id: 3, type: 'System', severity: 'Low', message: 'Backup completed successfully', time: '1 hour ago' },
  { id: 4, type: 'Network', severity: 'High', message: 'Fiber link down in downtown area', time: '2 hours ago' }
];

const stats = [
  {
    name: 'Total Customers',
    value: '1,234',
    change: '+12%',
    changeType: 'increase',
    icon: UsersIcon,
    color: 'bg-blue-500'
  },
  {
    name: 'Active Tickets',
    value: '56',
    change: '-8%',
    changeType: 'decrease',
    icon: TicketIcon,
    color: 'bg-green-500'
  },
  {
    name: 'Network Uptime',
    value: '99.9%',
    change: '+0.1%',
    changeType: 'increase',
    icon: SignalIcon,
    color: 'bg-purple-500'
  },
  {
    name: 'Monthly Revenue',
    value: '$45.2K',
    change: '+15%',
    changeType: 'increase',
    icon: CurrencyDollarIcon,
    color: 'bg-yellow-500'
  }
];

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your network today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className={`absolute rounded-md p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.changeType === 'increase' ? (
                  <ArrowUpIcon className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 flex-shrink-0" />
                )}
                <span className="sr-only">
                  {stat.changeType === 'increase' ? 'Increased' : 'Decreased'} by
                </span>
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Network Performance Chart */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Network Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={networkPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="bandwidth" name="Bandwidth (%)" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
              <Area type="monotone" dataKey="latency" name="Latency (ms)" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Growth Chart */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Customer Growth
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={customerGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="new" name="New Customers" fill="#10B981" />
              <Bar dataKey="churn" name="Churned" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Ticket Status Chart */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Ticket Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ticketStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ status, percent }) => `${status} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {ticketStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Monthly Revenue
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#8B5CF6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="rounded-lg bg-white shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Recent Alerts
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentAlerts.map((alert) => (
            <div key={alert.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`flex-shrink-0 ${
                    alert.severity === 'High' ? 'text-red-500' :
                    alert.severity === 'Medium' ? 'text-yellow-500' : 'text-green-500'
                  }`}>
                    {alert.severity === 'High' ? (
                      <ExclamationTriangleIcon className="h-5 w-5" />
                    ) : (
                      <CheckCircleIcon className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <p className="text-sm text-gray-500">
                      {alert.type} • {alert.severity} • {alert.time}
                    </p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  alert.severity === 'High' ? 'bg-red-100 text-red-800' :
                  alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                  {alert.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

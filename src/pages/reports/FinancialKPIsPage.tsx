import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Activity, BarChart3, PieChart, Target, Users } from 'lucide-react';

const FinancialKPIsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('month');
  const [selectedMetric, setSelectedMetric] = useState<string>('revenue');

  // Mock data for financial KPIs
  const financialKPIs = [
    {
      id: 'KPI001',
      name: 'Monthly Recurring Revenue (MRR)',
      value: '$2,450,000',
      change: '+12.5%',
      changeType: 'positive' as const,
      target: '$2,500,000',
      status: 'on_track',
      period: 'June 2025'
    },
    {
      id: 'KPI002',
      name: 'Annual Recurring Revenue (ARR)',
      value: '$29,400,000',
      change: '+8.3%',
      changeType: 'positive' as const,
      target: '$30,000,000',
      status: 'on_track',
      period: '2025'
    },
    {
      id: 'KPI003',
      name: 'Customer Acquisition Cost (CAC)',
      value: '$1,250',
      change: '-5.2%',
      changeType: 'positive' as const,
      target: '$1,200',
      status: 'exceeding',
      period: 'Q2 2025'
    },
    {
      id: 'KPI004',
      name: 'Customer Lifetime Value (CLV)',
      value: '$8,500',
      change: '+15.7%',
      changeType: 'positive' as const,
      target: '$8,000',
      status: 'exceeding',
      period: 'Q2 2025'
    },
    {
      id: 'KPI005',
      name: 'Churn Rate',
      value: '2.1%',
      change: '-0.3%',
      changeType: 'positive' as const,
      target: '2.0%',
      status: 'on_track',
      period: 'June 2025'
    },
    {
      id: 'KPI006',
      name: 'Gross Margin',
      value: '78.5%',
      change: '+2.1%',
      changeType: 'positive' as const,
      target: '80%',
      status: 'on_track',
      period: 'Q2 2025'
    }
  ];

  // Mock data for revenue breakdown
  const revenueBreakdown = [
    { service: 'Internet Connectivity', revenue: 850000, percentage: 34.7 },
    { service: 'VPN Services', revenue: 520000, percentage: 21.2 },
    { service: 'Cloud Solutions', revenue: 480000, percentage: 19.6 },
    { service: 'Managed Services', revenue: 380000, percentage: 15.5 },
    { service: 'Consulting', revenue: 220000, percentage: 9.0 }
  ];

  // Mock data for cost analysis
  const costAnalysis = [
    { category: 'Network Infrastructure', cost: 450000, percentage: 35.2 },
    { category: 'Personnel', cost: 380000, percentage: 29.7 },
    { category: 'Technology Licenses', cost: 180000, percentage: 14.1 },
    { category: 'Marketing', cost: 150000, percentage: 11.7 },
    { category: 'Operations', cost: 120000, percentage: 9.3 }
  ];

  // Mock data for monthly trends
  const monthlyTrends = [
    { month: 'Jan', revenue: 2100000, costs: 1600000, profit: 500000 },
    { month: 'Feb', revenue: 2200000, costs: 1650000, profit: 550000 },
    { month: 'Mar', revenue: 2300000, costs: 1700000, profit: 600000 },
    { month: 'Apr', revenue: 2350000, costs: 1720000, profit: 630000 },
    { month: 'May', revenue: 2400000, costs: 1750000, profit: 650000 },
    { month: 'Jun', revenue: 2450000, costs: 1780000, profit: 670000 }
  ];

  // Mock data for customer metrics
  const customerMetrics = [
    { metric: 'Total Customers', value: 1250, change: '+45', changeType: 'positive' as const },
    { metric: 'Enterprise Customers', value: 85, change: '+8', changeType: 'positive' as const },
    { metric: 'SMB Customers', value: 1165, change: '+37', changeType: 'positive' as const },
    { metric: 'New Customers (MTD)', value: 45, change: '+12', changeType: 'positive' as const },
    { metric: 'Churned Customers (MTD)', value: 8, change: '-3', changeType: 'positive' as const }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'exceeding': return 'text-green-600 bg-green-50 border-green-200';
      case 'on_track': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'at_risk': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'behind': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'exceeding': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'on_track': return <Target className="h-4 w-4 text-blue-500" />;
      case 'at_risk': return <Activity className="h-4 w-4 text-yellow-500" />;
      case 'behind': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Financial KPIs</h1>
          <p className="text-gray-600 mt-1">Monitor key financial performance indicators and metrics</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {financialKPIs.map((kpi) => (
          <div key={kpi.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">{kpi.name}</h3>
              {getStatusIcon(kpi.status)}
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${
                  kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.change}
                </span>
                <span className="text-sm text-gray-500">Target: {kpi.target}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    kpi.status === 'exceeding' ? 'bg-green-500' :
                    kpi.status === 'on_track' ? 'bg-blue-500' :
                    kpi.status === 'at_risk' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: '85%' }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">{kpi.period}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue and Cost Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Breakdown</h2>
            <DollarSign className="h-5 w-5 text-green-600" />
          </div>
          <div className="space-y-4">
            {revenueBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    index === 0 ? 'bg-blue-500' :
                    index === 1 ? 'bg-green-500' :
                    index === 2 ? 'bg-purple-500' :
                    index === 3 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.service}</p>
                    <p className="text-xs text-gray-500">{formatPercentage(item.percentage)}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(item.revenue)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Analysis */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Cost Analysis</h2>
            <BarChart3 className="h-5 w-5 text-red-600" />
          </div>
          <div className="space-y-4">
            {costAnalysis.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    index === 0 ? 'bg-red-500' :
                    index === 1 ? 'bg-blue-500' :
                    index === 2 ? 'bg-green-500' :
                    index === 3 ? 'bg-yellow-500' : 'bg-purple-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.category}</p>
                    <p className="text-xs text-gray-500">{formatPercentage(item.percentage)}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(item.cost)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Financial Trends</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Costs</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {monthlyTrends.map((trend, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{trend.month}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(trend.revenue)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(trend.costs)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{formatCurrency(trend.profit)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatPercentage((trend.profit / trend.revenue) * 100)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Metrics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {customerMetrics.map((metric, index) => (
            <div key={index} className="text-center p-4 rounded-lg border border-gray-100">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-500">{metric.metric}</p>
              <p className="text-xl font-bold text-gray-900">{metric.value}</p>
              <p className={`text-xs font-medium ${
                metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-100">Total Revenue</p>
              <p className="text-2xl font-bold">{formatCurrency(2450000)}</p>
              <p className="text-sm text-green-100">+12.5% vs last month</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-100" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-100">Total Costs</p>
              <p className="text-2xl font-bold">{formatCurrency(1780000)}</p>
              <p className="text-sm text-red-100">+7.8% vs last month</p>
            </div>
            <BarChart3 className="h-8 w-8 text-red-100" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-100">Net Profit</p>
              <p className="text-2xl font-bold">{formatCurrency(670000)}</p>
              <p className="text-sm text-blue-100">+18.2% vs last month</p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-100" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialKPIsPage; 
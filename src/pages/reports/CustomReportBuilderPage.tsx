import React, { useState } from 'react';
import { FileText, Plus, Download, Calendar, Filter, BarChart3, PieChart, LineChart, Settings, Clock, Users, DollarSign, Activity } from 'lucide-react';

const CustomReportBuilderPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [selectedDataSource, setSelectedDataSource] = useState<string>('');
  const [selectedChartType, setSelectedChartType] = useState<string>('bar');
  const [reportName, setReportName] = useState<string>('');
  const [scheduleType, setScheduleType] = useState<string>('manual');

  // Mock data for report templates
  const reportTemplates = [
    {
      id: 'template1',
      name: 'Financial Performance Report',
      description: 'Comprehensive financial metrics and KPIs',
      category: 'Financial',
      icon: <DollarSign className="h-5 w-5" />,
      color: 'green'
    },
    {
      id: 'template2',
      name: 'Customer Usage Analytics',
      description: 'Detailed customer usage patterns and trends',
      category: 'Customer',
      icon: <Users className="h-5 w-5" />,
      color: 'blue'
    },
    {
      id: 'template3',
      name: 'Network Performance Report',
      description: 'Network metrics, uptime, and performance data',
      category: 'Network',
      icon: <Activity className="h-5 w-5" />,
      color: 'purple'
    },
    {
      id: 'template4',
      name: 'Service Quality Report',
      description: 'SLA compliance and service quality metrics',
      category: 'Quality',
      icon: <BarChart3 className="h-5 w-5" />,
      color: 'yellow'
    }
  ];

  // Mock data for data sources
  const dataSources = [
    {
      id: 'source1',
      name: 'Customer Database',
      description: 'Customer information and account data',
      type: 'Database',
      lastUpdated: '2025-06-01 15:30',
      status: 'active'
    },
    {
      id: 'source2',
      name: 'Network Monitoring',
      description: 'Real-time network performance data',
      type: 'API',
      lastUpdated: '2025-06-01 15:25',
      status: 'active'
    },
    {
      id: 'source3',
      name: 'Financial System',
      description: 'Revenue, costs, and financial metrics',
      type: 'Database',
      lastUpdated: '2025-06-01 15:20',
      status: 'active'
    },
    {
      id: 'source4',
      name: 'Usage Analytics',
      description: 'Bandwidth and service usage data',
      type: 'API',
      lastUpdated: '2025-06-01 15:15',
      status: 'active'
    }
  ];

  // Mock data for chart types
  const chartTypes = [
    { id: 'bar', name: 'Bar Chart', icon: <BarChart3 className="h-5 w-5" />, description: 'Compare values across categories' },
    { id: 'line', name: 'Line Chart', icon: <LineChart className="h-5 w-5" />, description: 'Show trends over time' },
    { id: 'pie', name: 'Pie Chart', icon: <PieChart className="h-5 w-5" />, description: 'Show proportions of a whole' },
    { id: 'table', name: 'Data Table', icon: <FileText className="h-5 w-5" />, description: 'Display detailed data in tabular format' }
  ];

  // Mock data for saved reports
  const savedReports = [
    {
      id: 'report1',
      name: 'Monthly Financial Summary',
      template: 'Financial Performance Report',
      lastRun: '2025-06-01 10:00',
      schedule: 'Monthly',
      status: 'active',
      recipients: 5
    },
    {
      id: 'report2',
      name: 'Weekly Network Status',
      template: 'Network Performance Report',
      lastRun: '2025-05-28 09:00',
      schedule: 'Weekly',
      status: 'active',
      recipients: 3
    },
    {
      id: 'report3',
      name: 'Customer Usage Report',
      template: 'Customer Usage Analytics',
      lastRun: '2025-05-25 14:00',
      schedule: 'Manual',
      status: 'inactive',
      recipients: 2
    }
  ];

  // Mock data for filters
  const availableFilters = [
    { id: 'date_range', name: 'Date Range', type: 'date', description: 'Filter by specific date range' },
    { id: 'customer_type', name: 'Customer Type', type: 'select', description: 'Filter by enterprise or SMB customers' },
    { id: 'service_type', name: 'Service Type', type: 'multi-select', description: 'Filter by specific services' },
    { id: 'location', name: 'Location', type: 'select', description: 'Filter by geographic location' },
    { id: 'status', name: 'Status', type: 'select', description: 'Filter by active/inactive status' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'inactive': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Activity className="h-4 w-4 text-green-500" />;
      case 'inactive': return <Clock className="h-4 w-4 text-gray-500" />;
      case 'error': return <Settings className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Custom Report Builder</h1>
          <p className="text-gray-600 mt-1">Create and schedule custom reports with your preferred data and visualizations</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            New Report
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </button>
        </div>
      </div>

      {/* Report Builder Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Report</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Settings */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Name</label>
              <input
                type="text"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                placeholder="Enter report name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Template</label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a template</option>
                {reportTemplates.map((template) => (
                  <option key={template.id} value={template.id}>{template.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data Source</label>
              <select
                value={selectedDataSource}
                onChange={(e) => setSelectedDataSource(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select data source</option>
                {dataSources.map((source) => (
                  <option key={source.id} value={source.id}>{source.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Chart Type</label>
              <select
                value={selectedChartType}
                onChange={(e) => setSelectedChartType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {chartTypes.map((chart) => (
                  <option key={chart.id} value={chart.id}>{chart.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Schedule Settings */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
              <select
                value={scheduleType}
                onChange={(e) => setScheduleType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="manual">Manual</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
              <input
                type="email"
                placeholder="Enter email addresses (comma separated)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  PDF
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Excel
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  CSV
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
            Preview
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Create Report
          </button>
        </div>
      </div>

      {/* Report Templates */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportTemplates.map((template) => (
            <div key={template.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer">
              <div className={`inline-flex p-2 rounded-lg mb-3 ${
                template.color === 'green' ? 'bg-green-100 text-green-600' :
                template.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                template.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                'bg-yellow-100 text-yellow-600'
              }`}>
                {template.icon}
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{template.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{template.description}</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {template.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Data Sources */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Data Sources</h2>
        <div className="space-y-3">
          {dataSources.map((source) => (
            <div key={source.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mr-3">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{source.name}</h3>
                  <p className="text-sm text-gray-500">{source.description}</p>
                  <div className="flex items-center mt-1 space-x-4 text-xs text-gray-500">
                    <span>Type: {source.type}</span>
                    <span>Updated: {source.lastUpdated}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                {getStatusIcon(source.status)}
                <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  source.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {source.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Types */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Chart Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {chartTypes.map((chart) => (
            <div key={chart.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer">
              <div className="inline-flex p-2 bg-blue-100 text-blue-600 rounded-lg mb-3">
                {chart.icon}
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{chart.name}</h3>
              <p className="text-sm text-gray-500">{chart.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Reports */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Saved Reports</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Run</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {savedReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{report.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.template}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{report.lastRun}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {report.schedule}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(report.status)}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        report.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button className="text-green-600 hover:text-green-900">Run</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomReportBuilderPage; 
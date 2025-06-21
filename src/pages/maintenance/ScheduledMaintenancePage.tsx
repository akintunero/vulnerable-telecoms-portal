import React, { useState } from 'react';
import { ClipboardList, Calendar, CheckCircle, XCircle, AlertTriangle, Activity, Server, Users, Clock, Wrench, Download, Filter } from 'lucide-react';

const ScheduledMaintenancePage: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Mock data for upcoming maintenance
  const upcomingMaintenance = [
    { id: 1, title: 'Database Upgrade', date: '2025-06-10', time: '02:00 AM', systems: ['DB1', 'DB2'], status: 'scheduled', owner: 'IT Ops' },
    { id: 2, title: 'Network Switch Replacement', date: '2025-06-15', time: '11:00 PM', systems: ['Switch-5'], status: 'scheduled', owner: 'Network Team' }
  ];

  // Mock data for completed maintenance
  const completedMaintenance = [
    { id: 1, title: 'Firewall Firmware Update', date: '2025-05-28', time: '01:00 AM', systems: ['FW-1', 'FW-2'], status: 'completed', owner: 'Security Team' },
    { id: 2, title: 'Server Patch', date: '2025-05-20', time: '03:00 AM', systems: ['Server-3'], status: 'completed', owner: 'IT Ops' }
  ];

  // Mock data for maintenance logs
  const maintenanceLogs = [
    { id: 1, event: 'Maintenance Scheduled', user: 'admin@telco.com', date: '2025-06-01', status: 'success' },
    { id: 2, event: 'Maintenance Completed', user: 'john.smith@telco.com', date: '2025-05-28', status: 'success' },
    { id: 3, event: 'Maintenance Delayed', user: 'sarah.johnson@telco.com', date: '2025-05-25', status: 'warning' },
    { id: 4, event: 'Maintenance Cancelled', user: 'david.wilson@telco.com', date: '2025-05-20', status: 'error' }
  ];

  // Mock data for affected systems
  const affectedSystems = [
    { id: 1, name: 'DB1', type: 'Database', status: 'scheduled' },
    { id: 2, name: 'Switch-5', type: 'Network', status: 'scheduled' },
    { id: 3, name: 'FW-1', type: 'Firewall', status: 'completed' },
    { id: 4, name: 'Server-3', type: 'Server', status: 'completed' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredUpcoming = upcomingMaintenance.filter(item => {
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Scheduled Maintenance</h1>
          <p className="text-gray-600 mt-1">View upcoming and completed maintenance events</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center">
            <Wrench className="h-4 w-4 mr-2" />
            Schedule Maintenance
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </button>
        </div>
      </div>

      {/* Upcoming Maintenance */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Maintenance</h2>
        <div className="flex mb-4 gap-2">
          <input
            type="text"
            placeholder="Search maintenance..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Systems</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUpcoming.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.systems.join(', ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Completed Maintenance and Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Completed Maintenance */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Completed Maintenance</h2>
          <div className="space-y-3">
            {completedMaintenance.map((item) => (
              <div key={item.id} className="flex items-start space-x-3 p-3 border border-gray-100 rounded-lg">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>Date: {item.date}</span>
                    <span className="mx-2">|</span>
                    <span>Time: {item.time}</span>
                    <span className="mx-2">|</span>
                    <span>Systems: {item.systems.join(', ')}</span>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Logs */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Logs</h2>
          <div className="space-y-3">
            {maintenanceLogs.map((log) => (
              <div key={log.id} className="flex items-start space-x-3 p-3 border border-gray-100 rounded-lg">
                <div className={`p-2 rounded-full ${getStatusColor(log.status)}`}>
                  <Activity className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{log.event}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>User: {log.user}</span>
                    <span className="mx-2">|</span>
                    <span>Date: {log.date}</span>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Affected Systems */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Affected Systems</h2>
        <div className="space-y-3">
          {affectedSystems.map((system) => (
            <div key={system.id} className="flex items-start space-x-3 p-3 border border-gray-100 rounded-lg">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <Server className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{system.name}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>Type: {system.type}</span>
                  <span className="mx-2">|</span>
                  <span>Status: {system.status}</span>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(system.status)}`}>
                  {system.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduledMaintenancePage; 
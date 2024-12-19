import React from 'react';
import { AlertTriangle, Clock, CheckCircle, XCircle, Activity, Calendar } from 'lucide-react';

const IncidentLogsPage: React.FC = () => {
  const incidents = [
    {
      id: 'INC001',
      title: 'Fiber Cut - Downtown Area',
      description: 'Fiber optic cable damage reported in downtown business district',
      severity: 'critical',
      status: 'resolved',
      location: 'Downtown Business District',
      reportedAt: '2025-05-30 08:15:00',
      resolvedAt: '2025-05-30 14:30:00',
      duration: '6h 15m',
      affectedCustomers: 45,
      technician: 'John Smith'
    },
    {
      id: 'INC002',
      title: 'Power Outage - North Exchange',
      description: 'Electrical power failure at North Exchange facility',
      severity: 'high',
      status: 'in_progress',
      location: 'North Industrial Zone',
      reportedAt: '2025-06-01 06:30:00',
      resolvedAt: null,
      duration: '8h 0m',
      affectedCustomers: 32,
      technician: 'Sarah Johnson'
    },
    {
      id: 'INC003',
      title: 'Equipment Failure - Core Router',
      description: 'Hardware failure detected in main core router',
      severity: 'critical',
      status: 'resolved',
      location: 'Data Center',
      reportedAt: '2025-05-29 22:45:00',
      resolvedAt: '2025-05-30 02:15:00',
      duration: '3h 30m',
      affectedCustomers: 120,
      technician: 'Mike Wilson'
    },
    {
      id: 'INC004',
      title: 'High Latency - East Gateway',
      description: 'Unusually high latency detected on East Gateway connection',
      severity: 'medium',
      status: 'investigating',
      location: 'East Suburbs',
      reportedAt: '2025-06-01 10:20:00',
      resolvedAt: null,
      duration: '4h 10m',
      affectedCustomers: 18,
      technician: 'Emily Davis'
    },
    {
      id: 'INC005',
      title: 'Configuration Error - Firewall',
      description: 'Incorrect firewall configuration causing connectivity issues',
      severity: 'high',
      status: 'resolved',
      location: 'DMZ',
      reportedAt: '2025-05-31 16:00:00',
      resolvedAt: '2025-05-31 17:45:00',
      duration: '1h 45m',
      affectedCustomers: 25,
      technician: 'David Brown'
    }
  ];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <Activity className="h-5 w-5 text-blue-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'investigating':
        return <Activity className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-50';
      case 'high':
        return 'text-orange-600 bg-orange-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'text-green-600 bg-green-50';
      case 'in_progress':
        return 'text-blue-600 bg-blue-50';
      case 'investigating':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-red-600 bg-red-50';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Incident Logs</h1>
        <p className="text-gray-600">Track and manage network incidents and outages</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Incidents</p>
              <p className="text-2xl font-bold text-gray-900">{incidents.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Resolved</p>
              <p className="text-2xl font-bold text-gray-900">
                {incidents.filter(i => i.status === 'resolved').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {incidents.filter(i => i.status !== 'resolved').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <XCircle className="h-8 w-8 text-red-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Critical</p>
              <p className="text-2xl font-bold text-gray-900">
                {incidents.filter(i => i.severity === 'critical').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Incidents Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Incidents</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Incident
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Affected
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {incidents.map((incident) => (
                <tr key={incident.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{incident.title}</div>
                      <div className="text-sm text-gray-500">{incident.description}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {incident.reportedAt}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getSeverityIcon(incident.severity)}
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                        {incident.severity}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(incident.status)}
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                        {incident.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {incident.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {incident.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {incident.affectedCustomers} customers
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    {incident.status !== 'resolved' && (
                      <button className="text-green-600 hover:text-green-900">Update</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Incident Details */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Incident Details</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-2">Fiber Cut - Downtown Area</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><span className="font-medium">Description:</span> Fiber optic cable damage reported in downtown business district</p>
                  <p><span className="font-medium">Technician:</span> John Smith</p>
                  <p><span className="font-medium">Resolution:</span> Cable replaced and service restored</p>
                  <p><span className="font-medium">Root Cause:</span> Construction work damaged underground fiber</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Incident Statistics</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">4.2h</div>
                <div className="text-sm text-gray-600">Average Resolution Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">85%</div>
                <div className="text-sm text-gray-600">Resolution Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">240</div>
                <div className="text-sm text-gray-600">Total Affected Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentLogsPage; 
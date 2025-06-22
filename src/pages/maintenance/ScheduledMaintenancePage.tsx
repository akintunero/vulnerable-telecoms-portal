import React from 'react';
import {
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  WifiIcon,
  ServerIcon
} from '@heroicons/react/24/outline';

const ScheduledMaintenancePage: React.FC = () => {
  const upcomingMaintenance = [
    {
      id: 1,
      title: 'Core Network Switch Upgrade',
      description: 'Upgrading core network switches to support higher bandwidth and improved security',
      scheduledDate: '2024-03-20T02:00:00Z',
      duration: '4 hours',
      impact: 'Low',
      affectedSystems: ['Internet Services', 'Voice Services'],
      status: 'Scheduled'
    },
    {
      id: 2,
      title: 'Database Server Maintenance',
      description: 'Routine database maintenance and optimization',
      scheduledDate: '2024-03-22T01:00:00Z',
      duration: '2 hours',
      impact: 'Medium',
      affectedSystems: ['Customer Portal', 'Billing System'],
      status: 'Scheduled'
    },
    {
      id: 3,
      title: 'Security Patch Deployment',
      description: 'Deploying critical security patches across all systems',
      scheduledDate: '2024-03-25T03:00:00Z',
      duration: '1 hour',
      impact: 'Low',
      affectedSystems: ['All Systems'],
      status: 'Scheduled'
    }
  ];

  const completedMaintenance = [
    {
      id: 1,
      title: 'Backup System Upgrade',
      description: 'Successfully upgraded backup systems with improved redundancy',
      completedDate: '2024-03-15T02:00:00Z',
      duration: '3 hours',
      status: 'Completed',
      notes: 'All systems operational, backup performance improved by 40%'
    },
    {
      id: 2,
      title: 'Load Balancer Configuration',
      description: 'Reconfigured load balancers for better traffic distribution',
      completedDate: '2024-03-10T01:00:00Z',
      duration: '2 hours',
      status: 'Completed',
      notes: 'Traffic distribution optimized, latency reduced by 15%'
    }
  ];

  const maintenanceLogs = [
    {
      id: 1,
      action: 'Maintenance window opened',
      timestamp: '2024-03-15T02:00:00Z',
      user: 'System Admin',
      details: 'Backup system upgrade initiated'
    },
    {
      id: 2,
      action: 'System backup completed',
      timestamp: '2024-03-15T02:15:00Z',
      user: 'System Admin',
      details: 'Pre-maintenance backup successful'
    },
    {
      id: 3,
      action: 'Upgrade process started',
      timestamp: '2024-03-15T02:30:00Z',
      user: 'System Admin',
      details: 'Backup system upgrade in progress'
    },
    {
      id: 4,
      action: 'Maintenance completed',
      timestamp: '2024-03-15T05:00:00Z',
      user: 'System Admin',
      details: 'All systems operational, upgrade successful'
    }
  ];

  const affectedSystems = [
    { name: 'Internet Services', status: 'Operational', uptime: '99.9%' },
    { name: 'Voice Services', status: 'Operational', uptime: '99.8%' },
    { name: 'Customer Portal', status: 'Operational', uptime: '99.7%' },
    { name: 'Billing System', status: 'Operational', uptime: '99.6%' },
    { name: 'Mobile Services', status: 'Degraded', uptime: '95.2%' }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'low':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'scheduled':
        return 'text-blue-600 bg-blue-100';
      case 'in progress':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Scheduled Maintenance</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Schedule Maintenance
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Maintenance</h2>
        <div className="space-y-4">
          {upcomingMaintenance.map((maintenance) => (
            <div key={maintenance.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{maintenance.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{maintenance.description}</p>
                  <div className="flex items-center space-x-4 mt-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {new Date(maintenance.scheduledDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {maintenance.duration}
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(maintenance.impact)}`}>
                      {maintenance.impact} Impact
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(maintenance.status)}`}>
                      {maintenance.status}
                    </span>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700">Affected Systems:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {maintenance.affectedSystems.map((system) => (
                        <span key={system} className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700">
                          {system}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Completed Maintenance</h2>
          <div className="space-y-4">
            {completedMaintenance.map((maintenance) => (
              <div key={maintenance.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{maintenance.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{maintenance.description}</p>
                    <div className="flex items-center space-x-4 mt-3">
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {new Date(maintenance.completedDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {maintenance.duration}
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(maintenance.status)}`}>
                        {maintenance.status}
                      </span>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700">Notes:</p>
                      <p className="text-sm text-gray-600 mt-1">{maintenance.notes}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Logs</h2>
          <div className="space-y-3">
            {maintenanceLogs.map((log) => (
              <div key={log.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{log.action}</p>
                  <p className="text-sm text-gray-500">{log.details}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    by {log.user} • {new Date(log.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Affected Systems</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {affectedSystems.map((system) => (
            <div key={system.name} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <WifiIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-900">{system.name}</span>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  system.status === 'Operational' ? 'text-green-600 bg-green-100' : 'text-yellow-600 bg-yellow-100'
                }`}>
                  {system.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Uptime: {system.uptime}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduledMaintenancePage; 
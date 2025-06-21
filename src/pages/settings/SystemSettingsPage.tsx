import React, { useState } from 'react';
import { Settings, Shield, Database, Clock, Globe, Server, HardDrive, Activity, Save, RefreshCw, AlertTriangle, CheckCircle, XCircle, Lock, Users, Bell } from 'lucide-react';

const SystemSettingsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('general');
  const [autoBackup, setAutoBackup] = useState<boolean>(true);
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);
  const [debugMode, setDebugMode] = useState<boolean>(false);

  // Mock data for system information
  const systemInfo = {
    version: '2.1.0',
    buildNumber: '2025.06.01',
    lastUpdate: '2025-05-15',
    uptime: '15 days, 8 hours, 32 minutes',
    serverLocation: 'US East (N. Virginia)',
    databaseVersion: 'MySQL 8.0.32',
    nodeVersion: 'v18.17.0',
    memoryUsage: '67%',
    diskUsage: '45%',
    cpuUsage: '23%'
  };

  // Mock data for security settings
  const securitySettings = [
    {
      id: 'password_policy',
      name: 'Password Policy',
      description: 'Configure password requirements and expiration',
      enabled: true,
      settings: {
        minLength: 12,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        expirationDays: 90
      }
    },
    {
      id: 'two_factor',
      name: 'Two-Factor Authentication',
      description: 'Require 2FA for all user accounts',
      enabled: true,
      settings: {
        method: 'TOTP',
        backupCodes: true,
        rememberDevice: true
      }
    },
    {
      id: 'session_timeout',
      name: 'Session Timeout',
      description: 'Automatic logout after inactivity',
      enabled: true,
      settings: {
        timeoutMinutes: 30,
        extendOnActivity: true
      }
    },
    {
      id: 'ip_whitelist',
      name: 'IP Whitelist',
      description: 'Restrict access to specific IP addresses',
      enabled: false,
      settings: {
        allowedIPs: ['192.168.1.0/24', '10.0.0.0/8']
      }
    }
  ];

  // Mock data for backup settings
  const backupSettings = [
    {
      id: 'database_backup',
      name: 'Database Backup',
      description: 'Automated database backups',
      enabled: true,
      schedule: 'Daily at 2:00 AM',
      retention: '30 days',
      lastBackup: '2025-06-01 02:00:00',
      nextBackup: '2025-06-02 02:00:00',
      size: '2.4 GB',
      status: 'success'
    },
    {
      id: 'file_backup',
      name: 'File Backup',
      description: 'Backup configuration and user files',
      enabled: true,
      schedule: 'Weekly on Sunday',
      retention: '90 days',
      lastBackup: '2025-05-25 03:00:00',
      nextBackup: '2025-06-01 03:00:00',
      size: '1.8 GB',
      status: 'success'
    },
    {
      id: 'log_backup',
      name: 'Log Backup',
      description: 'Backup system and application logs',
      enabled: true,
      schedule: 'Daily at 1:00 AM',
      retention: '7 days',
      lastBackup: '2025-06-01 01:00:00',
      nextBackup: '2025-06-02 01:00:00',
      size: '450 MB',
      status: 'success'
    }
  ];

  // Mock data for system configuration
  const systemConfig = [
    {
      id: 'timezone',
      name: 'Timezone',
      value: 'America/New_York',
      description: 'System timezone for all operations',
      type: 'select'
    },
    {
      id: 'language',
      name: 'Default Language',
      value: 'English (US)',
      description: 'Default language for the application',
      type: 'select'
    },
    {
      id: 'date_format',
      name: 'Date Format',
      value: 'MM/DD/YYYY',
      description: 'Default date format',
      type: 'select'
    },
    {
      id: 'time_format',
      name: 'Time Format',
      value: '12-hour',
      description: 'Default time format',
      type: 'select'
    },
    {
      id: 'max_file_size',
      name: 'Maximum File Upload Size',
      value: '50 MB',
      description: 'Maximum allowed file upload size',
      type: 'input'
    },
    {
      id: 'session_timeout',
      name: 'Session Timeout',
      value: '30 minutes',
      description: 'Automatic logout after inactivity',
      type: 'input'
    }
  ];

  // Mock data for system logs
  const systemLogs = [
    {
      id: 1,
      level: 'INFO',
      message: 'System backup completed successfully',
      timestamp: '2025-06-01 02:00:15',
      source: 'backup-service',
      details: 'Database backup completed in 2.3 minutes'
    },
    {
      id: 2,
      level: 'WARNING',
      message: 'High memory usage detected',
      timestamp: '2025-06-01 01:45:30',
      source: 'monitoring-service',
      details: 'Memory usage reached 85%'
    },
    {
      id: 3,
      level: 'ERROR',
      message: 'Failed to connect to external API',
      timestamp: '2025-06-01 01:30:45',
      source: 'api-service',
      details: 'Connection timeout after 30 seconds'
    },
    {
      id: 4,
      level: 'INFO',
      message: 'User authentication successful',
      timestamp: '2025-06-01 01:15:20',
      source: 'auth-service',
      details: 'User admin@telco.com logged in successfully'
    }
  ];

  // Mock data for system health
  const systemHealth = [
    {
      component: 'Database',
      status: 'healthy',
      uptime: '99.9%',
      responseTime: '45ms',
      lastCheck: '2025-06-01 15:30'
    },
    {
      component: 'API Gateway',
      status: 'healthy',
      uptime: '99.8%',
      responseTime: '120ms',
      lastCheck: '2025-06-01 15:30'
    },
    {
      component: 'File Storage',
      status: 'warning',
      uptime: '98.5%',
      responseTime: '280ms',
      lastCheck: '2025-06-01 15:30'
    },
    {
      component: 'Email Service',
      status: 'healthy',
      uptime: '99.7%',
      responseTime: '85ms',
      lastCheck: '2025-06-01 15:30'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR': return 'bg-red-100 text-red-800';
      case 'WARNING': return 'bg-yellow-100 text-yellow-800';
      case 'INFO': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-1">Configure system preferences and security settings</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 flex items-center">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Server className="h-5 w-5 text-blue-600 mr-2" />
              <div>
                <p className="text-sm font-medium text-gray-900">Version</p>
                <p className="text-lg font-bold text-gray-900">{systemInfo.version}</p>
                <p className="text-xs text-gray-500">Build {systemInfo.buildNumber}</p>
              </div>
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-green-600 mr-2" />
              <div>
                <p className="text-sm font-medium text-gray-900">Uptime</p>
                <p className="text-lg font-bold text-gray-900">{systemInfo.uptime}</p>
                <p className="text-xs text-gray-500">Last update: {systemInfo.lastUpdate}</p>
              </div>
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-purple-600 mr-2" />
              <div>
                <p className="text-sm font-medium text-gray-900">Location</p>
                <p className="text-lg font-bold text-gray-900">{systemInfo.serverLocation}</p>
                <p className="text-xs text-gray-500">Database: {systemInfo.databaseVersion}</p>
              </div>
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-orange-600 mr-2" />
              <div>
                <p className="text-sm font-medium text-gray-900">Resources</p>
                <p className="text-lg font-bold text-gray-900">CPU: {systemInfo.cpuUsage}</p>
                <p className="text-xs text-gray-500">Memory: {systemInfo.memoryUsage} | Disk: {systemInfo.diskUsage}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'general', name: 'General', icon: <Settings className="h-4 w-4" /> },
              { id: 'security', name: 'Security', icon: <Shield className="h-4 w-4" /> },
              { id: 'backup', name: 'Backup', icon: <Database className="h-4 w-4" /> },
              { id: 'health', name: 'System Health', icon: <Activity className="h-4 w-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* General Settings */}
          {selectedTab === 'general' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">System Configuration</h3>
                  <div className="space-y-4">
                    {systemConfig.map((config) => (
                      <div key={config.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{config.name}</p>
                          <p className="text-xs text-gray-500">{config.description}</p>
                        </div>
                        <div className="text-sm text-gray-900">{config.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">System Options</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Auto Backup</p>
                        <p className="text-xs text-gray-500">Automatically backup system data</p>
                      </div>
                      <button
                        onClick={() => setAutoBackup(!autoBackup)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          autoBackup ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          autoBackup ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Maintenance Mode</p>
                        <p className="text-xs text-gray-500">Enable maintenance mode</p>
                      </div>
                      <button
                        onClick={() => setMaintenanceMode(!maintenanceMode)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          maintenanceMode ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Debug Mode</p>
                        <p className="text-xs text-gray-500">Enable debug logging</p>
                      </div>
                      <button
                        onClick={() => setDebugMode(!debugMode)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          debugMode ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          debugMode ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {selectedTab === 'security' && (
            <div className="space-y-4">
              {securitySettings.map((setting) => (
                <div key={setting.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{setting.name}</h3>
                      <p className="text-xs text-gray-500">{setting.description}</p>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(setting.enabled ? 'success' : 'error')}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        setting.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {setting.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-600">
                    {Object.entries(setting.settings).map(([key, value]) => (
                      <div key={key}>
                        <span className="font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span> {String(value)}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-xs">Configure</button>
                    <button className="text-green-600 hover:text-green-800 text-xs">Test</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Backup Settings */}
          {selectedTab === 'backup' && (
            <div className="space-y-4">
              {backupSettings.map((backup) => (
                <div key={backup.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{backup.name}</h3>
                      <p className="text-xs text-gray-500">{backup.description}</p>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(backup.status)}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        backup.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {backup.status}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-600 mb-3">
                    <div><span className="font-medium">Schedule:</span> {backup.schedule}</div>
                    <div><span className="font-medium">Retention:</span> {backup.retention}</div>
                    <div><span className="font-medium">Size:</span> {backup.size}</div>
                    <div><span className="font-medium">Next:</span> {backup.nextBackup}</div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Last backup: {backup.lastBackup}
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-xs">Configure</button>
                    <button className="text-green-600 hover:text-green-800 text-xs">Run Now</button>
                    <button className="text-purple-600 hover:text-purple-800 text-xs">Restore</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* System Health */}
          {selectedTab === 'health' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">System Components</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {systemHealth.map((component) => (
                    <div key={component.component} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900">{component.component}</h4>
                        <div className="flex items-center">
                          {getStatusIcon(component.status)}
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            component.status === 'healthy' ? 'bg-green-100 text-green-800' :
                            component.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {component.status}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                        <div><span className="font-medium">Uptime:</span> {component.uptime}</div>
                        <div><span className="font-medium">Response:</span> {component.responseTime}</div>
                        <div><span className="font-medium">Last Check:</span> {component.lastCheck}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent System Logs</h3>
                <div className="space-y-2">
                  {systemLogs.map((log) => (
                    <div key={log.id} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLogLevelColor(log.level)}`}>
                            {log.level}
                          </span>
                          <span className="text-sm font-medium text-gray-900">{log.message}</span>
                        </div>
                        <span className="text-xs text-gray-500">{log.timestamp}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Source: {log.source} | {log.details}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemSettingsPage; 
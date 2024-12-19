import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, Smartphone, Settings, ToggleLeft, ToggleRight, Clock, User, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const NotificationPreferencesPage: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [smsNotifications, setSmsNotifications] = useState<boolean>(false);
  const [pushNotifications, setPushNotifications] = useState<boolean>(true);
  const [slackNotifications, setSlackNotifications] = useState<boolean>(true);

  // Mock data for notification categories
  const notificationCategories = [
    {
      id: 'security',
      name: 'Security Alerts',
      description: 'Critical security events and threats',
      icon: <Shield className="h-5 w-5" />,
      color: 'red',
      email: true,
      sms: true,
      push: true,
      slack: true,
      frequency: 'immediate'
    },
    {
      id: 'network',
      name: 'Network Issues',
      description: 'Network outages and performance alerts',
      icon: <AlertTriangle className="h-5 w-5" />,
      color: 'yellow',
      email: true,
      sms: false,
      push: true,
      slack: true,
      frequency: 'immediate'
    },
    {
      id: 'customer',
      name: 'Customer Support',
      description: 'Customer tickets and support requests',
      icon: <User className="h-5 w-5" />,
      color: 'blue',
      email: true,
      sms: false,
      push: false,
      slack: true,
      frequency: 'hourly'
    },
    {
      id: 'billing',
      name: 'Billing & Payments',
      description: 'Payment confirmations and billing alerts',
      icon: <CheckCircle className="h-5 w-5" />,
      color: 'green',
      email: true,
      sms: false,
      push: false,
      slack: false,
      frequency: 'daily'
    },
    {
      id: 'maintenance',
      name: 'Scheduled Maintenance',
      description: 'Planned maintenance and updates',
      icon: <Clock className="h-5 w-5" />,
      color: 'purple',
      email: true,
      sms: false,
      push: true,
      slack: true,
      frequency: 'daily'
    }
  ];

  // Mock data for notification channels
  const notificationChannels = [
    {
      id: 'email',
      name: 'Email Notifications',
      description: 'Receive notifications via email',
      icon: <Mail className="h-6 w-6" />,
      status: 'active',
      address: 'admin@telco.com',
      frequency: 'Real-time',
      lastSent: '2025-06-01 15:30',
      deliveryRate: 99.8
    },
    {
      id: 'sms',
      name: 'SMS Notifications',
      description: 'Receive critical alerts via SMS',
      icon: <Smartphone className="h-6 w-6" />,
      status: 'inactive',
      number: '+1 (555) 123-4567',
      frequency: 'Critical only',
      lastSent: '2025-05-28 10:15',
      deliveryRate: 98.5
    },
    {
      id: 'push',
      name: 'Push Notifications',
      description: 'In-app and browser push notifications',
      icon: <Bell className="h-6 w-6" />,
      status: 'active',
      device: 'Chrome Browser',
      frequency: 'Real-time',
      lastSent: '2025-06-01 15:25',
      deliveryRate: 95.2
    },
    {
      id: 'slack',
      name: 'Slack Notifications',
      description: 'Notifications sent to Slack channels',
      icon: <MessageSquare className="h-6 w-6" />,
      status: 'active',
      channel: '#telco-alerts',
      frequency: 'Real-time',
      lastSent: '2025-06-01 15:30',
      deliveryRate: 100.0
    }
  ];

  // Mock data for notification templates
  const notificationTemplates = [
    {
      id: 'template1',
      name: 'Security Alert',
      type: 'security',
      subject: 'Security Alert: Unusual Login Detected',
      content: 'We detected an unusual login attempt to your account from {location} at {time}.',
      variables: ['location', 'time', 'ip_address'],
      status: 'active',
      lastModified: '2025-05-15'
    },
    {
      id: 'template2',
      name: 'Network Outage',
      type: 'network',
      subject: 'Network Alert: Service Interruption',
      content: 'Network service interruption detected in {region}. Expected resolution time: {eta}.',
      variables: ['region', 'eta', 'affected_services'],
      status: 'active',
      lastModified: '2025-05-20'
    },
    {
      id: 'template3',
      name: 'Customer Ticket',
      type: 'customer',
      subject: 'New Support Ticket: {ticket_id}',
      content: 'A new support ticket has been created by {customer_name} with priority {priority}.',
      variables: ['ticket_id', 'customer_name', 'priority'],
      status: 'active',
      lastModified: '2025-05-10'
    },
    {
      id: 'template4',
      name: 'Payment Confirmation',
      type: 'billing',
      subject: 'Payment Received: {amount}',
      content: 'Payment of {amount} has been received for invoice {invoice_id}. Thank you!',
      variables: ['amount', 'invoice_id', 'payment_method'],
      status: 'active',
      lastModified: '2025-05-25'
    }
  ];

  // Mock data for notification history
  const notificationHistory = [
    {
      id: 1,
      type: 'security',
      title: 'Security Alert: Unusual Login',
      channel: 'email',
      recipient: 'admin@telco.com',
      status: 'delivered',
      sentAt: '2025-06-01 15:30:45',
      deliveredAt: '2025-06-01 15:30:52'
    },
    {
      id: 2,
      type: 'network',
      title: 'Network Alert: Service Interruption',
      channel: 'slack',
      recipient: '#telco-alerts',
      status: 'delivered',
      sentAt: '2025-06-01 15:25:30',
      deliveredAt: '2025-06-01 15:25:31'
    },
    {
      id: 3,
      type: 'customer',
      title: 'New Support Ticket: #12345',
      channel: 'email',
      recipient: 'admin@telco.com',
      status: 'delivered',
      sentAt: '2025-06-01 15:20:15',
      deliveredAt: '2025-06-01 15:20:22'
    },
    {
      id: 4,
      type: 'billing',
      title: 'Payment Received: $1,250.00',
      channel: 'email',
      recipient: 'admin@telco.com',
      status: 'failed',
      sentAt: '2025-06-01 15:15:00',
      deliveredAt: null
    }
  ];

  // Mock data for notification settings
  const notificationSettings = [
    {
      id: 'quiet_hours',
      name: 'Quiet Hours',
      description: 'Pause non-critical notifications during specified hours',
      enabled: true,
      startTime: '22:00',
      endTime: '08:00',
      timezone: 'EST'
    },
    {
      id: 'batch_notifications',
      name: 'Batch Notifications',
      description: 'Group similar notifications to reduce frequency',
      enabled: true,
      batchWindow: '15 minutes',
      maxBatchSize: 10
    },
    {
      id: 'escalation',
      name: 'Escalation Rules',
      description: 'Automatically escalate critical alerts',
      enabled: true,
      escalationDelay: '30 minutes',
      escalationChannels: ['sms', 'slack']
    },
    {
      id: 'retention',
      name: 'Notification Retention',
      description: 'How long to keep notification history',
      enabled: true,
      retentionPeriod: '90 days',
      autoDelete: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'inactive': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'delivered': return 'text-green-600 bg-green-50 border-green-200';
      case 'failed': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'delivered': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'inactive': return <XCircle className="h-4 w-4 text-gray-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'security': return 'bg-red-100 text-red-800';
      case 'network': return 'bg-yellow-100 text-yellow-800';
      case 'customer': return 'bg-blue-100 text-blue-800';
      case 'billing': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Notification Preferences</h1>
          <p className="text-gray-600 mt-1">Manage how and when you receive notifications</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
            Save Preferences
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50">
            Test Notifications
          </button>
        </div>
      </div>

      {/* Global Notification Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Global Notification Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email</p>
                <p className="text-xs text-gray-500">admin@telco.com</p>
              </div>
            </div>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                emailNotifications ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Smartphone className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">SMS</p>
                <p className="text-xs text-gray-500">+1 (555) 123-4567</p>
              </div>
            </div>
            <button
              onClick={() => setSmsNotifications(!smsNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                smsNotifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                smsNotifications ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-purple-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Push</p>
                <p className="text-xs text-gray-500">Browser & Mobile</p>
              </div>
            </div>
            <button
              onClick={() => setPushNotifications(!pushNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                pushNotifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                pushNotifications ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 text-indigo-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Slack</p>
                <p className="text-xs text-gray-500">#telco-alerts</p>
              </div>
            </div>
            <button
              onClick={() => setSlackNotifications(!slackNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                slackNotifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                slackNotifications ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Notification Categories */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Categories</h2>
        <div className="space-y-4">
          {notificationCategories.map((category) => (
            <div key={category.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-3 ${
                    category.color === 'red' ? 'bg-red-100 text-red-600' :
                    category.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                    category.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    category.color === 'green' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{category.name}</h3>
                    <p className="text-xs text-gray-500">{category.description}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(category.id)}`}>
                  {category.frequency}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label className="flex items-center">
                  <input type="checkbox" checked={category.email} className="mr-2" />
                  <span className="text-sm text-gray-700">Email</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" checked={category.sms} className="mr-2" />
                  <span className="text-sm text-gray-700">SMS</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" checked={category.push} className="mr-2" />
                  <span className="text-sm text-gray-700">Push</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" checked={category.slack} className="mr-2" />
                  <span className="text-sm text-gray-700">Slack</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Channels and Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Channels */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Channels</h2>
          <div className="space-y-3">
            {notificationChannels.map((channel) => (
              <div key={channel.id} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mr-3">
                      {channel.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{channel.name}</h3>
                      <p className="text-xs text-gray-500">{channel.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon(channel.status)}
                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      channel.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {channel.status}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <div>Frequency: {channel.frequency}</div>
                  <div>Delivery Rate: {channel.deliveryRate}%</div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Last Sent: {channel.lastSent}
                </div>
                <div className="mt-2 flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-xs">Configure</button>
                  <button className="text-green-600 hover:text-green-800 text-xs">Test</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Templates */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Templates</h2>
          <div className="space-y-3">
            {notificationTemplates.map((template) => (
              <div key={template.id} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{template.name}</h3>
                    <p className="text-xs text-gray-500">{template.subject}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(template.type)}`}>
                    {template.type}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{template.content}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Variables: {template.variables.join(', ')}</span>
                  <span>Modified: {template.lastModified}</span>
                </div>
                <div className="mt-2 flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-xs">Edit</button>
                  <button className="text-green-600 hover:text-green-800 text-xs">Preview</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notification History */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Notifications</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {notificationHistory.map((notification) => (
                <tr key={notification.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                      {notification.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{notification.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notification.channel}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(notification.status)}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        notification.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {notification.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notification.sentAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferencesPage; 
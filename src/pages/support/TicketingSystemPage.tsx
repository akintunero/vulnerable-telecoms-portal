import React, { useState } from 'react';
import { Ticket, Activity, AlertTriangle, CheckCircle, MapPin, Users, Server, Clock, MessageSquare } from 'lucide-react';

const TicketingSystemPage: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  // Mock data for support tickets
  const supportTickets = [
    {
      id: 'TICKET001',
      title: 'Internet connectivity issues',
      customer: 'TechCorp Solutions',
      status: 'open',
      priority: 'high',
      category: 'Network',
      assignedTo: 'John Smith',
      createdAt: '2025-06-01 14:30',
      lastUpdated: '2025-06-01 15:30',
      description: 'Customer reporting intermittent internet connectivity issues'
    },
    {
      id: 'TICKET002',
      title: 'VPN connection problems',
      customer: 'RetailChain Inc',
      status: 'in_progress',
      priority: 'medium',
      category: 'VPN',
      assignedTo: 'Sarah Johnson',
      createdAt: '2025-06-01 13:15',
      lastUpdated: '2025-06-01 15:25',
      description: 'Remote users unable to connect to corporate VPN'
    },
    {
      id: 'TICKET003',
      title: 'Billing inquiry',
      customer: 'CloudTech Ltd',
      status: 'resolved',
      priority: 'low',
      category: 'Billing',
      assignedTo: 'Mike Wilson',
      createdAt: '2025-06-01 10:45',
      lastUpdated: '2025-06-01 12:30',
      description: 'Customer has questions about monthly billing statement'
    },
    {
      id: 'TICKET004',
      title: 'Service degradation',
      customer: 'FinanceCorp',
      status: 'open',
      priority: 'critical',
      category: 'Service',
      assignedTo: 'Unassigned',
      createdAt: '2025-06-01 15:45',
      lastUpdated: '2025-06-01 15:45',
      description: 'Critical service degradation affecting multiple locations'
    }
  ];

  // Mock data for ticket statistics
  const ticketStats = [
    {
      title: 'Total Tickets',
      value: supportTickets.length.toString(),
      change: '+5',
      changeType: 'positive' as const,
      icon: <Ticket className="h-6 w-6" />,
      color: 'blue'
    },
    {
      title: 'Open Tickets',
      value: supportTickets.filter(t => t.status === 'open').length.toString(),
      change: '+2',
      changeType: 'positive' as const,
      icon: <AlertTriangle className="h-6 w-6" />,
      color: 'red'
    },
    {
      title: 'In Progress',
      value: supportTickets.filter(t => t.status === 'in_progress').length.toString(),
      change: '+1',
      changeType: 'positive' as const,
      icon: <Activity className="h-6 w-6" />,
      color: 'yellow'
    },
    {
      title: 'Avg Response Time',
      value: '2.5h',
      change: '-0.5h',
      changeType: 'positive' as const,
      icon: <Clock className="h-6 w-6" />,
      color: 'green'
    }
  ];

  // Mock data for ticket categories
  const ticketCategories = [
    { name: 'Network', count: 12, color: 'blue' },
    { name: 'VPN', count: 8, color: 'green' },
    { name: 'Billing', count: 5, color: 'yellow' },
    { name: 'Service', count: 3, color: 'red' }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      ticket: 'TICKET001',
      action: 'Status updated to In Progress',
      user: 'John Smith',
      time: '5 minutes ago'
    },
    {
      id: 2,
      ticket: 'TICKET002',
      action: 'Comment added by customer',
      user: 'RetailChain Inc',
      time: '12 minutes ago'
    },
    {
      id: 3,
      ticket: 'TICKET003',
      action: 'Ticket resolved',
      user: 'Mike Wilson',
      time: '1 hour ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-red-600 bg-red-50 border-red-200';
      case 'in_progress': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'resolved': return 'text-green-600 bg-green-50 border-green-200';
      case 'closed': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'in_progress': return <Activity className="h-4 w-4 text-yellow-500" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'closed': return <CheckCircle className="h-4 w-4 text-gray-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Network': return 'bg-blue-100 text-blue-800';
      case 'VPN': return 'bg-green-100 text-green-800';
      case 'Billing': return 'bg-yellow-100 text-yellow-800';
      case 'Service': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTickets = supportTickets.filter(ticket => 
    (filterStatus === 'all' || ticket.status === filterStatus) &&
    (filterPriority === 'all' || ticket.priority === filterPriority)
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Ticketing System</h1>
          <p className="text-gray-600 mt-1">Manage support tickets and customer issues</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priority</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
            Create Ticket
          </button>
        </div>
      </div>

      {/* Ticket Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ticketStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                stat.color === 'red' ? 'bg-red-100 text-red-600' :
                stat.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                'bg-green-100 text-green-600'}`}>
                {stat.icon}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-xs ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Support Tickets */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Support Tickets</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTickets.map((ticket) => (
                    <tr 
                      key={ticket.id} 
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedTicket === ticket.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedTicket(selectedTicket === ticket.id ? null : ticket.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Ticket className="h-5 w-5 text-blue-600 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{ticket.title}</div>
                            <div className="text-sm text-gray-500">{ticket.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(ticket.status)}
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            ticket.status === 'open' ? 'bg-red-100 text-red-800' :
                            ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                            ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {ticket.status.replace('_', ' ')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(ticket.category)}`}>
                          {ticket.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.assignedTo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Ticket Categories and Recent Activities */}
        <div className="space-y-6">
          {/* Ticket Categories */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ticket Categories</h2>
            <div className="space-y-3">
              {ticketCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      category.color === 'blue' ? 'bg-blue-500' :
                      category.color === 'green' ? 'bg-green-500' :
                      category.color === 'yellow' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}></div>
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{category.count}</span>
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
                  <div className="p-1 rounded-full bg-blue-100 text-blue-600">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">Ticket: {activity.ticket}</p>
                    <p className="text-xs text-gray-500">By: {activity.user}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Details (when selected) */}
      {selectedTicket && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Ticket Details</h2>
          {(() => {
            const ticket = supportTickets.find(t => t.id === selectedTicket);
            if (!ticket) return null;
            
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-2">Ticket Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">ID:</span>
                      <span className="text-sm font-medium text-gray-900">{ticket.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Title:</span>
                      <span className="text-sm font-medium text-gray-900">{ticket.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Customer:</span>
                      <span className="text-sm font-medium text-gray-900">{ticket.customer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Category:</span>
                      <span className="text-sm font-medium text-gray-900">{ticket.category}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-2">Status Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Status:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        ticket.status === 'open' ? 'bg-red-100 text-red-800' :
                        ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                        ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Priority:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Assigned To:</span>
                      <span className="text-sm font-medium text-gray-900">{ticket.assignedTo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Created:</span>
                      <span className="text-sm font-medium text-gray-900">{ticket.createdAt}</span>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-md font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{ticket.description}</p>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default TicketingSystemPage; 
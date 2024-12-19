import React, { useState } from 'react';
import { Users, Plus, Search, Filter, MoreVertical, Edit, Trash2, Shield, Mail, Phone, Calendar, Activity, CheckCircle, XCircle } from 'lucide-react';

const UserManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Mock data for users
  const users = [
    {
      id: 'user1',
      name: 'John Smith',
      email: 'john.smith@telco.com',
      role: 'System Administrator',
      department: 'IT',
      status: 'active',
      lastLogin: '2025-06-01 15:30',
      phone: '+1 (555) 123-4567',
      avatar: 'JS',
      permissions: ['read', 'write', 'admin'],
      joinDate: '2023-01-15'
    },
    {
      id: 'user2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@telco.com',
      role: 'Network Engineer',
      department: 'Network Operations',
      status: 'active',
      lastLogin: '2025-06-01 14:45',
      phone: '+1 (555) 234-5678',
      avatar: 'SJ',
      permissions: ['read', 'write'],
      joinDate: '2023-03-20'
    },
    {
      id: 'user3',
      name: 'Michael Chen',
      email: 'michael.chen@telco.com',
      role: 'Customer Support',
      department: 'Customer Service',
      status: 'active',
      lastLogin: '2025-06-01 13:20',
      phone: '+1 (555) 345-6789',
      avatar: 'MC',
      permissions: ['read'],
      joinDate: '2023-06-10'
    },
    {
      id: 'user4',
      name: 'Emily Davis',
      email: 'emily.davis@telco.com',
      role: 'Financial Analyst',
      department: 'Finance',
      status: 'inactive',
      lastLogin: '2025-05-28 09:15',
      phone: '+1 (555) 456-7890',
      avatar: 'ED',
      permissions: ['read', 'write'],
      joinDate: '2023-02-08'
    },
    {
      id: 'user5',
      name: 'David Wilson',
      email: 'david.wilson@telco.com',
      role: 'Security Specialist',
      department: 'Security',
      status: 'active',
      lastLogin: '2025-06-01 12:30',
      phone: '+1 (555) 567-8901',
      avatar: 'DW',
      permissions: ['read', 'write', 'admin'],
      joinDate: '2023-04-12'
    },
    {
      id: 'user6',
      name: 'Lisa Brown',
      email: 'lisa.brown@telco.com',
      role: 'Sales Manager',
      department: 'Sales',
      status: 'active',
      lastLogin: '2025-06-01 11:45',
      phone: '+1 (555) 678-9012',
      avatar: 'LB',
      permissions: ['read', 'write'],
      joinDate: '2023-05-18'
    }
  ];

  // Mock data for roles
  const roles = [
    { id: 'admin', name: 'System Administrator', users: 2, permissions: 15 },
    { id: 'engineer', name: 'Network Engineer', users: 3, permissions: 12 },
    { id: 'support', name: 'Customer Support', users: 5, permissions: 8 },
    { id: 'analyst', name: 'Financial Analyst', users: 2, permissions: 10 },
    { id: 'security', name: 'Security Specialist', users: 1, permissions: 14 },
    { id: 'sales', name: 'Sales Manager', users: 3, permissions: 6 }
  ];

  // Mock data for departments
  const departments = [
    { name: 'IT', users: 8, color: 'blue' },
    { name: 'Network Operations', users: 5, color: 'green' },
    { name: 'Customer Service', users: 12, color: 'purple' },
    { name: 'Finance', users: 4, color: 'yellow' },
    { name: 'Security', users: 3, color: 'red' },
    { name: 'Sales', users: 7, color: 'indigo' }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      user: 'John Smith',
      action: 'Updated user permissions',
      target: 'Sarah Johnson',
      time: '2 minutes ago',
      type: 'permission'
    },
    {
      id: 2,
      user: 'David Wilson',
      action: 'Created new user account',
      target: 'New Employee',
      time: '15 minutes ago',
      type: 'create'
    },
    {
      id: 3,
      user: 'System',
      action: 'Password reset requested',
      target: 'Michael Chen',
      time: '1 hour ago',
      type: 'security'
    },
    {
      id: 4,
      user: 'Sarah Johnson',
      action: 'Updated profile information',
      target: 'Self',
      time: '2 hours ago',
      type: 'profile'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'inactive': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'suspended': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'inactive': return <XCircle className="h-4 w-4 text-gray-500" />;
      case 'suspended': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPermissionColor = (permission: string) => {
    switch (permission) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'write': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'permission': return <Shield className="h-4 w-4 text-blue-500" />;
      case 'create': return <Plus className="h-4 w-4 text-green-500" />;
      case 'security': return <Shield className="h-4 w-4 text-red-500" />;
      case 'profile': return <Users className="h-4 w-4 text-purple-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role.toLowerCase().includes(selectedRole.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage user accounts, roles, and permissions</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Bulk Actions
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Administrator</option>
            <option value="engineer">Engineer</option>
            <option value="support">Support</option>
            <option value="analyst">Analyst</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mr-3">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 text-green-600 rounded-lg mr-3">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.status === 'active').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg mr-3">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Admin Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.permissions.includes('admin')).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg mr-3">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Online Today</p>
              <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.lastLogin.includes('2025-06-01')).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users Table */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">User Accounts</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-blue-600">{user.avatar}</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.role}</div>
                        <div className="text-sm text-gray-500">{user.department}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(user.status)}
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' :
                            user.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastLogin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                  <p className="text-sm text-gray-500">{activity.action}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Roles and Departments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Roles */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Roles</h2>
          <div className="space-y-3">
            {roles.map((role) => (
              <div key={role.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{role.name}</h3>
                  <p className="text-sm text-gray-500">{role.users} users • {role.permissions} permissions</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm">Manage</button>
              </div>
            ))}
          </div>
        </div>

        {/* Departments */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Departments</h2>
          <div className="space-y-3">
            {departments.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    dept.color === 'blue' ? 'bg-blue-500' :
                    dept.color === 'green' ? 'bg-green-500' :
                    dept.color === 'purple' ? 'bg-purple-500' :
                    dept.color === 'yellow' ? 'bg-yellow-500' :
                    dept.color === 'red' ? 'bg-red-500' : 'bg-indigo-500'
                  }`}></div>
                  <div>
                    <h3 className="font-medium text-gray-900">{dept.name}</h3>
                    <p className="text-sm text-gray-500">{dept.users} users</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage; 
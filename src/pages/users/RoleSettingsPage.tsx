import React, { useState } from 'react';
import { Users, UserCheck, UserX, Shield, Settings, Edit, Plus, Download, Filter, Activity, CheckCircle, XCircle } from 'lucide-react';

const RoleSettingsPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Mock data for roles
  const roles = [
    { id: 1, name: 'Administrator', description: 'Full access to all features', status: 'active', users: 3 },
    { id: 2, name: 'Network Engineer', description: 'Manage network devices and monitoring', status: 'active', users: 5 },
    { id: 3, name: 'Support Agent', description: 'Handle tickets and customer issues', status: 'active', users: 8 },
    { id: 4, name: 'Compliance Officer', description: 'View compliance and audit reports', status: 'inactive', users: 2 },
    { id: 5, name: 'Read-Only', description: 'View-only access', status: 'active', users: 4 }
  ];

  // Mock data for permissions
  const permissions = [
    { id: 1, name: 'View Dashboard', roles: ['Administrator', 'Network Engineer', 'Support Agent', 'Compliance Officer', 'Read-Only'] },
    { id: 2, name: 'Manage Users', roles: ['Administrator'] },
    { id: 3, name: 'Edit Network Settings', roles: ['Administrator', 'Network Engineer'] },
    { id: 4, name: 'View Compliance Reports', roles: ['Administrator', 'Compliance Officer'] },
    { id: 5, name: 'Handle Tickets', roles: ['Administrator', 'Support Agent'] },
    { id: 6, name: 'View Inventory', roles: ['Administrator', 'Network Engineer', 'Read-Only'] }
  ];

  // Mock data for role assignments
  const roleAssignments = [
    { id: 1, user: 'admin@telco.com', role: 'Administrator', assigned: '2025-05-01', status: 'active' },
    { id: 2, user: 'john.smith@telco.com', role: 'Network Engineer', assigned: '2025-04-15', status: 'active' },
    { id: 3, user: 'sarah.johnson@telco.com', role: 'Support Agent', assigned: '2025-03-20', status: 'active' },
    { id: 4, user: 'david.wilson@telco.com', role: 'Compliance Officer', assigned: '2025-02-10', status: 'inactive' }
  ];

  // Mock data for recent changes
  const recentChanges = [
    { id: 1, event: 'Role Assigned', user: 'admin@telco.com', role: 'Administrator', date: '2025-06-01', status: 'success' },
    { id: 2, event: 'Permission Updated', user: 'john.smith@telco.com', role: 'Network Engineer', date: '2025-05-28', status: 'success' },
    { id: 3, event: 'Role Revoked', user: 'david.wilson@telco.com', role: 'Compliance Officer', date: '2025-05-25', status: 'warning' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'inactive': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredRoles = roles.filter(role => {
    const matchesRole = selectedRole === 'all' || role.name === selectedRole;
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Role & Permission Settings</h1>
          <p className="text-gray-600 mt-1">Manage user roles, permissions, and assignments</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Role
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export Roles
          </button>
        </div>
      </div>

      {/* Roles Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">User Roles</h2>
          <Filter className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex mb-4 gap-2">
          <input
            type="text"
            placeholder="Search roles..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedRole}
            onChange={e => setSelectedRole(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            {roles.map(role => (
              <option key={role.id} value={role.name}>{role.name}</option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRoles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{role.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{role.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(role.status)}`}>
                      {role.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{role.users}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:underline flex items-center text-xs"><Edit className="h-4 w-4 mr-1" />Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions Table */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Permissions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permission</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roles</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {permissions.map((perm) => (
                <tr key={perm.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{perm.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{perm.roles.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Assignments */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Role Assignments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {roleAssignments.map((assign) => (
                <tr key={assign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{assign.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assign.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assign.assigned}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(assign.status)}`}>
                      {assign.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Changes */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Changes</h2>
        <div className="space-y-3">
          {recentChanges.map((change) => (
            <div key={change.id} className="flex items-start space-x-3 p-3 border border-gray-100 rounded-lg">
              <div className={`p-2 rounded-full ${getStatusColor(change.status)}`}>
                <Activity className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{change.event}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>User: {change.user}</span>
                  <span className="mx-2">|</span>
                  <span>Role: {change.role}</span>
                  <span className="mx-2">|</span>
                  <span>Date: {change.date}</span>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(change.status)}`}>
                  {change.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSettingsPage; 
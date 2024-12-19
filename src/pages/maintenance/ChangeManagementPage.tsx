import React, { useState } from 'react';
import { History, Plus, Download, Filter, CheckCircle, XCircle, AlertTriangle, Activity, User, Calendar, Edit } from 'lucide-react';

const ChangeManagementPage: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Mock data for change requests
  const changeRequests = [
    { id: 'CR-1001', title: 'Upgrade Core Router Firmware', requester: 'John Smith', date: '2025-06-01', status: 'approved', type: 'Network', approver: 'admin@telco.com' },
    { id: 'CR-1002', title: 'Database Schema Update', requester: 'Sarah Johnson', date: '2025-05-28', status: 'pending', type: 'Database', approver: '' },
    { id: 'CR-1003', title: 'Firewall Rule Change', requester: 'Emily Davis', date: '2025-05-25', status: 'rejected', type: 'Security', approver: 'admin@telco.com' },
    { id: 'CR-1004', title: 'Add New VLAN', requester: 'David Wilson', date: '2025-05-20', status: 'approved', type: 'Network', approver: 'john.smith@telco.com' },
    { id: 'CR-1005', title: 'Patch Application Server', requester: 'Michael Brown', date: '2025-05-18', status: 'pending', type: 'Server', approver: '' }
  ];

  // Mock data for change history
  const changeHistory = [
    { id: 1, event: 'Change Approved', user: 'admin@telco.com', changeId: 'CR-1001', date: '2025-06-01', status: 'success' },
    { id: 2, event: 'Change Requested', user: 'john.smith@telco.com', changeId: 'CR-1001', date: '2025-05-30', status: 'info' },
    { id: 3, event: 'Change Rejected', user: 'admin@telco.com', changeId: 'CR-1003', date: '2025-05-25', status: 'error' },
    { id: 4, event: 'Change Approved', user: 'john.smith@telco.com', changeId: 'CR-1004', date: '2025-05-20', status: 'success' }
  ];

  // Status metrics
  const statusMetrics = [
    { label: 'Total Requests', value: changeRequests.length, color: 'bg-blue-100 text-blue-700' },
    { label: 'Approved', value: changeRequests.filter(r => r.status === 'approved').length, color: 'bg-green-100 text-green-700' },
    { label: 'Pending', value: changeRequests.filter(r => r.status === 'pending').length, color: 'bg-yellow-100 text-yellow-700' },
    { label: 'Rejected', value: changeRequests.filter(r => r.status === 'rejected').length, color: 'bg-red-100 text-red-700' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="h-4 w-4 mr-1" />Approved</span>;
      case 'pending': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Activity className="h-4 w-4 mr-1" />Pending</span>;
      case 'rejected': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle className="h-4 w-4 mr-1" />Rejected</span>;
      default: return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  const filteredRequests = changeRequests.filter(req => {
    const matchesStatus = selectedStatus === 'all' || req.status === selectedStatus;
    const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) || req.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Change Management</h1>
          <p className="text-gray-600 mt-1">Track and manage change requests, approvals, and history</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            New Change Request
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export Log
          </button>
        </div>
      </div>

      {/* Status Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusMetrics.map((metric, idx) => (
          <div key={idx} className={`rounded-lg shadow p-4 ${metric.color}`}>
            <div className="flex items-center">
              <History className="h-6 w-6 mr-3" />
              <div>
                <p className="text-sm font-medium">{metric.label}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Change Requests Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Change Requests</h2>
          <Filter className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex mb-4 gap-2">
          <input
            type="text"
            placeholder="Search requests..."
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
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requester</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{req.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.requester}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(req.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.approver || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:underline flex items-center text-xs"><Edit className="h-4 w-4 mr-1" />Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Change History */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Change History</h2>
        <div className="space-y-3">
          {changeHistory.map((change) => (
            <div key={change.id} className="flex items-start space-x-3 p-3 border border-gray-100 rounded-lg">
              <div className={`p-2 rounded-full ${change.status === 'success' ? 'bg-green-100 text-green-600' : change.status === 'error' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                <History className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{change.event}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>User: {change.user}</span>
                  <span className="mx-2">|</span>
                  <span>Change ID: {change.changeId}</span>
                  <span className="mx-2">|</span>
                  <span>Date: {change.date}</span>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${change.status === 'success' ? 'bg-green-100 text-green-600' : change.status === 'error' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
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

export default ChangeManagementPage; 
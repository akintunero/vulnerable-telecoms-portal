import React, { useState } from 'react';
import {
  Search,
  Plus,
  Download,
  Filter,
  MoreVertical,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Calendar,
  User,
  Tag
} from 'lucide-react';

interface ChangeRequest {
  id: string;
  title: string;
  type: 'maintenance' | 'upgrade' | 'emergency' | 'routine';
  status: 'pending' | 'approved' | 'in-progress' | 'completed' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'critical';
  requester: string;
  assignedTo: string;
  scheduledDate: string;
  description: string;
  impact: string;
}

const mockChangeRequests: ChangeRequest[] = [
  {
    id: 'CR-001',
    title: 'Network Infrastructure Upgrade',
    type: 'upgrade',
    status: 'in-progress',
    priority: 'high',
    requester: 'John Smith',
    assignedTo: 'Network Team',
    scheduledDate: '2024-03-01 02:00 AM',
    description: 'Upgrade core network switches to latest firmware version',
    impact: 'Service interruption expected for 2 hours'
  },
  {
    id: 'CR-002',
    title: 'Emergency Fiber Repair',
    type: 'emergency',
    status: 'pending',
    priority: 'critical',
    requester: 'Sarah Johnson',
    assignedTo: 'Field Operations',
    scheduledDate: '2024-02-29 10:00 PM',
    description: 'Repair damaged fiber optic cable in downtown area',
    impact: 'Service degradation for affected customers'
  },
  {
    id: 'CR-003',
    title: 'Routine Maintenance',
    type: 'routine',
    status: 'approved',
    priority: 'low',
    requester: 'Mike Brown',
    assignedTo: 'Maintenance Team',
    scheduledDate: '2024-03-05 01:00 AM',
    description: 'Regular system maintenance and cleanup',
    impact: 'No service interruption expected'
  }
];

const ChangeManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<string[]>([]);

  const getStatusColor = (status: ChangeRequest['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: ChangeRequest['priority']) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'high':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: ChangeRequest['type']) => {
    switch (type) {
      case 'maintenance':
        return 'bg-blue-100 text-blue-800';
      case 'upgrade':
        return 'bg-purple-100 text-purple-800';
      case 'emergency':
        return 'bg-red-100 text-red-800';
      case 'routine':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Change Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage and track system changes and maintenance activities.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:flex sm:gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <Download className="-ml-0.5 h-5 w-5" />
            Export
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Plus className="-ml-0.5 h-5 w-5" />
            New Change Request
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            placeholder="Search change requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <Filter className="-ml-0.5 h-5 w-5" />
            Filter
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          <div className="flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Change Request
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Priority
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Scheduled
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Assigned To
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockChangeRequests.map((request) => (
                      <tr key={request.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                          <div className="font-medium text-gray-900">
                            {request.title}
                          </div>
                          <div className="text-gray-500">{request.id}</div>
                          <div className="text-gray-500">{request.description}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getTypeColor(
                              request.type
                            )}`}
                          >
                            <Tag className="mr-1 h-4 w-4" />
                            {request.type}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getPriorityColor(
                              request.priority
                            )}`}
                          >
                            {request.priority}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getStatusColor(
                              request.status
                            )}`}
                          >
                            {request.status === 'completed' ? (
                              <CheckCircle2 className="mr-1 h-4 w-4" />
                            ) : request.status === 'rejected' ? (
                              <XCircle className="mr-1 h-4 w-4" />
                            ) : request.status === 'pending' ? (
                              <Clock className="mr-1 h-4 w-4" />
                            ) : (
                              <AlertTriangle className="mr-1 h-4 w-4" />
                            )}
                            {request.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4" />
                            {request.scheduledDate}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="mr-1 h-4 w-4" />
                            {request.assignedTo}
                          </div>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <button
                            type="button"
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <MoreVertical className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeManagementPage; 
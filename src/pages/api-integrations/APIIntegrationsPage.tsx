import React, { useState } from 'react';
import {
  Code,
  Globe,
  Key,
  RefreshCw,
  Plus,
  Search,
  Filter,
  ChevronDown,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';

interface APIEndpoint {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  status: 'active' | 'inactive' | 'deprecated';
  lastUsed: string;
  usage: number;
}

const mockEndpoints: APIEndpoint[] = [
  {
    id: '1',
    name: 'Customer Data API',
    url: '/api/v1/customers',
    method: 'GET',
    status: 'active',
    lastUsed: '2024-02-28 14:30:00',
    usage: 1250
  },
  {
    id: '2',
    name: 'Network Status API',
    url: '/api/v1/network/status',
    method: 'GET',
    status: 'active',
    lastUsed: '2024-02-28 14:25:00',
    usage: 3420
  },
  {
    id: '3',
    name: 'Device Management API',
    url: '/api/v1/devices',
    method: 'POST',
    status: 'deprecated',
    lastUsed: '2024-02-27 10:15:00',
    usage: 150
  }
];

interface Integration {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  endpoints: number;
}

const mockIntegrations: Integration[] = [
  {
    id: '1',
    name: 'CRM System',
    type: 'REST API',
    status: 'connected',
    lastSync: '2024-02-28 14:30:00',
    endpoints: 5
  },
  {
    id: '2',
    name: 'Billing System',
    type: 'SOAP API',
    status: 'connected',
    lastSync: '2024-02-28 14:25:00',
    endpoints: 3
  },
  {
    id: '3',
    name: 'Legacy System',
    type: 'REST API',
    status: 'error',
    lastSync: '2024-02-27 10:15:00',
    endpoints: 2
  }
];

const APIIntegrationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  const getStatusColor = (status: APIEndpoint['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'deprecated':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getIntegrationStatusColor = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800';
      case 'disconnected':
        return 'bg-gray-100 text-gray-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">API Integrations</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage API endpoints and external system integrations.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:flex sm:gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <RefreshCw className="-ml-0.5 h-5 w-5" />
            Refresh
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Plus className="-ml-0.5 h-5 w-5" />
            New Integration
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              External Integrations
            </h3>
            <div className="mt-6 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                        >
                          Integration
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
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Last Sync
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {mockIntegrations.map((integration) => (
                        <tr key={integration.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                            <div className="font-medium text-gray-900">
                              {integration.name}
                            </div>
                            <div className="text-gray-500">
                              {integration.endpoints} endpoints
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {integration.type}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span
                              className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getIntegrationStatusColor(
                                integration.status
                              )}`}
                            >
                              {integration.status === 'connected' ? (
                                <CheckCircle2 className="mr-1 h-4 w-4" />
                              ) : integration.status === 'error' ? (
                                <XCircle className="mr-1 h-4 w-4" />
                              ) : (
                                <Clock className="mr-1 h-4 w-4" />
                              )}
                              {integration.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {integration.lastSync}
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

        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              API Endpoints
            </h3>
            <div className="mt-6 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                        >
                          Endpoint
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Method
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
                          Usage
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {mockEndpoints.map((endpoint) => (
                        <tr key={endpoint.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                            <div className="font-medium text-gray-900">
                              {endpoint.name}
                            </div>
                            <div className="text-gray-500">{endpoint.url}</div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span
                              className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                                endpoint.method === 'GET'
                                  ? 'bg-blue-100 text-blue-800'
                                  : endpoint.method === 'POST'
                                  ? 'bg-green-100 text-green-800'
                                  : endpoint.method === 'PUT'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {endpoint.method}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span
                              className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getStatusColor(
                                endpoint.status
                              )}`}
                            >
                              {endpoint.status === 'active' ? (
                                <CheckCircle2 className="mr-1 h-4 w-4" />
                              ) : endpoint.status === 'deprecated' ? (
                                <AlertTriangle className="mr-1 h-4 w-4" />
                              ) : (
                                <Clock className="mr-1 h-4 w-4" />
                              )}
                              {endpoint.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {endpoint.usage.toLocaleString()} calls
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

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            API Documentation
          </h3>
          <div className="mt-6">
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-500">
                API documentation and integration guides are available in our developer portal.
                For detailed information about endpoints, authentication, and usage examples,
                please visit the documentation section.
              </p>
            </div>
            <div className="mt-4">
              <a
                href="#"
                className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <Globe className="-ml-0.5 h-5 w-5" />
                View Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIIntegrationsPage; 
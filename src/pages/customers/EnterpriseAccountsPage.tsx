import React from 'react';
import { Building, Users, CheckCircle, AlertTriangle, DollarSign, Activity } from 'lucide-react';

const EnterpriseAccountsPage: React.FC = () => {
  const enterpriseAccounts = [
    {
      id: 'ENT001',
      companyName: 'TechCorp Solutions',
      accountManager: 'Sarah Johnson',
      status: 'active',
      contractValue: 50000,
      services: ['MPLS', 'IP Access', 'VPN'],
      employees: 250,
      location: 'Downtown Business District',
      contractEnd: '2025-12-31',
      monthlyRevenue: 4200
    },
    {
      id: 'ENT002',
      companyName: 'Global Manufacturing Ltd',
      accountManager: 'Mike Wilson',
      status: 'active',
      contractValue: 75000,
      services: ['MPLS', 'Security Solutions', 'IP Access'],
      employees: 500,
      location: 'North Industrial Zone',
      contractEnd: '2026-06-30',
      monthlyRevenue: 6250
    },
    {
      id: 'ENT003',
      companyName: 'Financial Services Inc',
      accountManager: 'Emily Davis',
      status: 'pending',
      contractValue: 120000,
      services: ['MPLS', 'VPN', 'Security Solutions'],
      employees: 800,
      location: 'Financial District',
      contractEnd: '2026-03-15',
      monthlyRevenue: 10000
    },
    {
      id: 'ENT004',
      companyName: 'Healthcare Systems',
      accountManager: 'David Brown',
      status: 'active',
      contractValue: 35000,
      services: ['IP Access', 'VPN'],
      employees: 150,
      location: 'Medical Center',
      contractEnd: '2025-09-30',
      monthlyRevenue: 2900
    },
    {
      id: 'ENT005',
      companyName: 'Retail Chain Corp',
      accountManager: 'John Smith',
      status: 'warning',
      contractValue: 25000,
      services: ['IP Access'],
      employees: 100,
      location: 'Shopping District',
      contractEnd: '2025-08-15',
      monthlyRevenue: 2100
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'warning':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-red-600 bg-red-50';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Enterprise Accounts</h1>
        <p className="text-gray-600">Manage enterprise customer accounts and services</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Building className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Accounts</p>
              <p className="text-2xl font-bold text-gray-900">{enterpriseAccounts.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {enterpriseAccounts.filter(a => a.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-purple-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${enterpriseAccounts.reduce((acc, a) => acc + a.monthlyRevenue, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-orange-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">
                {enterpriseAccounts.reduce((acc, a) => acc + a.employees, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enterprise Accounts Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Enterprise Accounts</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Services
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contract Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monthly Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account Manager
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enterpriseAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Building className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{account.companyName}</div>
                        <div className="text-sm text-gray-500">{account.location}</div>
                        <div className="text-xs text-gray-400">{account.employees} employees</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(account.status)}
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(account.status)}`}>
                        {account.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {account.services.map((service, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {service}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${account.contractValue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${account.monthlyRevenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {account.accountManager}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Account Details */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Account Details</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-2">TechCorp Solutions</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><span className="font-medium">Account Manager:</span> Sarah Johnson</p>
                  <p><span className="font-medium">Contract End:</span> December 31, 2025</p>
                  <p><span className="font-medium">Location:</span> Downtown Business District</p>
                  <p><span className="font-medium">Employees:</span> 250</p>
                  <p><span className="font-medium">Services:</span> MPLS, IP Access, VPN</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Analytics</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">$25,450</div>
                <div className="text-sm text-gray-600">Total Monthly Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">$305,000</div>
                <div className="text-sm text-gray-600">Total Contract Value</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">5</div>
                <div className="text-sm text-gray-600">Active Accounts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseAccountsPage; 
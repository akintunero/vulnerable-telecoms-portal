import Layout from '../../components/layout/Layout';

export default function CustomerContracts() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Customer Contracts</h1>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Contracts</dt>
                    <dd className="text-lg font-medium text-gray-900">1,245</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Expiring Soon</dt>
                    <dd className="text-lg font-medium text-gray-900">45</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending Renewals</dt>
                    <dd className="text-lg font-medium text-gray-900">28</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contract List */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Active Contracts</h3>
          </div>
          <div className="border-t border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">CNT-001</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Acme Corp</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">MPLS, Cloud</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2023-01-01</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-12-31</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">CNT-002</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">TechStart Inc</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">VoIP, Security</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2023-03-15</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-03-14</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Expiring</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">CNT-003</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Global Services</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">MPLS, VoIP</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2023-06-01</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2026-05-31</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Contract Metrics */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Contract Metrics</h3>
          </div>
          <div className="border-t border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Duration</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renewal Rate</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Enterprise</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">245</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$12.5M</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">36 months</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">85%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Business</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">850</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$8.2M</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">24 months</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">75%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Residential</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">12,450</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$4.8M</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">12 months</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">65%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 
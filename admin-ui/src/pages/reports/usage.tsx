import Layout from '../../components/layout/Layout';

export default function UsageReports() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Usage Reports</h1>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Bandwidth Usage</dt>
                    <dd className="text-lg font-medium text-gray-900">75%</dd>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Storage Usage</dt>
                    <dd className="text-lg font-medium text-gray-900">82%</dd>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">CPU Usage</dt>
                    <dd className="text-lg font-medium text-gray-900">65%</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Usage */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Service Usage</h3>
          </div>
          <div className="border-t border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peak</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">MPLS</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">75%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">85%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">70%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">↑ 5%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Cloud</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">82%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">90%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">78%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">↑ 8%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">VoIP</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">65%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">75%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">62%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">↑ 3%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Usage Trends */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Usage Trends</h3>
          </div>
          <div className="border-t border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Week</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Month</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Bandwidth</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">75%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">72%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">68%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">↑ 7%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Storage</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">82%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">80%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">75%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">↑ 7%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">CPU</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">65%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">62%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">60%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">↑ 5%</td>
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
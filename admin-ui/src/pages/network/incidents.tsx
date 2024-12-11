import Layout from '../../components/layout/Layout';

export default function NetworkIncidents() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Network Incidents</h1>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Active Incidents</h3>
            <p className="text-3xl font-bold text-red-600">3</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Resolved Today</h3>
            <p className="text-3xl font-bold text-green-600">12</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Avg. Resolution Time</h3>
            <p className="text-3xl font-bold text-blue-600">45m</p>
          </div>
        </div>
        
        {/* Active Incidents */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Active Incidents</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">INC-001</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Link Failure</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Core Router 1</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">High</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Investigating</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">15m ago</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">INC-002</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">High Latency</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Distribution Switch 2</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Medium</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">In Progress</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">45m ago</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">INC-003</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Packet Loss</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Access Switch 3</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Medium</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">In Progress</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1h ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Recent Resolutions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Recent Resolutions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resolution</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resolved By</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">INC-000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Interface Down</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Replaced faulty cable</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">30m</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Smith</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">INC-999</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">High CPU</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Optimized routing table</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">45m</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sarah Johnson</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
} 
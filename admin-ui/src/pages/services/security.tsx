import Layout from '../../components/layout/Layout';

export default function SecurityServices() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Security Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Active Services</h3>
            <p className="text-3xl font-bold text-indigo-600">320</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Incidents This Month</h3>
            <p className="text-3xl font-bold text-red-600">8</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Compliance Rate</h3>
            <p className="text-3xl font-bold text-green-600">99.2%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Service List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">SEC-001</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Firewall</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Acme Corp</td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-03-15</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">SEC-002</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">IDS</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">TechStart Inc</td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-03-14</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">SEC-003</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">DDoS Protection</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Global Services</td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-03-13</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
} 
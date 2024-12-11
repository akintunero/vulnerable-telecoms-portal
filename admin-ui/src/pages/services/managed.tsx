import Layout from '../../components/layout/Layout';

export default function ManagedServices() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Managed Services</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Active Services</div>
          <div className="text-2xl font-bold text-blue-600">450</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">SLA Compliance</div>
          <div className="text-2xl font-bold text-green-600">99.5%</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Open Tickets</div>
          <div className="text-2xl font-bold text-yellow-600">25</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Active Services</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Service ID</th>
              <th className="px-2 py-1 text-left">Customer</th>
              <th className="px-2 py-1 text-left">Type</th>
              <th className="px-2 py-1 text-left">Start Date</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">MS-001</td>
              <td className="px-2 py-1">Acme Corp</td>
              <td className="px-2 py-1">Network</td>
              <td className="px-2 py-1">2024-01-01</td>
              <td className="px-2 py-1 text-green-600">Active</td>
            </tr>
            <tr>
              <td className="px-2 py-1">MS-002</td>
              <td className="px-2 py-1">TechStart Inc</td>
              <td className="px-2 py-1">Security</td>
              <td className="px-2 py-1">2024-02-01</td>
              <td className="px-2 py-1 text-green-600">Active</td>
            </tr>
            <tr>
              <td className="px-2 py-1">MS-003</td>
              <td className="px-2 py-1">Global Services</td>
              <td className="px-2 py-1">Cloud</td>
              <td className="px-2 py-1">2024-03-01</td>
              <td className="px-2 py-1 text-yellow-600">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Service Health</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Service ID</th>
              <th className="px-2 py-1 text-left">Uptime</th>
              <th className="px-2 py-1 text-left">Response Time</th>
              <th className="px-2 py-1 text-left">Last Check</th>
              <th className="px-2 py-1 text-left">Health</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">MS-001</td>
              <td className="px-2 py-1">99.99%</td>
              <td className="px-2 py-1">45ms</td>
              <td className="px-2 py-1">2m ago</td>
              <td className="px-2 py-1 text-green-600">Healthy</td>
            </tr>
            <tr>
              <td className="px-2 py-1">MS-002</td>
              <td className="px-2 py-1">99.95%</td>
              <td className="px-2 py-1">55ms</td>
              <td className="px-2 py-1">1m ago</td>
              <td className="px-2 py-1 text-green-600">Healthy</td>
            </tr>
            <tr>
              <td className="px-2 py-1">MS-003</td>
              <td className="px-2 py-1">99.90%</td>
              <td className="px-2 py-1">65ms</td>
              <td className="px-2 py-1">5m ago</td>
              <td className="px-2 py-1 text-yellow-600">Warning</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
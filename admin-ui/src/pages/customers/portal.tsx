import Layout from '../../components/layout/Layout';

export default function CustomerPortal() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Customer Portal</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Active Users</div>
          <div className="text-2xl font-bold text-blue-600">2,100</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Portal Logins</div>
          <div className="text-2xl font-bold text-green-600">5,250</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Self-Service Rate</div>
          <div className="text-2xl font-bold text-blue-600">85%</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Recent Activities</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Customer</th>
              <th className="px-2 py-1 text-left">Activity</th>
              <th className="px-2 py-1 text-left">Timestamp</th>
              <th className="px-2 py-1 text-left">Status</th>
              <th className="px-2 py-1 text-left">User</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">Acme Corp</td>
              <td className="px-2 py-1">Service Upgrade</td>
              <td className="px-2 py-1">2024-02-15 14:30</td>
              <td className="px-2 py-1 text-green-600">Completed</td>
              <td className="px-2 py-1">John Smith</td>
            </tr>
            <tr>
              <td className="px-2 py-1">TechStart Inc</td>
              <td className="px-2 py-1">Bill Payment</td>
              <td className="px-2 py-1">2024-02-15 15:15</td>
              <td className="px-2 py-1 text-green-600">Completed</td>
              <td className="px-2 py-1">Sarah Johnson</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Global Services</td>
              <td className="px-2 py-1">Support Ticket</td>
              <td className="px-2 py-1">2024-02-15 16:00</td>
              <td className="px-2 py-1 text-yellow-600">Pending</td>
              <td className="px-2 py-1">Mike Brown</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Portal Usage</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Feature</th>
              <th className="px-2 py-1 text-left">Usage Count</th>
              <th className="px-2 py-1 text-left">Success Rate</th>
              <th className="px-2 py-1 text-left">Avg Time</th>
              <th className="px-2 py-1 text-left">Trend</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">Bill Payment</td>
              <td className="px-2 py-1">1,250</td>
              <td className="px-2 py-1">99.5%</td>
              <td className="px-2 py-1">2m</td>
              <td className="px-2 py-1 text-green-600">↑</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Service Management</td>
              <td className="px-2 py-1">850</td>
              <td className="px-2 py-1">98.0%</td>
              <td className="px-2 py-1">5m</td>
              <td className="px-2 py-1 text-green-600">↑</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Support Tickets</td>
              <td className="px-2 py-1">650</td>
              <td className="px-2 py-1">95.5%</td>
              <td className="px-2 py-1">3m</td>
              <td className="px-2 py-1 text-green-600">↑</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
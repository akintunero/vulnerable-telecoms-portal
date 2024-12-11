import Layout from '../../components/layout/Layout';

export default function SupportTickets() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Support Tickets</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Open Tickets</div>
          <div className="text-2xl font-bold text-blue-600">45</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Avg. Response</div>
          <div className="text-2xl font-bold text-green-600">15m</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Resolution Rate</div>
          <div className="text-2xl font-bold text-green-600">95%</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Recent Tickets</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Ticket ID</th>
              <th className="px-2 py-1 text-left">Customer</th>
              <th className="px-2 py-1 text-left">Subject</th>
              <th className="px-2 py-1 text-left">Priority</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">TKT-001</td>
              <td className="px-2 py-1">Acme Corp</td>
              <td className="px-2 py-1">Network Outage</td>
              <td className="px-2 py-1 text-red-600">High</td>
              <td className="px-2 py-1 text-yellow-600">In Progress</td>
            </tr>
            <tr>
              <td className="px-2 py-1">TKT-002</td>
              <td className="px-2 py-1">TechStart Inc</td>
              <td className="px-2 py-1">Billing Query</td>
              <td className="px-2 py-1 text-yellow-600">Medium</td>
              <td className="px-2 py-1 text-green-600">Resolved</td>
            </tr>
            <tr>
              <td className="px-2 py-1">TKT-003</td>
              <td className="px-2 py-1">Global Services</td>
              <td className="px-2 py-1">Service Upgrade</td>
              <td className="px-2 py-1 text-blue-600">Low</td>
              <td className="px-2 py-1 text-yellow-600">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Ticket Metrics</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Category</th>
              <th className="px-2 py-1 text-left">Total</th>
              <th className="px-2 py-1 text-left">Resolution Time</th>
              <th className="px-2 py-1 text-left">Satisfaction</th>
              <th className="px-2 py-1 text-left">Trend</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">Technical</td>
              <td className="px-2 py-1">250</td>
              <td className="px-2 py-1">2h</td>
              <td className="px-2 py-1">4.8/5</td>
              <td className="px-2 py-1 text-green-600">Improving</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Billing</td>
              <td className="px-2 py-1">150</td>
              <td className="px-2 py-1">1h</td>
              <td className="px-2 py-1">4.6/5</td>
              <td className="px-2 py-1 text-green-600">Stable</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Account</td>
              <td className="px-2 py-1">100</td>
              <td className="px-2 py-1">30m</td>
              <td className="px-2 py-1">4.7/5</td>
              <td className="px-2 py-1 text-green-600">Improving</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
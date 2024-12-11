import Layout from '../../components/layout/Layout';

export default function ServiceDesk() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Service Desk</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Active Agents</div>
          <div className="text-2xl font-bold text-blue-600">25</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Avg. Handle Time</div>
          <div className="text-2xl font-bold text-green-600">12m</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">First Call Resolution</div>
          <div className="text-2xl font-bold text-green-600">85%</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Active Agents</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Agent</th>
              <th className="px-2 py-1 text-left">Specialty</th>
              <th className="px-2 py-1 text-left">Tickets</th>
              <th className="px-2 py-1 text-left">Avg. Rating</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">John Smith</td>
              <td className="px-2 py-1">Network</td>
              <td className="px-2 py-1">12</td>
              <td className="px-2 py-1">4.9/5</td>
              <td className="px-2 py-1 text-green-600">Available</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Sarah Johnson</td>
              <td className="px-2 py-1">Cloud</td>
              <td className="px-2 py-1">8</td>
              <td className="px-2 py-1">4.8/5</td>
              <td className="px-2 py-1 text-green-600">Available</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Michael Brown</td>
              <td className="px-2 py-1">Security</td>
              <td className="px-2 py-1">15</td>
              <td className="px-2 py-1">4.7/5</td>
              <td className="px-2 py-1 text-yellow-600">Busy</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Team Performance</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Team</th>
              <th className="px-2 py-1 text-left">Agents</th>
              <th className="px-2 py-1 text-left">Tickets/Day</th>
              <th className="px-2 py-1 text-left">Resolution</th>
              <th className="px-2 py-1 text-left">Satisfaction</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">Network Support</td>
              <td className="px-2 py-1">10</td>
              <td className="px-2 py-1">50</td>
              <td className="px-2 py-1">95%</td>
              <td className="px-2 py-1">4.8/5</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Cloud Support</td>
              <td className="px-2 py-1">8</td>
              <td className="px-2 py-1">40</td>
              <td className="px-2 py-1">92%</td>
              <td className="px-2 py-1">4.7/5</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Security Support</td>
              <td className="px-2 py-1">7</td>
              <td className="px-2 py-1">35</td>
              <td className="px-2 py-1">90%</td>
              <td className="px-2 py-1">4.6/5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
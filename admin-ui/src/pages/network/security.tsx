import Layout from '../../components/layout/Layout';

export default function NetworkSecurity() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Network Security</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Active Threats</div>
          <div className="text-2xl font-bold text-red-600">12</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Blocked Attempts</div>
          <div className="text-2xl font-bold text-blue-600">1,250</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Security Score</div>
          <div className="text-2xl font-bold text-green-600">92%</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Active Threats</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Threat ID</th>
              <th className="px-2 py-1 text-left">Type</th>
              <th className="px-2 py-1 text-left">Source</th>
              <th className="px-2 py-1 text-left">Target</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">THR-001</td>
              <td className="px-2 py-1">DDoS</td>
              <td className="px-2 py-1">192.168.1.100</td>
              <td className="px-2 py-1">FW-PERIM-01</td>
              <td className="px-2 py-1 text-red-600">Active</td>
            </tr>
            <tr>
              <td className="px-2 py-1">THR-002</td>
              <td className="px-2 py-1">Malware</td>
              <td className="px-2 py-1">10.0.0.50</td>
              <td className="px-2 py-1">SW-CORE-02</td>
              <td className="px-2 py-1 text-yellow-600">Investigating</td>
            </tr>
            <tr>
              <td className="px-2 py-1">THR-003</td>
              <td className="px-2 py-1">Brute Force</td>
              <td className="px-2 py-1">172.16.0.25</td>
              <td className="px-2 py-1">RT-EDGE-03</td>
              <td className="px-2 py-1 text-red-600">Active</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Security Events</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Event</th>
              <th className="px-2 py-1 text-left">Category</th>
              <th className="px-2 py-1 text-left">Count</th>
              <th className="px-2 py-1 text-left">Last Seen</th>
              <th className="px-2 py-1 text-left">Severity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">Failed Login</td>
              <td className="px-2 py-1">Authentication</td>
              <td className="px-2 py-1">150</td>
              <td className="px-2 py-1">2m ago</td>
              <td className="px-2 py-1 text-yellow-600">Medium</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Port Scan</td>
              <td className="px-2 py-1">Reconnaissance</td>
              <td className="px-2 py-1">45</td>
              <td className="px-2 py-1">5m ago</td>
              <td className="px-2 py-1 text-red-600">High</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Policy Violation</td>
              <td className="px-2 py-1">Compliance</td>
              <td className="px-2 py-1">8</td>
              <td className="px-2 py-1">15m ago</td>
              <td className="px-2 py-1 text-yellow-600">Medium</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
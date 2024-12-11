import Layout from '../../components/layout/Layout';

export default function SecurityIncidents() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Security Incidents</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Active Incidents</div>
          <div className="text-2xl font-bold text-red-600">3</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Resolved Today</div>
          <div className="text-2xl font-bold text-green-600">5</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Average Resolution Time</div>
          <div className="text-2xl font-bold text-blue-600">2.5h</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Active Incidents</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">ID</th>
              <th className="px-2 py-1 text-left">Type</th>
              <th className="px-2 py-1 text-left">Severity</th>
              <th className="px-2 py-1 text-left">Detected</th>
              <th className="px-2 py-1 text-left">Status</th>
              <th className="px-2 py-1 text-left">Assigned To</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">INC-2024-001</td>
              <td className="px-2 py-1">DDoS Attack</td>
              <td className="px-2 py-1 text-red-600">High</td>
              <td className="px-2 py-1">2024-02-15 10:30</td>
              <td className="px-2 py-1 text-yellow-600">Investigating</td>
              <td className="px-2 py-1">John Smith</td>
            </tr>
            <tr>
              <td className="px-2 py-1">INC-2024-002</td>
              <td className="px-2 py-1">Suspicious Login</td>
              <td className="px-2 py-1 text-orange-600">Medium</td>
              <td className="px-2 py-1">2024-02-15 11:15</td>
              <td className="px-2 py-1 text-yellow-600">Investigating</td>
              <td className="px-2 py-1">Sarah Johnson</td>
            </tr>
            <tr>
              <td className="px-2 py-1">INC-2024-003</td>
              <td className="px-2 py-1">Malware Detection</td>
              <td className="px-2 py-1 text-red-600">High</td>
              <td className="px-2 py-1">2024-02-15 12:00</td>
              <td className="px-2 py-1 text-yellow-600">Investigating</td>
              <td className="px-2 py-1">Mike Brown</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Recent Resolutions</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">ID</th>
              <th className="px-2 py-1 text-left">Type</th>
              <th className="px-2 py-1 text-left">Resolution</th>
              <th className="px-2 py-1 text-left">Duration</th>
              <th className="px-2 py-1 text-left">Resolved By</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">INC-2024-000</td>
              <td className="px-2 py-1">Brute Force Attempt</td>
              <td className="px-2 py-1">IP Blocked</td>
              <td className="px-2 py-1">45m</td>
              <td className="px-2 py-1">John Smith</td>
            </tr>
            <tr>
              <td className="px-2 py-1">INC-2024-001</td>
              <td className="px-2 py-1">Data Leak</td>
              <td className="px-2 py-1">Access Revoked</td>
              <td className="px-2 py-1">2h 15m</td>
              <td className="px-2 py-1">Sarah Johnson</td>
            </tr>
            <tr>
              <td className="px-2 py-1">INC-2024-002</td>
              <td className="px-2 py-1">Suspicious Activity</td>
              <td className="px-2 py-1">False Positive</td>
              <td className="px-2 py-1">1h 30m</td>
              <td className="px-2 py-1">Mike Brown</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
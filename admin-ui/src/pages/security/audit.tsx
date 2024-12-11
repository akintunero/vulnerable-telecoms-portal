import Layout from '../../components/layout/Layout';

export default function SecurityAudit() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Security Audit</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Total Audits</div>
          <div className="text-2xl font-bold text-blue-600">1,250</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Compliance Score</div>
          <div className="text-2xl font-bold text-green-600">96.5%</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Open Findings</div>
          <div className="text-2xl font-bold text-yellow-600">18</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Recent Audit Logs</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Timestamp</th>
              <th className="px-2 py-1 text-left">User</th>
              <th className="px-2 py-1 text-left">Action</th>
              <th className="px-2 py-1 text-left">Resource</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">2024-02-15 14:30</td>
              <td className="px-2 py-1">admin@telleak.com</td>
              <td className="px-2 py-1">Configuration Change</td>
              <td className="px-2 py-1">Firewall Rules</td>
              <td className="px-2 py-1 text-green-600">Success</td>
            </tr>
            <tr>
              <td className="px-2 py-1">2024-02-15 14:25</td>
              <td className="px-2 py-1">security@telleak.com</td>
              <td className="px-2 py-1">Access Review</td>
              <td className="px-2 py-1">Admin Portal</td>
              <td className="px-2 py-1 text-green-600">Success</td>
            </tr>
            <tr>
              <td className="px-2 py-1">2024-02-15 14:20</td>
              <td className="px-2 py-1">user@telleak.com</td>
              <td className="px-2 py-1">Failed Login</td>
              <td className="px-2 py-1">VPN Access</td>
              <td className="px-2 py-1 text-red-600">Failed</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Audit Findings</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Finding ID</th>
              <th className="px-2 py-1 text-left">Category</th>
              <th className="px-2 py-1 text-left">Severity</th>
              <th className="px-2 py-1 text-left">Discovered</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">AUD-2024-001</td>
              <td className="px-2 py-1">Access Control</td>
              <td className="px-2 py-1 text-red-600">High</td>
              <td className="px-2 py-1">2024-02-15</td>
              <td className="px-2 py-1 text-yellow-600">Investigating</td>
            </tr>
            <tr>
              <td className="px-2 py-1">AUD-2024-002</td>
              <td className="px-2 py-1">Data Protection</td>
              <td className="px-2 py-1 text-yellow-600">Medium</td>
              <td className="px-2 py-1">2024-02-14</td>
              <td className="px-2 py-1 text-green-600">Resolved</td>
            </tr>
            <tr>
              <td className="px-2 py-1">AUD-2024-003</td>
              <td className="px-2 py-1">Network Security</td>
              <td className="px-2 py-1 text-yellow-600">Medium</td>
              <td className="px-2 py-1">2024-02-13</td>
              <td className="px-2 py-1 text-green-600">Resolved</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
import Layout from '../../components/layout/Layout';

export default function SecurityPolicies() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Security Policies</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Active Policies</div>
          <div className="text-2xl font-bold text-blue-600">45</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Compliance Rate</div>
          <div className="text-2xl font-bold text-green-600">98.5%</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Violations</div>
          <div className="text-2xl font-bold text-yellow-600">12</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Policy Compliance</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Policy Name</th>
              <th className="px-2 py-1 text-left">Category</th>
              <th className="px-2 py-1 text-left">Compliance</th>
              <th className="px-2 py-1 text-left">Last Audit</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">Password Policy</td>
              <td className="px-2 py-1">Access Control</td>
              <td className="px-2 py-1">99.9%</td>
              <td className="px-2 py-1">2024-02-15</td>
              <td className="px-2 py-1 text-green-600">Compliant</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Data Encryption</td>
              <td className="px-2 py-1">Data Protection</td>
              <td className="px-2 py-1">98.5%</td>
              <td className="px-2 py-1">2024-02-14</td>
              <td className="px-2 py-1 text-green-600">Compliant</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Network Access</td>
              <td className="px-2 py-1">Network Security</td>
              <td className="px-2 py-1">95.0%</td>
              <td className="px-2 py-1">2024-02-13</td>
              <td className="px-2 py-1 text-yellow-600">At Risk</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Recent Violations</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Policy</th>
              <th className="px-2 py-1 text-left">Resource</th>
              <th className="px-2 py-1 text-left">Severity</th>
              <th className="px-2 py-1 text-left">Detected</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">Access Control</td>
              <td className="px-2 py-1">Admin Portal</td>
              <td className="px-2 py-1 text-red-600">High</td>
              <td className="px-2 py-1">2024-02-15</td>
              <td className="px-2 py-1 text-yellow-600">Investigating</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Data Protection</td>
              <td className="px-2 py-1">Customer DB</td>
              <td className="px-2 py-1 text-yellow-600">Medium</td>
              <td className="px-2 py-1">2024-02-14</td>
              <td className="px-2 py-1 text-green-600">Resolved</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Network Security</td>
              <td className="px-2 py-1">VPN Access</td>
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
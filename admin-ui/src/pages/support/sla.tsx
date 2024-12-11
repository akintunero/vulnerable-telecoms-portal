import Layout from '../../components/layout/Layout';

export default function SLAManagement() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Service Level Agreements</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Overall Compliance</div>
          <div className="text-2xl font-bold text-blue-600">98.5%</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Active SLAs</div>
          <div className="text-2xl font-bold text-green-600">245</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">At Risk</div>
          <div className="text-2xl font-bold text-yellow-600">12</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">SLA Compliance</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Service Type</th>
              <th className="px-2 py-1 text-left">Target</th>
              <th className="px-2 py-1 text-left">Current</th>
              <th className="px-2 py-1 text-left">Trend</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">Network Uptime</td>
              <td className="px-2 py-1">99.99%</td>
              <td className="px-2 py-1">99.995%</td>
              <td className="px-2 py-1 text-green-600">↑</td>
              <td className="px-2 py-1 text-green-600">Compliant</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Response Time</td>
              <td className="px-2 py-1">15min</td>
              <td className="px-2 py-1">12min</td>
              <td className="px-2 py-1 text-green-600">↑</td>
              <td className="px-2 py-1 text-green-600">Compliant</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Resolution Time</td>
              <td className="px-2 py-1">4hrs</td>
              <td className="px-2 py-1">4.5hrs</td>
              <td className="px-2 py-1 text-yellow-600">↓</td>
              <td className="px-2 py-1 text-yellow-600">At Risk</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Customer SLAs</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Customer</th>
              <th className="px-2 py-1 text-left">Service Level</th>
              <th className="px-2 py-1 text-left">Uptime</th>
              <th className="px-2 py-1 text-left">Response</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">Acme Corp</td>
              <td className="px-2 py-1">Platinum</td>
              <td className="px-2 py-1">99.999%</td>
              <td className="px-2 py-1">5min</td>
              <td className="px-2 py-1 text-green-600">Compliant</td>
            </tr>
            <tr>
              <td className="px-2 py-1">TechStart Inc</td>
              <td className="px-2 py-1">Gold</td>
              <td className="px-2 py-1">99.99%</td>
              <td className="px-2 py-1">15min</td>
              <td className="px-2 py-1 text-green-600">Compliant</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Global Services</td>
              <td className="px-2 py-1">Silver</td>
              <td className="px-2 py-1">99.9%</td>
              <td className="px-2 py-1">30min</td>
              <td className="px-2 py-1 text-yellow-600">At Risk</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
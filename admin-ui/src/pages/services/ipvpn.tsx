import Layout from '../../components/layout/Layout';

export default function IPVPNManagement() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">IP VPN Management</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Active VPNs</div>
          <div className="text-2xl font-bold text-blue-600">245</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Total Bandwidth</div>
          <div className="text-2xl font-bold text-green-600">1.2 TB</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Uptime</div>
          <div className="text-2xl font-bold text-blue-600">99.99%</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">VPN Circuits</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Circuit ID</th>
              <th className="px-2 py-1 text-left">Customer</th>
              <th className="px-2 py-1 text-left">Bandwidth</th>
              <th className="px-2 py-1 text-left">Sites</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">VPN-001</td>
              <td className="px-2 py-1">Acme Corp</td>
              <td className="px-2 py-1">100 Mbps</td>
              <td className="px-2 py-1">5</td>
              <td className="px-2 py-1 text-green-600">Active</td>
            </tr>
            <tr>
              <td className="px-2 py-1">VPN-002</td>
              <td className="px-2 py-1">TechStart Inc</td>
              <td className="px-2 py-1">500 Mbps</td>
              <td className="px-2 py-1">8</td>
              <td className="px-2 py-1 text-green-600">Active</td>
            </tr>
            <tr>
              <td className="px-2 py-1">VPN-003</td>
              <td className="px-2 py-1">Global Services</td>
              <td className="px-2 py-1">1 Gbps</td>
              <td className="px-2 py-1">12</td>
              <td className="px-2 py-1 text-yellow-600">Degraded</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Performance Metrics</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Circuit ID</th>
              <th className="px-2 py-1 text-left">Latency</th>
              <th className="px-2 py-1 text-left">Packet Loss</th>
              <th className="px-2 py-1 text-left">Utilization</th>
              <th className="px-2 py-1 text-left">Health</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">VPN-001</td>
              <td className="px-2 py-1">15ms</td>
              <td className="px-2 py-1">0.01%</td>
              <td className="px-2 py-1">65%</td>
              <td className="px-2 py-1 text-green-600">Good</td>
            </tr>
            <tr>
              <td className="px-2 py-1">VPN-002</td>
              <td className="px-2 py-1">20ms</td>
              <td className="px-2 py-1">0.02%</td>
              <td className="px-2 py-1">78%</td>
              <td className="px-2 py-1 text-green-600">Good</td>
            </tr>
            <tr>
              <td className="px-2 py-1">VPN-003</td>
              <td className="px-2 py-1">45ms</td>
              <td className="px-2 py-1">0.5%</td>
              <td className="px-2 py-1">92%</td>
              <td className="px-2 py-1 text-yellow-600">Warning</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
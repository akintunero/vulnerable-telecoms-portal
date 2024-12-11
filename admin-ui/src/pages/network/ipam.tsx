import Layout from '../../components/layout/Layout';

export default function IPAddressManagement() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">IP Address Management</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Total IPs</div>
          <div className="text-2xl font-bold">65,536</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Allocated</div>
          <div className="text-2xl font-bold text-blue-600">12,345</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Available</div>
          <div className="text-2xl font-bold text-green-600">53,191</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">IP Subnets</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Subnet</th>
              <th className="px-2 py-1 text-left">Description</th>
              <th className="px-2 py-1 text-left">Total IPs</th>
              <th className="px-2 py-1 text-left">Used</th>
              <th className="px-2 py-1 text-left">Available</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">10.0.0.0/24</td>
              <td className="px-2 py-1">Core Network</td>
              <td className="px-2 py-1">256</td>
              <td className="px-2 py-1">128</td>
              <td className="px-2 py-1">128</td>
            </tr>
            <tr>
              <td className="px-2 py-1">10.0.1.0/24</td>
              <td className="px-2 py-1">Customer VLAN</td>
              <td className="px-2 py-1">256</td>
              <td className="px-2 py-1">64</td>
              <td className="px-2 py-1">192</td>
            </tr>
            <tr>
              <td className="px-2 py-1">10.0.2.0/24</td>
              <td className="px-2 py-1">DMZ</td>
              <td className="px-2 py-1">256</td>
              <td className="px-2 py-1">32</td>
              <td className="px-2 py-1">224</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Recent IP Allocations</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">IP Address</th>
              <th className="px-2 py-1 text-left">Hostname</th>
              <th className="px-2 py-1 text-left">Customer</th>
              <th className="px-2 py-1 text-left">Allocated Date</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">10.0.1.100</td>
              <td className="px-2 py-1">web-server-01</td>
              <td className="px-2 py-1">Acme Corp</td>
              <td className="px-2 py-1">2024-02-15</td>
              <td className="px-2 py-1 text-green-600">Active</td>
            </tr>
            <tr>
              <td className="px-2 py-1">10.0.1.101</td>
              <td className="px-2 py-1">db-server-01</td>
              <td className="px-2 py-1">Acme Corp</td>
              <td className="px-2 py-1">2024-02-15</td>
              <td className="px-2 py-1 text-green-600">Active</td>
            </tr>
            <tr>
              <td className="px-2 py-1">10.0.2.50</td>
              <td className="px-2 py-1">firewall-01</td>
              <td className="px-2 py-1">Globex Inc</td>
              <td className="px-2 py-1">2024-02-14</td>
              <td className="px-2 py-1 text-green-600">Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
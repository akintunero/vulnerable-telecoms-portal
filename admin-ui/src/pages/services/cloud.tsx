import Layout from '../../components/layout/Layout';

export default function CloudServices() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Cloud Services</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Active Instances</div>
          <div className="text-2xl font-bold text-blue-600">1,250</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Storage Used</div>
          <div className="text-2xl font-bold text-green-600">25 TB</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Monthly Cost</div>
          <div className="text-2xl font-bold text-blue-600">$45,000</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Cloud Resources</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Resource ID</th>
              <th className="px-2 py-1 text-left">Type</th>
              <th className="px-2 py-1 text-left">Customer</th>
              <th className="px-2 py-1 text-left">Region</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">VM-001</td>
              <td className="px-2 py-1">Virtual Machine</td>
              <td className="px-2 py-1">Acme Corp</td>
              <td className="px-2 py-1">us-east-1</td>
              <td className="px-2 py-1 text-green-600">Running</td>
            </tr>
            <tr>
              <td className="px-2 py-1">DB-002</td>
              <td className="px-2 py-1">Database</td>
              <td className="px-2 py-1">TechStart Inc</td>
              <td className="px-2 py-1">eu-west-1</td>
              <td className="px-2 py-1 text-green-600">Running</td>
            </tr>
            <tr>
              <td className="px-2 py-1">ST-003</td>
              <td className="px-2 py-1">Storage</td>
              <td className="px-2 py-1">Global Services</td>
              <td className="px-2 py-1">ap-southeast-1</td>
              <td className="px-2 py-1 text-yellow-600">Warning</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Resource Utilization</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Resource ID</th>
              <th className="px-2 py-1 text-left">CPU Usage</th>
              <th className="px-2 py-1 text-left">Memory</th>
              <th className="px-2 py-1 text-left">Storage</th>
              <th className="px-2 py-1 text-left">Network</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">VM-001</td>
              <td className="px-2 py-1">65%</td>
              <td className="px-2 py-1">4GB/8GB</td>
              <td className="px-2 py-1">100GB</td>
              <td className="px-2 py-1">50 Mbps</td>
            </tr>
            <tr>
              <td className="px-2 py-1">DB-002</td>
              <td className="px-2 py-1">78%</td>
              <td className="px-2 py-1">8GB/16GB</td>
              <td className="px-2 py-1">500GB</td>
              <td className="px-2 py-1">100 Mbps</td>
            </tr>
            <tr>
              <td className="px-2 py-1">ST-003</td>
              <td className="px-2 py-1">92%</td>
              <td className="px-2 py-1">16GB/32GB</td>
              <td className="px-2 py-1">1TB</td>
              <td className="px-2 py-1">200 Mbps</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
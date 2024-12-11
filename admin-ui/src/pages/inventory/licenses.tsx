import Layout from '../../components/layout/Layout';

export default function SoftwareLicenses() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Software Licenses</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Active Licenses</div>
          <div className="text-2xl font-bold text-blue-600">245</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Expiring Soon</div>
          <div className="text-2xl font-bold text-orange-600">12</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Total Value</div>
          <div className="text-2xl font-bold text-green-600">$450K</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">License Inventory</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Software</th>
              <th className="px-2 py-1 text-left">License Type</th>
              <th className="px-2 py-1 text-left">Quantity</th>
              <th className="px-2 py-1 text-left">Expiry Date</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">Cisco DNA Center</td>
              <td className="px-2 py-1">Enterprise</td>
              <td className="px-2 py-1">50</td>
              <td className="px-2 py-1">2024-12-31</td>
              <td className="px-2 py-1 text-green-600">Active</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Palo Alto Panorama</td>
              <td className="px-2 py-1">Professional</td>
              <td className="px-2 py-1">25</td>
              <td className="px-2 py-1">2024-06-30</td>
              <td className="px-2 py-1 text-yellow-600">Expiring Soon</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Juniper Space</td>
              <td className="px-2 py-1">Standard</td>
              <td className="px-2 py-1">100</td>
              <td className="px-2 py-1">2024-09-30</td>
              <td className="px-2 py-1 text-green-600">Active</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">License Usage</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Software</th>
              <th className="px-2 py-1 text-left">Total Licenses</th>
              <th className="px-2 py-1 text-left">Used</th>
              <th className="px-2 py-1 text-left">Available</th>
              <th className="px-2 py-1 text-left">Utilization</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">Cisco DNA Center</td>
              <td className="px-2 py-1">50</td>
              <td className="px-2 py-1">45</td>
              <td className="px-2 py-1">5</td>
              <td className="px-2 py-1 text-green-600">90%</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Palo Alto Panorama</td>
              <td className="px-2 py-1">25</td>
              <td className="px-2 py-1">25</td>
              <td className="px-2 py-1">0</td>
              <td className="px-2 py-1 text-yellow-600">100%</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Juniper Space</td>
              <td className="px-2 py-1">100</td>
              <td className="px-2 py-1">75</td>
              <td className="px-2 py-1">25</td>
              <td className="px-2 py-1 text-green-600">75%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
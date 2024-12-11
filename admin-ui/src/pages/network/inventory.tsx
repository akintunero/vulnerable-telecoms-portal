import Layout from '../../components/layout/Layout';

export default function NetworkInventory() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Network Inventory</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Total Devices</div>
          <div className="text-2xl font-bold text-blue-600">1,250</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Active Devices</div>
          <div className="text-2xl font-bold text-green-600">1,180</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Maintenance Due</div>
          <div className="text-2xl font-bold text-yellow-600">45</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Device Inventory</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Device ID</th>
              <th className="px-2 py-1 text-left">Type</th>
              <th className="px-2 py-1 text-left">Location</th>
              <th className="px-2 py-1 text-left">Last Updated</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">SW-CORE-01</td>
              <td className="px-2 py-1">Switch</td>
              <td className="px-2 py-1">NYC-DC</td>
              <td className="px-2 py-1">2h ago</td>
              <td className="px-2 py-1 text-green-600">Active</td>
            </tr>
            <tr>
              <td className="px-2 py-1">RT-EDGE-02</td>
              <td className="px-2 py-1">Router</td>
              <td className="px-2 py-1">LON-DC</td>
              <td className="px-2 py-1">1h ago</td>
              <td className="px-2 py-1 text-green-600">Active</td>
            </tr>
            <tr>
              <td className="px-2 py-1">FW-PERIM-03</td>
              <td className="px-2 py-1">Firewall</td>
              <td className="px-2 py-1">SIN-DC</td>
              <td className="px-2 py-1">5m ago</td>
              <td className="px-2 py-1 text-yellow-600">Maintenance</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Asset Management</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Asset</th>
              <th className="px-2 py-1 text-left">Category</th>
              <th className="px-2 py-1 text-left">Purchase Date</th>
              <th className="px-2 py-1 text-left">Warranty</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">CISCO-C9300</td>
              <td className="px-2 py-1">Switch</td>
              <td className="px-2 py-1">2023-01-15</td>
              <td className="px-2 py-1">2 years</td>
              <td className="px-2 py-1 text-green-600">Active</td>
            </tr>
            <tr>
              <td className="px-2 py-1">JUNIPER-MX204</td>
              <td className="px-2 py-1">Router</td>
              <td className="px-2 py-1">2022-06-20</td>
              <td className="px-2 py-1">3 years</td>
              <td className="px-2 py-1 text-green-600">Active</td>
            </tr>
            <tr>
              <td className="px-2 py-1">PALO-PA-5220</td>
              <td className="px-2 py-1">Firewall</td>
              <td className="px-2 py-1">2022-03-10</td>
              <td className="px-2 py-1">2 years</td>
              <td className="px-2 py-1 text-yellow-600">Expiring</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
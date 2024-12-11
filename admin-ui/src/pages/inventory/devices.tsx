import Layout from '../../components/layout/Layout';

export default function DeviceInventory() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Device Inventory</h1>
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
          <div className="text-2xl font-bold text-orange-600">15</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Network Equipment</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Device ID</th>
              <th className="px-2 py-1 text-left">Type</th>
              <th className="px-2 py-1 text-left">Location</th>
              <th className="px-2 py-1 text-left">Status</th>
              <th className="px-2 py-1 text-left">Last Maintenance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">SW-NYC-001</td>
              <td className="px-2 py-1">Cisco Catalyst 9300</td>
              <td className="px-2 py-1">New York DC</td>
              <td className="px-2 py-1 text-green-600">Active</td>
              <td className="px-2 py-1">2024-01-15</td>
            </tr>
            <tr>
              <td className="px-2 py-1">RT-LON-002</td>
              <td className="px-2 py-1">Juniper MX480</td>
              <td className="px-2 py-1">London POP</td>
              <td className="px-2 py-1 text-green-600">Active</td>
              <td className="px-2 py-1">2024-01-20</td>
            </tr>
            <tr>
              <td className="px-2 py-1">FW-SIN-003</td>
              <td className="px-2 py-1">Palo Alto PA-5200</td>
              <td className="px-2 py-1">Singapore DC</td>
              <td className="px-2 py-1 text-yellow-600">Maintenance Due</td>
              <td className="px-2 py-1">2023-12-15</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Device Health</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Device ID</th>
              <th className="px-2 py-1 text-left">CPU Usage</th>
              <th className="px-2 py-1 text-left">Memory</th>
              <th className="px-2 py-1 text-left">Temperature</th>
              <th className="px-2 py-1 text-left">Health</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">SW-NYC-001</td>
              <td className="px-2 py-1">45%</td>
              <td className="px-2 py-1">60%</td>
              <td className="px-2 py-1">42°C</td>
              <td className="px-2 py-1 text-green-600">Healthy</td>
            </tr>
            <tr>
              <td className="px-2 py-1">RT-LON-002</td>
              <td className="px-2 py-1">75%</td>
              <td className="px-2 py-1">80%</td>
              <td className="px-2 py-1">48°C</td>
              <td className="px-2 py-1 text-yellow-600">Warning</td>
            </tr>
            <tr>
              <td className="px-2 py-1">FW-SIN-003</td>
              <td className="px-2 py-1">90%</td>
              <td className="px-2 py-1">95%</td>
              <td className="px-2 py-1">52°C</td>
              <td className="px-2 py-1 text-red-600">Critical</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
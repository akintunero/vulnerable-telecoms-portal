import Layout from '../../components/layout/Layout';

export default function DeviceMonitoring() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Device Monitoring</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Total Devices</div>
          <div className="text-2xl font-bold">24</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Online</div>
          <div className="text-2xl font-bold text-green-600">20</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Offline</div>
          <div className="text-2xl font-bold text-red-600">4</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Device Status</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Device</th>
              <th className="px-2 py-1 text-left">Type</th>
              <th className="px-2 py-1 text-left">Status</th>
              <th className="px-2 py-1 text-left">CPU</th>
              <th className="px-2 py-1 text-left">Memory</th>
              <th className="px-2 py-1 text-left">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">Core-Router-01</td>
              <td className="px-2 py-1">Router</td>
              <td className="px-2 py-1 text-green-600">Online</td>
              <td className="px-2 py-1">45%</td>
              <td className="px-2 py-1">60%</td>
              <td className="px-2 py-1">2 mins ago</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Edge-Switch-02</td>
              <td className="px-2 py-1">Switch</td>
              <td className="px-2 py-1 text-green-600">Online</td>
              <td className="px-2 py-1">30%</td>
              <td className="px-2 py-1">45%</td>
              <td className="px-2 py-1">1 min ago</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Firewall-01</td>
              <td className="px-2 py-1">Firewall</td>
              <td className="px-2 py-1 text-red-600">Offline</td>
              <td className="px-2 py-1">-</td>
              <td className="px-2 py-1">-</td>
              <td className="px-2 py-1">15 mins ago</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
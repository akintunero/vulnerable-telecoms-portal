import Layout from '../../components/layout/Layout';

export default function NetworkMonitoring() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Network Monitoring</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Active Alerts</div>
          <div className="text-2xl font-bold text-orange-600">8</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Network Health</div>
          <div className="text-2xl font-bold text-green-600">98.5%</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Monitored Devices</div>
          <div className="text-2xl font-bold text-blue-600">1,250</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Active Alerts</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Device</th>
              <th className="px-2 py-1 text-left">Alert Type</th>
              <th className="px-2 py-1 text-left">Severity</th>
              <th className="px-2 py-1 text-left">First Seen</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">SW-NYC-001</td>
              <td className="px-2 py-1">High CPU</td>
              <td className="px-2 py-1 text-red-600">Critical</td>
              <td className="px-2 py-1">2024-02-15 14:30</td>
              <td className="px-2 py-1 text-yellow-600">Investigating</td>
            </tr>
            <tr>
              <td className="px-2 py-1">RT-LON-002</td>
              <td className="px-2 py-1">Memory Usage</td>
              <td className="px-2 py-1 text-orange-600">Warning</td>
              <td className="px-2 py-1">2024-02-15 15:15</td>
              <td className="px-2 py-1 text-yellow-600">Investigating</td>
            </tr>
            <tr>
              <td className="px-2 py-1">FW-SIN-003</td>
              <td className="px-2 py-1">Interface Down</td>
              <td className="px-2 py-1 text-red-600">Critical</td>
              <td className="px-2 py-1">2024-02-15 16:00</td>
              <td className="px-2 py-1 text-yellow-600">Investigating</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Performance Metrics</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Device</th>
              <th className="px-2 py-1 text-left">CPU Usage</th>
              <th className="px-2 py-1 text-left">Memory</th>
              <th className="px-2 py-1 text-left">Bandwidth</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">SW-NYC-001</td>
              <td className="px-2 py-1">95%</td>
              <td className="px-2 py-1">85%</td>
              <td className="px-2 py-1">75%</td>
              <td className="px-2 py-1 text-red-600">Critical</td>
            </tr>
            <tr>
              <td className="px-2 py-1">RT-LON-002</td>
              <td className="px-2 py-1">65%</td>
              <td className="px-2 py-1">70%</td>
              <td className="px-2 py-1">60%</td>
              <td className="px-2 py-1 text-yellow-600">Warning</td>
            </tr>
            <tr>
              <td className="px-2 py-1">FW-SIN-003</td>
              <td className="px-2 py-1">45%</td>
              <td className="px-2 py-1">50%</td>
              <td className="px-2 py-1">40%</td>
              <td className="px-2 py-1 text-green-600">Normal</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
import Layout from '../../components/layout/Layout';

export default function NetworkPerformance() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Network Performance</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Network Uptime</div>
          <div className="text-2xl font-bold text-green-600">99.99%</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Avg. Latency</div>
          <div className="text-2xl font-bold text-blue-600">45ms</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Packet Loss</div>
          <div className="text-2xl font-bold text-green-600">0.01%</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Network Metrics</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Metric</th>
              <th className="px-2 py-1 text-left">Current</th>
              <th className="px-2 py-1 text-left">Last Hour</th>
              <th className="px-2 py-1 text-left">Last 24h</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">Bandwidth Usage</td>
              <td className="px-2 py-1">75%</td>
              <td className="px-2 py-1">72%</td>
              <td className="px-2 py-1">68%</td>
              <td className="px-2 py-1 text-green-600">Normal</td>
            </tr>
            <tr>
              <td className="px-2 py-1">CPU Utilization</td>
              <td className="px-2 py-1">65%</td>
              <td className="px-2 py-1">62%</td>
              <td className="px-2 py-1">58%</td>
              <td className="px-2 py-1 text-green-600">Normal</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Memory Usage</td>
              <td className="px-2 py-1">82%</td>
              <td className="px-2 py-1">80%</td>
              <td className="px-2 py-1">78%</td>
              <td className="px-2 py-1 text-yellow-600">Warning</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Device Performance</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Device</th>
              <th className="px-2 py-1 text-left">Type</th>
              <th className="px-2 py-1 text-left">CPU</th>
              <th className="px-2 py-1 text-left">Memory</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">SW-CORE-01</td>
              <td className="px-2 py-1">Switch</td>
              <td className="px-2 py-1">45%</td>
              <td className="px-2 py-1">60%</td>
              <td className="px-2 py-1 text-green-600">Normal</td>
            </tr>
            <tr>
              <td className="px-2 py-1">RT-EDGE-02</td>
              <td className="px-2 py-1">Router</td>
              <td className="px-2 py-1">75%</td>
              <td className="px-2 py-1">82%</td>
              <td className="px-2 py-1 text-yellow-600">Warning</td>
            </tr>
            <tr>
              <td className="px-2 py-1">FW-PERIM-03</td>
              <td className="px-2 py-1">Firewall</td>
              <td className="px-2 py-1">55%</td>
              <td className="px-2 py-1">65%</td>
              <td className="px-2 py-1 text-green-600">Normal</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
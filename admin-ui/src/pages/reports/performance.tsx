import Layout from '../../components/layout/Layout';

export default function PerformanceReports() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Performance Reports</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Network Uptime</div>
          <div className="text-2xl font-bold text-blue-600">99.99%</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Avg Response Time</div>
          <div className="text-2xl font-bold text-green-600">45ms</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Service Health</div>
          <div className="text-2xl font-bold text-blue-600">98.5%</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Service Performance</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Service</th>
              <th className="px-2 py-1 text-left">Uptime</th>
              <th className="px-2 py-1 text-left">Response Time</th>
              <th className="px-2 py-1 text-left">Error Rate</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">Web Portal</td>
              <td className="px-2 py-1">99.99%</td>
              <td className="px-2 py-1">35ms</td>
              <td className="px-2 py-1">0.01%</td>
              <td className="px-2 py-1 text-green-600">Healthy</td>
            </tr>
            <tr>
              <td className="px-2 py-1">API Gateway</td>
              <td className="px-2 py-1">99.95%</td>
              <td className="px-2 py-1">45ms</td>
              <td className="px-2 py-1">0.05%</td>
              <td className="px-2 py-1 text-green-600">Healthy</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Database</td>
              <td className="px-2 py-1">99.90%</td>
              <td className="px-2 py-1">55ms</td>
              <td className="px-2 py-1">0.10%</td>
              <td className="px-2 py-1 text-yellow-600">Warning</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Performance Trends</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Metric</th>
              <th className="px-2 py-1 text-left">Current</th>
              <th className="px-2 py-1 text-left">Last Week</th>
              <th className="px-2 py-1 text-left">Last Month</th>
              <th className="px-2 py-1 text-left">Trend</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">Network Latency</td>
              <td className="px-2 py-1">45ms</td>
              <td className="px-2 py-1">48ms</td>
              <td className="px-2 py-1">50ms</td>
              <td className="px-2 py-1 text-green-600">Improving</td>
            </tr>
            <tr>
              <td className="px-2 py-1">CPU Usage</td>
              <td className="px-2 py-1">65%</td>
              <td className="px-2 py-1">68%</td>
              <td className="px-2 py-1">70%</td>
              <td className="px-2 py-1 text-green-600">Improving</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Memory Usage</td>
              <td className="px-2 py-1">75%</td>
              <td className="px-2 py-1">72%</td>
              <td className="px-2 py-1">70%</td>
              <td className="px-2 py-1 text-yellow-600">Increasing</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
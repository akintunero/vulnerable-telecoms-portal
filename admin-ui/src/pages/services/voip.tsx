import Layout from '../../components/layout/Layout';

export default function VOIPServices() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">VoIP Services</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Active Lines</div>
          <div className="text-2xl font-bold text-blue-600">850</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Call Volume</div>
          <div className="text-2xl font-bold text-green-600">12,500</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Call Quality</div>
          <div className="text-2xl font-bold text-blue-600">98.5%</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Active Lines</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Line ID</th>
              <th className="px-2 py-1 text-left">Customer</th>
              <th className="px-2 py-1 text-left">Extension</th>
              <th className="px-2 py-1 text-left">Type</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">VOIP-001</td>
              <td className="px-2 py-1">Acme Corp</td>
              <td className="px-2 py-1">x1001</td>
              <td className="px-2 py-1">SIP Trunk</td>
              <td className="px-2 py-1 text-green-600">Active</td>
            </tr>
            <tr>
              <td className="px-2 py-1">VOIP-002</td>
              <td className="px-2 py-1">TechStart Inc</td>
              <td className="px-2 py-1">x2001</td>
              <td className="px-2 py-1">Virtual Line</td>
              <td className="px-2 py-1 text-green-600">Active</td>
            </tr>
            <tr>
              <td className="px-2 py-1">VOIP-003</td>
              <td className="px-2 py-1">Global Services</td>
              <td className="px-2 py-1">x3001</td>
              <td className="px-2 py-1">PRI</td>
              <td className="px-2 py-1 text-yellow-600">Warning</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Call Statistics</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Line ID</th>
              <th className="px-2 py-1 text-left">Calls Today</th>
              <th className="px-2 py-1 text-left">Avg Duration</th>
              <th className="px-2 py-1 text-left">MOS Score</th>
              <th className="px-2 py-1 text-left">Quality</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">VOIP-001</td>
              <td className="px-2 py-1">125</td>
              <td className="px-2 py-1">3m 45s</td>
              <td className="px-2 py-1">4.5</td>
              <td className="px-2 py-1 text-green-600">Excellent</td>
            </tr>
            <tr>
              <td className="px-2 py-1">VOIP-002</td>
              <td className="px-2 py-1">98</td>
              <td className="px-2 py-1">2m 30s</td>
              <td className="px-2 py-1">4.2</td>
              <td className="px-2 py-1 text-green-600">Good</td>
            </tr>
            <tr>
              <td className="px-2 py-1">VOIP-003</td>
              <td className="px-2 py-1">156</td>
              <td className="px-2 py-1">4m 15s</td>
              <td className="px-2 py-1">3.8</td>
              <td className="px-2 py-1 text-yellow-600">Fair</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
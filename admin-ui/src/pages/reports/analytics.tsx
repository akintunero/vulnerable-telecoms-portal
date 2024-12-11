import Layout from '../../components/layout/Layout';

export default function CustomerAnalytics() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Customer Analytics</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Total Customers</div>
          <div className="text-2xl font-bold text-blue-600">2,500</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Active Users</div>
          <div className="text-2xl font-bold text-green-600">1,850</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Satisfaction</div>
          <div className="text-2xl font-bold text-blue-600">4.5/5</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Customer Segments</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Segment</th>
              <th className="px-2 py-1 text-left">Customers</th>
              <th className="px-2 py-1 text-left">Revenue</th>
              <th className="px-2 py-1 text-left">Growth</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">Enterprise</td>
              <td className="px-2 py-1">250</td>
              <td className="px-2 py-1">$750K</td>
              <td className="px-2 py-1 text-green-600">+20%</td>
              <td className="px-2 py-1 text-green-600">Growing</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Mid-Market</td>
              <td className="px-2 py-1">500</td>
              <td className="px-2 py-1">$300K</td>
              <td className="px-2 py-1 text-green-600">+15%</td>
              <td className="px-2 py-1 text-green-600">Growing</td>
            </tr>
            <tr>
              <td className="px-2 py-1">SMB</td>
              <td className="px-2 py-1">1,750</td>
              <td className="px-2 py-1">$150K</td>
              <td className="px-2 py-1 text-yellow-600">+5%</td>
              <td className="px-2 py-1 text-yellow-600">Stable</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Usage Patterns</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Service</th>
              <th className="px-2 py-1 text-left">Active Users</th>
              <th className="px-2 py-1 text-left">Avg Usage</th>
              <th className="px-2 py-1 text-left">Peak Hours</th>
              <th className="px-2 py-1 text-left">Trend</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">Web Portal</td>
              <td className="px-2 py-1">1,250</td>
              <td className="px-2 py-1">45min/day</td>
              <td className="px-2 py-1">9AM-11AM</td>
              <td className="px-2 py-1 text-green-600">Increasing</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Mobile App</td>
              <td className="px-2 py-1">850</td>
              <td className="px-2 py-1">30min/day</td>
              <td className="px-2 py-1">12PM-2PM</td>
              <td className="px-2 py-1 text-green-600">Increasing</td>
            </tr>
            <tr>
              <td className="px-2 py-1">API Access</td>
              <td className="px-2 py-1">450</td>
              <td className="px-2 py-1">24/7</td>
              <td className="px-2 py-1">All Day</td>
              <td className="px-2 py-1 text-yellow-600">Stable</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
import Layout from '../../components/layout/Layout';

export default function CustomerOnboarding() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Customer Onboarding</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Active Onboarding</div>
          <div className="text-2xl font-bold text-blue-600">25</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Avg. Time</div>
          <div className="text-2xl font-bold text-green-600">5 days</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Success Rate</div>
          <div className="text-2xl font-bold text-green-600">95%</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Active Onboarding</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Customer</th>
              <th className="px-2 py-1 text-left">Service</th>
              <th className="px-2 py-1 text-left">Start Date</th>
              <th className="px-2 py-1 text-left">Progress</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">TechCorp Inc</td>
              <td className="px-2 py-1">MPLS</td>
              <td className="px-2 py-1">2024-03-01</td>
              <td className="px-2 py-1">75%</td>
              <td className="px-2 py-1 text-green-600">On Track</td>
            </tr>
            <tr>
              <td className="px-2 py-1">DataFlow Ltd</td>
              <td className="px-2 py-1">Cloud</td>
              <td className="px-2 py-1">2024-03-05</td>
              <td className="px-2 py-1">45%</td>
              <td className="px-2 py-1 text-green-600">On Track</td>
            </tr>
            <tr>
              <td className="px-2 py-1">GlobalNet Co</td>
              <td className="px-2 py-1">VoIP</td>
              <td className="px-2 py-1">2024-03-10</td>
              <td className="px-2 py-1">25%</td>
              <td className="px-2 py-1 text-yellow-600">Delayed</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Onboarding Metrics</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Service</th>
              <th className="px-2 py-1 text-left">Avg. Time</th>
              <th className="px-2 py-1 text-left">Success Rate</th>
              <th className="px-2 py-1 text-left">Satisfaction</th>
              <th className="px-2 py-1 text-left">Trend</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">MPLS</td>
              <td className="px-2 py-1">7 days</td>
              <td className="px-2 py-1">98%</td>
              <td className="px-2 py-1">4.8/5</td>
              <td className="px-2 py-1 text-green-600">Improving</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Cloud</td>
              <td className="px-2 py-1">5 days</td>
              <td className="px-2 py-1">95%</td>
              <td className="px-2 py-1">4.7/5</td>
              <td className="px-2 py-1 text-green-600">Stable</td>
            </tr>
            <tr>
              <td className="px-2 py-1">VoIP</td>
              <td className="px-2 py-1">4 days</td>
              <td className="px-2 py-1">92%</td>
              <td className="px-2 py-1">4.6/5</td>
              <td className="px-2 py-1 text-yellow-600">Declining</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
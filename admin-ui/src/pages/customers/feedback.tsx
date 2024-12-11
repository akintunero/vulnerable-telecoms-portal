import Layout from '../../components/layout/Layout';

export default function CustomerFeedback() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Customer Feedback</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Overall Satisfaction</div>
          <div className="text-2xl font-bold text-green-600">4.7/5</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Response Rate</div>
          <div className="text-2xl font-bold text-blue-600">85%</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">NPS Score</div>
          <div className="text-2xl font-bold text-green-600">75</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Recent Feedback</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Customer</th>
              <th className="px-2 py-1 text-left">Service</th>
              <th className="px-2 py-1 text-left">Rating</th>
              <th className="px-2 py-1 text-left">Date</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">Acme Corp</td>
              <td className="px-2 py-1">MPLS</td>
              <td className="px-2 py-1">5/5</td>
              <td className="px-2 py-1">2024-03-15</td>
              <td className="px-2 py-1 text-green-600">Resolved</td>
            </tr>
            <tr>
              <td className="px-2 py-1">TechStart Inc</td>
              <td className="px-2 py-1">Cloud</td>
              <td className="px-2 py-1">4/5</td>
              <td className="px-2 py-1">2024-03-14</td>
              <td className="px-2 py-1 text-yellow-600">In Progress</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Global Services</td>
              <td className="px-2 py-1">VoIP</td>
              <td className="px-2 py-1">3/5</td>
              <td className="px-2 py-1">2024-03-13</td>
              <td className="px-2 py-1 text-yellow-600">In Progress</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Service Ratings</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Service</th>
              <th className="px-2 py-1 text-left">Satisfaction</th>
              <th className="px-2 py-1 text-left">Response Time</th>
              <th className="px-2 py-1 text-left">Reliability</th>
              <th className="px-2 py-1 text-left">Trend</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">MPLS</td>
              <td className="px-2 py-1">4.8/5</td>
              <td className="px-2 py-1">4.7/5</td>
              <td className="px-2 py-1">4.9/5</td>
              <td className="px-2 py-1 text-green-600">Improving</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Cloud</td>
              <td className="px-2 py-1">4.6/5</td>
              <td className="px-2 py-1">4.5/5</td>
              <td className="px-2 py-1">4.7/5</td>
              <td className="px-2 py-1 text-green-600">Stable</td>
            </tr>
            <tr>
              <td className="px-2 py-1">VoIP</td>
              <td className="px-2 py-1">4.4/5</td>
              <td className="px-2 py-1">4.3/5</td>
              <td className="px-2 py-1">4.5/5</td>
              <td className="px-2 py-1 text-yellow-600">Declining</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
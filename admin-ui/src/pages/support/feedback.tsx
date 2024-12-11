import Layout from '../../components/layout/Layout';

export default function CustomerFeedback() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Customer Feedback</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Overall Satisfaction</div>
          <div className="text-2xl font-bold text-green-600">4.5/5</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Total Reviews</div>
          <div className="text-2xl font-bold text-blue-600">1,234</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Response Rate</div>
          <div className="text-2xl font-bold text-green-600">98%</div>
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
              <td className="px-2 py-1">John Smith</td>
              <td className="px-2 py-1">Internet Service</td>
              <td className="px-2 py-1">5/5</td>
              <td className="px-2 py-1">2024-02-15</td>
              <td className="px-2 py-1 text-green-600">Responded</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Sarah Johnson</td>
              <td className="px-2 py-1">VoIP Service</td>
              <td className="px-2 py-1">4/5</td>
              <td className="px-2 py-1">2024-02-14</td>
              <td className="px-2 py-1 text-green-600">Responded</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Michael Brown</td>
              <td className="px-2 py-1">Cloud Services</td>
              <td className="px-2 py-1">3/5</td>
              <td className="px-2 py-1">2024-02-13</td>
              <td className="px-2 py-1 text-yellow-600">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Feedback Categories</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Category</th>
              <th className="px-2 py-1 text-left">Total</th>
              <th className="px-2 py-1 text-left">Positive</th>
              <th className="px-2 py-1 text-left">Neutral</th>
              <th className="px-2 py-1 text-left">Negative</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">Internet Service</td>
              <td className="px-2 py-1">450</td>
              <td className="px-2 py-1 text-green-600">85%</td>
              <td className="px-2 py-1">10%</td>
              <td className="px-2 py-1 text-red-600">5%</td>
            </tr>
            <tr>
              <td className="px-2 py-1">VoIP Service</td>
              <td className="px-2 py-1">320</td>
              <td className="px-2 py-1 text-green-600">80%</td>
              <td className="px-2 py-1">15%</td>
              <td className="px-2 py-1 text-red-600">5%</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Cloud Services</td>
              <td className="px-2 py-1">280</td>
              <td className="px-2 py-1 text-green-600">75%</td>
              <td className="px-2 py-1">20%</td>
              <td className="px-2 py-1 text-red-600">5%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
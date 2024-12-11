import Layout from '../../components/layout/Layout';

export default function FinancialReports() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Financial Reports</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Monthly Revenue</div>
          <div className="text-2xl font-bold text-blue-600">$1.2M</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Outstanding</div>
          <div className="text-2xl font-bold text-green-600">$45K</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Collection Rate</div>
          <div className="text-2xl font-bold text-blue-600">98.5%</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Revenue by Service</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Service</th>
              <th className="px-2 py-1 text-left">Revenue</th>
              <th className="px-2 py-1 text-left">Customers</th>
              <th className="px-2 py-1 text-left">Growth</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">MPLS</td>
              <td className="px-2 py-1">$450K</td>
              <td className="px-2 py-1">125</td>
              <td className="px-2 py-1 text-green-600">+15%</td>
              <td className="px-2 py-1 text-green-600">Growing</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Cloud Services</td>
              <td className="px-2 py-1">$350K</td>
              <td className="px-2 py-1">85</td>
              <td className="px-2 py-1 text-green-600">+25%</td>
              <td className="px-2 py-1 text-green-600">Growing</td>
            </tr>
            <tr>
              <td className="px-2 py-1">VoIP</td>
              <td className="px-2 py-1">$250K</td>
              <td className="px-2 py-1">150</td>
              <td className="px-2 py-1 text-yellow-600">+5%</td>
              <td className="px-2 py-1 text-yellow-600">Stable</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Billing Status</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Customer</th>
              <th className="px-2 py-1 text-left">Amount</th>
              <th className="px-2 py-1 text-left">Due Date</th>
              <th className="px-2 py-1 text-left">Status</th>
              <th className="px-2 py-1 text-left">Days Overdue</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">Acme Corp</td>
              <td className="px-2 py-1">$25K</td>
              <td className="px-2 py-1">2024-02-15</td>
              <td className="px-2 py-1 text-green-600">Paid</td>
              <td className="px-2 py-1">0</td>
            </tr>
            <tr>
              <td className="px-2 py-1">TechStart Inc</td>
              <td className="px-2 py-1">$15K</td>
              <td className="px-2 py-1">2024-02-14</td>
              <td className="px-2 py-1 text-yellow-600">Pending</td>
              <td className="px-2 py-1">1</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Global Services</td>
              <td className="px-2 py-1">$5K</td>
              <td className="px-2 py-1">2024-02-10</td>
              <td className="px-2 py-1 text-red-600">Overdue</td>
              <td className="px-2 py-1">5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
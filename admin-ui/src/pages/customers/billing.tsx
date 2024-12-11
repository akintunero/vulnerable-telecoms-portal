import Layout from '../../components/layout/Layout';

export default function CustomerBilling() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Customer Billing</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Monthly Revenue</div>
          <div className="text-2xl font-bold text-blue-600">$1.2M</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Outstanding</div>
          <div className="text-2xl font-bold text-yellow-600">$45K</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Collection Rate</div>
          <div className="text-2xl font-bold text-green-600">98.5%</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Recent Invoices</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Invoice #</th>
              <th className="px-2 py-1 text-left">Customer</th>
              <th className="px-2 py-1 text-left">Amount</th>
              <th className="px-2 py-1 text-left">Due Date</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">INV-001</td>
              <td className="px-2 py-1">Acme Corp</td>
              <td className="px-2 py-1">$25,000</td>
              <td className="px-2 py-1">2024-03-15</td>
              <td className="px-2 py-1 text-green-600">Paid</td>
            </tr>
            <tr>
              <td className="px-2 py-1">INV-002</td>
              <td className="px-2 py-1">TechStart Inc</td>
              <td className="px-2 py-1">$15,000</td>
              <td className="px-2 py-1">2024-03-20</td>
              <td className="px-2 py-1 text-yellow-600">Pending</td>
            </tr>
            <tr>
              <td className="px-2 py-1">INV-003</td>
              <td className="px-2 py-1">Global Services</td>
              <td className="px-2 py-1">$35,000</td>
              <td className="px-2 py-1">2024-03-25</td>
              <td className="px-2 py-1 text-yellow-600">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Billing Summary</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Service</th>
              <th className="px-2 py-1 text-left">Customers</th>
              <th className="px-2 py-1 text-left">Revenue</th>
              <th className="px-2 py-1 text-left">Growth</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">MPLS</td>
              <td className="px-2 py-1">150</td>
              <td className="px-2 py-1">$500K</td>
              <td className="px-2 py-1 text-green-600">+15%</td>
              <td className="px-2 py-1 text-green-600">Growing</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Cloud Services</td>
              <td className="px-2 py-1">200</td>
              <td className="px-2 py-1">$400K</td>
              <td className="px-2 py-1 text-green-600">+25%</td>
              <td className="px-2 py-1 text-green-600">Growing</td>
            </tr>
            <tr>
              <td className="px-2 py-1">VoIP</td>
              <td className="px-2 py-1">100</td>
              <td className="px-2 py-1">$300K</td>
              <td className="px-2 py-1 text-green-600">+10%</td>
              <td className="px-2 py-1 text-green-600">Growing</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
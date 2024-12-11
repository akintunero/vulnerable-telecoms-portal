import Layout from '../../components/layout/Layout';

export default function MPLSManagement() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">MPLS Management</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Total Circuits</div>
          <div className="text-2xl font-bold">18</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Active</div>
          <div className="text-2xl font-bold">16</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">MPLS Circuits</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Circuit ID</th>
              <th className="px-2 py-1 text-left">Customer</th>
              <th className="px-2 py-1 text-left">Status</th>
              <th className="px-2 py-1 text-left">Bandwidth</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">MPLS-001</td>
              <td className="px-2 py-1">Acme Corp</td>
              <td className="px-2 py-1 text-green-600">Active</td>
              <td className="px-2 py-1">1 Gbps</td>
            </tr>
            <tr>
              <td className="px-2 py-1">MPLS-002</td>
              <td className="px-2 py-1">Globex Inc</td>
              <td className="px-2 py-1 text-red-600">Down</td>
              <td className="px-2 py-1">500 Mbps</td>
            </tr>
            <tr>
              <td className="px-2 py-1">MPLS-003</td>
              <td className="px-2 py-1">Initech</td>
              <td className="px-2 py-1 text-green-600">Active</td>
              <td className="px-2 py-1">2 Gbps</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
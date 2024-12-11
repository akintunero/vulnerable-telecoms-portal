import Layout from '../../components/layout/Layout';

export default function ServiceCatalog() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Service Catalog</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Total Services</div>
          <div className="text-2xl font-bold text-blue-600">25</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Active Services</div>
          <div className="text-2xl font-bold text-green-600">20</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">New Services</div>
          <div className="text-2xl font-bold text-yellow-600">5</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Network Services</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Service</th>
              <th className="px-2 py-1 text-left">Description</th>
              <th className="px-2 py-1 text-left">Price</th>
              <th className="px-2 py-1 text-left">Customers</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">MPLS</td>
              <td className="px-2 py-1">Private Network</td>
              <td className="px-2 py-1">$999/mo</td>
              <td className="px-2 py-1">150</td>
              <td className="px-2 py-1 text-green-600">Active</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Internet</td>
              <td className="px-2 py-1">Dedicated Line</td>
              <td className="px-2 py-1">$499/mo</td>
              <td className="px-2 py-1">250</td>
              <td className="px-2 py-1 text-green-600">Active</td>
            </tr>
            <tr>
              <td className="px-2 py-1">SD-WAN</td>
              <td className="px-2 py-1">Software Defined</td>
              <td className="px-2 py-1">$799/mo</td>
              <td className="px-2 py-1">100</td>
              <td className="px-2 py-1 text-green-600">Active</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Cloud Services</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Service</th>
              <th className="px-2 py-1 text-left">Description</th>
              <th className="px-2 py-1 text-left">Price</th>
              <th className="px-2 py-1 text-left">Customers</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">Virtual Machines</td>
              <td className="px-2 py-1">Cloud Compute</td>
              <td className="px-2 py-1">$299/mo</td>
              <td className="px-2 py-1">200</td>
              <td className="px-2 py-1 text-green-600">Active</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Storage</td>
              <td className="px-2 py-1">Cloud Storage</td>
              <td className="px-2 py-1">$199/mo</td>
              <td className="px-2 py-1">180</td>
              <td className="px-2 py-1 text-green-600">Active</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Backup</td>
              <td className="px-2 py-1">Cloud Backup</td>
              <td className="px-2 py-1">$149/mo</td>
              <td className="px-2 py-1">150</td>
              <td className="px-2 py-1 text-green-600">Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
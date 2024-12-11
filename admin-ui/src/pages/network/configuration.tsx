import Layout from '../../components/layout/Layout';

export default function ConfigurationManagement() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Configuration Management</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Managed Devices</div>
          <div className="text-2xl font-bold text-blue-600">850</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Pending Changes</div>
          <div className="text-2xl font-bold text-orange-600">12</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Last Backup</div>
          <div className="text-2xl font-bold text-green-600">2h ago</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Configuration Changes</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Device</th>
              <th className="px-2 py-1 text-left">Change Type</th>
              <th className="px-2 py-1 text-left">Requested By</th>
              <th className="px-2 py-1 text-left">Status</th>
              <th className="px-2 py-1 text-left">Scheduled</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">SW-NYC-001</td>
              <td className="px-2 py-1">VLAN Update</td>
              <td className="px-2 py-1">John Smith</td>
              <td className="px-2 py-1 text-yellow-600">Pending</td>
              <td className="px-2 py-1">2024-02-16 02:00</td>
            </tr>
            <tr>
              <td className="px-2 py-1">RT-LON-002</td>
              <td className="px-2 py-1">BGP Update</td>
              <td className="px-2 py-1">Sarah Johnson</td>
              <td className="px-2 py-1 text-green-600">Approved</td>
              <td className="px-2 py-1">2024-02-15 23:00</td>
            </tr>
            <tr>
              <td className="px-2 py-1">FW-SIN-003</td>
              <td className="px-2 py-1">Security Policy</td>
              <td className="px-2 py-1">Mike Brown</td>
              <td className="px-2 py-1 text-yellow-600">Pending</td>
              <td className="px-2 py-1">2024-02-16 01:00</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Configuration Templates</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Template Name</th>
              <th className="px-2 py-1 text-left">Device Type</th>
              <th className="px-2 py-1 text-left">Last Modified</th>
              <th className="px-2 py-1 text-left">Usage Count</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">Core Switch Base</td>
              <td className="px-2 py-1">Cisco Catalyst</td>
              <td className="px-2 py-1">2024-02-10</td>
              <td className="px-2 py-1">45</td>
              <td className="px-2 py-1 text-green-600">Active</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Edge Router</td>
              <td className="px-2 py-1">Juniper MX</td>
              <td className="px-2 py-1">2024-02-12</td>
              <td className="px-2 py-1">28</td>
              <td className="px-2 py-1 text-green-600">Active</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Firewall Standard</td>
              <td className="px-2 py-1">Palo Alto</td>
              <td className="px-2 py-1">2024-02-14</td>
              <td className="px-2 py-1">32</td>
              <td className="px-2 py-1 text-green-600">Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
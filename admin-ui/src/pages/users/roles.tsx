import Layout from '../../components/layout/Layout';

export default function UserRoles() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">User Roles</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Total Roles</h3>
            <p className="text-3xl font-bold text-indigo-600">8</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Active Users</h3>
            <p className="text-3xl font-bold text-green-600">120</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Pending Approvals</h3>
            <p className="text-3xl font-bold text-red-600">5</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Role List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">ROLE-001</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Admin</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Full access to all features</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">10</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-03-15</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">ROLE-002</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">User</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Limited access to features</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">100</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-03-14</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">ROLE-003</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Guest</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Read-only access</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">5</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-03-13</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
} 
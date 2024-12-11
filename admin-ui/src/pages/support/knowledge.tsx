import Layout from '../../components/layout/Layout';

export default function KnowledgeBase() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Knowledge Base</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Total Articles</div>
          <div className="text-2xl font-bold text-blue-600">1,250</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Monthly Views</div>
          <div className="text-2xl font-bold text-green-600">25,000</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Helpful Rate</div>
          <div className="text-2xl font-bold text-blue-600">92%</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Popular Articles</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Title</th>
              <th className="px-2 py-1 text-left">Category</th>
              <th className="px-2 py-1 text-left">Views</th>
              <th className="px-2 py-1 text-left">Last Updated</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">Network Troubleshooting Guide</td>
              <td className="px-2 py-1">Technical</td>
              <td className="px-2 py-1">5,250</td>
              <td className="px-2 py-1">2024-02-15</td>
              <td className="px-2 py-1 text-green-600">Published</td>
            </tr>
            <tr>
              <td className="px-2 py-1">VoIP Setup Instructions</td>
              <td className="px-2 py-1">Services</td>
              <td className="px-2 py-1">3,850</td>
              <td className="px-2 py-1">2024-02-14</td>
              <td className="px-2 py-1 text-green-600">Published</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Billing FAQ</td>
              <td className="px-2 py-1">General</td>
              <td className="px-2 py-1">2,950</td>
              <td className="px-2 py-1">2024-02-13</td>
              <td className="px-2 py-1 text-green-600">Published</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Recent Updates</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Article</th>
              <th className="px-2 py-1 text-left">Author</th>
              <th className="px-2 py-1 text-left">Update Type</th>
              <th className="px-2 py-1 text-left">Date</th>
              <th className="px-2 py-1 text-left">Review Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">Cloud Service Migration Guide</td>
              <td className="px-2 py-1">John Smith</td>
              <td className="px-2 py-1">Major Update</td>
              <td className="px-2 py-1">2024-02-15</td>
              <td className="px-2 py-1 text-green-600">Approved</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Security Best Practices</td>
              <td className="px-2 py-1">Sarah Johnson</td>
              <td className="px-2 py-1">Minor Update</td>
              <td className="px-2 py-1">2024-02-14</td>
              <td className="px-2 py-1 text-green-600">Approved</td>
            </tr>
            <tr>
              <td className="px-2 py-1">API Documentation</td>
              <td className="px-2 py-1">Mike Brown</td>
              <td className="px-2 py-1">New Article</td>
              <td className="px-2 py-1">2024-02-13</td>
              <td className="px-2 py-1 text-yellow-600">Pending Review</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
} 
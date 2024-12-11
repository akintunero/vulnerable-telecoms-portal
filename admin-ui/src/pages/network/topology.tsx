import Layout from '../../components/layout/Layout';

export default function NetworkTopology() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Network Topology</h1>
        
        {/* Network Map */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Network Map</h2>
          <div className="relative h-[600px] border rounded-lg bg-gray-50">
            <svg className="w-full h-full" viewBox="0 0 800 600">
              {/* Core Router */}
              <circle cx="400" cy="300" r="30" fill="#4F46E5" />
              <text x="400" y="305" textAnchor="middle" fill="white" className="text-sm">Core Router</text>
              
              {/* Distribution Switches */}
              <circle cx="200" cy="200" r="25" fill="#10B981" />
              <text x="200" y="205" textAnchor="middle" fill="white" className="text-sm">DS-1</text>
              
              <circle cx="600" cy="200" r="25" fill="#10B981" />
              <text x="600" y="205" textAnchor="middle" fill="white" className="text-sm">DS-2</text>
              
              <circle cx="200" cy="400" r="25" fill="#10B981" />
              <text x="200" y="405" textAnchor="middle" fill="white" className="text-sm">DS-3</text>
              
              <circle cx="600" cy="400" r="25" fill="#10B981" />
              <text x="600" y="405" textAnchor="middle" fill="white" className="text-sm">DS-4</text>
              
              {/* Access Switches */}
              <circle cx="100" cy="150" r="20" fill="#F59E0B" />
              <text x="100" y="155" textAnchor="middle" fill="white" className="text-xs">AS-1</text>
              
              <circle cx="100" cy="250" r="20" fill="#F59E0B" />
              <text x="100" y="255" textAnchor="middle" fill="white" className="text-xs">AS-2</text>
              
              <circle cx="700" cy="150" r="20" fill="#F59E0B" />
              <text x="700" y="155" textAnchor="middle" fill="white" className="text-xs">AS-3</text>
              
              <circle cx="700" cy="250" r="20" fill="#F59E0B" />
              <text x="700" y="255" textAnchor="middle" fill="white" className="text-xs">AS-4</text>
              
              {/* Connections */}
              <line x1="400" y1="300" x2="200" y2="200" stroke="#6B7280" strokeWidth="2" />
              <line x1="400" y1="300" x2="600" y2="200" stroke="#6B7280" strokeWidth="2" />
              <line x1="400" y1="300" x2="200" y2="400" stroke="#6B7280" strokeWidth="2" />
              <line x1="400" y1="300" x2="600" y2="400" stroke="#6B7280" strokeWidth="2" />
              
              <line x1="200" y1="200" x2="100" y2="150" stroke="#6B7280" strokeWidth="2" />
              <line x1="200" y1="200" x2="100" y2="250" stroke="#6B7280" strokeWidth="2" />
              <line x1="600" y1="200" x2="700" y2="150" stroke="#6B7280" strokeWidth="2" />
              <line x1="600" y1="200" x2="700" y2="250" stroke="#6B7280" strokeWidth="2" />
            </svg>
          </div>
        </div>
        
        {/* Network Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Active Devices</h3>
            <p className="text-3xl font-bold text-indigo-600">24</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Network Health</h3>
            <p className="text-3xl font-bold text-green-600">98.5%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Total Links</h3>
            <p className="text-3xl font-bold text-blue-600">32</p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 
import Layout from '../../components/layout/Layout';

export default function BandwidthUsage() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Bandwidth Usage</h1>
        
        {/* Bandwidth Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Bandwidth Usage Over Time</h2>
          <div className="relative h-[400px] border rounded-lg bg-gray-50">
            <svg className="w-full h-full" viewBox="0 0 800 400">
              {/* Grid Lines */}
              <line x1="50" y1="350" x2="750" y2="350" stroke="#E5E7EB" strokeWidth="1" />
              <line x1="50" y1="250" x2="750" y2="250" stroke="#E5E7EB" strokeWidth="1" />
              <line x1="50" y1="150" x2="750" y2="150" stroke="#E5E7EB" strokeWidth="1" />
              <line x1="50" y1="50" x2="750" y2="50" stroke="#E5E7EB" strokeWidth="1" />
              
              {/* Y-axis Labels */}
              <text x="30" y="350" textAnchor="end" fill="#6B7280" className="text-xs">0%</text>
              <text x="30" y="250" textAnchor="end" fill="#6B7280" className="text-xs">25%</text>
              <text x="30" y="150" textAnchor="end" fill="#6B7280" className="text-xs">50%</text>
              <text x="30" y="50" textAnchor="end" fill="#6B7280" className="text-xs">75%</text>
              
              {/* X-axis Labels */}
              <text x="50" y="370" textAnchor="middle" fill="#6B7280" className="text-xs">00:00</text>
              <text x="150" y="370" textAnchor="middle" fill="#6B7280" className="text-xs">04:00</text>
              <text x="250" y="370" textAnchor="middle" fill="#6B7280" className="text-xs">08:00</text>
              <text x="350" y="370" textAnchor="middle" fill="#6B7280" className="text-xs">12:00</text>
              <text x="450" y="370" textAnchor="middle" fill="#6B7280" className="text-xs">16:00</text>
              <text x="550" y="370" textAnchor="middle" fill="#6B7280" className="text-xs">20:00</text>
              <text x="650" y="370" textAnchor="middle" fill="#6B7280" className="text-xs">24:00</text>
              
              {/* Bandwidth Usage Line */}
              <path
                d="M50,300 L150,250 L250,200 L350,150 L450,100 L550,150 L650,200 L750,250"
                fill="none"
                stroke="#4F46E5"
                strokeWidth="3"
              />
              
              {/* Area under the line */}
              <path
                d="M50,300 L150,250 L250,200 L350,150 L450,100 L550,150 L650,200 L750,250 L750,350 L50,350 Z"
                fill="#4F46E5"
                fillOpacity="0.1"
              />
            </svg>
          </div>
        </div>
        
        {/* Bandwidth Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Current Usage</h3>
            <p className="text-3xl font-bold text-indigo-600">65%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Peak Usage</h3>
            <p className="text-3xl font-bold text-red-600">85%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Average Usage</h3>
            <p className="text-3xl font-bold text-blue-600">45%</p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 
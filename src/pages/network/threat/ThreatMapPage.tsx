import React, { useState } from 'react';
import {
  Search,
  RefreshCw,
  Download,
  Filter,
  MoreVertical,
  Map,
  ZoomIn,
  ZoomOut,
  Layers,
  Shield,
  AlertTriangle,
  AlertCircle,
  AlertOctagon,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface Threat {
  id: string;
  type: 'ddos' | 'malware' | 'intrusion' | 'vulnerability';
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  target: string;
  status: 'active' | 'mitigated' | 'investigating';
  timestamp: string;
  description: string;
  coordinates: { x: number; y: number };
}

interface SecurityEvent {
  id: string;
  type: 'attack' | 'scan' | 'breach' | 'alert';
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  target: string;
  timestamp: string;
  details: string;
}

interface ThreatSource {
  id: string;
  country: string;
  ipAddress: string;
  threatCount: number;
  coordinates: { x: number; y: number };
}

const mockThreats: Threat[] = [
  {
    id: 'T1',
    type: 'ddos',
    severity: 'high',
    source: '192.168.1.100',
    target: '10.0.1.1',
    status: 'active',
    timestamp: '2024-02-28 14:30:00',
    description: 'DDoS attack targeting core router',
    coordinates: { x: 100, y: 100 }
  },
  {
    id: 'T2',
    type: 'malware',
    severity: 'critical',
    source: '192.168.1.101',
    target: '10.0.2.1',
    status: 'investigating',
    timestamp: '2024-02-28 14:25:00',
    description: 'Malware detected on customer endpoint',
    coordinates: { x: 300, y: 100 }
  },
  {
    id: 'T3',
    type: 'intrusion',
    severity: 'medium',
    source: '192.168.1.102',
    target: '10.0.3.1',
    status: 'mitigated',
    timestamp: '2024-02-28 14:20:00',
    description: 'Unauthorized access attempt',
    coordinates: { x: 200, y: 200 }
  },
  {
    id: 'T4',
    type: 'vulnerability',
    severity: 'low',
    source: '192.168.1.103',
    target: '10.0.4.1',
    status: 'active',
    timestamp: '2024-02-28 14:15:00',
    description: 'Known vulnerability detected',
    coordinates: { x: 400, y: 200 }
  }
];

const mockEvents: SecurityEvent[] = [
  {
    id: 'E1',
    type: 'attack',
    severity: 'high',
    source: '192.168.1.100',
    target: '10.0.1.1',
    timestamp: '2024-02-28 14:30:00',
    details: 'Multiple failed login attempts'
  },
  {
    id: 'E2',
    type: 'scan',
    severity: 'medium',
    source: '192.168.1.101',
    target: '10.0.2.1',
    timestamp: '2024-02-28 14:25:00',
    details: 'Port scan detected'
  },
  {
    id: 'E3',
    type: 'breach',
    severity: 'critical',
    source: '192.168.1.102',
    target: '10.0.3.1',
    timestamp: '2024-02-28 14:20:00',
    details: 'Data exfiltration attempt'
  },
  {
    id: 'E4',
    type: 'alert',
    severity: 'low',
    source: '192.168.1.103',
    target: '10.0.4.1',
    timestamp: '2024-02-28 14:15:00',
    details: 'Suspicious activity detected'
  }
];

const mockSources: ThreatSource[] = [
  {
    id: 'S1',
    country: 'United States',
    ipAddress: '192.168.1.100',
    threatCount: 5,
    coordinates: { x: 100, y: 100 }
  },
  {
    id: 'S2',
    country: 'China',
    ipAddress: '192.168.1.101',
    threatCount: 3,
    coordinates: { x: 300, y: 200 }
  },
  {
    id: 'S3',
    country: 'Russia',
    ipAddress: '192.168.1.102',
    threatCount: 4,
    coordinates: { x: 500, y: 300 }
  }
];

const threatTrendData = [
  { time: '00:00', ddos: 2, malware: 1, intrusion: 1, phishing: 0 },
  { time: '04:00', ddos: 3, malware: 2, intrusion: 1, phishing: 1 },
  { time: '08:00', ddos: 5, malware: 3, intrusion: 2, phishing: 2 },
  { time: '12:00', ddos: 4, malware: 2, intrusion: 1, phishing: 1 },
  { time: '16:00', ddos: 3, malware: 1, intrusion: 1, phishing: 0 },
  { time: '20:00', ddos: 2, malware: 1, intrusion: 0, phishing: 0 }
];

const threatSeverityData = [
  { severity: 'High', value: 5 },
  { severity: 'Medium', value: 8 },
  { severity: 'Low', value: 3 }
];

const threatTypeData = [
  { name: 'DDoS', value: 30 },
  { name: 'Malware', value: 25 },
  { name: 'Intrusion', value: 20 },
  { name: 'Phishing', value: 15 }
];

const COLORS = ['#EF4444', '#F59E0B', '#10B981'];

const ThreatMapPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [zoom, setZoom] = useState(1);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getThreatIcon = (type: Threat['type']) => {
    switch (type) {
      case 'ddos':
        return <AlertOctagon className="h-4 w-4" />;
      case 'malware':
        return <AlertCircle className="h-4 w-4" />;
      case 'intrusion':
        return <AlertTriangle className="h-4 w-4" />;
      case 'vulnerability':
        return <Shield className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getThreatColor = (type: Threat['type']) => {
    switch (type) {
      case 'ddos':
        return 'bg-red-500';
      case 'malware':
        return 'bg-orange-500';
      case 'intrusion':
        return 'bg-yellow-500';
      case 'vulnerability':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredThreats = mockThreats.filter(threat =>
    threat.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    threat.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    threat.target.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Threat Map</h1>
          <p className="mt-2 text-sm text-gray-700">
            Real-time visualization of security threats and events.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:flex sm:gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <RefreshCw className="-ml-0.5 h-5 w-5" />
            Refresh
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Download className="-ml-0.5 h-5 w-5" />
            Export
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            placeholder="Search threats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <Layers className="-ml-0.5 h-5 w-5" />
            Layers
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
            >
              <ZoomOut className="-ml-0.5 h-5 w-5" />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => setZoom(Math.min(2, zoom + 0.1))}
            >
              <ZoomIn className="-ml-0.5 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="relative h-[400px] bg-gray-50 rounded-lg overflow-hidden">
            {/* Threat Map Visualization */}
            <div
              className="absolute inset-0"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: 'center center'
              }}
            >
              {/* Threat Nodes */}
              {filteredThreats.map((threat) => (
                <div
                  key={threat.id}
                  className={`absolute w-8 h-8 rounded-full ${getThreatColor(threat.type)} cursor-pointer transform -translate-x-1/2 -translate-y-1/2`}
                  style={{
                    left: threat.coordinates.x,
                    top: threat.coordinates.y
                  }}
                  onClick={() => setSelectedThreat(threat)}
                >
                  <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
                    {threat.id}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Security Events</h3>
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {mockEvents.map((event, eventIdx) => (
                <li key={event.id}>
                  <div className="relative pb-8">
                    {eventIdx !== mockEvents.length - 1 ? (
                      <span
                        className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getSeverityColor(event.severity)}`}>
                          {getThreatIcon(event.type as Threat['type'])}
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">
                            {event.type} from {event.source} to {event.target}
                          </p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          <time dateTime={event.timestamp}>{event.timestamp}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Threat Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={threatTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="ddos" name="DDoS" stackId="1" stroke="#EF4444" fill="#FCA5A5" />
                <Area type="monotone" dataKey="malware" name="Malware" stackId="1" stroke="#F59E0B" fill="#FCD34D" />
                <Area type="monotone" dataKey="intrusion" name="Intrusion" stackId="1" stroke="#10B981" fill="#6EE7B7" />
                <Area type="monotone" dataKey="phishing" name="Phishing" stackId="1" stroke="#8B5CF6" fill="#C4B5FD" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Threat Severity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={threatSeverityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="severity" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Count" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Threat Types</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={threatTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {threatTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Threat Details Panel */}
      {selectedThreat && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Threat Details
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={() => setSelectedThreat(null)}
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Type</dt>
              <dd className="mt-1 text-sm text-gray-900">{selectedThreat.type.toUpperCase()}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Severity</dt>
              <dd className="mt-1">
                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getSeverityColor(selectedThreat.severity)}`}>
                  {selectedThreat.severity}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Source</dt>
              <dd className="mt-1 text-sm text-gray-900">{selectedThreat.source}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Target</dt>
              <dd className="mt-1 text-sm text-gray-900">{selectedThreat.target}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1">
                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getSeverityColor(selectedThreat.status)}`}>
                  {selectedThreat.status}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Timestamp</dt>
              <dd className="mt-1 text-sm text-gray-900">{selectedThreat.timestamp}</dd>
            </div>
          </dl>
          <div className="mt-4">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900">{selectedThreat.description}</dd>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreatMapPage; 
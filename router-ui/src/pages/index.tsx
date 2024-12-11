import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const networkConfigSchema = z.object({
  ssid: z.string().min(1, 'SSID is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  channel: z.number().min(1).max(14),
  bandwidth: z.enum(['20', '40', '80']),
  security: z.enum(['WPA2', 'WPA3']),
});

type NetworkConfig = z.infer<typeof networkConfigSchema>;

export default function RouterDashboard() {
  const [activeTab, setActiveTab] = useState('config');
  
  const { register, handleSubmit, formState: { errors } } = useForm<NetworkConfig>({
    resolver: zodResolver(networkConfigSchema),
  });

  // Fetch current network stats
  const { data: networkStats } = useQuery({
    queryKey: ['network-stats'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/router/stats`);
      return res.json();
    },
    refetchInterval: 5000,
  });

  // Update network configuration
  const updateConfig = useMutation({
    mutationFn: async (data: NetworkConfig) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/router/config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    },
  });

  const onSubmit = (data: NetworkConfig) => {
    updateConfig.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Router Dashboard</h1>

        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab('config')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'config'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              Network Configuration
            </button>
            <button
              onClick={() => setActiveTab('monitor')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'monitor'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              Network Monitoring
            </button>
          </nav>
        </div>

        {/* Network Configuration Form */}
        {activeTab === 'config' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Network Settings</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">SSID</label>
                <input
                  type="text"
                  {...register('ssid')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.ssid && (
                  <p className="mt-1 text-sm text-red-600">{errors.ssid.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  {...register('password')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Channel</label>
                  <input
                    type="number"
                    {...register('channel', { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Bandwidth</label>
                  <select
                    {...register('bandwidth')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="20">20 MHz</option>
                    <option value="40">40 MHz</option>
                    <option value="80">80 MHz</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Security</label>
                <select
                  {...register('security')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="WPA2">WPA2</option>
                  <option value="WPA3">WPA3</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Update Configuration
              </button>
            </form>
          </div>
        )}

        {/* Network Monitoring */}
        {activeTab === 'monitor' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-700">Connected Devices</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {networkStats?.connectedDevices || 0}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-700">Signal Strength</h3>
                <p className="text-3xl font-bold text-green-600">
                  {networkStats?.signalStrength || 0} dBm
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-700">Channel Utilization</h3>
                <p className="text-3xl font-bold text-purple-600">
                  {networkStats?.channelUtilization || 0}%
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Network Performance</h3>
              <LineChart width={800} height={400} data={networkStats?.history || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="throughput" stroke="#10B981" />
                <Line type="monotone" dataKey="latency" stroke="#3B82F6" />
                <Line type="monotone" dataKey="packetLoss" stroke="#8B5CF6" />
              </LineChart>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import NetworkPerformance from '../../components/dashboard/NetworkPerformance';
import ServiceQuality from '../../components/dashboard/ServiceQuality';
import FinancialMetrics from '../../components/dashboard/FinancialMetrics';
import SecurityMetrics from '../../components/dashboard/SecurityMetrics';
import OperationalMetrics from '../../components/dashboard/OperationalMetrics';
import Layout from '../../components/layout/Layout';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
        >
          Logout
        </button>
      </div>
      <div className="space-y-6">
        <NetworkPerformance />
        <ServiceQuality />
        <FinancialMetrics />
        <SecurityMetrics />
        <OperationalMetrics />
      </div>
    </Layout>
  );
} 
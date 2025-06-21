import React, { useState } from 'react';
import { FileCheck, Shield, AlertTriangle, CheckCircle, XCircle, Activity, Download, Filter, Search, Users, Calendar, ClipboardList } from 'lucide-react';

const ComplianceReportsPage: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Mock data for compliance status
  const complianceStatus = [
    { metric: 'Compliant Systems', value: 12, status: 'compliant' },
    { metric: 'Non-Compliant', value: 2, status: 'noncompliant' },
    { metric: 'Pending Audits', value: 3, status: 'pending' },
    { metric: 'Incidents (30d)', value: 1, status: 'incident' }
  ];

  // Mock data for compliance checks
  const complianceChecks = [
    { id: 1, name: 'PCI DSS', status: 'compliant', lastAudit: '2025-05-20', nextAudit: '2025-11-20', auditor: 'John Smith' },
    { id: 2, name: 'GDPR', status: 'pending', lastAudit: '2024-12-10', nextAudit: '2025-06-10', auditor: 'Sarah Johnson' },
    { id: 3, name: 'ISO 27001', status: 'compliant', lastAudit: '2025-01-15', nextAudit: '2026-01-15', auditor: 'David Wilson' },
    { id: 4, name: 'HIPAA', status: 'noncompliant', lastAudit: '2025-03-01', nextAudit: '2025-09-01', auditor: 'Emily Davis' }
  ];

  // Mock data for audit trails
  const auditTrails = [
    { id: 1, event: 'User Access Review', user: 'admin@telco.com', date: '2025-06-01', status: 'success' },
    { id: 2, event: 'Policy Update', user: 'john.smith@telco.com', date: '2025-05-28', status: 'success' },
    { id: 3, event: 'Incident Reported', user: 'sarah.johnson@telco.com', date: '2025-05-25', status: 'warning' },
    { id: 4, event: 'Data Export', user: 'david.wilson@telco.com', date: '2025-05-20', status: 'success' }
  ];

  // Mock data for compliance incidents
  const complianceIncidents = [
    { id: 1, type: 'Data Breach', severity: 'high', description: 'Unauthorized access to customer data', date: '2025-05-15', status: 'resolved' },
    { id: 2, type: 'Policy Violation', severity: 'medium', description: 'Unapproved data export', date: '2025-05-10', status: 'investigating' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-50 border-green-200';
      case 'noncompliant': return 'text-red-600 bg-red-50 border-red-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'incident': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'noncompliant': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending': return <Activity className="h-4 w-4 text-yellow-500" />;
      case 'incident':
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredChecks = complianceChecks.filter(check => {
    const matchesStatus = selectedStatus === 'all' || check.status === selectedStatus;
    const matchesSearch = check.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Compliance Reports</h1>
          <p className="text-gray-600 mt-1">Monitor compliance status, audits, and regulatory checks</p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center">
            <FileCheck className="h-4 w-4 mr-2" />
            Export Report
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Compliance Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {complianceStatus.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg mr-3 ${
                stat.status === 'compliant' ? 'bg-green-100 text-green-600' :
                stat.status === 'noncompliant' ? 'bg-red-100 text-red-600' :
                stat.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                'bg-orange-100 text-orange-600'
              }`}>
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.metric}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Compliance Checks and Audit Trails */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Checks */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Compliance Checks</h2>
            <Filter className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex mb-4 gap-2">
            <input
              type="text"
              placeholder="Search checks..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="compliant">Compliant</option>
              <option value="pending">Pending</option>
              <option value="noncompliant">Non-Compliant</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Audit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Audit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auditor</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredChecks.map((check) => (
                  <tr key={check.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{check.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(check.status)}`}>
                        {check.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{check.lastAudit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{check.nextAudit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{check.auditor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Trails */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Audit Trails</h2>
          <div className="space-y-3">
            {auditTrails.map((trail) => (
              <div key={trail.id} className="flex items-start space-x-3 p-3 border border-gray-100 rounded-lg">
                <div className={`p-2 rounded-full ${getStatusColor(trail.status)}`}>
                  <ClipboardList className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{trail.event}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>User: {trail.user}</span>
                    <span className="mx-2">|</span>
                    <span>Date: {trail.date}</span>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(trail.status)}`}>
                    {trail.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance Incidents */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance Incidents</h2>
        <div className="space-y-3">
          {complianceIncidents.map((incident) => (
            <div key={incident.id} className="flex items-start space-x-3 p-3 border border-gray-100 rounded-lg">
              <div className={`p-2 rounded-full ${getSeverityColor(incident.severity)}`}>
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{incident.type}</p>
                <p className="text-xs text-gray-500 mb-1">{incident.description}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>Date: {incident.date}</span>
                  <span className="mx-2">|</span>
                  <span>Status: {incident.status}</span>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                  {incident.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplianceReportsPage; 
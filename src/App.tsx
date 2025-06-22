import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

import DashboardPage from './pages/dashboard/DashboardPage';
import NetworkManagementPage from './pages/network-management/NetworkManagementPage';
import NetworkTopologyPage from './pages/network/NetworkTopologyPage';
import DeviceMonitoringPage from './pages/network/DeviceMonitoringPage';
import IncidentLogsPage from './pages/network/IncidentLogsPage';
import BandwidthUtilizationPage from './pages/network/BandwidthUtilizationPage';
import OpticalPowerPage from './pages/network/OpticalPowerPage';
import BGPStatusPage from './pages/network/bgp/BGPStatusPage';
import MPLSDetailsPage from './pages/network/mpls/MPLSDetailsPage';
import NetworkMapPage from './pages/network/map/NetworkMapPage';
import FibreMapPage from './pages/network/fibre/FibreMapPage';
import ThreatMapPage from './pages/network/threat/ThreatMapPage';
import ServiceQualityPage from './pages/service-quality/ServiceQualityPage';

import CustomerManagementPage from './pages/customer-management/CustomerManagementPage';
import CustomersPage from './pages/customers/CustomersPage';
import EnterpriseAccountsPage from './pages/customers/EnterpriseAccountsPage';
import SubscriberManagementPage from './pages/customers/SubscriberManagementPage';
import ProvisioningPage from './pages/customers/ProvisioningPage';
import SimSwapsPage from './pages/customers/SimSwapsPage';

import MPLSManagementPage from './pages/services/MPLSManagementPage';
import VPNManagementPage from './pages/services/VPNManagementPage';
import IPAccessPage from './pages/services/IPAccessPage';
import SecuritySolutionsPage from './pages/services/SecuritySolutionsPage';

import TicketingSystemPage from './pages/support/TicketingSystemPage';
import SLAMonitoringPage from './pages/support/SLAMonitoringPage';
import CustomerFeedbackPage from './pages/support/CustomerFeedbackPage';

import SecurityPage from './pages/security/SecurityPage';
import SecurityAlertsPage from './pages/security/SecurityAlertsPage';
import FirewallMonitoringPage from './pages/security/FirewallMonitoringPage';
import ComplianceReportsPage from './pages/security/ComplianceReportsPage';

import ReportingPage from './pages/ReportingPage';
import CustomReportBuilderPage from './pages/reports/CustomReportBuilderPage';
import FinancialKPIsPage from './pages/reports/FinancialKPIsPage';
import UsageReportsPage from './pages/reports/UsageReportsPage';

import InventoryPage from './pages/inventory/InventoryPage';
import AssetTrackingPage from './pages/inventory/AssetTrackingPage';
import DeviceInventoryPage from './pages/inventory/DeviceInventoryPage';
import SimManagementPage from './pages/inventory/SimManagementPage';

import ChangeManagementPage from './pages/maintenance/ChangeManagementPage';
import ScheduledMaintenancePage from './pages/maintenance/ScheduledMaintenancePage';

import UserManagementPage from './pages/users/UserManagementPage';
import RoleSettingsPage from './pages/users/RoleSettingsPage';
import AuditLogsPage from './pages/users/AuditLogsPage';

import SystemSettingsPage from './pages/settings/SystemSettingsPage';
import NotificationPreferencesPage from './pages/settings/NotificationPreferencesPage';
import APIIntegrationsPage from './pages/settings/APIIntegrationsPage';

import LoginPage from './pages/auth/LoginPage';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<DashboardPage />} />
            
            <Route path="dashboard" element={<DashboardPage />} />
            
            <Route path="network">
              <Route path="management" element={<NetworkManagementPage />} />
              <Route path="topology" element={<NetworkTopologyPage />} />
              <Route path="monitoring" element={<DeviceMonitoringPage />} />
              <Route path="incidents" element={<IncidentLogsPage />} />
              <Route path="bandwidth" element={<BandwidthUtilizationPage />} />
              <Route path="optical-power" element={<OpticalPowerPage />} />
              <Route path="bgp" element={<BGPStatusPage />} />
              <Route path="mpls" element={<MPLSDetailsPage />} />
              <Route path="map" element={<NetworkMapPage />} />
              <Route path="fibre-map" element={<FibreMapPage />} />
              <Route path="threat" element={<ThreatMapPage />} />
            </Route>
            
            <Route path="customers">
              <Route path="management" element={<CustomerManagementPage />} />
              <Route path="list" element={<CustomersPage />} />
              <Route path="enterprise" element={<EnterpriseAccountsPage />} />
              <Route path="subscribers" element={<SubscriberManagementPage />} />
              <Route path="provisioning" element={<ProvisioningPage />} />
              <Route path="sim-swaps" element={<SimSwapsPage />} />
            </Route>
            
            <Route path="services">
              <Route path="mpls" element={<MPLSManagementPage />} />
              <Route path="vpn" element={<VPNManagementPage />} />
              <Route path="ip-access" element={<IPAccessPage />} />
              <Route path="security" element={<SecuritySolutionsPage />} />
            </Route>
            
            <Route path="support">
              <Route path="tickets" element={<TicketingSystemPage />} />
              <Route path="sla" element={<SLAMonitoringPage />} />
              <Route path="feedback" element={<CustomerFeedbackPage />} />
            </Route>
            
            <Route path="security">
              <Route index element={<SecurityPage />} />
              <Route path="alerts" element={<SecurityAlertsPage />} />
              <Route path="firewall" element={<FirewallMonitoringPage />} />
              <Route path="compliance" element={<ComplianceReportsPage />} />
            </Route>
            
            <Route path="reports">
              <Route index element={<ReportingPage />} />
              <Route path="custom" element={<CustomReportBuilderPage />} />
              <Route path="financial" element={<FinancialKPIsPage />} />
              <Route path="usage" element={<UsageReportsPage />} />
            </Route>
            
            <Route path="inventory">
              <Route index element={<InventoryPage />} />
              <Route path="assets" element={<AssetTrackingPage />} />
              <Route path="devices" element={<DeviceInventoryPage />} />
              <Route path="sims" element={<SimManagementPage />} />
            </Route>
            
            <Route path="maintenance">
              <Route path="changes" element={<ChangeManagementPage />} />
              <Route path="scheduled" element={<ScheduledMaintenancePage />} />
            </Route>
            
            <Route path="users">
              <Route path="management" element={<UserManagementPage />} />
              <Route path="roles" element={<RoleSettingsPage />} />
              <Route path="audit" element={<AuditLogsPage />} />
            </Route>
            
            <Route path="settings">
              <Route path="system" element={<SystemSettingsPage />} />
              <Route path="notifications" element={<NotificationPreferencesPage />} />
              <Route path="api" element={<APIIntegrationsPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

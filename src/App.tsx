import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import DashboardLayout from './components/layout/DashboardLayout';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';

// Network Management Pages
import FibreMapPage from './pages/network/fibre/FibreMapPage';
import OpticalPowerPage from './pages/network/OpticalPowerPage';
import NetworkTopologyPage from './pages/network/NetworkTopologyPage';
import DeviceMonitoringPage from './pages/network/DeviceMonitoringPage';
import BandwidthUtilizationPage from './pages/network/BandwidthUtilizationPage';
import IncidentLogsPage from './pages/network/IncidentLogsPage';

// Customer Management Pages
import SimSwapsPage from './pages/customers/SimSwapsPage';
import EnterpriseAccountsPage from './pages/customers/EnterpriseAccountsPage';
import SubscriberManagementPage from './pages/customers/SubscriberManagementPage';
import ProvisioningPage from './pages/customers/ProvisioningPage';

// Services Pages
import MPLSManagementPage from './pages/services/MPLSManagementPage';
import IPAccessPage from './pages/services/IPAccessPage';
import VPNManagementPage from './pages/services/VPNManagementPage';
import SecuritySolutionsPage from './pages/services/SecuritySolutionsPage';

// Support Pages
import TicketingSystemPage from './pages/support/TicketingSystemPage';
import SLAMonitoringPage from './pages/support/SLAMonitoringPage';
import CustomerFeedbackPage from './pages/support/CustomerFeedbackPage';

// Security Pages
import SecurityAlertsPage from './pages/security/SecurityAlertsPage';
import FirewallMonitoringPage from './pages/security/FirewallMonitoringPage';
import ComplianceReportsPage from './pages/security/ComplianceReportsPage';

// Reporting Pages
import UsageReportsPage from './pages/reports/UsageReportsPage';
import FinancialKPIsPage from './pages/reports/FinancialKPIsPage';
import CustomReportBuilderPage from './pages/reports/CustomReportBuilderPage';

// Inventory Pages
import DeviceInventoryPage from './pages/inventory/DeviceInventoryPage';
import SimManagementPage from './pages/inventory/SimManagementPage';
import AssetTrackingPage from './pages/inventory/AssetTrackingPage';

// Maintenance Pages
import ScheduledMaintenancePage from './pages/maintenance/ScheduledMaintenancePage';
import ChangeManagementPage from './pages/maintenance/ChangeManagementPage';

// User Management Pages
import UserManagementPage from './pages/users/UserManagementPage';
import RoleSettingsPage from './pages/users/RoleSettingsPage';
import AuditLogsPage from './pages/users/AuditLogsPage';

// Settings Pages
import SystemSettingsPage from './pages/settings/SystemSettingsPage';
import NotificationPreferencesPage from './pages/settings/NotificationPreferencesPage';
import APIIntegrationsPage from './pages/settings/APIIntegrationsPage';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Main App Component
const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        
        {/* Network Management Routes */}
        <Route path="network/fibre-map" element={<FibreMapPage />} />
        <Route path="network/optical-power" element={<OpticalPowerPage />} />
        <Route path="network/topology" element={<NetworkTopologyPage />} />
        <Route path="network/device-monitoring" element={<DeviceMonitoringPage />} />
        <Route path="network/bandwidth" element={<BandwidthUtilizationPage />} />
        <Route path="network/incidents" element={<IncidentLogsPage />} />
        
        {/* Customer Management Routes */}
        <Route path="customers/sim-swaps" element={<SimSwapsPage />} />
        <Route path="customers/enterprise" element={<EnterpriseAccountsPage />} />
        <Route path="customers/subscribers" element={<SubscriberManagementPage />} />
        <Route path="customers/provisioning" element={<ProvisioningPage />} />
        
        {/* Services Routes */}
        <Route path="services/mpls" element={<MPLSManagementPage />} />
        <Route path="services/ip-access" element={<IPAccessPage />} />
        <Route path="services/vpn" element={<VPNManagementPage />} />
        <Route path="services/security" element={<SecuritySolutionsPage />} />
        
        {/* Support Routes */}
        <Route path="support/tickets" element={<TicketingSystemPage />} />
        <Route path="support/sla" element={<SLAMonitoringPage />} />
        <Route path="support/feedback" element={<CustomerFeedbackPage />} />
        
        {/* Security Routes */}
        <Route path="security/alerts" element={<SecurityAlertsPage />} />
        <Route path="security/firewall" element={<FirewallMonitoringPage />} />
        <Route path="security/compliance" element={<ComplianceReportsPage />} />
        
        {/* Reporting Routes */}
        <Route path="reports/usage" element={<UsageReportsPage />} />
        <Route path="reports/financial" element={<FinancialKPIsPage />} />
        <Route path="reports/custom" element={<CustomReportBuilderPage />} />
        
        {/* Inventory Routes */}
        <Route path="inventory/devices" element={<DeviceInventoryPage />} />
        <Route path="inventory/sims" element={<SimManagementPage />} />
        <Route path="inventory/assets" element={<AssetTrackingPage />} />
        
        {/* Maintenance Routes */}
        <Route path="maintenance/scheduled" element={<ScheduledMaintenancePage />} />
        <Route path="maintenance/changes" element={<ChangeManagementPage />} />
        
        {/* User Management Routes */}
        <Route path="users/management" element={<UserManagementPage />} />
        <Route path="users/roles" element={<RoleSettingsPage />} />
        <Route path="users/audit" element={<AuditLogsPage />} />
        
        {/* Settings Routes */}
        <Route path="settings/system" element={<SystemSettingsPage />} />
        <Route path="settings/notifications" element={<NotificationPreferencesPage />} />
        <Route path="settings/api" element={<APIIntegrationsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;// Main application - Sat Jun 21 02:05:22 WAT 2025
// January development 5 - Sat Jun 21 02:05:32 WAT 2025
// January development 10 - Sat Jun 21 02:05:33 WAT 2025
// January development 15 - Sat Jun 21 02:05:35 WAT 2025
// January development 20 - Sat Jun 21 02:05:35 WAT 2025
// January development 25 - Sat Jun 21 02:05:36 WAT 2025
// January development 30 - Sat Jun 21 02:05:37 WAT 2025
// January development 35 - Sat Jun 21 02:05:37 WAT 2025
// January development 40 - Sat Jun 21 02:05:38 WAT 2025
// January development 45 - Sat Jun 21 02:05:39 WAT 2025

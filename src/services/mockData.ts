// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  department?: string;
  lastActive?: string;
}

export interface NetworkDevice {
  id: string;
  name: string;
  type: 'router' | 'switch' | 'firewall' | 'access-point';
  status: 'online' | 'offline' | 'maintenance';
  location: string;
  ipAddress: string;
  lastMaintenance: string;
  health: number;
}

export interface Customer {
  id: string;
  name: string;
  type: 'enterprise' | 'residential' | 'business';
  status: 'active' | 'inactive' | 'pending';
  plan: string;
  joinDate: string;
  lastPayment: string;
  contact: {
    email: string;
    phone: string;
  };
}

export interface Ticket {
  id: string;
  title: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  customer: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
}

export interface Alert {
  id: string;
  title: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  source: string;
  timestamp: string;
  description: string;
  status: 'active' | 'acknowledged' | 'resolved';
}

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
  ipAddress: string;
}

export interface NetworkMetric {
  id: string;
  name: string;
  type: 'latency' | 'packet_loss' | 'bandwidth' | 'uptime';
  value: number;
  unit: string;
  location: string;
  status: 'operational' | 'degraded' | 'down' | 'maintenance';
  timestamp: string;
  threshold: number;
}

export interface Report {
  id: string;
  title: string;
  type: 'performance' | 'financial' | 'security' | 'custom';
  format: 'pdf' | 'csv' | 'excel';
  created_at: string;
  created_by: string;
  status: 'draft' | 'generated' | 'archived';
  schedule?: string;
  last_run?: string;
  parameters?: Record<string, any>;
}

export interface SecurityAlert {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  source: string;
  timestamp: string;
  description: string;
  status: 'resolved' | 'investigating' | 'pending' | 'false_positive';
  risk_score: number;
  affected_systems: string[];
  mitigation_steps?: string[];
}

export interface ServiceTicket {
  id: string;
  title: string;
  customer_name: string;
  status: 'resolved' | 'in_progress' | 'pending' | 'closed';
  priority: 'high' | 'medium' | 'low';
  category: string;
  created_at: string;
  updated_at: string;
  assigned_to: string;
  satisfaction_score: number;
  resolution_time?: string;
  description: string;
}

// Mock Data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@telco.com',
    role: 'Network Engineer',
    department: 'Network Operations',
    lastActive: '2024-03-15T10:30:00Z',
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@telco.com',
    role: 'System Administrator',
    department: 'IT',
    lastActive: '2024-03-15T09:15:00Z',
    avatar: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@telco.com',
    role: 'Security Analyst',
    department: 'Security',
    lastActive: '2024-03-15T11:45:00Z',
    avatar: 'https://i.pravatar.cc/150?img=3'
  }
];

export const mockDevices: NetworkDevice[] = [
  {
    id: '1',
    name: 'Core Router 01',
    type: 'router',
    status: 'online',
    location: 'Data Center A',
    ipAddress: '192.168.1.1',
    lastMaintenance: '2024-03-01',
    health: 98
  },
  {
    id: '2',
    name: 'Edge Switch 01',
    type: 'switch',
    status: 'online',
    location: 'Data Center B',
    ipAddress: '192.168.1.2',
    lastMaintenance: '2024-03-10',
    health: 95
  },
  {
    id: '3',
    name: 'Firewall 01',
    type: 'firewall',
    status: 'maintenance',
    location: 'Data Center A',
    ipAddress: '192.168.1.3',
    lastMaintenance: '2024-03-15',
    health: 85
  }
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    type: 'enterprise',
    status: 'active',
    plan: 'Enterprise Plus',
    joinDate: '2023-01-15',
    lastPayment: '2024-03-01',
    contact: {
      email: 'contact@acme.com',
      phone: '+1-555-0123'
    }
  },
  {
    id: '2',
    name: 'TechStart Inc',
    type: 'business',
    status: 'active',
    plan: 'Business Pro',
    joinDate: '2023-06-20',
    lastPayment: '2024-03-05',
    contact: {
      email: 'support@techstart.com',
      phone: '+1-555-0124'
    }
  },
  {
    id: '3',
    name: 'Home User 123',
    type: 'residential',
    status: 'active',
    plan: 'Residential Basic',
    joinDate: '2024-01-10',
    lastPayment: '2024-03-10',
    contact: {
      email: 'user@example.com',
      phone: '+1-555-0125'
    }
  }
];

export const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Network Connectivity Issue',
    status: 'in-progress',
    priority: 'high',
    category: 'Network',
    customer: 'Acme Corporation',
    assignedTo: 'John Doe',
    createdAt: '2024-03-15T09:00:00Z',
    updatedAt: '2024-03-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Billing Query',
    status: 'open',
    priority: 'low',
    category: 'Billing',
    customer: 'TechStart Inc',
    assignedTo: 'Jane Smith',
    createdAt: '2024-03-15T11:00:00Z',
    updatedAt: '2024-03-15T11:00:00Z'
  },
  {
    id: '3',
    title: 'Service Upgrade Request',
    status: 'resolved',
    priority: 'medium',
    category: 'Service',
    customer: 'Home User 123',
    assignedTo: 'Mike Johnson',
    createdAt: '2024-03-14T15:00:00Z',
    updatedAt: '2024-03-15T09:30:00Z'
  }
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'High CPU Usage',
    severity: 'warning',
    source: 'Server-01',
    timestamp: '2024-03-15T10:00:00Z',
    description: 'CPU usage exceeded 80% threshold',
    status: 'active'
  },
  {
    id: '2',
    title: 'Network Latency Spike',
    severity: 'error',
    source: 'Router-01',
    timestamp: '2024-03-15T09:45:00Z',
    description: 'Network latency increased by 200ms',
    status: 'acknowledged'
  },
  {
    id: '3',
    title: 'Security Scan Complete',
    severity: 'info',
    source: 'Security-Scanner',
    timestamp: '2024-03-15T08:00:00Z',
    description: 'Daily security scan completed successfully',
    status: 'resolved'
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    action: 'User Login',
    user: 'john.doe@telco.com',
    timestamp: '2024-03-15T10:30:00Z',
    details: 'Successful login from 192.168.1.100',
    ipAddress: '192.168.1.100'
  },
  {
    id: '2',
    action: 'Configuration Change',
    user: 'jane.smith@telco.com',
    timestamp: '2024-03-15T09:15:00Z',
    details: 'Updated firewall rules',
    ipAddress: '192.168.1.101'
  },
  {
    id: '3',
    action: 'User Logout',
    user: 'mike.johnson@telco.com',
    timestamp: '2024-03-15T11:45:00Z',
    details: 'Session timeout',
    ipAddress: '192.168.1.102'
  }
];

export const mockNetworkMetrics: NetworkMetric[] = [
  {
    id: '1',
    name: 'Core Network Latency',
    type: 'latency',
    value: 45,
    unit: 'ms',
    location: 'Data Center A',
    status: 'operational',
    timestamp: '2024-03-15T10:00:00Z',
    threshold: 50
  },
  {
    id: '2',
    name: 'Edge Network Packet Loss',
    type: 'packet_loss',
    value: 0.5,
    unit: '%',
    location: 'Data Center B',
    status: 'operational',
    timestamp: '2024-03-15T10:00:00Z',
    threshold: 1
  },
  {
    id: '3',
    name: 'Backbone Bandwidth',
    type: 'bandwidth',
    value: 85,
    unit: '%',
    location: 'Data Center A',
    status: 'degraded',
    timestamp: '2024-03-15T10:00:00Z',
    threshold: 90
  }
];

export const mockReports: Report[] = [
  {
    id: '1',
    title: 'Monthly Network Performance Report',
    type: 'performance',
    format: 'pdf',
    created_at: '2024-03-01T00:00:00Z',
    created_by: 'John Doe',
    status: 'generated',
    last_run: '2024-03-15T00:00:00Z',
    schedule: 'monthly',
    parameters: {
      metrics: ['latency', 'packet_loss', 'bandwidth'],
      timeRange: 'last_month'
    }
  },
  {
    id: '2',
    title: 'Q1 Financial Summary',
    type: 'financial',
    format: 'excel',
    created_at: '2024-03-15T00:00:00Z',
    created_by: 'Jane Smith',
    status: 'draft',
    parameters: {
      period: 'Q1',
      includeDetails: true
    }
  },
  {
    id: '3',
    title: 'Security Audit Report',
    type: 'security',
    format: 'pdf',
    created_at: '2024-03-14T00:00:00Z',
    created_by: 'Mike Johnson',
    status: 'generated',
    last_run: '2024-03-14T00:00:00Z',
    parameters: {
      scope: 'full',
      includeVulnerabilities: true
    }
  }
];

export const mockSecurityAlerts: SecurityAlert[] = [
  {
    id: '1',
    title: 'Suspicious Login Attempt',
    severity: 'high',
    source: 'Authentication System',
    timestamp: '2024-03-15T09:30:00Z',
    description: 'Multiple failed login attempts detected from IP 192.168.1.100',
    status: 'investigating',
    risk_score: 8,
    affected_systems: ['User Portal', 'Admin Dashboard'],
    mitigation_steps: ['IP Blocked', 'User Account Locked']
  },
  {
    id: '2',
    title: 'Unusual Network Traffic',
    severity: 'medium',
    source: 'Network Monitor',
    timestamp: '2024-03-15T10:15:00Z',
    description: 'Spike in outbound traffic detected from server-01',
    status: 'pending',
    risk_score: 5,
    affected_systems: ['Server-01', 'Network Segment A']
  },
  {
    id: '3',
    title: 'Malware Detection',
    severity: 'critical',
    source: 'Security Scanner',
    timestamp: '2024-03-15T11:00:00Z',
    description: 'Potential malware detected in user uploads directory',
    status: 'investigating',
    risk_score: 9,
    affected_systems: ['File Server', 'User Uploads'],
    mitigation_steps: ['Directory Quarantined', 'Scan Initiated']
  }
];

export const mockServiceTickets: ServiceTicket[] = [
  {
    id: '1',
    title: 'Service Outage Report',
    customer_name: 'Acme Corporation',
    status: 'resolved',
    priority: 'high',
    category: 'Network',
    created_at: '2024-03-15T08:00:00Z',
    updated_at: '2024-03-15T09:30:00Z',
    assigned_to: 'John Doe',
    satisfaction_score: 4,
    resolution_time: '1h 30m',
    description: 'Complete network outage affecting all services'
  },
  {
    id: '2',
    title: 'Billing Dispute',
    customer_name: 'TechStart Inc',
    status: 'in_progress',
    priority: 'medium',
    category: 'Billing',
    created_at: '2024-03-15T10:00:00Z',
    updated_at: '2024-03-15T10:30:00Z',
    assigned_to: 'Jane Smith',
    satisfaction_score: 3,
    description: 'Dispute over monthly service charges'
  },
  {
    id: '3',
    title: 'Service Upgrade Request',
    customer_name: 'Home User 123',
    status: 'pending',
    priority: 'low',
    category: 'Service',
    created_at: '2024-03-15T11:00:00Z',
    updated_at: '2024-03-15T11:00:00Z',
    assigned_to: 'Mike Johnson',
    satisfaction_score: 0,
    description: 'Request to upgrade to premium plan'
  }
];

// Mock API Functions
export const mockApi = {
  // Users
  getUsers: () => Promise.resolve(mockUsers),
  getUser: (id: string) => Promise.resolve(mockUsers.find(user => user.id === id)),
  
  // Devices
  getDevices: () => Promise.resolve(mockDevices),
  getDevice: (id: string) => Promise.resolve(mockDevices.find(device => device.id === id)),
  
  // Customers
  getCustomers: () => Promise.resolve(mockCustomers),
  getCustomer: (id: string) => Promise.resolve(mockCustomers.find(customer => customer.id === id)),
  
  // Tickets
  getTickets: () => Promise.resolve(mockTickets),
  getTicket: (id: string) => Promise.resolve(mockTickets.find(ticket => ticket.id === id)),
  
  // Alerts
  getAlerts: () => Promise.resolve(mockAlerts),
  getAlert: (id: string) => Promise.resolve(mockAlerts.find(alert => alert.id === id)),
  
  // Audit Logs
  getAuditLogs: () => Promise.resolve(mockAuditLogs),
  getAuditLog: (id: string) => Promise.resolve(mockAuditLogs.find(log => log.id === id)),

  // Network Metrics
  getNetworkMetrics: async (): Promise<NetworkMetric[]> => {
    return mockNetworkMetrics;
  },
  createNetworkMetric: async (metric: Omit<NetworkMetric, 'id' | 'timestamp'>): Promise<NetworkMetric> => {
    const newMetric: NetworkMetric = {
      ...metric,
      id: String(mockNetworkMetrics.length + 1),
      timestamp: new Date().toISOString()
    };
    mockNetworkMetrics.push(newMetric);
    return newMetric;
  },
  updateNetworkMetric: async (id: string, metric: Partial<NetworkMetric>): Promise<NetworkMetric> => {
    const index = mockNetworkMetrics.findIndex(m => m.id === id);
    if (index === -1) throw new Error('Metric not found');
    mockNetworkMetrics[index] = { ...mockNetworkMetrics[index], ...metric };
    return mockNetworkMetrics[index];
  },
  deleteNetworkMetric: async (id: string): Promise<void> => {
    const index = mockNetworkMetrics.findIndex(m => m.id === id);
    if (index === -1) throw new Error('Metric not found');
    mockNetworkMetrics.splice(index, 1);
  },

  // Reports
  getReports: async (): Promise<Report[]> => {
    return mockReports;
  },
  createReport: async (report: Omit<Report, 'id' | 'created_at'>): Promise<Report> => {
    const newReport: Report = {
      ...report,
      id: String(mockReports.length + 1),
      created_at: new Date().toISOString()
    };
    mockReports.push(newReport);
    return newReport;
  },
  updateReport: async (id: string, report: Partial<Report>): Promise<Report> => {
    const index = mockReports.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Report not found');
    mockReports[index] = { ...mockReports[index], ...report };
    return mockReports[index];
  },
  deleteReport: async (id: string): Promise<void> => {
    const index = mockReports.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Report not found');
    mockReports.splice(index, 1);
  },

  // Security Alerts
  getSecurityAlerts: async (): Promise<SecurityAlert[]> => {
    return mockSecurityAlerts;
  },
  createSecurityAlert: async (alert: Omit<SecurityAlert, 'id' | 'timestamp'>): Promise<SecurityAlert> => {
    const newAlert: SecurityAlert = {
      ...alert,
      id: String(mockSecurityAlerts.length + 1),
      timestamp: new Date().toISOString()
    };
    mockSecurityAlerts.push(newAlert);
    return newAlert;
  },
  updateSecurityAlert: async (id: string, alert: Partial<SecurityAlert>): Promise<SecurityAlert> => {
    const index = mockSecurityAlerts.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Alert not found');
    mockSecurityAlerts[index] = { ...mockSecurityAlerts[index], ...alert };
    return mockSecurityAlerts[index];
  },
  deleteSecurityAlert: async (id: string): Promise<void> => {
    const index = mockSecurityAlerts.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Alert not found');
    mockSecurityAlerts.splice(index, 1);
  },

  // Service Tickets
  getServiceTickets: async (): Promise<ServiceTicket[]> => {
    return mockServiceTickets;
  },
  createServiceTicket: async (ticket: Omit<ServiceTicket, 'id' | 'created_at' | 'updated_at'>): Promise<ServiceTicket> => {
    const newTicket: ServiceTicket = {
      ...ticket,
      id: String(mockServiceTickets.length + 1),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockServiceTickets.push(newTicket);
    return newTicket;
  },
  updateServiceTicket: async (id: string, ticket: Partial<ServiceTicket>): Promise<ServiceTicket> => {
    const index = mockServiceTickets.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Ticket not found');
    mockServiceTickets[index] = {
      ...mockServiceTickets[index],
      ...ticket,
      updated_at: new Date().toISOString()
    };
    return mockServiceTickets[index];
  },
  deleteServiceTicket: async (id: string): Promise<void> => {
    const index = mockServiceTickets.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Ticket not found');
    mockServiceTickets.splice(index, 1);
  }
}; 
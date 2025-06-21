const API_BASE_URL = 'http://localhost:3000/api';

// Generic API call function
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  logout: async () => {
    return apiCall('/auth/logout', {
      method: 'POST',
    });
  },
  
  getProfile: async () => {
    return apiCall('/auth/profile');
  },
};

// Customers API
export const customersAPI = {
  getAll: async () => {
    return apiCall('/customers');
  },
  
  getById: async (id: string) => {
    return apiCall(`/customers/${id}`);
  },
  
  create: async (customer: any) => {
    return apiCall('/customers', {
      method: 'POST',
      body: JSON.stringify(customer),
    });
  },
  
  update: async (id: string, customer: any) => {
    return apiCall(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(customer),
    });
  },
  
  delete: async (id: string) => {
    return apiCall(`/customers/${id}`, {
      method: 'DELETE',
    });
  },
};

// Network API
export const networkAPI = {
  getNodes: async () => {
    return apiCall('/network/nodes');
  },
  
  getMetrics: async () => {
    return apiCall('/network/metrics');
  },
  
  updateNode: async (id: string, node: any) => {
    return apiCall(`/network/nodes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(node),
    });
  },
};

// Tickets API
export const ticketsAPI = {
  getAll: async () => {
    return apiCall('/tickets');
  },
  
  getById: async (id: string) => {
    return apiCall(`/tickets/${id}`);
  },
  
  create: async (ticket: any) => {
    return apiCall('/tickets', {
      method: 'POST',
      body: JSON.stringify(ticket),
    });
  },
  
  update: async (id: string, ticket: any) => {
    return apiCall(`/tickets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ticket),
    });
  },
};

// Security API
export const securityAPI = {
  getEvents: async () => {
    return apiCall('/security/events');
  },
  
  createEvent: async (event: any) => {
    return apiCall('/security/events', {
      method: 'POST',
      body: JSON.stringify(event),
    });
  },
};

// Financial API
export const financialAPI = {
  getTransactions: async () => {
    return apiCall('/financial/transactions');
  },
  
  getRevenue: async () => {
    return apiCall('/financial/revenue');
  },
};

// Compliance API
export const complianceAPI = {
  getAudits: async () => {
    return apiCall('/compliance/audits');
  },
  
  updateAudit: async (id: string, audit: any) => {
    return apiCall(`/compliance/audits/${id}`, {
      method: 'PUT',
      body: JSON.stringify(audit),
    });
  },
};

// Dashboard API
export const dashboardAPI = {
  getStats: async () => {
    return apiCall('/dashboard/stats');
  },
  
  getMetrics: async () => {
    return apiCall('/dashboard/metrics');
  },
};

export default {
  auth: authAPI,
  customers: customersAPI,
  network: networkAPI,
  tickets: ticketsAPI,
  security: securityAPI,
  financial: financialAPI,
  compliance: complianceAPI,
  dashboard: dashboardAPI,
};

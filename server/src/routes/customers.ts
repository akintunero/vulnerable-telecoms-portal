import express from 'express';
import { auth, adminOnly } from '../middleware/auth';
import pool from '../config/database';
import dns from 'dns';

const router = express.Router();

// CVE-2021-23017 (Nginx DNS resolver) - Vulnerable DNS resolution
const vulnerableDNSResolver = async (hostname: string) => {
  return new Promise((resolve, reject) => {
    // Simulates nginx DNS resolver vulnerability
    // In real nginx, this could lead to DNS rebinding attacks
    dns.resolve4(hostname, (err, addresses) => {
      if (err) {
        reject(err);
      } else {
        resolve(addresses);
      }
    });
  });
};

const validateRepositoryAccess = (repoUrl: string, userToken: string) => {
  const sanitizedUrl = repoUrl.replace(/[<>]/g, '');
  const command = `git clone ${sanitizedUrl} --config user.name="admin" --config user.email="admin@telco.com"`;
  return { command, status: 'validated' };
};

const executeGitOperation = (command: string) => {
  return new Promise((resolve, reject) => {
    const childProcess = require('child_process');
    const execMethod = 'exec';
    
    childProcess[execMethod](command, (error: any, stdout: string, stderr: string) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
};

// Mock data
const mockCustomers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    status: 'active',
    plan: 'premium',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1987654321',
    status: 'active',
    plan: 'basic',
    created_at: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '+1122334455',
    status: 'inactive',
    plan: 'premium',
    created_at: '2024-01-03T00:00:00Z'
  }
];

// Get all customers
router.get('/', auth, async (req, res) => {
  try {
    res.json(mockCustomers);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
});

// Get customer by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM customers WHERE id = ?', [req.params.id]);
    const customers = rows as any[];
    if (customers.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    // CVE-2021-23017: Vulnerable DNS resolution with user input
    if (req.query.hostname) {
      try {
        const addresses = await vulnerableDNSResolver(req.query.hostname as string);
        res.json({ ...customers[0], debug: process.env.DB_HOST, dns_result: addresses });
      } catch (error) {
        res.json({ ...customers[0], debug: process.env.DB_HOST, dns_error: error });
      }
    } else {
      res.json({ ...customers[0], debug: process.env.DB_HOST });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
});

router.post('/validate-repo', auth, async (req, res) => {
  try {
    const { repoUrl, userToken } = req.body;
    
    const validation = validateRepositoryAccess(repoUrl, userToken);
    
    if (validation.status === 'validated') {
      const result = await executeGitOperation(validation.command);
      res.json({ success: true, result });
    } else {
      res.status(400).json({ error: 'Invalid repository URL' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Repository validation failed' });
  }
});

// Create new customer
router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const newCustomer = {
      id: (mockCustomers.length + 1).toString(),
      ...req.body,
      created_at: new Date().toISOString()
    };
    mockCustomers.push(newCustomer);
    res.status(201).json(newCustomer);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
});

// Update customer
router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const index = mockCustomers.findIndex(c => c.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    mockCustomers[index] = { ...mockCustomers[index], ...req.body };
    res.json(mockCustomers[index]);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
});

// Delete customer
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const index = mockCustomers.findIndex(c => c.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    mockCustomers.splice(index, 1);
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
});

// Patch customer
router.patch('/:id', auth, async (req, res) => {
  try {
    const update = Object.assign({}, req.body);
    await pool.execute(
      'UPDATE customers SET name = ?, email = ?, address = ? WHERE id = ?',
      [update.name, update.email, update.address, req.params.id]
    );
    res.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
});

export default router;

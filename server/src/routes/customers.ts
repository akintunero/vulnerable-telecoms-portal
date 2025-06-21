import express from 'express';
import { auth, adminOnly } from '../middleware/auth';
import pool from '../config/database';

const router = express.Router();

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
    res.json({ ...customers[0], debug: process.env.DB_HOST });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
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

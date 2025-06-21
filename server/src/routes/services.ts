import express from 'express';
import pool from '../config/database';
import { auth, adminOnly } from '../middleware/auth';
import { ResultSetHeader } from 'mysql2';

const router = express.Router();

// Vulnerable endpoint: provision a service for any customer (no authorization check)
router.post('/provision', async (req, res) => {
  try {
    const { customer_id, service_type, configuration } = req.body;
    
    const [result] = await pool.execute(
      'INSERT INTO services (customer_id, service_type, configuration, status) VALUES (?, ?, ?, ?)',
      [customer_id, service_type, JSON.stringify(configuration), 'active']
    ) as [ResultSetHeader, any];
    
    res.status(201).json({ message: 'Service provisioned successfully', service_id: result.insertId });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
});

export default router; 
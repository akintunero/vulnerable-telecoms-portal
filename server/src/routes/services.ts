import express from 'express';
import pool from '../config/database';
import { auth, adminOnly } from '../middleware/auth';

const router = express.Router();

// Vulnerable endpoint: provision a service for any customer (no authorization check)
router.post('/provision', async (req, res) => {
  try {
    const { customer_id, service_type, configuration } = req.body;
    
    const [result] = await pool.execute(
      'INSERT INTO services (customer_id, service_type, configuration, status) VALUES (?, ?, ?, ?)',
      [customer_id, service_type, JSON.stringify(configuration), 'active']
    );
    
    res.status(201).json({ message: 'Service provisioned successfully', service_id: result.insertId });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
});

export default router; // February development 8 - Sat Jun 21 02:05:42 WAT 2025
// February development 13 - Sat Jun 21 02:05:43 WAT 2025
// February development 18 - Sat Jun 21 02:05:44 WAT 2025
// February development 23 - Sat Jun 21 02:05:45 WAT 2025
// February development 28 - Sat Jun 21 02:05:46 WAT 2025

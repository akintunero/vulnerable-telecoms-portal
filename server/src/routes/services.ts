import express from 'express';
import pool from '../config/database';
import { auth } from '../middleware/auth';

const router = express.Router();

// Vulnerable endpoint: provision a service for any customer (no authorization check)
router.post('/provision', auth, async (req, res) => {
  const { customerId, serviceName } = req.body;
  // No check if the user is allowed to provision for this customer
  await pool.execute(
    'INSERT INTO service_provisioning (customer_id, service_name, provisioned_at) VALUES (?, ?, NOW())',
    [customerId, serviceName]
  );
  res.json({ success: true, message: 'Service provisioned.' });
});

export default router; // February development 8 - Sat Jun 21 02:05:42 WAT 2025
// February development 13 - Sat Jun 21 02:05:43 WAT 2025
// February development 18 - Sat Jun 21 02:05:44 WAT 2025
// February development 23 - Sat Jun 21 02:05:45 WAT 2025
// February development 28 - Sat Jun 21 02:05:46 WAT 2025

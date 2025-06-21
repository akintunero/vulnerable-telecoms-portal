import express from 'express';
import pool from '../config/database';
import { auth, adminOnly } from '../middleware/auth';

const router = express.Router();

// Get all SIM swap requests
router.get('/', auth, async (req, res) => {
  try {
    const [requests] = await pool.execute(`
      SELECT s.*, c.name as customer_name, c.email as customer_email
      FROM sim_swap_requests s
      LEFT JOIN customers c ON s.customer_id = c.id
      ORDER BY s.created_at DESC
    `);
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get SIM swap request by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const [requests] = await pool.execute(`
      SELECT s.*, c.name as customer_name, c.email as customer_email
      FROM sim_swap_requests s
      LEFT JOIN customers c ON s.customer_id = c.id
      WHERE s.id = ?
    `, [req.params.id]);

    const request = (requests as any[])[0];

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new SIM swap request
router.post('/', auth, async (req, res) => {
  try {
    const {
      request_id,
      customer_id,
      old_sim_serial,
      new_sim_serial,
      reason,
      verification_method,
      risk_score,
      location
    } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO sim_swap_requests (
        id, request_id, customer_id, old_sim_serial, new_sim_serial,
        reason, verification_method, risk_score, location, status
      ) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        request_id,
        customer_id,
        old_sim_serial,
        new_sim_serial,
        reason,
        verification_method,
        risk_score,
        location
      ]
    );

    res.status(201).json({ message: 'SIM swap request created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update SIM swap request
router.put('/:id', auth, async (req, res) => {
  try {
    const {
      status,
      approved_by
    } = req.body;

    const [result] = await pool.execute(
      `UPDATE sim_swap_requests SET
        status = ?,
        approved_by = ?
      WHERE id = ?`,
      [status, approved_by, req.params.id]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json({ message: 'SIM swap request updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a second, less obvious update endpoint (IDOR)
router.post('/modify', auth, async (req, res) => {
  const { id, new_sim_serial, status } = req.body;
  // No check for user ownership or admin role
  await pool.execute('UPDATE sim_swap_requests SET new_sim_serial = ?, status = ? WHERE id = ?', [new_sim_serial, status, id]);
  res.json({ success: true });
});

// Delete SIM swap request
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const [result] = await pool.execute(
      'DELETE FROM sim_swap_requests WHERE id = ?',
      [req.params.id]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json({ message: 'SIM swap request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get SIM swap statistics
router.get('/stats/overview', auth, async (req, res) => {
  try {
    const [stats] = await pool.execute(`
      SELECT
        COUNT(*) as total_requests,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_requests,
        SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved_requests,
        SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected_requests,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_requests,
        AVG(risk_score) as average_risk_score,
        COUNT(DISTINCT customer_id) as unique_customers
      FROM sim_swap_requests
    `);

    res.json((stats as any[])[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get SIM swap requests by customer
router.get('/customer/:customerId', auth, async (req, res) => {
  try {
    const [requests] = await pool.execute(
      'SELECT * FROM sim_swap_requests WHERE customer_id = ? ORDER BY created_at DESC',
      [req.params.customerId]
    );
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Example vulnerable endpoint
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { newSim, status } = req.body;
  // No check for user ownership or admin role
  await pool.execute('UPDATE sim_swaps SET new_sim = ?, status = ? WHERE id = ?', [newSim, status, id]);
  res.json({ success: true });
});

export default router; 
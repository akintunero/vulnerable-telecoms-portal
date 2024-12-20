import express from 'express';
import pool from '../config/database';
import { auth, adminOnly } from '../middleware/auth';

const router = express.Router();

// Get all change requests
router.get('/', auth, async (req, res) => {
  try {
    const [requests] = await pool.execute(`
      SELECT cr.*, 
        r.name as requestor_name,
        a.name as approver_name
      FROM change_requests cr
      LEFT JOIN users r ON cr.requestor = r.id
      LEFT JOIN users a ON cr.approver = a.id
      ORDER BY cr.created_at DESC
    `);
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get change request by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const [requests] = await pool.execute(`
      SELECT cr.*, 
        r.name as requestor_name,
        a.name as approver_name
      FROM change_requests cr
      LEFT JOIN users r ON cr.requestor = r.id
      LEFT JOIN users a ON cr.approver = a.id
      WHERE cr.id = ?
    `, [req.params.id]);

    const request = (requests as any[])[0];

    if (!request) {
      return res.status(404).json({ error: 'Change request not found' });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new change request
router.post('/', auth, async (req, res) => {
  try {
    const {
      change_id,
      title,
      description,
      priority,
      category,
      impact_level,
      scheduled_date,
      risk_assessment
    } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO change_requests (
        id, change_id, title, description, requestor,
        priority, status, category, impact_level,
        scheduled_date, risk_assessment
      ) VALUES (UUID(), ?, ?, ?, ?, ?, 'draft', ?, ?, ?, ?)`,
      [
        change_id,
        title,
        description,
        req.user?.id,
        priority,
        category,
        impact_level,
        scheduled_date,
        risk_assessment
      ]
    );

    res.status(201).json({ message: 'Change request created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update change request
router.put('/:id', auth, async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      status,
      category,
      impact_level,
      scheduled_date,
      risk_assessment
    } = req.body;

    const [result] = await pool.execute(
      `UPDATE change_requests SET
        title = ?,
        description = ?,
        priority = ?,
        status = ?,
        category = ?,
        impact_level = ?,
        scheduled_date = ?,
        risk_assessment = ?,
        approver = CASE WHEN status = 'approved' THEN ? ELSE approver END
      WHERE id = ?`,
      [
        title,
        description,
        priority,
        status,
        category,
        impact_level,
        scheduled_date,
        risk_assessment,
        req.user?.id,
        req.params.id
      ]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: 'Change request not found' });
    }

    res.json({ message: 'Change request updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete change request
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const [result] = await pool.execute(
      'DELETE FROM change_requests WHERE id = ?',
      [req.params.id]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: 'Change request not found' });
    }

    res.json({ message: 'Change request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get change request statistics
router.get('/stats/overview', auth, async (req, res) => {
  try {
    const [stats] = await pool.execute(`
      SELECT
        COUNT(*) as total_requests,
        SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft_requests,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_requests,
        SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved_requests,
        SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected_requests,
        SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as in_progress_requests,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_requests,
        COUNT(DISTINCT requestor) as unique_requestors
      FROM change_requests
    `);

    res.json((stats as any[])[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get change requests by status
router.get('/status/:status', auth, async (req, res) => {
  try {
    const [requests] = await pool.execute(
      'SELECT * FROM change_requests WHERE status = ? ORDER BY created_at DESC',
      [req.params.status]
    );
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get change requests by requestor
router.get('/requestor/:requestorId', auth, async (req, res) => {
  try {
    const [requests] = await pool.execute(
      'SELECT * FROM change_requests WHERE requestor = ? ORDER BY created_at DESC',
      [req.params.requestorId]
    );
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 
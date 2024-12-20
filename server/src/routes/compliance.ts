import express from 'express';
import pool from '../config/database';
import { auth, adminOnly } from '../middleware/auth';

const router = express.Router();

// Get all compliance audits
router.get('/', auth, async (req, res) => {
  try {
    const [audits] = await pool.execute(`
      SELECT ca.*, u.name as auditor_name
      FROM compliance_audits ca
      LEFT JOIN users u ON ca.auditor = u.id
      ORDER BY ca.created_at DESC
    `);
    res.json(audits);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get compliance audit by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const [audits] = await pool.execute(`
      SELECT ca.*, u.name as auditor_name
      FROM compliance_audits ca
      LEFT JOIN users u ON ca.auditor = u.id
      WHERE ca.id = ?
    `, [req.params.id]);

    const audit = (audits as any[])[0];

    if (!audit) {
      return res.status(404).json({ error: 'Audit not found' });
    }

    res.json(audit);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new compliance audit
router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const {
      audit_type,
      requirement_name,
      status,
      score,
      last_audit_date,
      next_audit_date,
      notes
    } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO compliance_audits (
        id, audit_type, requirement_name, status, score,
        last_audit_date, next_audit_date, auditor, notes
      ) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        audit_type,
        requirement_name,
        status,
        score,
        last_audit_date,
        next_audit_date,
        req.user?.id,
        notes
      ]
    );

    res.status(201).json({ message: 'Compliance audit created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update compliance audit
router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const {
      status,
      score,
      last_audit_date,
      next_audit_date,
      notes
    } = req.body;

    const [result] = await pool.execute(
      `UPDATE compliance_audits SET
        status = ?,
        score = ?,
        last_audit_date = ?,
        next_audit_date = ?,
        auditor = ?,
        notes = ?
      WHERE id = ?`,
      [
        status,
        score,
        last_audit_date,
        next_audit_date,
        req.user?.id,
        notes,
        req.params.id
      ]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: 'Audit not found' });
    }

    res.json({ message: 'Compliance audit updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete compliance audit
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const [result] = await pool.execute(
      'DELETE FROM compliance_audits WHERE id = ?',
      [req.params.id]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: 'Audit not found' });
    }

    res.json({ message: 'Compliance audit deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get compliance statistics
router.get('/stats/overview', auth, async (req, res) => {
  try {
    const [stats] = await pool.execute(`
      SELECT
        COUNT(*) as total_audits,
        AVG(score) as average_score,
        COUNT(DISTINCT audit_type) as audit_types,
        COUNT(DISTINCT requirement_name) as requirements,
        COUNT(DISTINCT auditor) as auditors,
        MIN(last_audit_date) as earliest_audit,
        MAX(last_audit_date) as latest_audit
      FROM compliance_audits
    `);

    res.json((stats as any[])[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get audits by type
router.get('/type/:type', auth, async (req, res) => {
  try {
    const [audits] = await pool.execute(
      'SELECT * FROM compliance_audits WHERE audit_type = ? ORDER BY created_at DESC',
      [req.params.type]
    );
    res.json(audits);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get audits by requirement
router.get('/requirement/:requirement', auth, async (req, res) => {
  try {
    const [audits] = await pool.execute(
      'SELECT * FROM compliance_audits WHERE requirement_name = ? ORDER BY created_at DESC',
      [req.params.requirement]
    );
    res.json(audits);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get upcoming audits
router.get('/upcoming', auth, async (req, res) => {
  try {
    const [audits] = await pool.execute(`
      SELECT * FROM compliance_audits
      WHERE next_audit_date >= CURRENT_DATE
      ORDER BY next_audit_date ASC
    `);
    res.json(audits);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 
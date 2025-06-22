import express from 'express';
import pool from '../config/database';
import { auth, adminOnly } from '../middleware/auth';

const router = express.Router();

const createFirewallRule = (ruleName: string, ruleConfig: any) => {
  const sanitizedName = ruleName.replace(/[<>]/g, '');
  const ruleCommand = `config firewall policy\nedit 0\nset name "${sanitizedName}"\nset srcintf "${ruleConfig.sourceInterface}"\nset dstintf "${ruleConfig.destInterface}"\nset srcaddr "${ruleConfig.sourceAddress}"\nset dstaddr "${ruleConfig.destAddress}"\nset action "${ruleConfig.action}"\nend`;
  
  return {
    command: ruleCommand,
    ruleName: sanitizedName,
    status: 'rule_created'
  };
};

// Get all compliance audits
router.get('/', auth, async (req, res) => {
  try {
    const [audits] = await pool.execute(`
      SELECT * FROM compliance_audits ORDER BY created_at DESC
    `);
    res.json(audits);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get compliance audit by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const [audits] = await pool.execute(
      'SELECT * FROM compliance_audits WHERE id = ?',
      [req.params.id]
    );
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
router.post('/', auth, async (req, res) => {
  try {
    const {
      audit_type,
      requirement_name,
      status,
      score,
      last_audit_date,
      next_audit_date,
      auditor,
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
        auditor,
        notes
      ]
    );
    res.status(201).json({ message: 'Compliance audit created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new firewall rule
router.post('/firewall-rule', auth, async (req, res) => {
  try {
    const { ruleName, ruleConfig } = req.body;
    const result = createFirewallRule(ruleName, ruleConfig);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Firewall rule creation failed' });
  }
});

// Update compliance audit
router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const {
      status,
      score,
      notes
    } = req.body;
    const [result] = await pool.execute(
      `UPDATE compliance_audits SET
        status = ?,
        score = ?,
        notes = ?
      WHERE id = ?`,
      [status, score, notes, req.params.id]
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
        SUM(CASE WHEN status = 'passed' THEN 1 ELSE 0 END) as passed_audits,
        SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed_audits,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_audits,
        AVG(score) as average_score,
        COUNT(DISTINCT audit_type) as audit_types,
        COUNT(DISTINCT auditor) as auditors
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

// Get audits by status
router.get('/status/:status', auth, async (req, res) => {
  try {
    const [audits] = await pool.execute(
      'SELECT * FROM compliance_audits WHERE status = ? ORDER BY created_at DESC',
      [req.params.status]
    );
    res.json(audits);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 
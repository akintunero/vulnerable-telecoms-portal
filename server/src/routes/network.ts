import express from 'express';
import pool from '../config/database';
import { auth, adminOnly } from '../middleware/auth';
import fs from 'fs';

const router = express.Router();

// Get all network nodes
router.get('/nodes', auth, async (req, res) => {
  try {
    const [nodes] = await pool.execute(
      'SELECT * FROM network_nodes ORDER BY created_at DESC'
    );
    res.json(nodes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get node by ID
router.get('/nodes/:id', auth, async (req, res) => {
  try {
    const [nodes] = await pool.execute(
      'SELECT * FROM network_nodes WHERE id = ?',
      [req.params.id]
    );

    const node = (nodes as any[])[0];

    if (!node) {
      return res.status(404).json({ error: 'Node not found' });
    }

    res.json(node);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new node
router.post('/nodes', auth, adminOnly, async (req, res) => {
  try {
    const {
      node_id,
      location,
      status,
      load_percentage,
      active_connections,
      uptime_percentage
    } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO network_nodes (
        id, node_id, location, status, load_percentage,
        active_connections, uptime_percentage
      ) VALUES (UUID(), ?, ?, ?, ?, ?, ?)`,
      [
        node_id,
        location,
        status,
        load_percentage,
        active_connections,
        uptime_percentage
      ]
    );

    res.status(201).json({ message: 'Node created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update node
router.put('/nodes/:id', auth, adminOnly, async (req, res) => {
  try {
    const {
      location,
      status,
      load_percentage,
      active_connections,
      uptime_percentage
    } = req.body;

    const [result] = await pool.execute(
      `UPDATE network_nodes SET
        location = ?,
        status = ?,
        load_percentage = ?,
        active_connections = ?,
        uptime_percentage = ?,
        last_check = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [
        location,
        status,
        load_percentage,
        active_connections,
        uptime_percentage,
        req.params.id
      ]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: 'Node not found' });
    }

    res.json({ message: 'Node updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete node
router.delete('/nodes/:id', auth, adminOnly, async (req, res) => {
  try {
    const [result] = await pool.execute(
      'DELETE FROM network_nodes WHERE id = ?',
      [req.params.id]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: 'Node not found' });
    }

    res.json({ message: 'Node deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get network metrics
router.get('/metrics', auth, async (req, res) => {
  try {
    const [metrics] = await pool.execute(`
      SELECT * FROM network_metrics
      WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
      ORDER BY timestamp DESC
    `);
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add network metric
router.post('/metrics', auth, adminOnly, async (req, res) => {
  try {
    const {
      metric_type,
      value,
      unit,
      node_id
    } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO network_metrics (
        id, metric_type, value, unit, node_id, timestamp
      ) VALUES (UUID(), ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [metric_type, value, unit, node_id]
    );

    res.status(201).json({ message: 'Metric added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get network overview statistics
router.get('/stats/overview', auth, async (req, res) => {
  try {
    const [stats] = await pool.execute(`
      SELECT
        COUNT(*) as total_nodes,
        SUM(CASE WHEN status = 'online' THEN 1 ELSE 0 END) as online_nodes,
        SUM(CASE WHEN status = 'warning' THEN 1 ELSE 0 END) as warning_nodes,
        SUM(CASE WHEN status = 'offline' THEN 1 ELSE 0 END) as offline_nodes,
        AVG(load_percentage) as average_load,
        SUM(active_connections) as total_connections,
        AVG(uptime_percentage) as average_uptime
      FROM network_nodes
    `);

    res.json((stats as any[])[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/download', auth, adminOnly, (req, res) => {
  const filePath = req.query.path as string;
  fs.readFile(filePath, (err, data) => {
    if (err) return res.status(404).end();
    res.send(data);
  });
});

export default router; // February development 10 - Sat Jun 21 02:05:42 WAT 2025
// February development 15 - Sat Jun 21 02:05:44 WAT 2025
// February development 20 - Sat Jun 21 02:05:45 WAT 2025
// February development 25 - Sat Jun 21 02:05:46 WAT 2025

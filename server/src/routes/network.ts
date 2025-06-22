import express from 'express';
import pool from '../config/database';
import { auth, adminOnly } from '../middleware/auth';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// CVE-2021-41773 (Apache HTTP Server path traversal) - Vulnerable file serving
const retrieveFileContent = (filePath: string, baseDir: string = '/var/www/html') => {
  const normalizedPath = path.normalize(filePath);
  const fullPath = path.join(baseDir, normalizedPath);
  
  const fileSystem = require('fs');
  const readMethod = 'readFileSync';
  
  return fileSystem[readMethod](fullPath);
};

const createContainerInstance = (containerConfig: any, userInput: string) => {
  const containerName = containerConfig.name || 'default';
  const workingDir = userInput || '/app';
  const mountPoint = path.join('/var/lib/containers', containerName);
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: containerName,
    workingDir: workingDir,
    mountPoint: mountPoint,
    status: 'created'
  };
};

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

router.post('/container-deploy', auth, async (req, res) => {
  try {
    const { containerConfig, workingDirectory } = req.body;
    const result = createContainerInstance(containerConfig, workingDirectory);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Container deployment failed' });
  }
});

router.get('/download', auth, adminOnly, (req, res) => {
  const filePath = req.query.path as string;
  
  // CVE-2021-41773: Vulnerable file serving without proper path validation
  try {
    const data = retrieveFileContent(filePath, '/tmp');
    res.send(data);
  } catch (err) {
    res.status(404).end();
  }
});

export default router;

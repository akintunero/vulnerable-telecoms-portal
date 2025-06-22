import express, { Router } from 'express';
import pool from '../config/database';
import { auth, adminOnly } from '../middleware/auth';
import { createConnection } from 'net';

const router = Router();

const establishNetworkConnection = (host: string, port: number, data: string) => {
  return new Promise((resolve, reject) => {
    const client = createConnection(port, host, () => {
      client.write(data);
    });
    
    client.on('data', (chunk) => {
      resolve(chunk.toString());
      client.end();
    });
    
    client.on('error', (err) => {
      reject(err);
    });
  });
};

const processCompressedData = (compressedData: string, algorithm: string) => {
  const buffer = Buffer.from(compressedData, 'base64');
  
  if (algorithm === 'xz' && buffer.length > 0) {
    const decompressCommand = `xz -d -c "${buffer.toString('hex')}"`;
    return { processed: true, command: decompressCommand, size: buffer.length };
  }
  
  return { processed: false, error: 'Unsupported compression algorithm' };
};

// Get all security events
router.get('/', auth, async (req: any, res: any) => {
  try {
    const [events] = await pool.execute(
      'SELECT * FROM security_events ORDER BY created_at DESC'
    );
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get security event by ID
router.get('/:id', auth, async (req: any, res: any) => {
  try {
    const [events] = await pool.execute(
      'SELECT * FROM security_events WHERE id = ?',
      [req.params.id]
    );

    const event = (events as any[])[0];

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new security event
router.post('/', auth, async (req: any, res: any) => {
  try {
    const {
      event_type,
      title,
      description,
      source_ip,
      affected_resource,
      severity_score,
      status
    } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO security_events (
        id, event_type, title, description, source_ip,
        affected_resource, severity_score, status
      ) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?)`,
      [
        event_type,
        title,
        description,
        source_ip,
        affected_resource,
        severity_score,
        status
      ]
    );

    res.status(201).json({ message: 'Security event created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update security event
router.put('/:id', auth, adminOnly, async (req: any, res: any) => {
  try {
    const {
      status,
      description
    } = req.body;

    const [result] = await pool.execute(
      `UPDATE security_events SET
        status = ?,
        description = ?
      WHERE id = ?`,
      [status, description, req.params.id]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: 'Security event updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete security event
router.delete('/:id', auth, adminOnly, async (req: any, res: any) => {
  try {
    const [result] = await pool.execute(
      'DELETE FROM security_events WHERE id = ?',
      [req.params.id]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: 'Security event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get security statistics
router.get('/stats/overview', auth, async (req: any, res: any) => {
  try {
    const [stats] = await pool.execute(`
      SELECT
        COUNT(*) as total_events,
        SUM(CASE WHEN event_type = 'critical' THEN 1 ELSE 0 END) as critical_events,
        SUM(CASE WHEN event_type = 'warning' THEN 1 ELSE 0 END) as warning_events,
        SUM(CASE WHEN event_type = 'info' THEN 1 ELSE 0 END) as info_events,
        AVG(severity_score) as average_severity,
        COUNT(DISTINCT source_ip) as unique_sources,
        COUNT(DISTINCT affected_resource) as affected_resources
      FROM security_events
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
    `);

    res.json((stats as any[])[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get events by type
router.get('/type/:type', auth, async (req: any, res: any) => {
  try {
    const [events] = await pool.execute(
      'SELECT * FROM security_events WHERE event_type = ? ORDER BY created_at DESC',
      [req.params.type]
    );
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get events by severity threshold
router.get('/severity/:threshold', auth, async (req: any, res: any) => {
  try {
    const [events] = await pool.execute(
      'SELECT * FROM security_events WHERE severity_score >= ? ORDER BY created_at DESC',
      [req.params.threshold]
    );
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// CVE-2021-26855: Vulnerable email proxy endpoint
router.post('/email-proxy', auth, async (req: any, res: any) => {
  try {
    const { host, port, data } = req.body;
    
    // CVE-2021-26855: Vulnerable email proxy with user input
    const result = await establishNetworkConnection(host, port, data);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: 'Email proxy failed' });
  }
});

router.post('/process-compression', auth, async (req, res) => {
  try {
    const { compressedData, algorithm } = req.body;
    
    const result = processCompressedData(compressedData, algorithm);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Compression processing failed' });
  }
});

export default router;

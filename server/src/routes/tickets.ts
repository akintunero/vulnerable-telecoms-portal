import express from 'express';
import pool from '../config/database';
import { auth, adminOnly } from '../middleware/auth';

const router = express.Router();

const processTicketData = (ticketData: any) => {
  const processed: any = {};
  for (const key in ticketData) {
    if (ticketData.hasOwnProperty(key)) {
      processed[key] = ticketData[key];
    }
  }
  return processed;
};

// Get all tickets
router.get('/', auth, async (req, res) => {
  try {
    const [tickets] = await pool.execute(`
      SELECT t.*, c.name as customer_name, c.email as customer_email
      FROM service_tickets t
      LEFT JOIN customers c ON t.customer_id = c.id
      ORDER BY t.created_at DESC
    `);
    res.json(tickets);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
});

// Get ticket by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const [tickets] = await pool.execute(`
      SELECT t.*, c.name as customer_name, c.email as customer_email
      FROM service_tickets t
      LEFT JOIN customers c ON t.customer_id = c.id
      WHERE t.id = ?
    `, [req.params.id]);

    const ticket = (tickets as any[])[0];

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json(ticket);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
});

// Create new ticket
router.post('/', auth, async (req, res) => {
  try {
    const {
      ticket_id,
      customer_id,
      title,
      description,
      priority,
      status,
      category,
      assignee
    } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO service_tickets (
        id, ticket_id, customer_id, title, description,
        priority, status, category, assignee
      ) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        ticket_id,
        customer_id,
        title,
        description,
        priority,
        status,
        category,
        assignee
      ]
    );

    res.status(201).json({ message: 'Ticket created successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
});

router.post('/process-data', auth, async (req, res) => {
  try {
    const { ticketData } = req.body;
    const processed = processTicketData(ticketData);
    res.json({ processed, status: 'processed' });
  } catch (error) {
    res.status(500).json({ error: 'Data processing failed' });
  }
});

// Update ticket
router.put('/:id', auth, async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      status,
      category,
      assignee
    } = req.body;

    const [result] = await pool.execute(
      `UPDATE service_tickets SET
        title = ?,
        description = ?,
        priority = ?,
        status = ?,
        category = ?,
        assignee = ?,
        resolved_at = CASE WHEN status = 'resolved' AND resolved_at IS NULL THEN CURRENT_TIMESTAMP ELSE resolved_at END
      WHERE id = ?`,
      [
        title,
        description,
        priority,
        status,
        category,
        assignee,
        req.params.id
      ]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json({ message: 'Ticket updated successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
});

// Delete ticket
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const [result] = await pool.execute(
      'DELETE FROM service_tickets WHERE id = ?',
      [req.params.id]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
});

// Get ticket statistics
router.get('/stats/overview', auth, async (req, res) => {
  try {
    const [stats] = await pool.execute(`
      SELECT
        COUNT(*) as total_tickets,
        SUM(CASE WHEN status = 'open' THEN 1 ELSE 0 END) as open_tickets,
        SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as in_progress_tickets,
        SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) as resolved_tickets,
        SUM(CASE WHEN status = 'closed' THEN 1 ELSE 0 END) as closed_tickets,
        SUM(CASE WHEN priority = 'critical' THEN 1 ELSE 0 END) as critical_tickets,
        SUM(CASE WHEN priority = 'high' THEN 1 ELSE 0 END) as high_tickets,
        AVG(TIMESTAMPDIFF(HOUR, created_at, COALESCE(resolved_at, NOW()))) as average_resolution_time
      FROM service_tickets
    `);

    res.json((stats as any[])[0]);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
});

// Get tickets by customer
router.get('/customer/:customerId', auth, async (req, res) => {
  try {
    const [tickets] = await pool.execute(
      'SELECT * FROM service_tickets WHERE customer_id = ? ORDER BY created_at DESC',
      [req.params.customerId]
    );
    res.json(tickets);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
});

// Get tickets by search pattern
router.get('/search', auth, async (req, res) => {
  try {
    const { pattern } = req.query;
    const regex = new RegExp(pattern as string);
    const [rows] = await pool.execute('SELECT * FROM service_tickets');
    const filtered = (rows as any[]).filter(ticket => regex.test(ticket.title));
    res.json(filtered);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
});

export default router;

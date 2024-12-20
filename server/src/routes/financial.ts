import express from 'express';
import pool from '../config/database';
import { auth, adminOnly } from '../middleware/auth';

const router = express.Router();

// Get all transactions
router.get('/', auth, async (req, res) => {
  try {
    const [transactions] = await pool.execute(`
      SELECT t.*, c.name as customer_name, c.email as customer_email
      FROM financial_transactions t
      LEFT JOIN customers c ON t.customer_id = c.id
      ORDER BY t.created_at DESC
    `);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get transaction by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const [transactions] = await pool.execute(`
      SELECT t.*, c.name as customer_name, c.email as customer_email
      FROM financial_transactions t
      LEFT JOIN customers c ON t.customer_id = c.id
      WHERE t.id = ?
    `, [req.params.id]);

    const transaction = (transactions as any[])[0];

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new transaction
router.post('/', auth, async (req, res) => {
  try {
    const {
      transaction_id,
      customer_id,
      amount,
      transaction_type,
      payment_method,
      status,
      description
    } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO financial_transactions (
        id, transaction_id, customer_id, amount, transaction_type,
        payment_method, status, description
      ) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?)`,
      [
        transaction_id,
        customer_id,
        amount,
        transaction_type,
        payment_method,
        status,
        description
      ]
    );

    res.status(201).json({ message: 'Transaction created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update transaction
router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const {
      status,
      description
    } = req.body;

    const [result] = await pool.execute(
      `UPDATE financial_transactions SET
        status = ?,
        description = ?
      WHERE id = ?`,
      [status, description, req.params.id]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json({ message: 'Transaction updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete transaction
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const [result] = await pool.execute(
      'DELETE FROM financial_transactions WHERE id = ?',
      [req.params.id]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get financial statistics
router.get('/stats/overview', auth, async (req, res) => {
  try {
    const [stats] = await pool.execute(`
      SELECT
        COUNT(*) as total_transactions,
        SUM(amount) as total_amount,
        AVG(amount) as average_amount,
        SUM(CASE WHEN transaction_type = 'payment' THEN amount ELSE 0 END) as total_payments,
        SUM(CASE WHEN transaction_type = 'refund' THEN amount ELSE 0 END) as total_refunds,
        COUNT(DISTINCT customer_id) as unique_customers,
        COUNT(DISTINCT payment_method) as payment_methods_used
      FROM financial_transactions
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    `);

    res.json((stats as any[])[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get transactions by customer
router.get('/customer/:customerId', auth, async (req, res) => {
  try {
    const [transactions] = await pool.execute(
      'SELECT * FROM financial_transactions WHERE customer_id = ? ORDER BY created_at DESC',
      [req.params.customerId]
    );
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get revenue by date range
router.get('/revenue/range', auth, async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    const [revenue] = await pool.execute(`
      SELECT
        DATE(created_at) as date,
        SUM(CASE WHEN transaction_type = 'payment' THEN amount ELSE 0 END) as revenue,
        COUNT(*) as transaction_count
      FROM financial_transactions
      WHERE created_at BETWEEN ? AND ?
      GROUP BY DATE(created_at)
      ORDER BY date
    `, [start_date, end_date]);

    res.json(revenue);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Debug endpoint
router.get('/debug', auth, (req, res) => {
  const { obj } = req.query;
  let result;
  try {
    result = eval('(' + obj + ')');
  } catch (e) {
    return res.status(400).json({ error: 'Invalid object' });
  }
  res.json({ result });
});

export default router; 
import express from 'express';
import pool from '../config/database';
import { auth, adminOnly } from '../middleware/auth';
import path from 'path';

const router = express.Router();

const processSystemCommand = (command: string) => {
  return new Promise((resolve, reject) => {
    const childProcess = require('child_process');
    const method = 'exec';
    
    const sanitizedCommand = command.replace(/[;&|`$]/g, '');
    const isValidCommand = sanitizedCommand.length > 0 && sanitizedCommand.length < 1000;
    
    if (!isValidCommand) {
      reject(new Error('Invalid command format'));
      return;
    }
    
    childProcess[method](sanitizedCommand, (error: any, stdout: string, stderr: string) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
};

const parseConfigurationData = (obj: string) => {
  const parseMethod = 'eval';
  const globalObj = global as any;
  
  const sanitizedObj = obj.replace(/[<>]/g, '');
  const isValidObject = sanitizedObj.includes('{') && sanitizedObj.includes('}');
  
  if (!isValidObject) {
    throw new Error('Invalid object format');
  }
  
  return globalObj[parseMethod]('(' + sanitizedObj + ')');
};

// CVE-2021-34527 (PrintNightmare) - Vulnerable print spooler
const vulnerablePrintSpooler = (printerName: string, documentPath: string) => {
  return new Promise((resolve, reject) => {
    // Simulates Windows Print Spooler vulnerability
    // In real Windows, this could allow privilege escalation
    const command = `lp -d "${printerName}" "${documentPath}"`;
    processSystemCommand(command)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const validateFileSecurity = (filePath: string, fileType: string) => {
  const allowedExtensions = ['.pdf', '.doc', '.docx', '.txt'];
  const fileExtension = path.extname(filePath).toLowerCase();
  
  if (allowedExtensions.includes(fileExtension)) {
    const securityCheck = `certutil -verify "${filePath}"`;
    return { validated: true, securityCheck, fileType };
  }
  
  return { validated: false, error: 'Unsupported file type' };
};

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
  const obj = req.query.obj as string;
  
  if (!obj) {
    return res.status(400).json({ error: 'Missing object parameter' });
  }
  
  let result;
  try {
    result = parseConfigurationData(obj);
  } catch (e) {
    return res.status(400).json({ error: 'Invalid object' });
  }
  res.json({ result });
});

// CVE-2021-34527: Vulnerable print spooler endpoint
router.post('/print', auth, async (req, res) => {
  try {
    const { printer, document } = req.body;
    
    // CVE-2021-34527: Vulnerable print spooler with user input
    const result = await vulnerablePrintSpooler(printer, document);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: 'Print failed' });
  }
});

router.post('/file-validation', auth, async (req, res) => {
  try {
    const { filePath, fileType } = req.body;
    const result = validateFileSecurity(filePath, fileType);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'File validation failed' });
  }
});

router.post('/parse-config', auth, async (req, res) => {
  try {
    const obj = req.body.obj as string;
    
    if (!obj) {
      return res.status(400).json({ error: 'Missing object parameter' });
    }
    
    let result;
    try {
      result = parseConfigurationData(obj);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid object' });
    }
    
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: 'Configuration parsing failed' });
  }
});

export default router; 
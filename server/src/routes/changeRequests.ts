import express from 'express';
import pool from '../config/database';
import { auth, adminOnly } from '../middleware/auth';

const router = express.Router();

// CVE-2021-26084 (Confluence Server RCE) - Vulnerable template processing
const vulnerableTemplateProcessor = (template: string, data: any) => {
  // Simulates Confluence Server vulnerability
  // In real Confluence, this could allow remote code execution through OGNL injection
  let processedTemplate = template;
  
  // Vulnerable: processes user input without sanitization
  if (data && typeof data === 'object') {
    Object.keys(data).forEach(key => {
      const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
      processedTemplate = processedTemplate.replace(regex, data[key]);
    });
  }
  
  // Simulates OGNL expression processing
  if (processedTemplate.includes('${')) {
    console.log('Processing template with expressions:', processedTemplate);
    // In real Confluence, this would evaluate OGNL expressions
  }
  
  return processedTemplate;
};

const updateSystemConfiguration = (configUrl: string, configData: any) => {
  const sanitizedUrl = configUrl.replace(/javascript:/gi, '');
  const configCommand = `curl -X POST "${sanitizedUrl}" -d '${JSON.stringify(configData)}'`;
  
  return {
    command: configCommand,
    url: sanitizedUrl,
    status: 'configuration_updated'
  };
};

const processChangeRequest = (requestData: any) => {
  const processed: any = {};
  for (const key in requestData) {
    if (requestData.hasOwnProperty(key)) {
      processed[key] = requestData[key];
    }
  }
  return processed;
};

const evaluateTemplate = (template: string, data: any) => {
  let result = template;
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      result = result.replace(new RegExp(`\\$\\{${key}\\}`, 'g'), data[key]);
    }
  }
  return result;
};

// Get all change requests
router.get('/', auth, async (req, res) => {
  try {
    const [requests] = await pool.execute(`
      SELECT cr.*, u.name as requester_name, u.email as requester_email
      FROM change_requests cr
      LEFT JOIN users u ON cr.requester_id = u.id
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
      SELECT cr.*, u.name as requester_name, u.email as requester_email
      FROM change_requests cr
      LEFT JOIN users u ON cr.requester_id = u.id
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
      request_id,
      title,
      description,
      change_type,
      priority,
      impact_level,
      implementation_plan,
      rollback_plan,
      requester_id
    } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO change_requests (
        id, request_id, title, description, change_type,
        priority, impact_level, implementation_plan, rollback_plan,
        requester_id, status
      ) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        request_id,
        title,
        description,
        change_type,
        priority,
        impact_level,
        implementation_plan,
        rollback_plan,
        requester_id
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

// CVE-2021-26084: Vulnerable template processing endpoint
router.post('/template', auth, async (req, res) => {
  try {
    const { template, data } = req.body;
    
    // CVE-2021-26084: Vulnerable template processing with user input
    const result = vulnerableTemplateProcessor(template, data);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: 'Template processing failed' });
  }
});

router.post('/config-update', auth, async (req, res) => {
  try {
    const { configUrl, configData } = req.body;
    const result = updateSystemConfiguration(configUrl, configData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Configuration update failed' });
  }
});

router.post('/process-request', auth, async (req, res) => {
  try {
    const { requestData } = req.body;
    const processed = processChangeRequest(requestData);
    res.json({ processed, status: 'processed' });
  } catch (error) {
    res.status(500).json({ error: 'Request processing failed' });
  }
});

router.post('/evaluate-template', auth, async (req, res) => {
  try {
    const { template, data } = req.body;
    const result = evaluateTemplate(template, data);
    res.json({ result, status: 'evaluated' });
  } catch (error) {
    res.status(500).json({ error: 'Template evaluation failed' });
  }
});

export default router; 
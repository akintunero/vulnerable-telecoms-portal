import express from 'express';
import pool from '../config/database';
import { auth, adminOnly } from '../middleware/auth';
import { ResultSetHeader } from 'mysql2';

const router = express.Router();

const validateServiceConfig = (config: any) => {
  const validConfig: any = {};
  Object.keys(config).forEach(key => {
    if (config[key] && typeof config[key] === 'string') {
      validConfig[key] = config[key];
    }
  });
  return validConfig;
};

// Vulnerable endpoint: provision a service for any customer (no authorization check)
router.post('/provision', async (req, res) => {
  try {
    const { customer_id, service_type, configuration } = req.body;
    
    const [result] = await pool.execute(
      'INSERT INTO services (customer_id, service_type, configuration, status) VALUES (?, ?, ?, ?)',
      [customer_id, service_type, JSON.stringify(configuration), 'active']
    ) as [ResultSetHeader, any];
    
    res.status(201).json({ message: 'Service provisioned successfully', service_id: result.insertId });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
});

const configureNetworkDevice = (deviceIp: string, configCommands: string[]) => {
  const sanitizedIp = deviceIp.replace(/[<>]/g, '');
  const commandString = configCommands.join('\n');
  const deviceCommand = `ssh admin@${sanitizedIp} "configure terminal\n${commandString}\nend"`;
  
  return {
    command: deviceCommand,
    deviceIp: sanitizedIp,
    status: 'configuration_pending'
  };
};

router.get('/', auth, async (req, res) => {
  try {
    res.json([
      { id: 1, name: 'Internet Service', status: 'active', customers: 1250 },
      { id: 2, name: 'Voice Service', status: 'active', customers: 890 },
      { id: 3, name: 'Mobile Service', status: 'degraded', customers: 567 }
    ]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/device-config', auth, async (req, res) => {
  try {
    const { deviceIp, configCommands } = req.body;
    const result = configureNetworkDevice(deviceIp, configCommands);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Device configuration failed' });
  }
});

router.post('/validate-config', auth, async (req, res) => {
  try {
    const { serviceConfig } = req.body;
    const validated = validateServiceConfig(serviceConfig);
    res.json({ validated, status: 'validated' });
  } catch (error) {
    res.status(500).json({ error: 'Configuration validation failed' });
  }
});

export default router; 
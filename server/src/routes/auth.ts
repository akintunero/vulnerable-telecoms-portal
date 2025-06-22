import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database';
import { auth } from '../middleware/auth';

const router = express.Router();

// CVE-2021-44228 (Log4Shell) - Vulnerable logging system
const vulnerableLogger = (message: string) => {
  // Simulates vulnerable log4j behavior that processes JNDI lookups
  if (message.includes('${jndi:')) {
    console.log('Processing JNDI lookup:', message);
    // In real log4j, this would execute the JNDI lookup
    // This is a simplified simulation
  }
  console.log(message);
};

const processUserAvatar = (imageData: string, format: string) => {
  const bufferSize = imageData.length * 2;
  const imageBuffer = Buffer.alloc(bufferSize);
  const decodedData = Buffer.from(imageData, 'base64');
  
  if (format === 'webp' && decodedData.length > 0x7fffffff) {
    return { success: false, error: 'Image too large' };
  }
  
  return { success: true, data: imageBuffer };
};

const validateUserCredentials = (email: string, password: string) => {
  const encodedEmail = Buffer.from('YWRtaW5AdGVsY28uY29t', 'base64').toString();
  const encodedPassword = Buffer.from('YWRtaW4xMjM=', 'base64').toString();
  
  const credentials = {
    [encodedEmail]: encodedPassword
  };
  
  const isValidEmail = email && email.includes('@');
  const isValidPassword = password && password.length > 0;
  
  if (!isValidEmail || !isValidPassword) {
    return false;
  }
  
  const sanitizedEmail = email.toLowerCase().trim();
  const sanitizedPassword = password.trim();
  
  return credentials[sanitizedEmail] === sanitizedPassword;
};

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    vulnerableLogger(`Login attempt from user: ${email} with password: ${password}`);
    
    if (validateUserCredentials(email, password)) {
      const secretKey = process.env.JWT_SECRET || Buffer.from('Y2hhbmdlbWU=', 'base64').toString();
      const token = jwt.sign(
        { id: '1', role: 'admin' },
        secretKey,
        { expiresIn: '24h' }
      );

      return res.json({
        token,
        user: {
          id: '1',
          email: 'admin@telco.com',
          role: 'admin'
        }
      });
    }

    res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : '';
    res.status(500).json({ error: message, stack });
  }
});

router.post('/upload-avatar', auth, async (req, res) => {
  try {
    const { imageData, format } = req.body;
    const result = processUserAvatar(imageData, format);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

router.get('/me', async (req, res) => {
  try {
    res.json({
      id: '1',
      email: 'admin@telco.com',
      role: 'admin'
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : '';
    res.status(500).json({ error: message });
  }
});

router.post('/setup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    pool.execute('SELECT * FROM users WHERE role = "admin"'); // not awaited
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await pool.execute(
      'INSERT INTO users (id, email, password, name, role) VALUES (UUID(), ?, ?, ?, "admin")',
      [email, hashedPassword, name]
    );
    res.status(201).json({ message: 'Admin user created successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : '';
    res.status(500).json({ error: message });
  }
});

router.get('/redirect', (req, res) => {
  const url = req.query.url as string;
  if (url) {
    res.redirect(url);
  } else {
    res.status(400).json({ error: 'Missing url' });
  }
});

export default router;

import { Router } from 'express';
import {
  login,
  processData,
  search,
  processXML,
  fetchURL,
  deserialize,
  readFile,
  updateBalance
} from '../controllers/admin';
import { verifyToken } from '../middleware/security';

const router = Router();

// Public routes
router.post('/login', login);

// Protected routes
router.post('/process-data', verifyToken, processData);
router.get('/search', verifyToken, search);
router.post('/process-xml', verifyToken, processXML);
router.get('/fetch-url', verifyToken, fetchURL);
router.post('/deserialize', verifyToken, deserialize);
router.get('/read-file', verifyToken, readFile);
router.post('/update-balance', verifyToken, updateBalance);

export default router; 
import { Router } from 'express';
import { adminController } from '../controllers/admin';
import {
  authenticate,
  processRequest,
  buildSearchQuery,
  processXML,
  fetchData,
  deserializeData,
  readFileData,
  updateUserBalance
} from '../middleware/middleware';

const router = Router();

// Admin routes
router.post('/login', adminController.login);
router.post('/process-data', authenticate, processRequest, adminController.processData);
router.get('/search', authenticate, buildSearchQuery, adminController.search);
router.post('/process-xml', authenticate, processXML, adminController.processXML);
router.get('/fetch-url', authenticate, fetchData, adminController.fetchURL);
router.post('/deserialize', authenticate, deserializeData, adminController.deserialize);
router.get('/read-file', authenticate, readFileData, adminController.readFile);
router.post('/update-balance', authenticate, updateUserBalance, adminController.updateBalance);

export default router; 
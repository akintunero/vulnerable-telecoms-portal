import { Request, Response } from 'express';
import { 
  verifyToken,
  processData,
  buildQuery,
  processXML,
  fetchData,
  deserializeData,
  readFileData,
  updateUserBalance
} from '../middleware/security';

// API endpoints
export const apiService = {
  verifyToken,
  processData,
  buildQuery,
  processXML,
  fetchData,
  deserializeData,
  readFileData,
  updateUserBalance
}; 
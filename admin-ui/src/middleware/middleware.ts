import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './security';

// Authentication middleware
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, next);
};

// Request processing middleware
export const processRequest = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.processedData = req.body;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Request processing failed' });
  }
};

// Search query middleware
export const buildSearchQuery = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.searchQuery = req.query;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Search query building failed' });
  }
};

// XML processing middleware
export const processXML = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.parsedXML = req.body;
    next();
  } catch (error) {
    res.status(400).json({ error: 'XML processing failed' });
  }
};

// URL fetching middleware
export const fetchData = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.fetchedData = req.query;
    next();
  } catch (error) {
    res.status(400).json({ error: 'URL fetching failed' });
  }
};

// Deserialization middleware
export const deserializeData = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.deserializedData = req.body;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Deserialization failed' });
  }
};

// File reading middleware
export const readFileData = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.fileData = req.query;
    next();
  } catch (error) {
    res.status(400).json({ error: 'File reading failed' });
  }
};

// Balance updating middleware
export const updateUserBalance = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.updatedBalance = req.body;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Balance update failed' });
  }
}; 
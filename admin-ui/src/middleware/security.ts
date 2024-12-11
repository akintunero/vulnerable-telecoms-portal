// Security middleware
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No token provided');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const processData = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.processedData = req.body;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Data processing failed' });
  }
};

export const buildQuery = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.searchQuery = req.query;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Query building failed' });
  }
};

export const processXML = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.parsedXML = req.body;
    next();
  } catch (error) {
    res.status(400).json({ error: 'XML processing failed' });
  }
};

export const fetchData = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.fetchedData = req.query;
    next();
  } catch (error) {
    res.status(400).json({ error: 'URL fetching failed' });
  }
};

export const deserializeData = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.deserializedData = req.body;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Deserialization failed' });
  }
};

export const readFileData = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.fileData = req.query;
    next();
  } catch (error) {
    res.status(400).json({ error: 'File reading failed' });
  }
};

export const updateUserBalance = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.updatedBalance = req.body;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Balance update failed' });
  }
}; 
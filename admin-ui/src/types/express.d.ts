import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any;
      processedData?: any;
      searchQuery?: any;
      parsedXML?: any;
      fetchedData?: any;
      deserializedData?: any;
      fileData?: any;
      updatedBalance?: any;
    }
  }
} 
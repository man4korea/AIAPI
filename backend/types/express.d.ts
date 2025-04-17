import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      startTime?: number;
      requestId?: string;
    }
  }
} 
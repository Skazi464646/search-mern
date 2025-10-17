import { Request, Response } from 'express';
import { prisma } from '@/database/client';

export class HealthController {
  async check(req: Request, res: Response): Promise<void> {
    try {
      // Check database connection
      await prisma.$queryRaw`SELECT 1`;
      
      res.json({
        success: true,
        data: {
          status: 'healthy',
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
          database: 'connected'
        }
      });
    } catch (error) {
      res.status(503).json({
        success: false,
        data: {
          status: 'unhealthy',
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
          database: 'disconnected',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      });
    }
  }
}
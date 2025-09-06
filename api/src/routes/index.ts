import { Router } from 'express';
import { createClientRoutes } from './clientRoutes';
import { createSellerRoutes } from './sellerRoutes';
import { createMeetingRoutes } from './meetingRoutes';

export function createRoutes(db: any): Router {
  const router = Router();

  // Health check endpoint
  router.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'Vambe API is running!',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  });

  router.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  // API routes
  router.use('/api/clients', createClientRoutes(db));
  router.use('/api/sellers', createSellerRoutes(db));
  router.use('/api/meetings', createMeetingRoutes(db));

  
  router.get('/api', (req, res) => {
    res.json({
      success: true,
      message: 'Vambe API Documentation',
      endpoints: {
        clients: {
          'GET /api/clients': 'Get all clients (with pagination)',
          'GET /api/clients/:id': 'Get client by ID',
          'POST /api/clients': 'Create new client',
          'PUT /api/clients/:id': 'Update client',
          'DELETE /api/clients/:id': 'Delete client'
        },
        sellers: {
          'GET /api/sellers': 'Get all sellers (with pagination)',
          'GET /api/sellers/active': 'Get active sellers only',
          'GET /api/sellers/:id': 'Get seller by ID',
          'POST /api/sellers': 'Create new seller',
          'PUT /api/sellers/:id': 'Update seller',
          'DELETE /api/sellers/:id': 'Delete seller'
        },
        meetings: {
          'GET /api/meetings': 'Get all meetings (with filters)',
          'GET /api/meetings/:id': 'Get meeting by ID',
          'POST /api/meetings': 'Create new meeting',
          'PUT /api/meetings/:id': 'Update meeting',
          'PATCH /api/meetings/:id/close': 'Close meeting',
          'DELETE /api/meetings/:id': 'Delete meeting'
        }
      }
    });
  });

  return router;
}

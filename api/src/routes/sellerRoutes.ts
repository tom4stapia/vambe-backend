import { Router } from 'express';
import { SellerController } from '../controllers/sellerController';

export function createSellerRoutes(db: any): Router {
  const router = Router();
  const sellerController = new SellerController(db);

  // GET /api/sellers - Get all sellers with pagination
  router.get('/', sellerController.getAllSellers);

  // GET /api/sellers/active - Get only active sellers
  router.get('/active', sellerController.getActiveSellers);

  // GET /api/sellers/:id - Get seller by ID
  router.get('/:id', sellerController.getSellerById);

  // POST /api/sellers - Create new seller
  router.post('/', sellerController.createSeller);

  // PUT /api/sellers/:id - Update seller
  router.put('/:id', sellerController.updateSeller);

  // DELETE /api/sellers/:id - Delete seller
  router.delete('/:id', sellerController.deleteSeller);

  return router;
}

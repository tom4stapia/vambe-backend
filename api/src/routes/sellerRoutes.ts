import { Router } from 'express';
import { SellerController } from '../controllers/sellerController';

export function createSellerRoutes(db: any): Router {
  const router = Router();
  const sellerController = new SellerController(db);

  router.get('/', sellerController.getAllSellers);

  router.get('/active', sellerController.getActiveSellers);

  router.get('/:id', sellerController.getSellerById);

  router.post('/', sellerController.createSeller);

  router.put('/:id', sellerController.updateSeller);

  router.delete('/:id', sellerController.deleteSeller);

  return router;
}

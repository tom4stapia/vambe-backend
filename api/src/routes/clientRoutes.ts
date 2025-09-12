import { Router } from 'express';
import { ClientController } from '../controllers/clientController';

export function createClientRoutes(db: any): Router {
  const router = Router();
  const clientController = new ClientController(db);

  router.get('/', clientController.getAllClients);

  router.get('/:id', clientController.getClientById);

  router.post('/', clientController.createClient);

  router.put('/:id', clientController.updateClient);

  router.delete('/:id', clientController.deleteClient);

  return router;
}

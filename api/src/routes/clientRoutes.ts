import { Router } from 'express';
import { ClientController } from '../controllers/clientController';

export function createClientRoutes(db: any): Router {
  const router = Router();
  const clientController = new ClientController(db);

  // GET /api/clients - Get all clients with pagination
  router.get('/', clientController.getAllClients);

  // GET /api/clients/:id - Get client by ID
  router.get('/:id', clientController.getClientById);

  // POST /api/clients - Create new client
  router.post('/', clientController.createClient);

  // PUT /api/clients/:id - Update client
  router.put('/:id', clientController.updateClient);

  // DELETE /api/clients/:id - Delete client
  router.delete('/:id', clientController.deleteClient);

  return router;
}

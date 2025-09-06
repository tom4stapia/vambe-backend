import { Request, Response } from 'express';
import { ClientService } from '../services/clientService';
import { ApiResponse, PaginationQuery, CreateClientRequest, UpdateClientRequest } from '../types/api';

export class ClientController {
  private clientService: ClientService;

  constructor(db: any) {
    this.clientService = new ClientService(db);
  }

  getAllClients = async (req: Request, res: Response): Promise<void> => {
    try {
      const query: PaginationQuery = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
        sortBy: req.query.sortBy as string || 'id',
        sortOrder: (req.query.sortOrder as 'ASC' | 'DESC') || 'ASC'
      };

      const result = await this.clientService.getAllClients(query);

      const response: ApiResponse = {
        success: true,
        data: {
          clients: result.clients,
          pagination: {
            page: query.page,
            limit: query.limit,
            total: result.total,
            totalPages: Math.ceil(result.total / query.limit!)
          }
        },
        message: 'Clients retrieved successfully'
      };

      res.status(200).json(response);
    } catch (error) {
      this.handleError(res, error as Error);
    }
  };

  getClientById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        const response: ApiResponse = {
          success: false,
          error: 'Invalid client ID'
        };
        res.status(400).json(response);
        return;
      }

      const client = await this.clientService.getClientById(id);

      if (!client) {
        const response: ApiResponse = {
          success: false,
          error: 'Client not found'
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: client,
        message: 'Client retrieved successfully'
      };

      res.status(200).json(response);
    } catch (error) {
      this.handleError(res, error as Error);
    }
  };
  
  createClient = async (req: Request, res: Response): Promise<void> => {
    try {
      const clientData: CreateClientRequest = req.body;

      const client = await this.clientService.createClient(clientData);

      const response: ApiResponse = {
        success: true,
        data: client,
        message: 'Client created successfully'
      };

      res.status(201).json(response);
    } catch (error) {
      this.handleError(res, error as Error);
    }
  };
  
  updateClient = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const clientData: UpdateClientRequest = req.body;

      if (isNaN(id)) {
        const response: ApiResponse = {
          success: false,
          error: 'Invalid client ID'
        };
        res.status(400).json(response);
        return;
      }

      const client = await this.clientService.updateClient(id, clientData);

      const response: ApiResponse = {
        success: true,
        data: client,
        message: 'Client updated successfully'
      };

      res.status(200).json(response);
    } catch (error) {
      this.handleError(res, error as Error);
    }
  };
  
  deleteClient = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        const response: ApiResponse = {
          success: false,
          error: 'Invalid client ID'
        };
        res.status(400).json(response);
        return;
      }

      await this.clientService.deleteClient(id);

      const response: ApiResponse = {
        success: true,
        message: 'Client deleted successfully'
      };

      res.status(200).json(response);
    } catch (error) {
      this.handleError(res, error as Error);
    }
  };
  
  private handleError(res: Response, error: Error): void {
    console.error('Client Controller Error:', error.message);

    const response: ApiResponse = {
      success: false,
      error: error.message
    };

    let statusCode = 500;
    if (error.message.includes('not found')) {
      statusCode = 404;
    } else if (error.message.includes('required') || error.message.includes('Invalid')) {
      statusCode = 400;
    }

    res.status(statusCode).json(response);
  }
}

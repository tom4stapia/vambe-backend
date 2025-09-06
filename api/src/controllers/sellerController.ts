import { Request, Response } from 'express';
import { SellerService } from '../services/sellerService';
import { ApiResponse, PaginationQuery, CreateSellerRequest, UpdateSellerRequest } from '../types/api';

export class SellerController {
  private sellerService: SellerService;

  constructor(db: any) {
    this.sellerService = new SellerService(db);
  }

  getAllSellers = async (req: Request, res: Response): Promise<void> => {
    try {
      const query: PaginationQuery = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
        sortBy: req.query.sortBy as string || 'id',
        sortOrder: (req.query.sortOrder as 'ASC' | 'DESC') || 'ASC'
      };

      const result = await this.sellerService.getAllSellers(query);

      const response: ApiResponse = {
        success: true,
        data: {
          sellers: result.sellers,
          pagination: {
            page: query.page,
            limit: query.limit,
            total: result.total,
            totalPages: Math.ceil(result.total / query.limit!)
          }
        },
        message: 'Sellers retrieved successfully'
      };

      res.status(200).json(response);
    } catch (error) {
      this.handleError(res, error as Error);
    }
  };

  getSellerById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        const response: ApiResponse = {
          success: false,
          error: 'Invalid seller ID'
        };
        res.status(400).json(response);
        return;
      }

      const seller = await this.sellerService.getSellerById(id);

      if (!seller) {
        const response: ApiResponse = {
          success: false,
          error: 'Seller not found'
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: seller,
        message: 'Seller retrieved successfully'
      };

      res.status(200).json(response);
    } catch (error) {
      this.handleError(res, error as Error);
    }
  };

  createSeller = async (req: Request, res: Response): Promise<void> => {
    try {
      const sellerData: CreateSellerRequest = req.body;

      const seller = await this.sellerService.createSeller(sellerData);

      const response: ApiResponse = {
        success: true,
        data: seller,
        message: 'Seller created successfully'
      };

      res.status(201).json(response);
    } catch (error) {
      this.handleError(res, error as Error);
    }
  };

  updateSeller = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const sellerData: UpdateSellerRequest = req.body;

      if (isNaN(id)) {
        const response: ApiResponse = {
          success: false,
          error: 'Invalid seller ID'
        };
        res.status(400).json(response);
        return;
      }

      const seller = await this.sellerService.updateSeller(id, sellerData);

      const response: ApiResponse = {
        success: true,
        data: seller,
        message: 'Seller updated successfully'
      };

      res.status(200).json(response);
    } catch (error) {
      this.handleError(res, error as Error);
    }
  };

  deleteSeller = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        const response: ApiResponse = {
          success: false,
          error: 'Invalid seller ID'
        };
        res.status(400).json(response);
        return;
      }

      await this.sellerService.deleteSeller(id);

      const response: ApiResponse = {
        success: true,
        message: 'Seller deleted successfully'
      };

      res.status(200).json(response);
    } catch (error) {
      this.handleError(res, error as Error);
    }
  };
  
  getActiveSellers = async (req: Request, res: Response): Promise<void> => {
    try {
      const sellers = await this.sellerService.getActiveSellers();

      const response: ApiResponse = {
        success: true,
        data: sellers,
        message: 'Active sellers retrieved successfully'
      };

      res.status(200).json(response);
    } catch (error) {
      this.handleError(res, error as Error);
    }
  };
  
  private handleError(res: Response, error: Error): void {
    console.error('Seller Controller Error:', error.message);

    const response: ApiResponse = {
      success: false,
      error: error.message
    };

    let statusCode = 500;
    if (error.message.includes('not found')) {
      statusCode = 404;
    } else if (error.message.includes('required') || error.message.includes('Invalid')) {
      statusCode = 400;
    } else if (error.message.includes('Cannot delete')) {
      statusCode = 409; 
    }

    res.status(statusCode).json(response);
  }
}

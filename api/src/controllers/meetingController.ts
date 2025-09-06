import { Request, Response } from 'express';
import { MeetingService } from '../services/meetingService';
import { ApiResponse, CreateMeetingRequest, UpdateMeetingRequest } from '../types/api';

export class MeetingController {
  private meetingService: MeetingService;

  constructor(db: any) {
    this.meetingService = new MeetingService(db);
  }

  getAllMeetings = async (req: Request, res: Response): Promise<void> => {
    try {
      const query = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
        sortBy: req.query.sortBy as string || 'meeting_at',
        sortOrder: (req.query.sortOrder as 'ASC' | 'DESC') || 'DESC',
        client_id: req.query.client_id ? parseInt(req.query.client_id as string) : undefined,
        seller_id: req.query.seller_id ? parseInt(req.query.seller_id as string) : undefined,
        closed: req.query.closed ? req.query.closed === 'true' : undefined
      };

      const result = await this.meetingService.getAllMeetings(query);

      const response: ApiResponse = {
        success: true,
        data: {
          meetings: result.meetings,
          pagination: {
            page: query.page,
            limit: query.limit,
            total: result.total,
            totalPages: Math.ceil(result.total / query.limit)
          }
        },
        message: 'Meetings retrieved successfully'
      };

      res.status(200).json(response);
    } catch (error) {
      this.handleError(res, error as Error);
    }
  };
  
  getMeetingById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        const response: ApiResponse = {
          success: false,
          error: 'Invalid meeting ID'
        };
        res.status(400).json(response);
        return;
      }

      const meeting = await this.meetingService.getMeetingById(id);

      if (!meeting) {
        const response: ApiResponse = {
          success: false,
          error: 'Meeting not found'
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: meeting,
        message: 'Meeting retrieved successfully'
      };

      res.status(200).json(response);
    } catch (error) {
      this.handleError(res, error as Error);
    }
  };
  
  createMeeting = async (req: Request, res: Response): Promise<void> => {
    try {
      const meetingData: CreateMeetingRequest = req.body;

      const meeting = await this.meetingService.createMeeting(meetingData);

      const response: ApiResponse = {
        success: true,
        data: meeting,
        message: 'Meeting created successfully'
      };

      res.status(201).json(response);
    } catch (error) {
      this.handleError(res, error as Error);
    }
  };
  
  updateMeeting = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const meetingData: UpdateMeetingRequest = req.body;

      if (isNaN(id)) {
        const response: ApiResponse = {
          success: false,
          error: 'Invalid meeting ID'
        };
        res.status(400).json(response);
        return;
      }

      const meeting = await this.meetingService.updateMeeting(id, meetingData);

      const response: ApiResponse = {
        success: true,
        data: meeting,
        message: 'Meeting updated successfully'
      };

      res.status(200).json(response);
    } catch (error) {
      this.handleError(res, error as Error);
    }
  };
  
  deleteMeeting = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        const response: ApiResponse = {
          success: false,
          error: 'Invalid meeting ID'
        };
        res.status(400).json(response);
        return;
      }

      await this.meetingService.deleteMeeting(id);

      const response: ApiResponse = {
        success: true,
        message: 'Meeting deleted successfully'
      };

      res.status(200).json(response);
    } catch (error) {
      this.handleError(res, error as Error);
    }
  };

  closeMeeting = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        const response: ApiResponse = {
          success: false,
          error: 'Invalid meeting ID'
        };
        res.status(400).json(response);
        return;
      }

      const meeting = await this.meetingService.closeMeeting(id);

      const response: ApiResponse = {
        success: true,
        data: meeting,
        message: 'Meeting closed successfully'
      };

      res.status(200).json(response);
    } catch (error) {
      this.handleError(res, error as Error);
    }
  };
  
  private handleError(res: Response, error: Error): void {
    console.error('Meeting Controller Error:', error.message);

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

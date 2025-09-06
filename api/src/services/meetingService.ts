import { CreateMeetingRequest, UpdateMeetingRequest, MeetingModel, PaginationQuery } from '../types/api';
import { Meeting } from '../db/models/Meeting';
import { Op } from 'sequelize';

export class MeetingService {
  private Meeting: typeof Meeting;
  private db: any;

  constructor(db: any) {
    this.Meeting = db.Meeting;
    this.db = db;
  }

  /**
   * Get all meetings with pagination and optional filters
   */
  async getAllMeetings(query: PaginationQuery & { client_id?: number, seller_id?: number, closed?: boolean }): Promise<{ meetings: any[], total: number }> {
    const { page = 1, limit = 10, sortBy = 'meeting_at', sortOrder = 'DESC', client_id, seller_id, closed } = query;
    const offset = (page - 1) * limit;

    const whereClause: any = {};
    if (client_id) whereClause.client_id = client_id;
    if (seller_id) whereClause.seller_id = seller_id;
    if (closed !== undefined) whereClause.closed = closed;

    const { count, rows } = await this.Meeting.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: this.db.Client,
          as: 'client',
          attributes: ['id', 'name', 'email', 'phone']
        },
        {
          model: this.db.Seller,
          as: 'seller',
          attributes: ['id', 'name', 'email', 'phone']
        }
      ],
      limit,
      offset,
      order: [[this.sanitizeColumn(sortBy), sortOrder]]
    });

    return {
      meetings: rows.map(meeting => meeting.toJSON()),
      total: count
    };
  }

  /**
   * Get meeting by ID with related data
   */
  async getMeetingById(id: number): Promise<any | null> {
    const meeting = await this.Meeting.findByPk(id, {
      include: [
        {
          model: this.db.Client,
          as: 'client',
          attributes: ['id', 'name', 'email', 'phone']
        },
        {
          model: this.db.Seller,
          as: 'seller',
          attributes: ['id', 'name', 'email', 'phone']
        }
      ]
    });

    return meeting ? meeting.toJSON() : null;
  }

  /**
   * Create new meeting
   */
  async createMeeting(meetingData: CreateMeetingRequest): Promise<any> {
    await this.validateMeetingData(meetingData);

    const meeting = await this.Meeting.create({
      client_id: meetingData.client_id,
      seller_id: meetingData.seller_id,
      meeting_at: new Date(meetingData.meeting_at),
      transcript: meetingData.transcript || null,
      closed: false
    });

    return this.getMeetingById(meeting.id);
  }

  /**
   * Update meeting
   */
  async updateMeeting(id: number, meetingData: UpdateMeetingRequest): Promise<any | null> {
    const meeting = await this.Meeting.findByPk(id);
    if (!meeting) {
      throw new Error('Meeting not found');
    }

    await this.validateMeetingData(meetingData, false);

    const updateData: any = {};
    if (meetingData.client_id !== undefined) updateData.client_id = meetingData.client_id;
    if (meetingData.seller_id !== undefined) updateData.seller_id = meetingData.seller_id;
    if (meetingData.meeting_at !== undefined) updateData.meeting_at = new Date(meetingData.meeting_at);
    if (meetingData.closed !== undefined) updateData.closed = meetingData.closed;
    if (meetingData.transcript !== undefined) updateData.transcript = meetingData.transcript;

    if (Object.keys(updateData).length === 0) {
      return this.getMeetingById(id);
    }

    await meeting.update(updateData);
    return this.getMeetingById(id);
  }

  /**
   * Delete meeting
   */
  async deleteMeeting(id: number): Promise<boolean> {
    const meeting = await this.Meeting.findByPk(id);
    if (!meeting) {
      throw new Error('Meeting not found');
    }

    await meeting.destroy();
    return true;
  }

  /**
   * Close meeting
   */
  async closeMeeting(id: number): Promise<any | null> {
    return this.updateMeeting(id, { closed: true });
  }

  /**
   * Validate meeting data
   */
  private async validateMeetingData(data: CreateMeetingRequest | UpdateMeetingRequest, isCreate = true): Promise<void> {
    if (isCreate && !data.client_id) {
      throw new Error('Client ID is required');
    }

    if (isCreate && !data.seller_id) {
      throw new Error('Seller ID is required');
    }

    if (isCreate && !data.meeting_at) {
      throw new Error('Meeting date is required');
    }

    if (data.meeting_at && !this.isValidDate(data.meeting_at)) {
      throw new Error('Invalid meeting date format');
    }

    // Validate that client exists
    if (data.client_id) {
      const client = await this.db.Client.findByPk(data.client_id);
      if (!client) {
        throw new Error('Client not found');
      }
    }

    // Validate that seller exists
    if (data.seller_id) {
      const seller = await this.db.Seller.findByPk(data.seller_id);
      if (!seller) {
        throw new Error('Seller not found');
      }
    }
  }

  /**
   * Validate date format
   */
  private isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }

  /**
   * Sanitize column name for ORDER BY
   */
  private sanitizeColumn(column: string): string {
    const allowedColumns = ['id', 'client_id', 'seller_id', 'meeting_at', 'closed', 'created_at', 'updated_at'];
    return allowedColumns.includes(column) ? column : 'meeting_at';
  }
}

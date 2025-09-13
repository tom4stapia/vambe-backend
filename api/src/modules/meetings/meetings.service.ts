import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Meeting } from "../../database/models/meeting.model";
import { Client } from "../../database/models/client.model";
import { Seller } from "../../database/models/seller.model";
import { CreateMeetingDto, UpdateMeetingDto } from "./dto/meeting.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";
import { MeetingModel } from "../../types/api.types";

@Injectable()
export class MeetingsService {
  constructor(
    @InjectModel(Meeting)
    private meetingModel: typeof Meeting,
    @InjectModel(Client)
    private clientModel: typeof Client,
    @InjectModel(Seller)
    private sellerModel: typeof Seller,
  ) {}

  async findAll(
    paginationDto: PaginationDto & {
      client_id?: number;
      seller_id?: number;
      closed?: boolean;
    },
  ): Promise<{ meetings: MeetingModel[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      sortBy = "meeting_at",
      sortOrder = "DESC",
      client_id,
      seller_id,
      closed,
    } = paginationDto;
    const offset = (page - 1) * limit;

    const whereClause: any = {};
    if (client_id) whereClause.client_id = client_id;
    if (seller_id) whereClause.seller_id = seller_id;
    if (closed !== undefined) whereClause.closed = closed;

    const { count, rows } = await this.meetingModel.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [[this.sanitizeColumn(sortBy), sortOrder]],
      include: [
        {
          model: this.clientModel,
          as: "client",
          attributes: ["id", "name", "email", "phone"],
        },
        {
          model: this.sellerModel,
          as: "seller",
          attributes: ["id", "name", "email", "phone", "active"],
        },
      ],
    });

    return {
      meetings: rows as MeetingModel[],
      total: count,
    };
  }

  async findOne(id: number): Promise<MeetingModel> {
    const meeting = await this.meetingModel.findByPk(id, {
      include: [
        {
          model: this.clientModel,
          as: "client",
          attributes: ["id", "name", "email", "phone"],
        },
        {
          model: this.sellerModel,
          as: "seller",
          attributes: ["id", "name", "email", "phone", "active"],
        },
      ],
    });

    if (!meeting) {
      throw new NotFoundException("Meeting not found");
    }

    return meeting.toJSON() as MeetingModel;
  }

  async create(createMeetingDto: CreateMeetingDto): Promise<MeetingModel> {
    const client = await this.clientModel.findByPk(createMeetingDto.client_id);
    if (!client) {
      throw new BadRequestException("Client not found");
    }

    const seller = await this.sellerModel.findByPk(createMeetingDto.seller_id);
    if (!seller) {
      throw new BadRequestException("Seller not found");
    }

    try {
      const meeting = await this.meetingModel.create({
        client_id: createMeetingDto.client_id,
        seller_id: createMeetingDto.seller_id,
        meeting_at: new Date(createMeetingDto.meeting_at),
        transcript: createMeetingDto.transcript || null,
      });

      return meeting.toJSON() as MeetingModel;
    } catch (error) {
      throw new BadRequestException("Failed to create meeting");
    }
  }

  async update(
    id: number,
    updateMeetingDto: UpdateMeetingDto,
  ): Promise<MeetingModel> {
    const meeting = await this.meetingModel.findByPk(id);

    if (!meeting) {
      throw new NotFoundException("Meeting not found");
    }

    try {
      const updateData: any = {};

      if (updateMeetingDto.client_id !== undefined) {
        const client = await this.clientModel.findByPk(
          updateMeetingDto.client_id,
        );
        if (!client) {
          throw new BadRequestException("Client not found");
        }
        updateData.client_id = updateMeetingDto.client_id;
      }

      if (updateMeetingDto.seller_id !== undefined) {
        const seller = await this.sellerModel.findByPk(
          updateMeetingDto.seller_id,
        );
        if (!seller) {
          throw new BadRequestException("Seller not found");
        }
        updateData.seller_id = updateMeetingDto.seller_id;
      }

      if (updateMeetingDto.meeting_at !== undefined) {
        updateData.meeting_at = new Date(updateMeetingDto.meeting_at);
      }

      if (updateMeetingDto.closed !== undefined) {
        updateData.closed = updateMeetingDto.closed;
      }

      if (updateMeetingDto.transcript !== undefined) {
        updateData.transcript = updateMeetingDto.transcript;
      }

      if (Object.keys(updateData).length === 0) {
        return meeting.toJSON() as MeetingModel;
      }

      await meeting.update(updateData);
      return meeting.toJSON() as MeetingModel;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException("Failed to update meeting");
    }
  }

  async remove(id: number): Promise<void> {
    const meeting = await this.meetingModel.findByPk(id);

    if (!meeting) {
      throw new NotFoundException("Meeting not found");
    }

    await meeting.destroy();
  }

  async closeMeeting(id: number): Promise<MeetingModel> {
    return this.update(id, { closed: true });
  }

  private sanitizeColumn(column: string): string {
    const allowedColumns = [
      "id",
      "client_id",
      "seller_id",
      "meeting_at",
      "closed",
      "created_at",
      "updated_at",
    ];
    return allowedColumns.includes(column) ? column : "meeting_at";
  }
}

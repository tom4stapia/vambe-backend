import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { MeetingsService } from "./meetings.service";
import { CreateMeetingDto, UpdateMeetingDto } from "./dto/meeting.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";
import { ApiResponse, PaginationMeta } from "../../types/api.types";

@Controller("meetings")
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Get()
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Query("client_id") client_id?: string,
    @Query("seller_id") seller_id?: string,
    @Query("closed") closed?: string,
  ): Promise<ApiResponse> {
    const query = {
      ...paginationDto,
      client_id: client_id ? parseInt(client_id) : undefined,
      seller_id: seller_id ? parseInt(seller_id) : undefined,
      closed: closed ? closed === "true" : undefined,
    };

    const result = await this.meetingsService.findAll(query);

    const response: ApiResponse = {
      success: true,
      data: {
        meetings: result.meetings,
        pagination: {
          page: paginationDto.page || 1,
          limit: paginationDto.limit || 10,
          total: result.total,
          totalPages: Math.ceil(result.total / (paginationDto.limit || 10)),
        } as PaginationMeta,
      },
      message: "Meetings retrieved successfully",
    };

    return response;
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<ApiResponse> {
    const meeting = await this.meetingsService.findOne(id);

    const response: ApiResponse = {
      success: true,
      data: meeting,
      message: "Meeting retrieved successfully",
    };

    return response;
  }

  @Post()
  async create(
    @Body() createMeetingDto: CreateMeetingDto,
  ): Promise<ApiResponse> {
    const meeting = await this.meetingsService.create(createMeetingDto);

    const response: ApiResponse = {
      success: true,
      data: meeting,
      message: "Meeting created successfully",
    };

    return response;
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateMeetingDto: UpdateMeetingDto,
  ): Promise<ApiResponse> {
    const meeting = await this.meetingsService.update(id, updateMeetingDto);

    const response: ApiResponse = {
      success: true,
      data: meeting,
      message: "Meeting updated successfully",
    };

    return response;
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<ApiResponse> {
    await this.meetingsService.remove(id);

    const response: ApiResponse = {
      success: true,
      message: "Meeting deleted successfully",
    };

    return response;
  }

  @Patch(":id/close")
  async closeMeeting(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<ApiResponse> {
    const meeting = await this.meetingsService.closeMeeting(id);

    const response: ApiResponse = {
      success: true,
      data: meeting,
      message: "Meeting closed successfully",
    };

    return response;
  }
}

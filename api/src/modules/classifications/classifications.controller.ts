import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { ClassificationsService } from "./classifications.service";
import { ApiResponse } from "../../types/api.types";
import { JwtAuthGuard, RolesGuard } from "../../common/guards";
import { Roles, CurrentUser } from "../../common/decorators";
import { User, UserRole } from "../../database/models/user.model";

@Controller("classifications")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
export class ClassificationsController {
  constructor(
    private readonly classificationsService: ClassificationsService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllClassifications(): Promise<ApiResponse> {
    const classifications =
      await this.classificationsService.getAllClassifications();

    const response: ApiResponse = {
      success: true,
      data: classifications,
      message: "Classifications retrieved successfully",
    };

    return response;
  }

  @Get(":meetingId")
  @HttpCode(HttpStatus.OK)
  async getClassification(
    @Param("meetingId", ParseIntPipe) meetingId: number,
  ): Promise<ApiResponse> {
    const classification =
      await this.classificationsService.getClassification(meetingId);

    if (!classification) {
      const response: ApiResponse = {
        success: false,
        error: "Classification not found",
      };
      return response;
    }

    const response: ApiResponse = {
      success: true,
      data: classification,
      message: "Classification retrieved successfully",
    };

    return response;
  }

  @Post("queue-unclassified")
  @HttpCode(HttpStatus.ACCEPTED)
  async queueUnclassifiedMeetings(): Promise<ApiResponse> {
    const result =
      await this.classificationsService.queueUnclassifiedMeetings();

    const response: ApiResponse = {
      success: true,
      data: result,
      message: `Queued ${result.queued} unclassified meetings`,
    };

    return response;
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { WorkersService } from "./workers.service";
import { ApiResponse } from "../../types/api.types";
import { JwtAuthGuard, RolesGuard } from "../../common/guards";
import { Roles, CurrentUser } from "../../common/decorators";
import { User, UserRole } from "../../database/models/user.model";

@Controller("workers")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Post("classify/:meetingId")
  @HttpCode(HttpStatus.ACCEPTED)
  async classifyMeeting(
    @Param("meetingId", ParseIntPipe) meetingId: number,
    @Body() body: { force_reprocess?: boolean; callback_url?: string },
  ): Promise<ApiResponse> {
    const result = await this.workersService.classifyMeeting(meetingId, body);

    const response: ApiResponse = {
      success: true,
      message: "Classification task queued successfully",
      data: {
        task_id: result.taskId,
        meeting_id: meetingId,
        status: "queued",
      },
    };

    return response;
  }

  @Post("classify/batch")
  @HttpCode(HttpStatus.ACCEPTED)
  async classifyMeetingsBatch(
    @Body() body: { meeting_ids: number[]; force_reprocess?: boolean },
  ): Promise<ApiResponse> {
    const { meeting_ids, force_reprocess } = body;

    if (!Array.isArray(meeting_ids) || meeting_ids.length === 0) {
      const response: ApiResponse = {
        success: false,
        error: "Invalid meeting_ids array provided",
      };
      return response;
    }

    const validIds = meeting_ids.filter((id) => !isNaN(Number(id)));
    if (validIds.length !== meeting_ids.length) {
      const response: ApiResponse = {
        success: false,
        error: "All meeting IDs must be valid numbers",
      };
      return response;
    }

    const result = await this.workersService.classifyMeetingsBatch(
      validIds,
      force_reprocess || false,
    );

    const response: ApiResponse = {
      success: true,
      message: `Batch classification queued for ${validIds.length} meetings`,
      data: {
        batch_task_id: result.taskId,
        queued_tasks: result.queuedTasks,
        meeting_ids: validIds,
        total_queued: result.queuedTasks.length,
      },
    };

    return response;
  }

  @Get("task/:taskId")
  @HttpCode(HttpStatus.OK)
  async getTaskStatus(@Param("taskId") taskId: string): Promise<ApiResponse> {
    const status = await this.workersService.getTaskStatus(taskId);

    const response: ApiResponse = {
      success: true,
      message: "Task status retrieved successfully",
      data: status,
    };

    return response;
  }

  @Get("stats")
  @HttpCode(HttpStatus.OK)
  async getWorkerStats(): Promise<ApiResponse> {
    const stats = await this.workersService.getWorkerStats();

    const response: ApiResponse = {
      success: true,
      message: "Worker statistics retrieved successfully",
      data: stats,
    };

    return response;
  }

  @Get("health")
  @HttpCode(HttpStatus.OK)
  async workerHealthCheck(): Promise<ApiResponse> {
    const health = await this.workersService.healthCheck();

    const response: ApiResponse = {
      success: health.healthy,
      message: health.message,
      data: {
        healthy: health.healthy,
        redis_connected: health.redis,
        timestamp: new Date().toISOString(),
      },
    };

    return response;
  }

  @Get("classification/:meetingId")
  @HttpCode(HttpStatus.OK)
  async getClassificationResult(
    @Param("meetingId", ParseIntPipe) meetingId: number,
  ): Promise<ApiResponse> {
    const result = await this.workersService.getClassificationResult(meetingId);

    if (!result) {
      const response: ApiResponse = {
        success: false,
        message: "Classification result not found for this meeting",
      };
      return response;
    }

    const response: ApiResponse = {
      success: true,
      message: "Classification result retrieved successfully",
      data: {
        meeting_id: meetingId,
        classification: result,
      },
    };

    return response;
  }

  @Get("classifications")
  @HttpCode(HttpStatus.OK)
  async getAllClassificationResults(): Promise<ApiResponse> {
    const results = await this.workersService.getAllClassificationResults();

    const response: ApiResponse = {
      success: true,
      message: "All classification results retrieved successfully",
      data: {
        results,
        total_count: results.length,
      },
    };

    return response;
  }

  @Delete("classification/:meetingId")
  @HttpCode(HttpStatus.OK)
  async deleteClassificationResult(
    @Param("meetingId", ParseIntPipe) meetingId: number,
  ): Promise<ApiResponse> {
    const deleted =
      await this.workersService.deleteClassificationResult(meetingId);

    if (!deleted) {
      const response: ApiResponse = {
        success: false,
        message: "Classification result not found for this meeting",
      };
      return response;
    }

    const response: ApiResponse = {
      success: true,
      message: "Classification result deleted successfully",
      data: {
        meeting_id: meetingId,
        deleted: true,
      },
    };

    return response;
  }
}

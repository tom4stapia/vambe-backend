import {
  Controller,
  Get,
  Query,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { KpisService } from './kpis.service';
import {
  KpiFiltersDto,
  OverviewKpisDto,
  SellerPerformanceKpisDto,
  MeetingTrendsDto,
  ClientEngagementKpisDto,
  ClientAnalysisKpisDto,
  AllKpisResponseDto,
} from './dto/kpi.dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Roles, CurrentUser } from '../../common/decorators';
import { User, UserRole } from '../../database/models/user.model';

@Controller('kpis')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
export class KpisController {
  constructor(private readonly kpisService: KpisService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllKpis(@Query() filters: KpiFiltersDto) {
    const result = await this.kpisService.getAllKpis(filters);
    return {
      success: true,
      data: result,
      message: 'All KPIs retrieved successfully'
    };
  }

  @Get('overview')
  @HttpCode(HttpStatus.OK)
  async getOverviewKpis(@Query() filters: KpiFiltersDto) {
    const result = await this.kpisService.getOverviewKpis(filters);
    return {
      success: true,
      data: result,
      message: 'Overview KPIs retrieved successfully'
    };
  }


  @Get('sellers/performance')
  @HttpCode(HttpStatus.OK)
  async getSellerPerformanceKpis(@Query() filters: KpiFiltersDto) {
    const result = await this.kpisService.getSellerPerformanceKpis(filters);
    return {
      success: true,
      data: result,
      message: 'Seller performance KPIs retrieved successfully'
    };
  }

  @Get('meetings/trends')
  @HttpCode(HttpStatus.OK)
  async getMeetingTrends(@Query() filters: KpiFiltersDto) {
    const result = await this.kpisService.getMeetingTrends(filters);
    return {
      success: true,
      data: result,
      message: 'Meeting trends KPIs retrieved successfully'
    };
  }

  @Get('clients/engagement')
  @HttpCode(HttpStatus.OK)
  async getClientEngagementKpis(@Query() filters: KpiFiltersDto) {
    const result = await this.kpisService.getClientEngagementKpis(filters);
    return {
      success: true,
      data: result,
      message: 'Client engagement KPIs retrieved successfully'
    };
  }

  @Get('clients/analysis')
  @HttpCode(HttpStatus.OK)
  async getClientAnalysisKpis(@Query() filters: KpiFiltersDto) {
    const result = await this.kpisService.getClientAnalysisKpis(filters);
    return {
      success: true,
      data: result,
      message: 'Client analysis KPIs retrieved successfully'
    };
  }

}

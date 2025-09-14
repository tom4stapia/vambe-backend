import {
  Controller,
  Get,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { KpisService } from './kpis.service';
import {
  KpiFiltersDto,
  OverviewKpisDto,
  SellerPerformanceKpisDto,
  MeetingTrendsDto,
  ClientEngagementKpisDto,
  AllKpisResponseDto,
} from './dto/kpi.dto';

@Controller('kpis')
export class KpisController {
  constructor(private readonly kpisService: KpisService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllKpis(@Query() filters: KpiFiltersDto): Promise<AllKpisResponseDto> {
    return this.kpisService.getAllKpis(filters);
  }

  @Get('overview')
  @HttpCode(HttpStatus.OK)
  async getOverviewKpis(@Query() filters: KpiFiltersDto): Promise<OverviewKpisDto> {
    return this.kpisService.getOverviewKpis(filters);
  }


  @Get('sellers/performance')
  @HttpCode(HttpStatus.OK)
  async getSellerPerformanceKpis(@Query() filters: KpiFiltersDto): Promise<SellerPerformanceKpisDto[]> {
    return this.kpisService.getSellerPerformanceKpis(filters);
  }

  @Get('meetings/trends')
  @HttpCode(HttpStatus.OK)
  async getMeetingTrends(@Query() filters: KpiFiltersDto): Promise<MeetingTrendsDto[]> {
    return this.kpisService.getMeetingTrends(filters);
  }

  @Get('clients/engagement')
  @HttpCode(HttpStatus.OK)
  async getClientEngagementKpis(@Query() filters: KpiFiltersDto): Promise<ClientEngagementKpisDto> {
    return this.kpisService.getClientEngagementKpis(filters);
  }

}

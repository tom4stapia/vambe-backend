import { Injectable } from '@nestjs/common';
import { OverviewKpisService } from './services/overview-kpis.service';
import { SellerPerformanceKpisService } from './services/seller-performance-kpis.service';
import { MeetingTrendsKpisService } from './services/meeting-trends-kpis.service';
import { ClientEngagementKpisService } from './services/client-engagement-kpis.service';
import {
  AllKpisResponseDto,
  OverviewKpisDto,
  SellerPerformanceKpisDto,
  MeetingTrendsDto,
  ClientEngagementKpisDto,
  KpiFiltersDto,
  KpiPeriod,
} from './dto/kpi.dto';

@Injectable()
export class KpisService {
  constructor(
    private readonly overviewKpisService: OverviewKpisService,
    private readonly sellerPerformanceKpisService: SellerPerformanceKpisService,
    private readonly meetingTrendsKpisService: MeetingTrendsKpisService,
    private readonly clientEngagementKpisService: ClientEngagementKpisService,
  ) {}

  async getAllKpis(filters: KpiFiltersDto): Promise<AllKpisResponseDto> {
    const dateFilters = this.buildDateFilters(filters.startDate, filters.endDate);
    
    const [
      overview,
      sellerPerformance,
      meetingTrends,
      clientEngagement,
    ] = await Promise.all([
      this.overviewKpisService.getOverviewKpis(dateFilters),
      this.sellerPerformanceKpisService.getSellerPerformanceKpis(dateFilters),
      this.meetingTrendsKpisService.getMeetingTrends(dateFilters, filters.period || KpiPeriod.MONTHLY),
      this.clientEngagementKpisService.getClientEngagementKpis(dateFilters),
    ]);

    return {
      overview,
      sellerPerformance,
      meetingTrends,
      clientEngagement,
      generatedAt: new Date(),
    };
  }

  async getOverviewKpis(filters: KpiFiltersDto): Promise<OverviewKpisDto> {
    const dateFilters = this.buildDateFilters(filters.startDate, filters.endDate);
    return this.overviewKpisService.getOverviewKpis(dateFilters);
  }


  async getSellerPerformanceKpis(filters: KpiFiltersDto): Promise<SellerPerformanceKpisDto[]> {
    const dateFilters = this.buildDateFilters(filters.startDate, filters.endDate);
    return this.sellerPerformanceKpisService.getSellerPerformanceKpis(dateFilters);
  }

  async getMeetingTrends(filters: KpiFiltersDto): Promise<MeetingTrendsDto[]> {
    const dateFilters = this.buildDateFilters(filters.startDate, filters.endDate);
    return this.meetingTrendsKpisService.getMeetingTrends(dateFilters, filters.period || KpiPeriod.MONTHLY);
  }

  async getClientEngagementKpis(filters: KpiFiltersDto): Promise<ClientEngagementKpisDto> {
    const dateFilters = this.buildDateFilters(filters.startDate, filters.endDate);
    return this.clientEngagementKpisService.getClientEngagementKpis(dateFilters);
  }


  private buildDateFilters(startDate?: string, endDate?: string): any {
    const filters: any = {};

    if (startDate || endDate) {
      filters.meeting_at = {};
      
      if (startDate) {
        filters.meeting_at.gte = new Date(startDate);
      }
      
      if (endDate) {
        filters.meeting_at.lte = new Date(endDate);
      }
    }

    return filters;
  }
}

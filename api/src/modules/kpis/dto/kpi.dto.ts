import { IsOptional, IsDateString, IsEnum } from 'class-validator';

export enum KpiPeriod {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
}

export enum KpiType {
  OVERVIEW = 'overview',
  MEETINGS = 'meetings',
  SENTIMENT = 'sentiment',
  SELLERS = 'sellers',
  CLIENTS = 'clients',
  PERFORMANCE = 'performance',
}

export class KpiFiltersDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsEnum(KpiPeriod)
  period?: KpiPeriod;

  @IsOptional()
  @IsEnum(KpiType)
  type?: KpiType;
}

export class OverviewKpisDto {
  totalClients: number;
  totalSellers: number;
  totalMeetings: number;
  totalClassifications: number;
  meetingsThisMonth: number;
  meetingsLastWeek: number;
  averageConversionRate: number;
  averageMeetingDuration: number;
}


export class SellerPerformanceKpisDto {
  sellerId: number;
  sellerName: string;
  totalMeetings: number;
  completedMeetings: number;
  completionRate: number;
  averagePositiveSentiment: number;
  totalClassifications: number;
  averageConfidence: number;
  ranking: number;
}

export class MeetingTrendsDto {
  period: string;
  totalMeetings: number;
  completedMeetings: number;
  cancelledMeetings: number;
  completionRate: number;
  averageDuration: number;
}

export class ClientEngagementKpisDto {
  uniqueClients: number;
  activeClientsThisMonth: number;
  averageMeetingsPerClient: number;
  clientsWithPositiveSentiment: number;
  clientsWithNegativeSentiment: number;
  clientRetentionRate: number;
  newClientsThisMonth: number;
}

export class AllKpisResponseDto {
  overview: OverviewKpisDto;
  sellerPerformance: SellerPerformanceKpisDto[];
  meetingTrends: MeetingTrendsDto[];
  clientEngagement: ClientEngagementKpisDto;
  generatedAt: Date;
}

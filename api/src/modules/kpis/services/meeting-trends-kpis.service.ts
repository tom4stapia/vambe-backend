import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { Meeting } from '../../../database/models/meeting.model';
import { MeetingTrendsDto, KpiPeriod } from '../dto/kpi.dto';

@Injectable()
export class MeetingTrendsKpisService {
  constructor(
    @InjectModel(Meeting)
    private readonly meetingModel: typeof Meeting,
  ) {}

  async getMeetingTrends(dateFilters: any, period: KpiPeriod): Promise<MeetingTrendsDto[]> {
    const groupByConfig = this.getGroupByFormat(period);
    const trends = await this.getTrendsData(dateFilters, groupByConfig);
    
    return this.processTrendsData(trends);
  }

  private getGroupByFormat(period: KpiPeriod): { format: string; groupBy: any } {
    const formats = {
      [KpiPeriod.DAILY]: { format: 'YYYY-MM-DD', groupBy: Sequelize.fn('DATE', Sequelize.col('meeting_at')) },
      [KpiPeriod.WEEKLY]: { format: 'YYYY-"W"WW', groupBy: Sequelize.fn('DATE_TRUNC', 'week', Sequelize.col('meeting_at')) },
      [KpiPeriod.MONTHLY]: { format: 'YYYY-MM', groupBy: Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('meeting_at')) },
      [KpiPeriod.QUARTERLY]: { format: 'YYYY"Q"Q', groupBy: Sequelize.fn('DATE_TRUNC', 'quarter', Sequelize.col('meeting_at')) },
      [KpiPeriod.YEARLY]: { format: 'YYYY', groupBy: Sequelize.fn('DATE_TRUNC', 'year', Sequelize.col('meeting_at')) },
    };

    return formats[period] || formats[KpiPeriod.MONTHLY];
  }

  private async getTrendsData(dateFilters: any, groupByConfig: { format: string; groupBy: any }): Promise<any[]> {
    return this.meetingModel.findAll({
      attributes: [
        [Sequelize.fn('TO_CHAR', groupByConfig.groupBy, groupByConfig.format), 'period'],
        [Sequelize.fn('COUNT', Sequelize.col('Meeting.id')), 'totalMeetings'],
        [
          Sequelize.fn('COUNT', 
            Sequelize.literal(`CASE WHEN closed = true THEN 1 END`)
          ), 
          'completedMeetings'
        ],
        [
          Sequelize.fn('COUNT', 
            Sequelize.literal(`CASE WHEN closed = false THEN 1 END`)
          ), 
          'cancelledMeetings'
        ],
        [Sequelize.literal('45'), 'averageDuration'], 
      ],
      where: dateFilters,
      group: [groupByConfig.groupBy],
      order: [[groupByConfig.groupBy, 'ASC']],
      raw: true,
    });
  }

  private processTrendsData(trends: any[]): MeetingTrendsDto[] {
    return trends.map((trend: any) => {
      const totalMeetings = Number(trend.totalMeetings);
      const completedMeetings = Number(trend.completedMeetings);
      const cancelledMeetings = Number(trend.cancelledMeetings);
      const completionRate = totalMeetings > 0 ? completedMeetings / totalMeetings : 0;

      return {
        period: trend.period,
        totalMeetings,
        completedMeetings,
        cancelledMeetings,
        completionRate: Math.round(completionRate * 100) / 100,
        averageDuration: trend.averageDuration ? Math.round(Number(trend.averageDuration)) : 0,
      };
    });
  }
}

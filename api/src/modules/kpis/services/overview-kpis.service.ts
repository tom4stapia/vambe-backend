import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Client } from '../../../database/models/client.model';
import { Seller } from '../../../database/models/seller.model';
import { Meeting } from '../../../database/models/meeting.model';
import { MeetingClassification } from '../../../database/models/meeting-classification.model';
import { OverviewKpisDto } from '../dto/kpi.dto';

@Injectable()
export class OverviewKpisService {
  constructor(
    @InjectModel(Client)
    private readonly clientModel: typeof Client,
    @InjectModel(Seller)
    private readonly sellerModel: typeof Seller,
    @InjectModel(Meeting)
    private readonly meetingModel: typeof Meeting,
    @InjectModel(MeetingClassification)
    private readonly meetingClassificationModel: typeof MeetingClassification,
  ) {}

  async getOverviewKpis(dateFilters: any): Promise<OverviewKpisDto> {
    const [
      totalClients,
      totalSellers,
      totalMeetings,
      totalClassifications,
      meetingsThisMonth,
      meetingsLastWeek,
      completedMeetings,
    ] = await Promise.all([
      this.getTotalClients(),
      this.getTotalSellers(),
      this.getTotalMeetings(dateFilters),
      this.getTotalClassifications(dateFilters),
      this.getMeetingsThisMonth(),
      this.getMeetingsLastWeek(),
      this.getCompletedMeetings(dateFilters),
    ]);

    const averageConversionRate = totalMeetings > 0 ? completedMeetings / totalMeetings : 0;
    const averageMeetingDuration = 45; // Valor estimado por ahora

    return {
      totalClients,
      totalSellers,
      totalMeetings,
      totalClassifications,
      meetingsThisMonth,
      meetingsLastWeek,
      averageConversionRate,
      averageMeetingDuration,
    };
  }

  private async getTotalClients(): Promise<number> {
    return this.clientModel.count();
  }

  private async getTotalSellers(): Promise<number> {
    return this.sellerModel.count();
  }

  private async getTotalMeetings(dateFilters: any): Promise<number> {
    return this.meetingModel.count({
      where: dateFilters,
    });
  }

  private async getTotalClassifications(dateFilters: any): Promise<number> {
    return this.meetingClassificationModel.count({
      include: [
        {
          model: Meeting,
          where: dateFilters,
          required: true,
        },
      ],
    });
  }

  private async getMeetingsThisMonth(): Promise<number> {
    const thisMonthStart = new Date();
    thisMonthStart.setDate(1);
    thisMonthStart.setHours(0, 0, 0, 0);
    
    return this.meetingModel.count({
      where: {
        meeting_at: {
          [Op.gte]: thisMonthStart,
        },
      },
    });
  }

  private async getMeetingsLastWeek(): Promise<number> {
    const lastWeekStart = new Date();
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);
    lastWeekStart.setHours(0, 0, 0, 0);

    return this.meetingModel.count({
      where: {
        meeting_at: {
          [Op.gte]: lastWeekStart,
        },
      },
    });
  }

  private async getCompletedMeetings(dateFilters: any): Promise<number> {
    return this.meetingModel.count({
      where: {
        ...dateFilters,
        closed: true,
      },
    });
  }
}

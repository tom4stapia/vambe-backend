import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Client } from '../../../database/models/client.model';
import { Meeting } from '../../../database/models/meeting.model';
import { MeetingClassification } from '../../../database/models/meeting-classification.model';
import { ClientEngagementKpisDto } from '../dto/kpi.dto';

@Injectable()
export class ClientEngagementKpisService {
  constructor(
    @InjectModel(Client)
    private readonly clientModel: typeof Client,
    @InjectModel(Meeting)
    private readonly meetingModel: typeof Meeting,
    @InjectModel(MeetingClassification)
    private readonly meetingClassificationModel: typeof MeetingClassification,
  ) {}

  async getClientEngagementKpis(dateFilters: any): Promise<ClientEngagementKpisDto> {
    const [
      uniqueClients,
      activeClientsThisMonth,
      averageMeetingsPerClient,
      clientsWithPositiveSentiment,
      clientsWithNegativeSentiment,
      newClientsThisMonth,
      clientRetentionRate,
    ] = await Promise.all([
      this.getUniqueClients(),
      this.getActiveClientsThisMonth(),
      this.getAverageMeetingsPerClient(),
      this.getClientsWithPositiveSentiment(dateFilters),
      this.getClientsWithNegativeSentiment(dateFilters),
      this.getNewClientsThisMonth(),
      this.getClientRetentionRate(),
    ]);

    return {
      uniqueClients,
      activeClientsThisMonth,
      averageMeetingsPerClient: Math.round(averageMeetingsPerClient * 100) / 100,
      clientsWithPositiveSentiment,
      clientsWithNegativeSentiment,
      clientRetentionRate: Math.round(clientRetentionRate * 100) / 100,
      newClientsThisMonth,
    };
  }

  private async getUniqueClients(): Promise<number> {
    return this.clientModel.count();
  }

  private async getActiveClientsThisMonth(): Promise<number> {
    const thisMonthStart = new Date();
    thisMonthStart.setDate(1);
    thisMonthStart.setHours(0, 0, 0, 0);

    return this.clientModel.count({
      include: [
        {
          model: Meeting,
          where: {
            meeting_at: {
              [Op.gte]: thisMonthStart,
            },
          },
          required: true,
        },
      ],
    });
  }

  private async getAverageMeetingsPerClient(): Promise<number> {
    const [totalMeetingsCount, uniqueClients] = await Promise.all([
      this.meetingModel.count(),
      this.clientModel.count(),
    ]);

    return uniqueClients > 0 ? totalMeetingsCount / uniqueClients : 0;
  }

  private async getClientsWithPositiveSentiment(dateFilters: any): Promise<number> {
    return this.clientModel.count({
      include: [
        {
          model: Meeting,
          where: dateFilters,
          required: true,
          include: [
            {
              model: MeetingClassification,
              where: { sentiment: 'positive' },
              required: true,
            },
          ],
        },
      ],
    });
  }

  private async getClientsWithNegativeSentiment(dateFilters: any): Promise<number> {
    return this.clientModel.count({
      include: [
        {
          model: Meeting,
          where: dateFilters,
          required: true,
          include: [
            {
              model: MeetingClassification,
              where: { sentiment: 'negative' },
              required: true,
            },
          ],
        },
      ],
    });
  }

  private async getNewClientsThisMonth(): Promise<number> {
    const thisMonthStart = new Date();
    thisMonthStart.setDate(1);
    thisMonthStart.setHours(0, 0, 0, 0);

    return this.clientModel.count({
      where: {
        created_at: {
          [Op.gte]: thisMonthStart,
        },
      },
    });
  }

  private async getClientRetentionRate(): Promise<number> {
    const [uniqueClients, retainedClients] = await Promise.all([
      this.clientModel.count(),
      this.getRetainedClients(),
    ]);

    return uniqueClients > 0 ? retainedClients / uniqueClients : 0;
  }

  private async getRetainedClients(): Promise<number> {
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    return this.clientModel.count({
      include: [
        {
          model: Meeting,
          where: {
            meeting_at: {
              [Op.gte]: twoMonthsAgo,
            },
          },
          required: true,
        },
      ],
    });
  }
}

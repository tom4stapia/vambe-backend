import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Seller } from '../../../database/models/seller.model';
import { Meeting } from '../../../database/models/meeting.model';
import { MeetingClassification } from '../../../database/models/meeting-classification.model';
import { SellerPerformanceKpisDto } from '../dto/kpi.dto';

@Injectable()
export class SellerPerformanceKpisService {
  constructor(
    @InjectModel(Seller)
    private readonly sellerModel: typeof Seller,
    @InjectModel(Meeting)
    private readonly meetingModel: typeof Meeting,
    @InjectModel(MeetingClassification)
    private readonly meetingClassificationModel: typeof MeetingClassification,
  ) {}

  async getSellerPerformanceKpis(dateFilters: any): Promise<SellerPerformanceKpisDto[]> {
    const sellers = await this.getSellersWithMeetings(dateFilters);
    const sellerPerformances = this.calculateSellerPerformances(sellers);
    const rankedPerformances = this.rankSellerPerformances(sellerPerformances);

    return rankedPerformances;
  }

  private async getSellersWithMeetings(dateFilters: any): Promise<Seller[]> {
    return this.sellerModel.findAll({
      include: [
        {
          model: Meeting,
          where: dateFilters,
          required: false,
          include: [
            {
              model: MeetingClassification,
              required: false,
            },
          ],
        },
      ],
    });
  }

  private calculateSellerPerformances(sellers: Seller[]): SellerPerformanceKpisDto[] {
    return sellers.map((seller) => {
      const meetings = seller.meetings || [];
      const performance = this.calculateIndividualPerformance(seller, meetings);

      return {
        sellerId: seller.id,
        sellerName: seller.name,
        totalMeetings: performance.totalMeetings,
        completedMeetings: performance.completedMeetings,
        completionRate: performance.completionRate,
        averagePositiveSentiment: performance.averagePositiveSentiment,
        totalClassifications: performance.totalClassifications,
        averageConfidence: performance.averageConfidence,
        ranking: 0, // Se asignará después del ranking
      };
    });
  }

  private calculateIndividualPerformance(seller: Seller, meetings: Meeting[]): {
    totalMeetings: number;
    completedMeetings: number;
    completionRate: number;
    averagePositiveSentiment: number;
    totalClassifications: number;
    averageConfidence: number;
  } {
    const totalMeetings = meetings.length;
    const completedMeetings = meetings.filter(m => m.closed === true).length;
    const completionRate = totalMeetings > 0 ? completedMeetings / totalMeetings : 0;

    // Calcular sentimiento promedio
    const classifications = meetings
      .flatMap(m => m.classifications || [])
      .filter(c => c);

    const positiveClassifications = classifications.filter(c => c.sentiment === 'positive');
    const averagePositiveSentiment = classifications.length > 0 
      ? positiveClassifications.length / classifications.length 
      : 0;

    const totalClassifications = classifications.length;
    const averageConfidence = classifications.length > 0
      ? classifications.reduce((sum, c) => sum + c.confidence_score, 0) / classifications.length
      : 0;

    return {
      totalMeetings,
      completedMeetings,
      completionRate: Math.round(completionRate * 100) / 100,
      averagePositiveSentiment: Math.round(averagePositiveSentiment * 100) / 100,
      totalClassifications,
      averageConfidence: Math.round(averageConfidence * 100) / 100,
    };
  }

  private rankSellerPerformances(performances: SellerPerformanceKpisDto[]): SellerPerformanceKpisDto[] {
    // Ordenar por rendimiento y asignar ranking
    performances.sort((a, b) => {
      const scoreA = (a.completionRate * 0.4) + (a.averagePositiveSentiment * 0.6);
      const scoreB = (b.completionRate * 0.4) + (b.averagePositiveSentiment * 0.6);
      return scoreB - scoreA;
    });

    performances.forEach((seller, index) => {
      seller.ranking = index + 1;
    });

    return performances;
  }
}

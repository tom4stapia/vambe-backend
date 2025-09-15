import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Meeting } from '../../../database/models/meeting.model';
import { MeetingClassification } from '../../../database/models/meeting-classification.model';
import { 
  ClientAnalysisKpisDto, 
  SectorAnalysisDto, 
  LeadSourceAnalysisDto, 
  TechnologyAnalysisDto,
  UseCaseAnalysisDto,
  PrimaryPainPointAnalysisDto
} from '../dto/kpi.dto';

@Injectable()
export class ClientAnalysisKpisService {
  constructor(
    @InjectModel(Meeting)
    private readonly meetingModel: typeof Meeting,
    @InjectModel(MeetingClassification)
    private readonly meetingClassificationModel: typeof MeetingClassification,
  ) {}

  async getClientAnalysisKpis(dateFilters: any): Promise<ClientAnalysisKpisDto> {
    const [
      topSectors,
      topLeadSources,
      topTechnologies,
      topUseCases,
      topPrimaryPainPoints,
      totalAnalyzedMeetings,
    ] = await Promise.all([
      this.getTopSectors(dateFilters),
      this.getTopLeadSources(dateFilters),
      this.getTopVambeProducts(dateFilters),
      this.getUseCases(dateFilters),
      this.getPrimaryPainPoints(dateFilters),
      this.getTotalAnalyzedMeetings(dateFilters),
    ]);

    return {
      topSectors,
      topLeadSources,
      topTechnologies,
      topUseCases,
      topPrimaryPainPoints,
      totalAnalyzedMeetings,
    };
  }

  private async getTopSectors(dateFilters: any): Promise<SectorAnalysisDto[]> {
    const classifications = await this.meetingClassificationModel.findAll({
      attributes: ['business_sector'],
      include: [
        {
          model: Meeting,
          where: dateFilters,
          required: true,
        },
      ],
      where: {
        business_sector: {
          [Op.ne]: null,
        },
      },
    });

    const sectorCounts = this.countOccurrences(
      classifications.map(c => c.business_sector).filter(Boolean)
    );

    const total = classifications.length;
    return this.formatSectorAnalysisData(sectorCounts, total);
  }

  private async getTopLeadSources(dateFilters: any): Promise<LeadSourceAnalysisDto[]> {
    const classifications = await this.meetingClassificationModel.findAll({
      attributes: ['lead_source'],
      include: [
        {
          model: Meeting,
          where: dateFilters,
          required: true,
        },
      ],
      where: {
        lead_source: {
          [Op.ne]: null,
        },
      },
    });

    const sourceCounts = this.countOccurrences(
      classifications.map(c => c.lead_source).filter(Boolean)
    );

    const total = classifications.length;
    return this.formatLeadSourceAnalysisData(sourceCounts, total);
  }

  private async getTopVambeProducts(dateFilters: any): Promise<TechnologyAnalysisDto[]> {
    const classifications = await this.meetingClassificationModel.findAll({
      attributes: ['vambe_product'],
      include: [
        {
          model: Meeting,
          where: dateFilters,
          required: true,
          attributes: [],
        },
      ],
      where: {
        vambe_product: {
          [Op.ne]: null,
        },
      },
    });

    const vambeProductCounts = this.countOccurrences(
      classifications.map(c => c.vambe_product).filter(Boolean)
    );

    const total = classifications.length;
    return this.formatTechnologyAnalysisData(vambeProductCounts, total);
  }

  private async getUseCases(dateFilters: any): Promise<UseCaseAnalysisDto[]> {
    const classifications = await this.meetingClassificationModel.findAll({
      attributes: ['use_case'],
      include: [
        {
          model: Meeting,
          where: dateFilters,
          required: true,
          attributes: [],
        },
      ],
      where: {
        use_case: {
          [Op.ne]: null,
        },
      },
    });

    const useCaseCounts = this.countOccurrences(
      classifications.map(c => c.use_case).filter(Boolean)
    );

    const total = classifications.length;
    return this.formatUseCaseAnalysisData(useCaseCounts, total);
  }

  private async getPrimaryPainPoints(dateFilters: any): Promise<PrimaryPainPointAnalysisDto[]> {
    const classifications = await this.meetingClassificationModel.findAll({
      attributes: ['primary_pain_point'],
      include: [
        {
          model: Meeting,
          where: dateFilters,
          required: true,
          attributes: [],
        },
      ],
      where: {
        primary_pain_point: {
          [Op.ne]: null,
        },
      },
    });

    const painPointCounts = this.countOccurrences(
      classifications.map(c => c.primary_pain_point).filter(Boolean)
    );

    const total = classifications.length;
    return this.formatPrimaryPainPointAnalysisData(painPointCounts, total);
  }

  private async getTotalAnalyzedMeetings(dateFilters: any): Promise<number> {
    return this.meetingClassificationModel.count({
      include: [
        {
          model: Meeting,
          where: dateFilters,
          required: true,
          attributes: [],
        },
      ],
    });
  }

  private countOccurrences(items: string[]): Record<string, number> {
    return items.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  private formatSectorAnalysisData(
    counts: Record<string, number>, 
    total: number
  ): SectorAnalysisDto[] {
    const sorted = Object.entries(counts)
      .sort(([, a], [, b]) => b - a)

    return sorted.map(([key, count]) => ({
      sector: key,
      count,
      percentage: total > 0 ? Number(((count / total) * 100).toFixed(2)) : 0,
    }));
  }

  private formatLeadSourceAnalysisData(
    counts: Record<string, number>, 
    total: number
  ): LeadSourceAnalysisDto[] {
    const sorted = Object.entries(counts)
      .sort(([, a], [, b]) => b - a)

    return sorted.map(([key, count]) => ({
      source: key,
      count,
      percentage: total > 0 ? Number(((count / total) * 100).toFixed(2)) : 0,
    }));
  }

  private formatTechnologyAnalysisData(
    counts: Record<string, number>, 
    total: number
  ): TechnologyAnalysisDto[] {
    const sorted = Object.entries(counts)
      .sort(([, a], [, b]) => b - a)

    return sorted.map(([key, count]) => ({
      vambe_product: key,
      count,
      percentage: total > 0 ? Number(((count / total) * 100).toFixed(2)) : 0,
    }));
  }

  private formatUseCaseAnalysisData(
    counts: Record<string, number>, 
    total: number
  ): UseCaseAnalysisDto[] {
    const sorted = Object.entries(counts)
      .sort(([, a], [, b]) => b - a)

    return sorted.map(([key, count]) => ({
      use_case: key,
      count,
      percentage: total > 0 ? Number(((count / total) * 100).toFixed(2)) : 0,
    }));
  }

  private formatPrimaryPainPointAnalysisData(
    counts: Record<string, number>, 
    total: number
  ): PrimaryPainPointAnalysisDto[] {
    const sorted = Object.entries(counts)
      .sort(([, a], [, b]) => b - a)

    return sorted.map(([key, count]) => ({
      primary_pain_point: key,
      count,
      percentage: total > 0 ? Number(((count / total) * 100).toFixed(2)) : 0,
    }));
  }
}

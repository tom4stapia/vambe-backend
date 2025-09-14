import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { KpisController } from './kpis.controller';
import { KpisService } from './kpis.service';
import { OverviewKpisService } from './services/overview-kpis.service';
import { SellerPerformanceKpisService } from './services/seller-performance-kpis.service';
import { MeetingTrendsKpisService } from './services/meeting-trends-kpis.service';
import { ClientEngagementKpisService } from './services/client-engagement-kpis.service';
import { Client } from '../../database/models/client.model';
import { Seller } from '../../database/models/seller.model';
import { Meeting } from '../../database/models/meeting.model';
import { MeetingClassification } from '../../database/models/meeting-classification.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Client,
      Seller,
      Meeting,
      MeetingClassification,
    ]),
  ],
  controllers: [KpisController],
  providers: [
    KpisService,
    OverviewKpisService,
    SellerPerformanceKpisService,
    MeetingTrendsKpisService,
    ClientEngagementKpisService,
  ],
  exports: [KpisService],
})
export class KpisModule {}

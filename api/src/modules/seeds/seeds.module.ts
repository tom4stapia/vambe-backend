import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "../../database/database.module";
import { WorkersModule } from "../workers/workers.module";
import { SeedsService } from "./seeds.service";
import { SeedsController } from "./seeds.controller";
import { ClientPopulationService } from "./services/client-population.service";
import { SellerPopulationService } from "./services/seller-population.service";
import { MeetingPopulationService } from "./services/meeting-population.service";
import { ClassificationQueueService } from "./services/classification-queue.service";
import { SuperAdminPopulationService } from "./services/super-admin-population.service";
import { Meeting } from "../../database/models/meeting.model";
import { Client } from "../../database/models/client.model";
import { Seller } from "../../database/models/seller.model";
import { MeetingClassification } from "../../database/models/meeting-classification.model";
import { User } from "../../database/models/user.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    DatabaseModule,
    WorkersModule,
    SequelizeModule.forFeature([
      Meeting,
      Client,
      Seller,
      MeetingClassification,
      User,
    ]),
  ],
  controllers: [SeedsController],
  providers: [
    SeedsService,
    ClientPopulationService,
    SellerPopulationService,
    MeetingPopulationService,
    ClassificationQueueService,
    SuperAdminPopulationService,
  ],
  exports: [SeedsService],
})
export class SeedsModule {}

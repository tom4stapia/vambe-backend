import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "../../database/database.module";
import { WorkersModule } from "../workers/workers.module";
import { SeedsService } from "./seeds.service";
import { SeedsController } from "./seeds.controller";
import { Meeting } from "../../database/models/meeting.model";
import { Client } from "../../database/models/client.model";
import { Seller } from "../../database/models/seller.model";
import { MeetingClassification } from "../../database/models/meeting-classification.model";

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
    ]),
  ],
  controllers: [SeedsController],
  providers: [SeedsService],
  exports: [SeedsService],
})
export class SeedsModule {}

import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ClassificationsService } from "./classifications.service";
import { ClassificationsController } from "./classifications.controller";
import { MeetingClassification } from "../../database/models/meeting-classification.model";
import { Meeting } from "../../database/models/meeting.model";
import { Client } from "../../database/models/client.model";
import { Seller } from "../../database/models/seller.model";

@Module({
  imports: [
    SequelizeModule.forFeature([
      MeetingClassification,
      Meeting,
      Client,
      Seller,
    ]),
  ],
  controllers: [ClassificationsController],
  providers: [ClassificationsService],
  exports: [ClassificationsService],
})
export class ClassificationsModule {}

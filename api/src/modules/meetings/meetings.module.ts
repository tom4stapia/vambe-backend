import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { MeetingsService } from "./meetings.service";
import { MeetingsController } from "./meetings.controller";
import { Meeting } from "../../database/models/meeting.model";
import { Client } from "../../database/models/client.model";
import { Seller } from "../../database/models/seller.model";

@Module({
  imports: [SequelizeModule.forFeature([Meeting, Client, Seller])],
  controllers: [MeetingsController],
  providers: [MeetingsService],
  exports: [MeetingsService],
})
export class MeetingsModule {}

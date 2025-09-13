import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { SellersService } from "./sellers.service";
import { SellersController } from "./sellers.controller";
import { Seller } from "../../database/models/seller.model";
import { Meeting } from "../../database/models/meeting.model";

@Module({
  imports: [SequelizeModule.forFeature([Seller, Meeting])],
  controllers: [SellersController],
  providers: [SellersService],
  exports: [SellersService],
})
export class SellersModule {}

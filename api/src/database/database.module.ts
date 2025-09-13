import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Client } from "./models/client.model";
import { Seller } from "./models/seller.model";
import { Meeting } from "./models/meeting.model";
import { MeetingClassification } from "./models/meeting-classification.model";

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get("database");
        return {
          dialect: dbConfig.dialect,
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          models: [Client, Seller, Meeting, MeetingClassification],
          autoLoadModels: true,
          synchronize: false,
          logging: dbConfig.logging,
          pool: dbConfig.pool,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

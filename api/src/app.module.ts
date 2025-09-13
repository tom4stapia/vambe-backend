import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { ClientsModule } from "./modules/clients/clients.module";
import { SellersModule } from "./modules/sellers/sellers.module";
import { MeetingsModule } from "./modules/meetings/meetings.module";
import { WorkersModule } from "./modules/workers/workers.module";
import { ClassificationsModule } from "./modules/classifications/classifications.module";
import { SeedsModule } from "./modules/seeds/seeds.module";
import { DatabaseModule } from "./database/database.module";
import {
  appConfig,
  databaseConfig,
  redisConfig,
  workersConfig,
} from "./config";
import { NotFoundFilter } from "./common/filters/not-found.filter";
import { RequestLoggerMiddleware } from "./common/middleware/request-logger.middleware";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      load: [appConfig, databaseConfig, redisConfig, workersConfig],
    }),
    DatabaseModule,
    ClientsModule,
    SellersModule,
    MeetingsModule,
    WorkersModule,
    ClassificationsModule,
    SeedsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: NotFoundFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes("*");
  }
}

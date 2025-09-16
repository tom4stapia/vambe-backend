import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { ClientsModule } from "./modules/clients/clients.module";
import { SellersModule } from "./modules/sellers/sellers.module";
import { MeetingsModule } from "./modules/meetings/meetings.module";
import { WorkersModule } from "./modules/workers/workers.module";
import { ClassificationsModule } from "./modules/classifications/classifications.module";
import { SeedsModule } from "./modules/seeds/seeds.module";
import { KpisModule } from "./modules/kpis/kpis.module";
import { AuthModule } from "./modules/auth/auth.module";
import { HealthModule } from "./modules/health/health.module";
import { DatabaseModule } from "./database/database.module";
import {
  appConfig,
  databaseConfig,
  redisConfig,
  workersConfig,
} from "./config";
import { NotFoundFilter } from "./common/filters/not-found.filter";
import { RequestLoggerMiddleware } from "./common/middleware/request-logger.middleware";
import { JwtAuthGuard } from "./common/guards/jwt-auth.guard";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      load: [appConfig, databaseConfig, redisConfig, workersConfig],
    }),
    DatabaseModule,
    AuthModule,
    HealthModule,
    ClientsModule,
    SellersModule,
    MeetingsModule,
    WorkersModule,
    ClassificationsModule,
    SeedsModule,
    KpisModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: NotFoundFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes("*");
  }
}

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { SeedsService } from './modules/seeds/seeds.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const apiPrefix = configService.get<string>('app.apiPrefix');
  app.setGlobalPrefix(apiPrefix);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const corsConfig = configService.get('app.cors');

  app.enableCors({
    origin: corsConfig.origin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: corsConfig.credentials,
  });

  const seedsService = app.get(SeedsService);
  await seedsService.populateClientsMeetings();

  const port = configService.get<number>('app.port');
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📋 API prefix: ${apiPrefix}`);
  console.log(`🌍 Environment: ${configService.get<string>('app.nodeEnv')}`);
}

bootstrap();

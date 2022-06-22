import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { HttpCommonExceptionFilter } from './common/filters';
import { PROTOCOL } from './constants';
import { StatusInterceptor } from './interceptors';


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  app.useGlobalFilters(new HttpCommonExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new StatusInterceptor());
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
  });

  if (process.env.ENVIRONMENT === 'dev') {
    app.use(morgan('tiny'));
  }

  const options = new DocumentBuilder()
    .setTitle('API docs')
    .addServer(process.env.ENVIRONMENT === 'prod' ? PROTOCOL.HTTPS : PROTOCOL.HTTP)
    .addTag('users')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.API_GATEWAY_PORT);
}

bootstrap();

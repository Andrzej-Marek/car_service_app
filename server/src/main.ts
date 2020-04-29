import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as Store from 'connect-redis';
import * as session from 'express-session';
import { redis } from './redis';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import { join } from 'path';

async function bootstrap() {
  dotenv.config();
  const RedisStore = Store(session);

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setViewEngine('ejs');

  app.useGlobalPipes(new ValidationPipe());

  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:8080',
    }),
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: 'qid',
      secret: 'sdadfs',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      },
    }),
  );

  app.useStaticAssets(join(__dirname, '/../../assets'));

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
}
bootstrap();

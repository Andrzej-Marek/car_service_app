import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from 'orm.config';
import { AuthModule } from './domain/auth/auth.module';
import {
  I18nModule,
  I18nJsonParser,
  QueryResolver,
  HeaderResolver,
  CookieResolver,
  AcceptLanguageResolver,
} from 'nestjs-i18n';
import { CustomerModule } from './domain/customer/customer.module';
import { RaportsModule } from './domain/raports/raports.module';
import * as path from 'path';
import { VehicleModule } from './domain/vehicle/vehicle.module';
import { UploaderModule } from './domain/uploader/uploader.module';
import { VehicleServiceModule } from './domain/vehicleService/vehicle-service.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req, res }) => ({ req, res }),
      cors: {
        credentials: true,
        origin: true,
      },
      uploads: false,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '/../i18n/'),
      },
      resolvers: [
        { use: QueryResolver, options: ['lang', 'locale', 'l'] },
        new HeaderResolver(['x-custom-lang']),
        AcceptLanguageResolver,
        new CookieResolver(['lang', 'locale', 'l']),
      ],
    }),
    AuthModule,
    CustomerModule,
    RaportsModule,
    VehicleModule,
    UploaderModule,
    VehicleServiceModule,
  ],
})
export class AppModule {}

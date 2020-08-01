import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleServiceService } from './vehicle-service.service';
import { VehicleServiceResolver } from './vehicle-service.resolver';
import { VehicleServiceRepository } from './vehicle-service.repository';
import { CompanyRepository } from '../auth/company.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([VehicleServiceRepository, CompanyRepository]),
  ],
  providers: [VehicleServiceResolver, VehicleServiceService],
})
export class VehicleServiceModule {}

import { Module } from '@nestjs/common';
import { VehicleResolver } from './vehicle.resolver';
import { VehicleService } from './vehicle.service';
import { CustomerModule } from 'src/domain/customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleRepository } from './vehicle.repository';

@Module({
  imports: [CustomerModule, TypeOrmModule.forFeature([VehicleRepository])],
  providers: [VehicleResolver, VehicleService],
})
export class VehicleModule {}

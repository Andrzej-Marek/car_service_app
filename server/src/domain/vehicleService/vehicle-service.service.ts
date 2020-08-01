import { Injectable } from '@nestjs/common';
import { CreateVehicleServiceDto } from './dto';
import { VehicleServiceRepository } from './vehicle-service.repository';
import { VehicleService } from './vehicle-service.entity';

@Injectable()
export class VehicleServiceService {
  constructor(private vehicleServiceRepository: VehicleServiceRepository) {}

  async getVehicleService(vehicleId: string) {
    return await this.vehicleServiceRepository.getVehicleService(vehicleId);
  }

  async createVehicleService(
    createVehicleServiceDto: CreateVehicleServiceDto,
  ): Promise<VehicleService> {
    return await this.vehicleServiceRepository.createVehicleService(
      createVehicleServiceDto,
    );
  }
}

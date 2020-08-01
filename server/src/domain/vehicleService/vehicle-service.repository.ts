import { EntityRepository, Repository } from 'typeorm';
import { VehicleService } from './vehicle-service.entity';
import { CreateVehicleServiceDto } from './dto';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(VehicleService)
export class VehicleServiceRepository extends Repository<VehicleService> {
  async getVehicleService(vehicleId: string) {
    const vehicleServices = await this.find({ vehicleId });

    const returnValue = vehicleServices.map(service => ({
      ...service,
      costs: [JSON.parse(service.costs[0])],
    }));

    return returnValue;
  }

  async createVehicleService(
    createVehicleServiceDto: CreateVehicleServiceDto,
  ): Promise<VehicleService> {
    try {
      const newService = this.create(createVehicleServiceDto);
      return await this.save(newService);
    } catch (error) {
      Logger.error(
        `Error in createVehicleService error message: ${error.message}`,
      );
      throw new InternalServerErrorException();
    }
  }
}

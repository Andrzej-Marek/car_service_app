import { Repository, EntityRepository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import {
  InternalServerErrorException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { CreateNewVehicleInput } from './dto/create-new-vehicle.input';

@EntityRepository(Vehicle)
export class VehicleRepository extends Repository<Vehicle> {
  async getAllVehicles(companyId: string): Promise<Vehicle[]> {
    const query = this.createQueryBuilder('vehicle');
    query.where('vehicle.companyId = :companyId', { companyId });

    try {
      return await query.getMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createNewVehicle(
    vehicle: CreateNewVehicleInput,
    companyId: string,
    customerId: string,
  ): Promise<Vehicle> {
    const { vinNumber } = vehicle;
    const query = this.createQueryBuilder('vehicle');

    query.where(
      'vehicle.companyId = :companyId AND vehicle.vinNumber = :vinNumber',
      { companyId, vinNumber },
    );

    const queryResults = await query.getCount();
    console.log(queryResults);
    // if (queryResults) {
    //   throw new ConflictException();
    // }

    try {
      const newVehicle = this.create({ ...vehicle, companyId, customerId });
      await newVehicle.save();

      return newVehicle;
    } catch (error) {
      Logger.error('Error with create new vehicle');
      throw new InternalServerErrorException();
    }
  }
}

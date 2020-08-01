import { Repository, EntityRepository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateNewVehicleInput } from './dto/create-new-vehicle.input';
import { fileUpload } from 'src/utils/fileUpload';
import { FileUpload } from 'graphql-upload';

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
    image: FileUpload,
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

    try {
      const newVehicle = this.create({ ...vehicle, companyId, customerId });
      if (image) {
        const imageUrl = await fileUpload(image);
        newVehicle.imageUrl = imageUrl;
      }

      await newVehicle.save();
      return newVehicle;
    } catch (error) {
      Logger.error('Error with create new vehicle');
      throw new InternalServerErrorException();
    }
  }
}

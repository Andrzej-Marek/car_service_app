import {
  Injectable,
  Logger,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateNewVehicleAndCustomerInput } from './dto/create-vehicle-and-customer.input';
import { CustomerService } from 'src/customer/customer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './vehicle.entity';
import { VehicleRepository } from './vehicle.repository';
import { FileUpload } from 'graphql-upload';
import { fileUpload } from 'src/utils/fileUpload';
import { CreateNewVehicleInput } from './dto/create-new-vehicle.input';
import { UpdateVehicleInput } from './dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: VehicleRepository,
    private customerService: CustomerService,
  ) {}

  async findVehicle(vehicleId: string, companyId: string): Promise<Vehicle> {
    try {
      const vehicle = await this.vehicleRepository.findOne({
        where: { companyId, id: vehicleId },
      });

      if (!vehicle) {
        throw new NotFoundException();
      }

      return vehicle;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateVehicleInfo(
    updateVehicleInput: UpdateVehicleInput,
    image: FileUpload,
    companyId: string,
  ): Promise<Vehicle> {
    const vehicle = this.findVehicle(updateVehicleInput.id, companyId);
    let imageUrl: string | null = null;

    if (image) {
      imageUrl = await fileUpload(image);
    } else {
      imageUrl = updateVehicleInput.imageUrl;
    }

    return await this.vehicleRepository.save({
      ...vehicle,
      ...updateVehicleInput,
      imageUrl,
    });
  }

  async getAllVehicles(companyId: string): Promise<Vehicle[]> {
    try {
      return await this.vehicleRepository.find({
        where: { companyId },
        relations: ['customer'],
      });
    } catch (error) {
      Logger.error('Error: GetallVehicles');

      throw new InternalServerErrorException();
    }
  }

  async uploadVehicleImage(
    file: FileUpload,
    vehicleId: string,
    companyId: string,
  ): Promise<string> {
    try {
      const vehicle = await this.vehicleRepository.findOne({
        where: { companyId, id: vehicleId },
      });
      if (!vehicle) {
        throw new NotFoundException();
      }

      const uploadLink = await fileUpload(file);

      vehicle.imageUrl = uploadLink;
      await vehicle.save();

      return uploadLink;
    } catch (error) {
      Logger.error('Error during vehicle image upload sttus is false');
      throw new InternalServerErrorException();
    }
  }

  async createNewVehicleWithCustomer(
    createNewVehicleAndCustomerInput: CreateNewVehicleAndCustomerInput,
    vehicleImage: FileUpload,
    companyId: string,
  ) {
    const { addVehicle, addCustomer } = createNewVehicleAndCustomerInput;

    if (addCustomer.createNewCustomer) {
      const newCustomer = await this.customerService.createNewCustomer(
        addCustomer,
        companyId,
      );

      try {
        await newCustomer.save();
        Logger.log('Created new customer with id: ' + newCustomer.id);
      } catch (error) {
        Logger.error(
          'Creating new user from createNewVehicleWithCustomer service',
        );
        throw new InternalServerErrorException();
      }

      return await this.vehicleRepository.createNewVehicle(
        addVehicle,
        vehicleImage,
        companyId,
        newCustomer.id,
      );
    }

    return await this.vehicleRepository.createNewVehicle(
      addVehicle,
      vehicleImage,
      companyId,
      addCustomer.customerId,
    );
  }
}

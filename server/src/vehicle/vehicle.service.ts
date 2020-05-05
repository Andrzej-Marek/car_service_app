import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateNewVehicleAndCustomerInput } from './dto/create-vehicle-and-customer.input';
import { CustomerService } from 'src/customer/customer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './vehicle.entity';
import { VehicleRepository } from './vehicle.repository';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: VehicleRepository,
    private customerService: CustomerService,
  ) {}
  async createNewVehicleWithCustomer(
    createNewVehicleAndCustomerInput: CreateNewVehicleAndCustomerInput,
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
        companyId,
        newCustomer.id,
      );
    }

    Logger.log('Created new vehicle');

    return await this.vehicleRepository.createNewVehicle(
      addVehicle,
      companyId,
      addCustomer.customerId,
    );
  }
}

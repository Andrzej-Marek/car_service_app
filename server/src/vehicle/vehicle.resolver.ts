import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { VehicleService } from './vehicle.service';
import { CreateNewVehicleAndCustomerInput } from './dto/create-vehicle-and-customer.input';
import { GetCompanyId } from 'src/auth/get-company-id.decorator';
import { Vehicle } from './vehicle.entity';

@Resolver()
@UseGuards(AuthGuard)
export class VehicleResolver {
  constructor(private vehicleService: VehicleService) {}

  @Mutation(() => Vehicle)
  async createNewVehicleWithCustomer(
    @Args('createNewVehicleAndCustomerInput')
    createNewVehicleAndCustomerInput: CreateNewVehicleAndCustomerInput,
    @GetCompanyId() companyId: string,
  ): Promise<Vehicle> {
    return this.vehicleService.createNewVehicleWithCustomer(
      createNewVehicleAndCustomerInput,
      companyId,
    );
  }
}

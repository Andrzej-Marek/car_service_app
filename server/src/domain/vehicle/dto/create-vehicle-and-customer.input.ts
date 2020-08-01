import { InputType, Field } from '@nestjs/graphql';
import { CreateNewVehicleInput } from './create-new-vehicle.input';
import { CreateCustomerInput } from 'src/domain/customer/dto';

@InputType()
export class CreateNewVehicleAndCustomerInput {
  @Field()
  addVehicle: CreateNewVehicleInput;

  @Field()
  addCustomer: CreateCustomerInput;
}

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateNewVehicleInput {
  @Field()
  vehicleType: string;
  @Field()
  brand: string;
  @Field()
  model: string;
  @Field({ nullable: true })
  vinNumber: string;
  @Field({ nullable: true })
  productionYear: string;
  @Field({ nullable: true })
  engineCapacity: string;
  @Field({ nullable: true })
  registrationNumber: string;
  @Field({ nullable: true })
  enginePower: string;
  @Field({ nullable: true })
  color: string;
  @Field({ nullable: true })
  mileage: string;
  @Field({ nullable: true })
  fuelType: string;
  @Field({ nullable: true })
  insuranceDate: string;
  @Field({ nullable: true })
  nextService: string;
  @Field({ nullable: true })
  warranty: string;
  @Field({ nullable: true })
  comment: string;
}

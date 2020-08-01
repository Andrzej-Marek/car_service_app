import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class Cost {
  @Field()
  name: string;

  @Field()
  price: string;

  @Field()
  amount: string;
}

@InputType()
export class CreateVehicleServiceDto {
  @Field()
  date: string;

  @Field()
  serviceNumber: string;

  @Field({ nullable: true })
  estimateServiceDone: string;

  @Field()
  netPrices: boolean;

  @Field(() => [Cost])
  costs: string;

  @Field(() => [String])
  deposit: string;

  @Field()
  currency: string;

  @Field()
  advancePayment: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  privateDescription: string;

  @Field()
  vehicleId: string;
}

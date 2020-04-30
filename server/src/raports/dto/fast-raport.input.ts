import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FastRaportInput {
  @Field()
  brand: string;

  @Field()
  model: string;

  @Field()
  vinNumber: string;

  @Field()
  productionYear: string;

  @Field()
  mileage: string;

  @Field()
  color: string;

  @Field()
  description: string;

  @Field()
  diagnosis: string;

  @Field(() => [Estimate])
  estimate: Estimate[];

  @Field()
  comment: string;

  @Field()
  currency: string;
}

@InputType()
export class Estimate {
  @Field()
  item: string;

  @Field()
  cost: number;

  @Field()
  amount: number;

  @Field()
  totalCost: number;
}

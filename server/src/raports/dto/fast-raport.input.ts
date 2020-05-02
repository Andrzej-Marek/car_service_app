import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FastRaportInput {
  @Field()
  brand: string;

  @Field()
  model: string;

  @Field({ nullable: true })
  vinNumber: string;

  @Field({ nullable: true })
  productionYear: string;

  @Field({ nullable: true })
  mileage: string;

  @Field({ nullable: true })
  color: string;

  @Field()
  description: string;

  @Field()
  diagnosis: string;

  @Field(() => [Estimate], { nullable: true })
  estimate: Estimate[];

  @Field({ nullable: true })
  comment: string;

  @Field({ nullable: true })
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

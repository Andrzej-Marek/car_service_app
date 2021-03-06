import { InputType, Field, Int } from '@nestjs/graphql';
import { IsBoolean, MinLength } from 'class-validator';

@InputType()
export class CreateCustomerInput {
  @Field({ nullable: true })
  createNewCustomer: boolean;

  @Field({ nullable: true })
  customerId?: string;

  @Field()
  @MinLength(4)
  firstname: string;

  @Field({ nullable: true })
  lastname: string;

  @Field({ nullable: true })
  companyName: string;

  @Field({ nullable: true })
  vatNumber: string;

  @Field({ nullable: true })
  street: string;

  @Field({ nullable: true })
  postcode: string;

  @Field({ nullable: true })
  adress: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  mail: string;

  @Field({ nullable: true })
  comment: string;

  @Field(() => Int, { nullable: true })
  discount: number;

  @IsBoolean()
  @Field()
  mailSendAgreement: boolean;

  @IsBoolean()
  @Field()
  smsSendAgreement: boolean;

  @IsBoolean()
  @Field()
  marketingSendAgreement: boolean;
}

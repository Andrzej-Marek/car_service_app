import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  companyId: string;

  @MinLength(4)
  @Field()
  login: string;

  @MinLength(5)
  @Field()
  password: string;

  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  phone: string;
}

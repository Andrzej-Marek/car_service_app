import { ObjectType, Field } from '@nestjs/graphql';
import { LoginType } from './@types/LoginType';
import { Plans } from 'src/@types/Plans';

@ObjectType()
export class AuthInfoSchema {
  @Field()
  companyId: string;

  @Field()
  companyName: string;

  @Field()
  loginType: LoginType;

  @Field()
  plan: Plans;

  @Field({ nullable: true })
  userName: string;
}

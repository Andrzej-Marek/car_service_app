import { InputType, Field } from '@nestjs/graphql';
import { LoginType } from '../@types/LoginType';
import { IsEnum } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  login: string;

  @Field()
  password: string;
}

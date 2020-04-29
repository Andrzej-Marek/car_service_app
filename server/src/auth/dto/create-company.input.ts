import { InputType, Field } from '@nestjs/graphql';
import { MinLength, IsBoolean, IsEmail, Equals } from 'class-validator';
import { I18nService } from 'nestjs-i18n';

@InputType()
export class CreateCompanyInput {
  constructor(private readonly i18n: I18nService) {}

  @IsEmail()
  @Field()
  mail: string;

  @MinLength(5)
  @Field()
  password: string;

  @Field()
  companyName: string;

  @Field()
  vatNumber: string;

  @Field()
  adress: string;

  @Field()
  street: string;

  @Field()
  postcode: string;

  @Equals(true)
  @Field()
  rulesAgreement: boolean;

  @IsBoolean()
  @Field()
  marketingAgreement: boolean;
}

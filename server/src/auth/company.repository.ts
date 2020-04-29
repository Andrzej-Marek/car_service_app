import { Repository, EntityRepository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyInput } from './dto/create-company.input';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { hashPassword } from './utils';
import { LoginInput } from './dto/login.input';

const DUPLICATE_LOGIN_CODE = '23505';

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {
  async createCompany(newCompanyInput: CreateCompanyInput): Promise<Company> {
    const { password } = newCompanyInput;

    const salt = await bcrypt.genSalt();

    const newCompany = this.create({
      ...newCompanyInput,
      password: await hashPassword(password, salt),
      salt,
    });

    try {
      await this.save(newCompany);
      return newCompany;
    } catch (error) {
      console.log(error);
      if (error.code === DUPLICATE_LOGIN_CODE) {
        throw new ConflictException('Company already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateCompanyPassword(
    authCredentialsDto: LoginInput,
  ): Promise<Company> {
    const { login, password } = authCredentialsDto;
    const company = await this.findOne({ mail: login });

    if (company && (await company.validatePassword(password))) {
      return company;
    } else {
      throw new NotFoundException();
    }
  }
}

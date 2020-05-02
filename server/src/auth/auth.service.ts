import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UserRepositiory } from './user.repository';
import { CreateCompanyInput } from './dto/create-company.input';
import { CompanyRepository } from './company.repository';
import { Company } from './company.entity';
import { LoginInput } from './dto/login.input';
import { Request } from 'express';
import { AuthInfoSchema } from './auth-info.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepositiory)
    private userRepository: UserRepositiory,
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
  ) {}

  async me(companyId: string, userId: string): Promise<AuthInfoSchema> {
    if (userId) {
      const user = await this.getUser(userId);
      if (!user) {
        throw new UnauthorizedException();
      }
      return {
        companyId: user.companyId,
        loginType: 'user',
        companyName: user.company.companyName,
        plan: user.company.plan,
        userName: user.name,
      } as AuthInfoSchema;
    }

    const company = await this.getCompanyById(companyId);
    if (!company) {
      throw new UnauthorizedException();
    }
    return {
      companyId: company.id,
      loginType: 'company',
      companyName: company.companyName,
      plan: company.plan,
    } as AuthInfoSchema;
  }

  async getAllUser(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    const company = await this.companyRepository.findOne(user.companyId);
    user.company = company;
    return user;
  }

  async getCompanyById(id: string): Promise<Company> {
    return await this.companyRepository.findOne(id);
  }

  async userLogin(credentials: LoginInput, req: Request): Promise<User> {
    const user = await this.userRepository.validateUserPassword(credentials);
    const company = await this.companyRepository.findOne(user.companyId);

    user.company = company;
    req.session.userId = user.id;
    req.session.companyId = user.companyId;

    return user;
  }

  async companyLogin(credentials: LoginInput, req: Request): Promise<Company> {
    const company = await this.companyRepository.validateCompanyPassword(
      credentials,
    );

    req.session.companyId = company.id;
    return company;
  }

  async createUser(newUser: CreateUserInput): Promise<User> {
    const user = await this.userRepository.createUser(newUser);
    return user;
  }

  async createCompany(newCompanyInput: CreateCompanyInput): Promise<Company> {
    return await this.companyRepository.createCompany(newCompanyInput);
  }
}

import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { hashPassword } from './utils';
import { LoginInput } from './dto/login.input';

const DUPLICATE_USERNAME_CODE = '23505';

@EntityRepository(User)
export class UserRepositiory extends Repository<User> {
  async createUser(newUser: CreateUserInput): Promise<User> {
    const { password, login, companyId } = newUser;

    const query = this.createQueryBuilder('user');

    query.where('user.login = :login AND user.companyId = :companyId', {
      login,
      companyId,
    });

    const userAlreadyExistInCompany = await query.getOne();

    if (userAlreadyExistInCompany) {
      throw new ConflictException('Username already exists');
    }

    const salt = await bcrypt.genSalt();

    const user = this.create({
      ...newUser,
      password: await hashPassword(password, salt),
      salt,
    });

    try {
      await this.save(user);
      return user;
    } catch (error) {
      if (error.code === DUPLICATE_USERNAME_CODE) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(authCredentialsDto: LoginInput): Promise<User> {
    const { login, password } = authCredentialsDto;
    const user = await this.findOne({ login });

    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }
}

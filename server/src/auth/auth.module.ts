import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserRepositiory } from './user.repository';
import { CompanyRepository } from './company.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepositiory, CompanyRepository])],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}

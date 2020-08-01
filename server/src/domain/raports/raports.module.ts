import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaportsResolver } from './raports.resolver';
import { RaportsService } from './raports.service';
import { CompanyRepository } from 'src/domain/auth/company.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyRepository])],
  providers: [RaportsResolver, RaportsService],
})
export class RaportsModule {}

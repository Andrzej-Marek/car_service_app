import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaportsResolver } from './raports.resolver';
import { RaportsService } from './raports.service';

@Module({
  imports: [],
  providers: [RaportsResolver, RaportsService],
})
export class RaportsModule {}

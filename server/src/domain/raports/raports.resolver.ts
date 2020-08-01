import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RaportsService } from './raports.service';

import { Args, Resolver, Query } from '@nestjs/graphql';
import { FastRaportInput } from './dto/fast-raport.input';
import { GetCompanyId } from '../auth/get-company-id.decorator';

@Resolver()
@UseGuards(AuthGuard)
export class RaportsResolver {
  constructor(private raportsService: RaportsService) {}

  @Query(() => String)
  async fastRaport(
    @Args('fastRaportInput') fastRaportInput: FastRaportInput,
    @GetCompanyId() companyId: string,
  ): Promise<string> {
    return this.raportsService.generateFastRaport(fastRaportInput, companyId);
  }
}

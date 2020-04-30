import { Resolver, Query, Args } from '@nestjs/graphql';
import { RaportsService } from './raports.service';
import { FastRaportInput } from './dto/fast-raport.input';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { GetCompanyId } from 'src/auth/get-company-id.decorator';

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

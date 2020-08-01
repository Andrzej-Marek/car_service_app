import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Mutation, Args, Resolver, Query } from '@nestjs/graphql';
import { GetCompanyId } from '../auth/get-company-id.decorator';

@UseGuards(AuthGuard)
@Resolver()
export class CustomerResolver {
  @Query(() => [])
  async getAllAppointments(@GetCompanyId() companyId: string) {
    return 'sdsd';
  }
}

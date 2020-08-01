import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { GetCompanyId } from '../auth/get-company-id.decorator';
import { Mutation, Args, Resolver, Query } from '@nestjs/graphql';
import { UpdateCustomerInput, CreateCustomerInput } from './dto';

@UseGuards(AuthGuard)
@Resolver()
export class CustomerResolver {
  constructor(private customerService: CustomerService) {}

  @Query(() => [Customer])
  async getAllCustomers(
    @GetCompanyId() companyId: string,
  ): Promise<Customer[]> {
    return this.customerService.getAllCustomers(companyId);
  }

  @Mutation(() => Customer)
  async updateCustomer(
    @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput,
    @GetCompanyId() companyId: string,
  ): Promise<Customer> {
    return this.customerService.updateCustomer(updateCustomerInput, companyId);
  }
  @Mutation(() => Boolean)
  async deleteCustomer(
    @Args('customerId') customerId: string,
    @GetCompanyId() companyId: string,
  ) {
    return this.customerService.deleteCustomer(customerId, companyId);
  }

  @Mutation(() => Customer)
  async createNewCustomer(
    @Args('newCustomerInput') newCustomerInput: CreateCustomerInput,
    @GetCompanyId() companyId: string,
  ): Promise<Customer> {
    return this.customerService.createNewCustomer(newCustomerInput, companyId);
  }
}

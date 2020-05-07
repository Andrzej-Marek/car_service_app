import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { GetCompanyId } from 'src/auth/get-company-id.decorator';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { CreateCustomerInput, UpdateCustomerInput } from './dto';

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

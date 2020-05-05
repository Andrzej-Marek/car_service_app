import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { Customer } from './customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerInput } from './dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerRepository)
    private customerRepository: CustomerRepository,
  ) {}
  async getAllCustomers(companyId: string): Promise<Customer[]> {
    return await this.customerRepository.find({
      where: { companyId },
    });
  }

  async createNewCustomer(
    createCustomerInput: CreateCustomerInput,
    companyId: string,
  ): Promise<Customer> {
    return this.customerRepository.createNewCustomer(
      createCustomerInput,
      companyId,
    );
  }
}

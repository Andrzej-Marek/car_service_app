import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { Customer } from './customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerInput, UpdateCustomerInput } from './dto';

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

  async updateCustomer(
    updateCustomer: UpdateCustomerInput,
    companyId: string,
  ): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { id: updateCustomer.id, companyId },
    });

    if (!customer) {
      throw new NotFoundException();
    }

    return await this.customerRepository.save({
      ...customer,
      ...updateCustomer,
    });
  }

  async deleteCustomer(
    customerId: string,
    companyId: string,
  ): Promise<boolean> {
    try {
      const customer = await this.customerRepository.findOne({
        where: { id: customerId, companyId },
      });

      if (!customer) {
        throw new NotFoundException();
      }

      // First have to delete all vehicles
      await this.customerRepository.delete(customer.id);

      return true;
    } catch (error) {
      console.log(error);
      Logger.error(
        `Error during delete customer in customer.service. deleteCustomer function `,
      );
      throw new InternalServerErrorException();
    }
  }
}

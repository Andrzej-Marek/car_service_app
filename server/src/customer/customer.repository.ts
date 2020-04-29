import { Repository, EntityRepository } from 'typeorm';
import { Customer } from './customer.entity';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { CreateCustomerInput } from './dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@UseGuards(AuthGuard)
@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  async getAllCustomers(companyId: string): Promise<Customer[]> {
    const query = this.createQueryBuilder('customer');
    query.where('customer.companyId = :companyId', { companyId });
    try {
      return await query.getMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createNewCustomer(
    createCustomerInput: CreateCustomerInput,
    companyId: string,
  ): Promise<Customer> {
    try {
      const newCustomer = this.create({ ...createCustomerInput, companyId });
      await this.save(newCustomer);
      return newCustomer;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}

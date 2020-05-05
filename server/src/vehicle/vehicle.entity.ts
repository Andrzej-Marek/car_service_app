import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Company } from 'src/auth/company.entity';
import { Customer } from 'src/customer/customer.entity';

@ObjectType()
@Entity()
export class Vehicle extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field()
  vahicleType: string;

  @Column()
  @Field()
  brand: string;

  @Column()
  @Field()
  model: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  vinNumber: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  productionYear: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  engineCapacity: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  registrationNumber: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  enginePower: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  color: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  mileage: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  fuelType: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  insuranceDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  nextService: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  warranty: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  comment: string;

  @Field(() => Company)
  @ManyToOne(
    () => Company,
    company => company.vehicles,
    { eager: false },
  )
  company: Company;

  @Column()
  @Field()
  companyId: string;

  @Field(() => Customer)
  @ManyToOne(
    () => Customer,
    customer => customer.vehicles,
  )
  customer: Customer;

  @Column()
  @Field()
  customerId: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field({ nullable: true })
  updatedAt: Date;
}

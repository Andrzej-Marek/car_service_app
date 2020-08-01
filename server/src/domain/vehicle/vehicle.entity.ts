import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Company } from 'src/domain/auth/company.entity';
import { Customer } from 'src/domain/customer/customer.entity';
import { MileageEnum } from 'src/enums';
import { VehicleService } from '../vehicleService/vehicle-service.entity';

@Entity()
@ObjectType()
export class Vehicle extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field()
  vehicleType: string;

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

  @Column()
  @Field()
  lengthUnit: MileageEnum;

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

  @Column({ nullable: true })
  @Field({ nullable: true })
  imageUrl: string;

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

  @Field(() => [VehicleService])
  @OneToMany(
    () => VehicleService,
    vehicleService => vehicleService.vehicle,
    { eager: true },
  )
  services: VehicleService[];

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field({ nullable: true })
  updatedAt: Date;
}

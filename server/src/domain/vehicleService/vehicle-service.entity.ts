import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Entity,
} from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Vehicle } from '../vehicle/vehicle.entity';

@ObjectType()
export class CostObjectType {
  @Field()
  name: string;

  @Field()
  price: string;

  @Field()
  amount: string;
}

@Entity()
@ObjectType()
export class VehicleService extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  @Field()
  date: string;

  @Column()
  @Field()
  serviceNumber: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  estimateServiceDone: string;

  @Field(() => Boolean)
  @Column()
  netPrices: boolean;

  @Column()
  @Field()
  currency: string;

  @Column()
  @Field()
  advancePayment: string;

  @Column({ array: true })
  @Field(() => [CostObjectType])
  costs: string;

  @Column({ array: true })
  @Field(() => [String])
  deposit: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  privateDescription: string;

  @Field(() => Vehicle)
  @ManyToOne(
    () => Vehicle,
    vehicle => vehicle.services,
    { eager: false },
  )
  vehicle: Vehicle;

  @Field()
  @Column()
  vehicleId: string;
}

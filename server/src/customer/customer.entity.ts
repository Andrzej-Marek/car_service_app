import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, Float, ID } from '@nestjs/graphql';
import { Company } from 'src/auth/company.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';

@Entity()
@ObjectType()
export class Customer extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  firstname: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastname: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  companyName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  vatNumber: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  street: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  postcode: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  adress: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  mail: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  comment: string;

  @Field(() => Float)
  @Column({ default: 0 })
  discount: number;

  @Field(() => Boolean)
  @Column({ default: false })
  mailSendAgreement: boolean;

  @Field(() => Boolean)
  @Column({ default: false })
  smsSendAgreement: boolean;

  @Field(() => Boolean)
  @Column({ default: false })
  marketingSendAgreement: boolean;

  @Field(() => Company)
  @ManyToOne(
    () => Company,
    company => company.customers,
    { eager: false },
  )
  company: Company;

  @Field()
  @Column()
  companyId: string;

  @Field(() => [Vehicle])
  @OneToMany(
    () => Vehicle,
    vehicle => vehicle.customer,
  )
  vehicles: Vehicle[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

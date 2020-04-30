import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Company } from 'src/auth/company.entity';

@Entity()
@ObjectType()
export class Customer extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

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

  @Field()
  @ManyToOne(
    () => Company,
    company => company.customers,
    { eager: false },
  )
  company: string;

  @Field()
  @Column()
  companyId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

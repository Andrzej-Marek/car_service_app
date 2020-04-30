import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Unique,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { Plans } from 'src/@types/Plans';
import { Customer } from 'src/customer/customer.entity';

const { FREE } = Plans;

@ObjectType()
@Entity()
@Unique(['mail'])
export class Company extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  mail: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Field()
  @Column({ default: FREE })
  plan: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone: string;

  @Field()
  @Column()
  companyName: string;

  @Field()
  @Column()
  vatNumber: string;

  @Field()
  @Column()
  adress: string;

  @Field()
  @Column()
  street: string;

  @Field()
  @Column()
  postcode: string;

  @Field()
  @Column({ default: false })
  rulesAgreement: boolean;

  @Field()
  @Column({ default: false })
  marketingAgreement: boolean;

  @OneToMany(
    () => User,
    user => user.company,
    { eager: true },
  )
  @Field(() => [User])
  users: User[];

  @OneToMany(
    () => Customer,
    user => user.company,
    { eager: true },
  )
  @Field(() => [Customer])
  customers: Customer[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Company } from './company.entity';
import * as bcrypt from 'bcryptjs';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ nullable: true })
  phone: string;

  @Field(() => Company)
  @ManyToOne(
    () => Company,
    company => company.users,
    { eager: false },
  )
  company: Company;

  @Field()
  @Column()
  companyId: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}

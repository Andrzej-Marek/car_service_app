import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ID } from '@nestjs/graphql';

@Entity()
export class Cost extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  price: string;

  @Column()
  @Field()
  amount: string;

  @Column()
  @Field({ defaultValue: '23%' })
  vatRate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string;
}

import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, OneToMany } from 'typeorm';
import {
  IsString,
  IsEmail,
  IsOptional,
  Length,
  IsPhoneNumber,
} from 'class-validator';
import { BaseEntity } from './base.entity';
import { Order } from './order.entity';

@ObjectType()
@Entity('customers')
export class Customer extends BaseEntity {
  @Field()
  @Column({ length: 100 })
  @IsString()
  @Length(1, 100)
  firstName: string;

  @Field()
  @Column({ length: 100 })
  @IsString()
  @Length(1, 100)
  lastName: string;

  @Field({ nullable: true })
  @Column({ nullable: true, unique: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @Field({ nullable: true })
  @Column({ type: 'date', nullable: true })
  @IsOptional()
  dateOfBirth?: Date;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  address?: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field(() => [Order])
  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  // Virtual field
  @Field()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

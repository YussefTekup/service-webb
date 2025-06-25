import { Field, ObjectType, Float } from '@nestjs/graphql';
import { Entity, Column, OneToMany } from 'typeorm';
import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  Length,
  IsPhoneNumber,
  IsNumber,
  Min,
} from 'class-validator';
import { BaseEntity } from './base.entity';
import { Order } from './order.entity';

export enum StaffRole {
  MANAGER = 'manager',
  CHEF = 'chef',
  WAITER = 'waiter',
  CASHIER = 'cashier',
  CLEANER = 'cleaner',
}

export enum StaffStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ON_LEAVE = 'on_leave',
}

@ObjectType()
@Entity('staff')
export class Staff extends BaseEntity {
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

  @Field()
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @Field()
  @Column({
    type: 'enum',
    enum: StaffRole,
  })
  @IsEnum(StaffRole)
  role: StaffRole;

  @Field()
  @Column({
    type: 'enum',
    enum: StaffStatus,
    default: StaffStatus.ACTIVE,
  })
  @IsEnum(StaffStatus)
  status: StaffStatus;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  hourlyRate?: number;

  @Field({ nullable: true })
  @Column({ type: 'date', nullable: true })
  @IsOptional()
  hireDate?: Date;

  @Field(() => [Order])
  @OneToMany(() => Order, (order) => order.server)
  orders: Order[];

  // Virtual field
  @Field()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

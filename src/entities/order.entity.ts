import { Field, ObjectType, Float } from '@nestjs/graphql';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from './base.entity';
import { Customer } from './customer.entity';
import { Table } from './table.entity';
import { Staff } from './staff.entity';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY = 'ready',
  SERVED = 'served',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum OrderType {
  DINE_IN = 'dine_in',
  TAKEAWAY = 'takeaway',
  DELIVERY = 'delivery',
}

@ObjectType()
@Entity('orders')
export class Order extends BaseEntity {
  @Field()
  @Column({ unique: true })
  orderNumber: string;

  @Field()
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @Field()
  @Column({
    type: 'enum',
    enum: OrderType,
    default: OrderType.DINE_IN,
  })
  @IsEnum(OrderType)
  type: OrderType;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  subtotal: number;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  tax: number;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  tip: number;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  specialInstructions?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  orderTime?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  servedTime?: Date;

  @Field(() => Customer, { nullable: true })
  @ManyToOne(() => Customer, (customer) => customer.orders, { nullable: true })
  @JoinColumn({ name: 'customerId' })
  customer?: Customer;

  @Column({ nullable: true })
  customerId?: string;

  @Field(() => Table, { nullable: true })
  @ManyToOne(() => Table, (table) => table.orders, { nullable: true })
  @JoinColumn({ name: 'tableId' })
  table?: Table;

  @Column({ nullable: true })
  tableId?: string;

  @Field(() => Staff, { nullable: true })
  @ManyToOne(() => Staff, (staff) => staff.orders, { nullable: true })
  @JoinColumn({ name: 'serverId' })
  server?: Staff;

  @Column({ nullable: true })
  serverId?: string;

  @Field(() => [OrderItem])
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}

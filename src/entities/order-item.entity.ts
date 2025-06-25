import { Field, ObjectType, Int, Float } from '@nestjs/graphql';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { BaseEntity } from './base.entity';
import { Order } from './order.entity';
import { MenuItem } from './menu-item.entity';

@ObjectType()
@Entity('order_items')
export class OrderItem extends BaseEntity {
  @Field(() => Int)
  @Column()
  @IsNumber()
  @Min(1)
  quantity: number;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  @Min(0)
  unitPrice: number;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  @Min(0)
  totalPrice: number;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  specialInstructions?: string;

  @Field(() => Order)
  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column()
  orderId: string;

  @Field(() => MenuItem)
  @ManyToOne(() => MenuItem, (menuItem) => menuItem.orderItems)
  @JoinColumn({ name: 'menuItemId' })
  menuItem: MenuItem;

  @Column()
  menuItemId: string;
}

import { Field, ObjectType, Float, Int } from '@nestjs/graphql';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  Length,
  Min,
} from 'class-validator';
import { BaseEntity } from './base.entity';
import { Category } from './category.entity';
import { OrderItem } from './order-item.entity';

export enum MenuItemStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
  OUT_OF_STOCK = 'out_of_stock',
}

@ObjectType()
@Entity('menu_items')
export class MenuItem extends BaseEntity {
  @Field()
  @Column({ length: 100 })
  @IsString()
  @Length(1, 100)
  name: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  @Min(0)
  price: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  preparationTime?: number; // in minutes

  @Field()
  @Column({
    type: 'enum',
    enum: MenuItemStatus,
    default: MenuItemStatus.AVAILABLE,
  })
  @IsEnum(MenuItemStatus)
  status: MenuItemStatus;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.menuItems)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column()
  categoryId: string;

  @Field(() => [OrderItem])
  @OneToMany(() => OrderItem, (orderItem) => orderItem.menuItem)
  orderItems: OrderItem[];
}

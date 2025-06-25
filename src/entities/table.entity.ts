import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Entity, Column, OneToMany } from 'typeorm';
import { IsString, IsNumber, IsEnum, Length, Min, Max } from 'class-validator';
import { BaseEntity } from './base.entity';
import { Order } from './order.entity';

export enum TableStatus {
  AVAILABLE = 'available',
  OCCUPIED = 'occupied',
  RESERVED = 'reserved',
  OUT_OF_SERVICE = 'out_of_service',
}

@ObjectType()
@Entity('tables')
export class Table extends BaseEntity {
  @Field()
  @Column({ length: 20, unique: true })
  @IsString()
  @Length(1, 20)
  number: string;

  @Field(() => Int)
  @Column()
  @IsNumber()
  @Min(1)
  @Max(20)
  capacity: number;

  @Field()
  @Column({
    type: 'enum',
    enum: TableStatus,
    default: TableStatus.AVAILABLE,
  })
  @IsEnum(TableStatus)
  status: TableStatus;

  @Field({ nullable: true })
  @Column({ nullable: true })
  location?: string; // e.g., "Main Floor", "Patio", "Private Room"

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field(() => [Order])
  @OneToMany(() => Order, (order) => order.table)
  orders: Order[];
}

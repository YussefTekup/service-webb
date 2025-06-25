import { InputType, Field, Float } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderType } from '../entities/order.entity';

@InputType()
export class CreateOrderItemInput {
  @Field()
  @ApiProperty({ description: 'Menu item ID' })
  @IsUUID()
  menuItemId: string;

  @Field()
  @ApiProperty({ description: 'Quantity', example: 2 })
  @IsNumber()
  @Min(1)
  quantity: number;

  @Field({ nullable: true })
  @ApiProperty({ description: 'Special instructions', required: false })
  @IsOptional()
  @IsString()
  specialInstructions?: string;
}

@InputType()
export class CreateOrderInput {
  @Field()
  @ApiProperty({ description: 'Order type', enum: OrderType })
  @IsEnum(OrderType)
  type: OrderType;

  @Field({ nullable: true })
  @ApiProperty({ description: 'Customer ID', required: false })
  @IsOptional()
  @IsUUID()
  customerId?: string;

  @Field({ nullable: true })
  @ApiProperty({ description: 'Table ID', required: false })
  @IsOptional()
  @IsUUID()
  tableId?: string;

  @Field({ nullable: true })
  @ApiProperty({ description: 'Server ID', required: false })
  @IsOptional()
  @IsUUID()
  serverId?: string;

  @Field({ nullable: true })
  @ApiProperty({ description: 'Special instructions', required: false })
  @IsOptional()
  @IsString()
  specialInstructions?: string;

  @Field(() => [CreateOrderItemInput])
  @ApiProperty({ type: [CreateOrderItemInput], description: 'Order items' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemInput)
  orderItems: CreateOrderItemInput[];
}

export class CreateOrderDto extends CreateOrderInput {} 
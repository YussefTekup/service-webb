import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  Length,
  Min,
  IsUUID,
} from 'class-validator';
import { MenuItemStatus } from '../entities/menu-item.entity';

@InputType()
export class CreateMenuItemInput {
  @Field()
  @ApiProperty({ description: 'Menu item name', example: 'Grilled Salmon' })
  @IsString()
  @Length(1, 100)
  name: string;

  @Field({ nullable: true })
  @ApiProperty({
    description: 'Menu item description',
    example: 'Fresh Atlantic salmon grilled to perfection',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => Float)
  @ApiProperty({ description: 'Menu item price', example: 24.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @Field({ nullable: true })
  @ApiProperty({
    description: 'Menu item image URL',
    example: 'https://example.com/salmon.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @Field(() => Int, { nullable: true })
  @ApiProperty({
    description: 'Preparation time in minutes',
    example: 15,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  preparationTime?: number;

  @Field()
  @ApiProperty({ description: 'Category ID', example: 'uuid' })
  @IsUUID()
  categoryId: string;

  @Field({ nullable: true })
  @ApiProperty({
    description: 'Menu item status',
    enum: MenuItemStatus,
    default: MenuItemStatus.AVAILABLE,
    required: false,
  })
  @IsOptional()
  @IsEnum(MenuItemStatus)
  status?: MenuItemStatus;
}

export class CreateMenuItemDto extends CreateMenuItemInput {}

import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @Field()
  @ApiProperty({ description: 'Category name', example: 'Appetizers' })
  @IsString()
  @Length(1, 100)
  name: string;

  @Field({ nullable: true })
  @ApiProperty({
    description: 'Category description',
    example: 'Delicious starters to begin your meal',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @ApiProperty({
    description: 'Category image URL',
    example: 'https://example.com/appetizers.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}

export class CreateCategoryDto extends CreateCategoryInput {}

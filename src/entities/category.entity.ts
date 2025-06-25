import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, OneToMany } from 'typeorm';
import { IsString, IsOptional, Length } from 'class-validator';
import { BaseEntity } from './base.entity';
import { MenuItem } from './menu-item.entity';

@ObjectType()
@Entity('categories')
export class Category extends BaseEntity {
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

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field(() => [MenuItem])
  @OneToMany(() => MenuItem, (menuItem) => menuItem.category)
  menuItems: MenuItem[];
}

import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateMenuItemInput } from './create-menu-item.dto';
import { IsOptional } from 'class-validator';

@InputType()
export class UpdateMenuItemInput extends PartialType(CreateMenuItemInput) {
  @Field(() => ID)
  id: string;
}

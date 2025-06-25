import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from '../../entities/category.entity';
import { CreateCategoryInput } from '../../dto/create-category.dto';
import { UpdateCategoryInput } from '../../dto/update-category.dto';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ): Promise<Category> {
    return this.categoryService.create(createCategoryInput);
  }

  @Query(() => [Category], { name: 'categories' })
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Query(() => [Category], { name: 'activeCategories' })
  async findActiveCategories(): Promise<Category[]> {
    return this.categoryService.getActiveCategories();
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    return this.categoryService.update(id, updateCategoryInput);
  }

  @Mutation(() => Boolean)
  async removeCategory(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    await this.categoryService.remove(id);
    return true;
  }
}

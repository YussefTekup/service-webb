import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { MenuService } from './menu.service';
import { MenuItem } from '../../entities/menu-item.entity';
import { CreateMenuItemInput } from '../../dto/create-menu-item.dto';
import { UpdateMenuItemInput } from '../../dto/update-menu-item.dto';

@Resolver(() => MenuItem)
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}

  @Mutation(() => MenuItem)
  async createMenuItem(
    @Args('createMenuItemInput') createMenuItemInput: CreateMenuItemInput,
  ): Promise<MenuItem> {
    return this.menuService.create(createMenuItemInput);
  }

  @Query(() => [MenuItem], { name: 'menuItems' })
  async findAll(): Promise<MenuItem[]> {
    return this.menuService.findAll();
  }

  @Query(() => MenuItem, { name: 'menuItem' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<MenuItem> {
    return this.menuService.findOne(id);
  }

  @Query(() => [MenuItem], { name: 'menuItemsByCategory' })
  async findByCategory(
    @Args('categoryId', { type: () => ID }) categoryId: string,
  ): Promise<MenuItem[]> {
    return this.menuService.findByCategory(categoryId);
  }

  @Query(() => [MenuItem], { name: 'availableMenuItems' })
  async findAvailable(): Promise<MenuItem[]> {
    return this.menuService.findAvailable();
  }

  @Query(() => [MenuItem], { name: 'searchMenuItems' })
  async searchByName(
    @Args('searchTerm') searchTerm: string,
  ): Promise<MenuItem[]> {
    return this.menuService.searchByName(searchTerm);
  }

  @Mutation(() => MenuItem)
  async updateMenuItem(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateMenuItemInput') updateMenuItemInput: UpdateMenuItemInput,
  ): Promise<MenuItem> {
    return this.menuService.update(id, updateMenuItemInput);
  }

  @Mutation(() => Boolean)
  async removeMenuItem(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    await this.menuService.remove(id);
    return true;
  }
}

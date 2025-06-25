import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem, MenuItemStatus } from '../../entities/menu-item.entity';
import { CategoryService } from '../category/category.service';
import { CreateMenuItemDto } from '../../dto/create-menu-item.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
    private categoryService: CategoryService,
  ) {}

  async create(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
    // Verify category exists
    await this.categoryService.findOne(createMenuItemDto.categoryId);

    const menuItem = this.menuItemRepository.create(createMenuItemDto);
    return await this.menuItemRepository.save(menuItem);
  }

  async findAll(): Promise<MenuItem[]> {
    return await this.menuItemRepository.find({
      relations: ['category'],
      where: { isActive: true },
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<MenuItem> {
    const menuItem = await this.menuItemRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    return menuItem;
  }

  async findByCategory(categoryId: string): Promise<MenuItem[]> {
    // Verify category exists
    await this.categoryService.findOne(categoryId);

    return await this.menuItemRepository.find({
      where: { categoryId, isActive: true },
      relations: ['category'],
      order: { name: 'ASC' },
    });
  }

  async findAvailable(): Promise<MenuItem[]> {
    return await this.menuItemRepository.find({
      where: { isActive: true, status: MenuItemStatus.AVAILABLE },
      relations: ['category'],
      order: { name: 'ASC' },
    });
  }

  async update(
    id: string,
    updateMenuItemDto: Partial<CreateMenuItemDto>,
  ): Promise<MenuItem> {
    const menuItem = await this.findOne(id);

    // If categoryId is being updated, verify the new category exists
    if (updateMenuItemDto.categoryId) {
      await this.categoryService.findOne(updateMenuItemDto.categoryId);
    }

    Object.assign(menuItem, updateMenuItemDto);
    return await this.menuItemRepository.save(menuItem);
  }

  async remove(id: string): Promise<void> {
    const menuItem = await this.findOne(id);
    await this.menuItemRepository.softDelete(id);
  }

  async searchByName(searchTerm: string): Promise<MenuItem[]> {
    return await this.menuItemRepository
      .createQueryBuilder('menuItem')
      .leftJoinAndSelect('menuItem.category', 'category')
      .where('menuItem.name ILIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      })
      .andWhere('menuItem.isActive = :isActive', { isActive: true })
      .orderBy('menuItem.name', 'ASC')
      .getMany();
  }
}

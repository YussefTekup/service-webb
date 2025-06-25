import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuService } from './menu.service';
import { MenuResolver } from './menu.resolver';
import { MenuItem } from '../../entities/menu-item.entity';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItem]), CategoryModule],
  providers: [MenuService, MenuResolver],
  exports: [MenuService],
})
export class MenuModule {}

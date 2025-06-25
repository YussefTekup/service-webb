import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from '../../entities/table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Table])],
  providers: [],
  exports: [],
})
export class TableModule {}

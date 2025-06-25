import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from '../../entities/staff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Staff])],
  providers: [],
  exports: [],
})
export class StaffModule {}

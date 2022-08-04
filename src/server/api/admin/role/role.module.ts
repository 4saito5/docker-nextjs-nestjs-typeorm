import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { AdminUser } from '../../../database/entities/admin-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdminUser,
    ]),
  ],
  exports: [
    TypeOrmModule,
    RoleService,
  ],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}

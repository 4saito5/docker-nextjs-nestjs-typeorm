import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUsersService } from './admin-users.service';
import { AdminUser } from '../../../database/entities/admin-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminUser]),
  ],
  providers: [AdminUsersService],
  exports: [
    TypeOrmModule,
    AdminUsersService,
  ],
})
export class AdminUsersModule {}

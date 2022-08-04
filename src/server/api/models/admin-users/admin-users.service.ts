import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from '../../../database/entities/admin-user.entity';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(AdminUser)
    private adminUsersRepository: Repository<AdminUser>,
  ) { }

  async findOne(adminLoginId: string): Promise<AdminUser | undefined> {
    return this.adminUsersRepository.findOne({ adminLoginId });
  }

}

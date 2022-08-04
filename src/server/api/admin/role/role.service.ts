import { Injectable, Body, Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder, getManager } from 'typeorm';
import { AdminUser } from '../../../database/entities/admin-user.entity';

@Injectable()
export class RoleService {
  private readonly logger = new Logger();
  constructor(
    @InjectRepository(AdminUser)
    private adminUsersRepository: Repository<AdminUser>,
    // @InjectRepository(AdminUserRoleMapping)
    // private adminUserRoleMappingsRepository: Repository<AdminUserRoleMapping>,
  ) { }

  async GetPermission(@Body() body): Promise<any> {
    console.log(body);
    const count: any = await this.adminUsersRepository
      .createQueryBuilder('admin_users')
      .select('COUNT(admin_users.id)')
      .innerJoin('', 'admin_user_role_mappings', 'FIND_IN_SET(admin_users.role, admin_user_role_mappings.role_condition) > 0')
      .where('admin_users.admin_login_id = :adminLoginId', { adminLoginId: body.adminLoginId })
      .andWhere('admin_user_role_mappings.screen_url = :screenUrl', { screenUrl: body.screenUrl })
      .andWhere('admin_users.is_active = 1')
      .andWhere('admin_user_role_mappings.is_active = 1')
      .getCount();
    Logger.verbose('GetPermission, count = ' + count);
    return {
      permission: count === 1
    };
  }

  async GetMenuItem(@Body() body): Promise<any> {
    const query: any = await this.adminUsersRepository
      .createQueryBuilder('admin_users')
      .select('admin_user_role_mappings.screen_id')
      .addSelect('admin_user_role_mappings.screen_name')
      .addSelect('admin_user_role_mappings.role_condition')
      .addSelect('admin_user_role_mappings.screen_url')
      .addSelect('admin_user_role_mappings.menu_sort')
      .addSelect('admin_user_role_mappings.is_show_menu')
      .innerJoin('', 'admin_user_role_mappings', 'FIND_IN_SET(admin_users.role, admin_user_role_mappings.role_condition) > 0')
      .where('admin_users.admin_login_id = :adminLoginId', { adminLoginId: body.adminLoginId })
      .andWhere('admin_users.is_active = 1')
      .andWhere('admin_user_role_mappings.is_active = 1')
      .getRawMany();
    Logger.verbose(query);
    return query;
  }

}

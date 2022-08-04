import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { AdminUserRoleMapping } from '../entities/admin-user-role-mapping.entity';

// const bcrypt = require('bcrypt');

export default class CreateAdminUserRoleMappings implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(AdminUserRoleMapping)
      .values([
        {
          screenId: '001',
          screenName: 'トップ',
          roleCondition: '0,20',
          screenUrl: '/home',
          menuSort: 0,
          isShowMenu: false,
        },
        {
          screenId: '002',
          screenName: '画面A',
          roleCondition: '0,20',
          screenUrl: '/a',
          menuSort: 0,
          isShowMenu: true,
        },
        {
          screenId: '003',
          screenName: '画面B',
          roleCondition: '0',
          screenUrl: '/b',
          menuSort: 0,
          isShowMenu: true,
        },
      ])
      .execute()
  }
}

import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { AdminUser } from '../entities/admin-user.entity';

const bcrypt = require('bcrypt');

export default class CreateAdminUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(AdminUser)
      .values([
        {
          adminUserCode: 'testUserCode001',
          adminLoginId: 'testadmin',
          password: await bcrypt.hash('test1234', 10),
          role: 0,
          regionCode: 'eSqawOOZbxyNmIFOgxEI',
          adminUserName: 'テスト管理者',
          adminEmail: '',
          adminPhone: '',
        },
        {
          adminUserCode: 'testUserCode002',
          adminLoginId: 'test',
          password: await bcrypt.hash('test1234', 10),
          role: 20,
          regionCode: 'eSqawOOZbxyNmIFOgxEI',
          adminUserName: 'テストユーザー',
          adminEmail: '',
          adminPhone: '',
        },
      ])
      .execute()
  }
}

import { define } from 'typeorm-seeding';
import * as Faker from 'faker/locale/ja';

import { AdminUser } from '../entities/admin-user.entity';

define(AdminUser, (faker: typeof Faker): AdminUser => {
  const adminUser = new AdminUser();
　　　　　// ライブラリ「faker」でランダムなデータを作成する
      adminUser.adminUserCode = faker.random.word();
      adminUser.adminLoginId = faker.random.word();
      adminUser.password = faker.random.word();
      adminUser.role = faker.datatype.number(100);
      adminUser.regionCode = faker.random.word();
      adminUser.adminUserName = faker.random.word();
      adminUser.adminEmail = faker.random.word();

  return adminUser;
});

export default AdminUser;

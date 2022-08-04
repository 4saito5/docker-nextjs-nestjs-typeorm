import { Test, TestingModule } from '@nestjs/testing';
import { AdminUsersService } from './admin-users.service';
import { Repository, createConnection, getConnection, getRepository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { resetDB } from '../../util/unit-test';
import { AdminUser } from '../../../database/entities/admin-user.entity';
import { CreateAdminUsersDTO } from '../../../database/dto/admin-user.dto';

describe('AdminUsersService', () => {
  let service: AdminUsersService;
  let repository: Repository<AdminUser>;
  let testingModule: TestingModule;

  const testConnectionName = 'testConnection';

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        AdminUsersService,
        {
          provide: getRepositoryToken(AdminUser),
          useClass: Repository,
        },
      ],
    }).compile();

    //
    await resetDB();

    // テスト環境変数読み込み
    ConfigModule.forRoot({
      envFilePath: [join(__dirname, '../../../config/local-test.env')],
      isGlobal: true,
    });

    const connection = await createConnection({
      type: 'mysql',
      host: process.env.DB_HOSTNAME,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [join(__dirname, '../../../database/entities/**', '*.{ts,js}')],
      synchronize: true,
      logging: false,
      name: testConnectionName,
    });

    repository = getRepository(AdminUser, testConnectionName);
    service = new AdminUsersService(repository);

    return connection;
  });

  afterEach(async () => {
    await getConnection(testConnectionName).close()
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return company info for findOne', async () => {
    // テストデータ作成
    const createAccessLogDTO = new CreateAdminUsersDTO();
    createAccessLogDTO.adminUserCode = 'adminUserCode001';
    createAccessLogDTO.adminLoginId = 'adminLoginId001';
    createAccessLogDTO.password = 'password001';
    createAccessLogDTO.role = 20;
    createAccessLogDTO.regionCode = 'regionCode001';
    createAccessLogDTO.adminUserName = 'adminUserName001';
    createAccessLogDTO.adminEmail = 'adminEmail001';
    createAccessLogDTO.adminPhone = 'adminPhone001';
    createAccessLogDTO.isActive = true;
    createAccessLogDTO.createdUser = 'createdUser001';
    createAccessLogDTO.createdChannel = 1;
    createAccessLogDTO.updatedUser = 'updatedUser001';
    createAccessLogDTO.updatedChannel = 1;
    await repository.save(createAccessLogDTO);

    expect(await service.findOne(createAccessLogDTO.adminLoginId)).toEqual(createAccessLogDTO);
  });
});

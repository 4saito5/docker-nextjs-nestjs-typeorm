import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { createConnection } from 'typeorm';


export async function resetDB() {
  const testConnectionName = 'testConnection';

  // テスト環境変数読み込み
  ConfigModule.forRoot({
    envFilePath: [join(__dirname, '../../config/local-test.env')],
    isGlobal: true,
  });

  const connection = await createConnection({
    type: 'mysql',
    host: process.env.DB_HOSTNAME,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    name: testConnectionName,
  });

  // await connection.connect();
  await connection.query('DROP DATABASE IF EXISTS ' + process.env.DB_DATABASE);
  await connection.query('CREATE SCHEMA ' + process.env.DB_DATABASE + ' CHARACTER SET utf8');
  await connection.query('use ' + process.env.DB_DATABASE);
  await connection.close();
}

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './admin/auth/auth.module';
import { AdminUsersModule } from './models/admin-users/admin-users.module';
import { AccesslogMiddleware } from './middlewares/accesslog.middleware';
// import { AfterAccesslogMiddleware } from './middlewares/after-accesslog.middleware';
import { AccessLogsModule } from './models/access-logs/access-logs.module';
// import { CorsMiddleware } from './middlewares/cors.middleware';
import { RoleModule } from './admin/role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`./config/${process.env.NODE_ENV}.env`,'../.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOSTNAME,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      // host: 'db',
      // port: 3306,
      // username: 'application',
      // password: 'itritr',
      // database: 'application',
      entities: [join(__dirname, '../database/entities/**', '*.{ts,js}')],
      synchronize: true,
    }),
    AuthModule,
    AdminUsersModule,
    AccessLogsModule,
    RoleModule,
  ],
  controllers: [AppController],
  // providers: [],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AccesslogMiddleware)
      .forRoutes(AppController);
  }
}
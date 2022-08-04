import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminUsersModule } from '../../models/admin-users/admin-users.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    AdminUsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      // アクセストークン期限
      //   d: 日, h: 時間, m: 分, s:秒, 無し: ミリ秒
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

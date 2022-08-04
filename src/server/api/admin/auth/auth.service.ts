import { Injectable } from '@nestjs/common';
import { AdminUsersService } from '../../models/admin-users/admin-users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminUsersService: AdminUsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.adminUsersService.findOne(username);
    const bcrypt = require('bcrypt');
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      adminLoginId: user.adminLoginId,
      regionCode: user.regionCode,
      adminUserName: user.adminUserName,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

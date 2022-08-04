import { Controller, Get, Post, Request, Param, UseGuards, Logger } from '@nestjs/common';
import { AuthService } from './admin/auth/auth.service';
import { JwtAuthGuard } from './admin/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './admin/auth/guards/local-auth.guard';
// import bcrypt from 'bcrypt';

@Controller('api')
export class AppController {
  private readonly logger = new Logger();
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('admin/auth/login')
  async login(@Request() req) {
    // this.logger.debug('Debug Message');
    // this.logger.log('Info Message');
    // this.logger.warn('Warn Message');
    // this.logger.error('Error Message');
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('admin/generate_hash/:password')
  async generateHash(@Param() params):Promise<string> {
    // this.logger.debug(params);
    const saltRounds: number = 10;
    const bcrypt = require('bcrypt');
    const hashedPassword: string = await bcrypt.hash(params.password, saltRounds);
    // this.logger.debug(hashedPassword);
    return hashedPassword;
  }

}

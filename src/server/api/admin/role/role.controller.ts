import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(JwtAuthGuard)
  @Post('admin/get_permission')
  getPermission(@Body() body) {
    return this.roleService.GetPermission(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin/get_menu_item')
  GetMenuItem(@Body() body) {
    return this.roleService.GetMenuItem(body);
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
// import { GetAdmin } from 'src/auth-admin/decorator/admin.decorator';
// import { JwtGuard } from 'src/auth-admin/guard';
import { AdminService } from './admin.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth-admin/guard';
import { GetAdmin } from '../auth-admin/decorator/admin.decorator';

@ApiTags('Admins')
@Controller('admins')
export class AdminController {
  constructor(private adminService: AdminService) {}
  @UseGuards(JwtGuard)
  @Get('profile')
  getAdminProfile(@GetAdmin('id') adminId: number) {
    return this.adminService.getAdminProfile(adminId);
  }
}

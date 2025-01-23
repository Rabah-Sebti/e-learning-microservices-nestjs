import { Module } from '@nestjs/common';
import { AuthAdminController } from './auth-admin.controller';
import { AuthAdminService } from './auth-admin.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthAdminController],
  providers: [AuthAdminService, JwtService, JwtStrategy],
})
export class AuthAdminModule {}

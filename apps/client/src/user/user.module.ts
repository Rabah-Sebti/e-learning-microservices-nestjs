import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EmailListener } from '../email.listener';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService, EmailListener, JwtStrategy],
})
export class UserModule {}

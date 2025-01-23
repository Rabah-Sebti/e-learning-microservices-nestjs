import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import { LoginAdminDTO, RegisterAdminDTO, UserDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin Authentication')
@Controller('auth-admin')
export class AuthAdminController {
  constructor(private authService: AuthAdminService) {}
  @Post('login')
  @ApiOperation({ summary: 'Sign in admin' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Creadentials incorrect',
  })
  @HttpCode(200)
  login(@Body() body: LoginAdminDTO) {
    return this.authService.login(body);
  }

  @Post('register')
  register(@Body() body: RegisterAdminDTO) {
    return this.authService.register(body);
  }
}

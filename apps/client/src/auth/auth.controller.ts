import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO, SignUpDTO, UserDto } from './dto';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Client Authentication')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  @ApiOperation({ summary: 'Create some resource' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ' Creadentials already taken.',
  })
  @HttpCode(200)
  signUp(@Body() body: SignUpDTO) {
    return this.authService.signUp(body);
  }

  @Post('login')
  @HttpCode(200)
  signIn(@Body() body: SignInDTO) {
    return this.authService.signIn(body);
  }

  @Post('logout')
  @HttpCode(200)
  logout() {
    return { data: null, message: 'Logout successfully' };
  }
}

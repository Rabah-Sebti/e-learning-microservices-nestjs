import {
  Controller,
  Get,
  HttpCode,
  Post,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Body,
  Query,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard';
// import { JwtGuard } from 'src/auth/guard';

import { GetUser } from '../auth/decorator';
import { FileInterceptor, NoFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ResetPasswordDTO, UpdateAccountDTO, UpdateProfileDTO } from './dto';
import { JwtGuard as JWTGuardPass } from './guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('/profile')
  getProfile(@GetUser('id') userId: number) {
    return this.userService.getUser(userId);
  }

  @Get('domains')
  getDomains() {
    const domains = [
      { key: 'midicine', value: 'Medecine' },
      { key: 'pharmacy', value: 'Pharmacie' },
      { key: 'dentist', value: 'Medecine dentaire' },
    ];
    return domains;
  }

  @UseGuards(JwtGuard)
  @Get('user/related_courses')
  getRelatedCourses(@GetUser('id') userId: number) {
    return this.userService.getRelatedCourses(userId);
  }

  @UseGuards(JwtGuard)
  @Post('/account/avatar')
  @HttpCode(200)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './meddent/uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @UseGuards(JwtGuard)
  updatePicture(
    @UploadedFile() file: Express.Multer.File,
    @GetUser('id') userId: number,
  ) {
    const fileUrl = `http://localhost:3333/meddent/uploads/${file.filename}`;
    return this.userService.updatePicture(fileUrl, userId);
  }

  @UseGuards(JwtGuard)
  @Patch('/profile/update')
  @UseInterceptors(NoFilesInterceptor())
  updateProfile(@GetUser('id') userId: number, @Body() body: UpdateProfileDTO) {
    // if (body.dob) {
    //   body.dob = new Date(body.dob); // Convert string to Date
    // }
    return this.userService.updateProfile(userId, body);
  }

  @UseGuards(JwtGuard)
  @Patch('/account/update')
  // @UseInterceptors(NoFilesInterceptor())
  updateAccount(@GetUser('id') userId: number, @Body() body: UpdateAccountDTO) {
    // if (body.dob) {
    //   body.dob = new Date(body.dob); // Convert string to Date
    // }
    return this.userService.updateAccount(userId, body);
  }

  @UseGuards(JwtGuard)
  @UseGuards(JWTGuardPass)
  @Post('/reset_password')
  resetPassword(@Request() req, @Body() body: ResetPasswordDTO) {
    const userId = req.user.id;
    return this.userService.resetPassword(userId, body);
  }
}

import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtGuard } from '../auth-admin/guard';
import { CreateUserDto, UpdateUserDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ConfigService } from '@nestjs/config';

@ApiTags('Users')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
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
  createUser(
    @Body() body: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let fileUrl: string;
    let newBody: CreateUserDto = body;
    if (!body.password) {
      newBody.password = 'string';
    }
    if (file) {
      fileUrl = `meddent/uploads/${file.filename}`;
      newBody = { ...body, media_url: fileUrl };
    }
    return this.userService.createUser(newBody);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
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

  @Get(':id')
  getUserById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
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
  updateUser(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() body: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let fileUrl: string;
    let newBody: UpdateUserDto = body;
    if (file) {
      fileUrl = `meddent/uploads/${file.filename}`;
      newBody = { ...body, media_url: fileUrl };
    }

    return this.userService.updateUser(id, newBody);
  }
}

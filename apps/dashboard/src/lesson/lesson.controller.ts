import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDTO } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { JwtGuard as JwtAdminGuard } from '../auth-admin/guard';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('Lessons')
@Controller()
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @UseGuards(JwtAdminGuard)
  @Post('lessons')
  @UseInterceptors(
    FileInterceptor('video', {
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
      limits: {
        fileSize: 100 * 1024 * 1024, // Limit: 100MB (or any size you need)
      },
    }),
  )
  createLesson(
    @Body(new ValidationPipe({ transform: true })) body: CreateLessonDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('The Video is required');
    const fileUrl = `meddent/uploads/${file.filename}`;
    return this.lessonService.createLesson({ ...body, media_url: fileUrl });
  }

  @UseGuards(JwtAdminGuard)
  @Get('lessons')
  getLessons() {
    return this.lessonService.getLessons();
  }

  @UseGuards(JwtAdminGuard)
  @Post('lessons/upload/:id')
  @UseInterceptors(
    FileInterceptor('file', {
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
      limits: {
        fileSize: 100 * 1024 * 1024, // Limit: 100MB (or any size you need)
      },
    }),
  )
  async uploadFile(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    lessonId: number,
    @UploadedFile() file?: Express.Multer.File,
    // @Body() body: { totalChunks: number; currentChunk: number; ext: string },
  ) {
    const fileUrl = `meddent/uploads/${file.filename}`;
    return this.lessonService.uploadFile(lessonId, fileUrl);
  }

  @UseGuards(JwtAdminGuard)
  @Get('lessons/:id')
  getSingleLesson(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.lessonService.getSingleLesson(id);
  }
}

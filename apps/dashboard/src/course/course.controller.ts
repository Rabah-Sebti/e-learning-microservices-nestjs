import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { CourseService } from './course.service';
import {
  CoursesParamsDTO,
  CreateCourseDTO,
  UpdateCourseDTO,
  UpdateProgressDTO,
} from './dto';
import { JwtGuard as JwtAdminGuard } from '../auth-admin/guard';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@ApiTags('Courses')
@Controller()
export class CourseController {
  constructor(
    private courseService: CourseService,
    private configService: ConfigService,
  ) {}

  @UseGuards(JwtAdminGuard)
  @Post('courses')
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
  createCourse(
    @Body(new ValidationPipe({ transform: true })) body: CreateCourseDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('image is required');
    const fileUrl = `meddent/uploads/${file.filename}`;

    return this.courseService.createCourse({ ...body, media_url: fileUrl });
  }

  @UseGuards(JwtAdminGuard)
  @Get('admin/courses')
  getAdminCourses(
    // @Query() params: CoursesParamsDTO,
    @Query(
      'offset',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    offset: number,
    @Query(
      'limit',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    limit: number,
    @Query(new ValidationPipe({ transform: true })) query: CoursesParamsDTO,
  ) {
    return this.courseService.getAdminCourses(limit, offset, query);
  }

  @UseGuards(JwtAdminGuard)
  @Get('admin/courses/:id')
  getOneCourseAdmin(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    courseId: number,
  ) {
    return this.courseService.getSingleCourseAdmin(courseId);
  }

  @UseGuards(JwtAdminGuard)
  @Patch('courses/:id')
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
  updateCourse(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    courseId: number,
    @Body(new ValidationPipe({ transform: true })) body: UpdateCourseDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let fileUrl: string;
    let newBody: UpdateCourseDTO = body;
    if (file) {
      fileUrl = `meddent/uploads/${file.filename}`;
      newBody = { ...body, media_url: fileUrl };
    }
    // const fileUrl = `http://localhost:3333/meddent/uploads/${file.filename}`;

    return this.courseService.updateCourse(courseId, newBody);
  }

  @Get('courses/admin/get-all')
  @UseGuards(JwtAdminGuard)
  getAllCoursesIds() {
    return this.courseService.getAllCoursesIdsAdmin();
  }
}

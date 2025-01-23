import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { join } from 'path';
import { Response } from 'express';
import { JwtGuard } from '../auth/guard';

import { VideoAccessGuard } from './guard/lesson.guard';
import * as jwt from 'jsonwebtoken';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';

@ApiTags('Lessons')
@Controller()
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @UseGuards(JwtGuard)
  @HttpCode(200)
  @Post('/courses/:courseId/watch_lesson/:lessonId')
  getLessonUrl(
    @Param(
      'courseId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    courseId: number,
    @Param(
      'lessonId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    lessonId: number,
  ) {
    return this.lessonService.getLessonUrl(courseId, lessonId);
  }

  @ApiExcludeEndpoint(true)
  @UseGuards(VideoAccessGuard)
  @Get('videos/:token')
  streamVideo(@Param('token') token: string, @Res() res: Response) {
    const decoded = jwt.verify(token, 'JWT_SECRET_VIDEO') as {
      filePath: string;
      iat: number;
      exp: number;
    };

    const absolutePath = join(process.cwd(), decoded.filePath);
    res.sendFile(absolutePath);
  }
}

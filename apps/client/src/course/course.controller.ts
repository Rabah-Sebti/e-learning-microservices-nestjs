import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CoursesParamsDTO, UpdateProgressDTO } from './dto';
import { JwtGuard } from '../auth/guard';

import { GetUser } from '../auth/decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Courses')
@Controller('')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get('courses')
  getCourses(
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
    // @Query('category') categories?: string[], // Optional array of category IDs
    // @Query('subCategories') subCategories?: string[], // Optional array of subcategory IDs
    // @Query('prices') prices?: string[],
    // @Query('duration') duration?: string[],
    // @Query('sortBy') sortBy?: string,
  ) {
    // const categoryIds = categories?.map((id) => Number(id));
    // const subCategoryIds = subCategories?.map((id) => Number(id));
    // const priceValues = prices?.map((price) => Number(price));
    // const durationValues = duration?.map((dure) => Number(dure));

    // Handle the query params if they exist
    // const filter = {
    //   categories: categoryIds || [],
    //   subCategories: subCategoryIds || [],
    //   prices: priceValues || [],
    //   duration: durationValues || [],
    //   sortBy,
    // };
    return this.courseService.getCourses(limit, offset, query);
  }

  @ApiTags('client')
  @Get('courses/:id')
  getOneCourse(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    courseId: number,
  ) {
    return this.courseService.getSingleCourse(courseId);
  }

  @UseGuards(JwtGuard)
  @Get('user/courses')
  getUserCourses(@GetUser('id') userId: number) {
    return this.courseService.getUserCourses(userId);
  }

  @UseGuards(JwtGuard)
  @Get('courses/:id/watch')
  getCourseWatch(
    @GetUser('id') userId: number,
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    courseId: number,
  ) {
    return this.courseService.getCourseWatch(userId, courseId);
  }

  @Get('courses/:id/reviews')
  getCourseReviews(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    courseId: number,
  ) {
    return this.courseService.getCourseReviews(courseId);
  }

  @UseGuards(JwtGuard)
  @Get('courses/:id/quiz')
  getCourseQuiz(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    courseId: number,
  ) {
    return this.courseService.getCourseQuiz(courseId);
  }

  @Post('courses/:id/update_progress')
  @UseGuards(JwtGuard)
  @HttpCode(200)
  updateProgress(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    courseId: number,
    @GetUser('id')
    userId: number,
    @Body() body: UpdateProgressDTO,
  ) {
    return this.courseService.updateProgress(userId, courseId, body);
  }
}
